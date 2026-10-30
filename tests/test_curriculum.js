// Zero-dependency curriculum structure and exercise integrity checks.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const source = fs.readFileSync(path.join(__dirname, "..", "lessons.js"), "utf8");
const context = {};
vm.runInNewContext(source + "\n;globalThis.__lessons = LESSONS_DATA;", context, { filename: "lessons.js" });
const lessons = context.__lessons;

assert(Array.isArray(lessons), "LESSONS_DATA must be an array");
assert.strictEqual(lessons.length, 58, "curriculum must contain exactly 58 lessons");
const ids = new Set();
lessons.forEach((lesson, index) => {
  assert.strictEqual(typeof lesson.id, "string", `lesson ${index} must have a stable slug id`);
  assert(lesson.id.trim(), `lesson ${index} id must not be empty`);
  assert(!ids.has(lesson.id), `duplicate lesson id: ${lesson.id}`);
  ids.add(lesson.id);
  assert.strictEqual(Number(lesson.id.slice(0, 2)), index + 1, `lesson ${lesson.id} must appear in curriculum order`);
  for (const field of ["title", "category", "summary", "content", "starterCode"]) {
    assert.strictEqual(typeof lesson[field], "string", `${lesson.id}: ${field} must be a string`);
    assert(lesson[field].trim(), `${lesson.id}: ${field} must not be empty`);
  }

  if (lesson.quiz !== undefined) {
    const quiz = lesson.quiz;
    assert(quiz && typeof quiz.question === "string" && quiz.question.trim(), `${lesson.id}: quiz question required`);
    assert(Array.isArray(quiz.options) && quiz.options.length >= 2, `${lesson.id}: quiz needs at least two options`);
    quiz.options.forEach((option, i) => assert(typeof option === "string" && option.trim(), `${lesson.id}: quiz option ${i} required`));
    assert(Number.isInteger(quiz.answer) && quiz.answer >= 0 && quiz.answer < quiz.options.length, `${lesson.id}: quiz answer out of bounds`);
    assert(typeof quiz.explanation === "string" && quiz.explanation.trim(), `${lesson.id}: quiz explanation required`);
  }

  const drills = [lesson.drills, lesson.practiceDrill, lesson.fillBlank].filter(Boolean);
  drills.forEach((drill, drillIndex) => {
    assert(typeof drill.instructions === "string" && drill.instructions.trim(), `${lesson.id}: exercise ${drillIndex} instructions required`);
    assert(typeof drill.codeTemplate === "string" && drill.codeTemplate.trim(), `${lesson.id}: exercise ${drillIndex} codeTemplate required`);
    assert(Array.isArray(drill.blanks) && drill.blanks.length > 0, `${lesson.id}: exercise ${drillIndex} needs blanks`);
    const tokenIds = new Set();
    drill.blanks.forEach(blank => {
      assert(Number.isInteger(blank.id) && blank.id > 0 && !tokenIds.has(blank.id), `${lesson.id}: invalid or duplicate blank token`);
      tokenIds.add(blank.id);
      assert(typeof blank.answer === "string" && blank.answer.trim(), `${lesson.id}: blank ${blank.id} solution required`);
      assert(typeof blank.hint === "string" && blank.hint.trim(), `${lesson.id}: blank ${blank.id} hint required`);
      assert(new RegExp("___" + blank.id + "___").test(drill.codeTemplate), `${lesson.id}: template missing blank token ${blank.id}`);
    });
    const templateTokens = Array.from(drill.codeTemplate.matchAll(/___(\d+)___/g), match => Number(match[1]));
    assert.deepStrictEqual([...new Set(templateTokens)].sort((a, b) => a - b), [...tokenIds].sort((a, b) => a - b), `${lesson.id}: template tokens and solutions must match`);
  });
});

console.log("[PASS] Curriculum structure, quizzes, and exercise templates verified (58 lessons).");
