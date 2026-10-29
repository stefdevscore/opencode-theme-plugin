import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

test("package ships the built GUI entry and excludes local development files", () => {
  const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  const [pack] = JSON.parse(execFileSync("npm", ["pack", "--dry-run", "--ignore-scripts", "--json"], { encoding: "utf8" }));
  const files = pack.files.map(file => file.path);
  const entry = manifest.exports["./gui-experimental"].replace(/^\.\//, "");
  assert.ok(files.includes(entry));
  assert.ok(readFileSync(new URL(`../${entry}`, import.meta.url), "utf8").length > 0);
  for (const path of files) assert.doesNotMatch(path, /^(src|test|node_modules|\.github)\//);
  assert.equal(manifest.private, true, "Publishing stays gated during development");
});
