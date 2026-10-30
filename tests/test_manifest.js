// Zero-dependency HTML asset and launcher payload consistency checks.
const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const scripts = Array.from(html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi), match => match[1]);
const stylesheets = Array.from(html.matchAll(/<link\b(?=[^>]*\brel=["']stylesheet["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/gi), match => match[1]);
for (const asset of [...scripts, ...stylesheets]) {
  if (/^(?:[a-z]+:)?\/\//i.test(asset) || asset.startsWith("data:")) continue;
  const localPath = decodeURIComponent(asset.split(/[?#]/)[0]).replace(/^\//, "");
  assert(fs.existsSync(path.join(root, localPath)), `index.html references missing local file: ${asset}`);
}

const expectedOrder = ["lessons.js", "simulator.js", "src/core/storage.js", "src/core/theme.js", "src/compiler/native-runner.js", "src/compiler/toolchain.js", "src/ui/terminal.js", "src/ui/editor.js", "src/ui/drills.js", "src/ui/dialogs.js", "src/ui/navigation.js", "app.js"];
let cursor = -1;
for (const file of expectedOrder) {
  const next = scripts.indexOf(file);
  assert(next > cursor, `script registration dependency order violated at ${file}`);
  cursor = next;
}

const buildScript = fs.readFileSync(path.join(root, "build_launcher.ps1"), "utf8");
const payloadBlock = buildScript.match(/\$payloadFiles\s*=\s*@\(([\s\S]*?)\n\)/);
assert(payloadBlock, "could not locate $payloadFiles in build_launcher.ps1");
const payloadPaths = new Set(Array.from(payloadBlock[1].matchAll(/Path\s*=\s*'([^']+)'/g), match => match[1].replace(/\\/g, "/")));
assert(/foreach\s*\(\$font\s+in\s+Get-ChildItem[^\n]*fonts[^\n]*-File\)/i.test(buildScript), "launcher must include every local font through its fonts directory loop");
const required = ["app.js", "lessons.js", "simulator.js", "style.css"];
function walk(directory) {
  for (const entry of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) {
    const rel = path.posix.join(directory.replace(/\\/g, "/"), entry.name);
    if (entry.isDirectory()) walk(rel);
    else if (entry.isFile() && entry.name.endsWith(".js")) required.push(rel);
  }
}
walk("src");
for (const file of required) assert(payloadPaths.has(file), `launcher payload missing ${file}`);
const localFonts = fs.readdirSync(path.join(root, "fonts"), { withFileTypes: true }).filter(entry => entry.isFile());
assert(localFonts.length > 0, "local font directory must contain font files");
assert(/payload\.fonts\.\$\(\$font\.Name\)/i.test(buildScript), "launcher font loop must embed each local font file");

console.log(`[PASS] HTML references, script order, and ${required.length} launcher payload files verified.`);
