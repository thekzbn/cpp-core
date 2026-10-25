# Releasing C++ Core

Releases are published from GitHub tags. A release tag identifies one exact
version of the source; GitHub Actions builds the downloadable packages from
that tag and attaches them to a GitHub Release.

## Before the first release

1. Review the changes intended for users and make sure the working tree is in
   the state you intend to publish.
2. Update `VERSION` to the next version, without a leading `v` (for example,
   `0.1.0`). Use `MAJOR.MINOR.PATCH`: increase MAJOR for incompatible changes,
   MINOR for backward-compatible features, and PATCH for backward-compatible
   fixes. While the project is below `1.0.0`, the public interface may still
   change between minor releases.
3. Move the relevant entries from `Unreleased` in `CHANGELOG.md` into a new
   heading named after the version and release date, such as `0.1.0 - 2026-10-25`.
   Leave a fresh `Unreleased` section at the top.
4. Commit those version and changelog edits along with the release-ready code.
5. Create and push the matching tag from that commit:

   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```

   Replace `v0.1.0` with the value in `VERSION` prefixed by `v`. The workflow
   stops if the tag and `VERSION` do not match.
6. On GitHub, open **Actions** and confirm the “Build and publish release” run
   succeeds. Then review the generated release page and its attached ZIP files.

Do not move a published version tag. If a release needs correction, publish a
new patch version so users can tell which files they downloaded.

## Download packages

Each release contains:

- `quing-cpp-core-VERSION-windows-x64.zip`: the app files and a freshly built
  Windows launcher. The launcher uses Node.js and an installed browser; it is
  not a self-contained installer.
- `quing-cpp-core-VERSION-portable.zip`: the same app and server files without
  the Windows launcher. Use `start_server.sh` on macOS/Linux or the supplied
  batch script on Windows.
- A `.sha256` file beside each ZIP, containing its SHA-256 checksum.

GitHub also creates source-code ZIP and tar archives for the tag. Those are
useful for inspecting the source; most learners should choose a package above.

## Code signing

The Windows launcher is currently released **unsigned**. The certificate used
by the local `build_app.bat` script is self-signed, which Windows does not
recognize as a trusted publisher on other people's computers. It must not be
described as trusted release signing.

Trusted signing can be added when Quing has a code-signing certificate and a
secure signing process. The private key must be kept out of the repository and
Git history; it belongs in a protected signing environment. After adding
signing, verify the signature on the final launcher before attaching the ZIP.

