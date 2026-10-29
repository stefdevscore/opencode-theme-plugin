import assert from "node:assert/strict";
import test from "node:test";
import { themeCss } from "../src/themes.js";

test("default and unknown themes restore host styling; Ocean follows appearance", () => {
  for (const mode of ["light", "dark"]) {
    assert.equal(themeCss("default", mode), "");
    assert.equal(themeCss("missing", mode), "");
    assert.match(themeCss("ocean", mode), /--v2-background-bg-base:/);
    assert.doesNotMatch(themeCss("ocean", mode), /@import|url\(/);
  }
  assert.notEqual(themeCss("ocean", "light"), themeCss("ocean", "dark"));
});
