import assert from "node:assert/strict";
import test from "node:test";
import { themeRegistry } from "../src/themes/index.js";
import { createThemeRegistry } from "../src/theme/registry.js";
import { renderTheme } from "../src/theme/render.js";

test("removed selections restore the host theme in either appearance", () => {
  assert.equal(themeRegistry.get("ocean").id, themeRegistry.defaultID);
  assert.equal(themeRegistry.get("missing").id, themeRegistry.defaultID);
  for (const mode of ["light", "dark"]) {
    assert.equal(renderTheme(themeRegistry.get("missing"), mode), "");
  }
});

test("registry rejects duplicate IDs and isolates themes from later mutation", () => {
  const fallback = { id: "default", name: "Default", palettes: { light: {}, dark: {} } };
  const custom = { id: "custom", name: "Custom", palettes: {
    light: { "--v2-text-text-base": "#123456" }, dark: {},
  } };
  assert.throws(() => createThemeRegistry(fallback, [fallback]), /duplicate/);
  const registry = createThemeRegistry(fallback, [custom]);
  custom.palettes.light["--v2-text-text-base"] = "#ffffff";
  assert.equal(registry.get("custom").palettes.light["--v2-text-text-base"], "#123456");
  assert.throws(() => registry.themes.push(custom), TypeError);
  assert.throws(() => { registry.get("custom").palettes.light["--v2-text-text-base"] = "#000000"; }, TypeError);
});

test("renderer uses only the selected theme's appearance palette", () => {
  const theme = { id: "fixture", name: "Fixture", palettes: {
    light: { "--v2-text-text-base": "#123456" },
    dark: { "--v2-text-text-base": "#abcdef" },
  } };
  assert.equal(renderTheme(theme, "light"), ":root {\n  --v2-text-text-base: #123456 !important;\n}");
  assert.equal(renderTheme(theme, "dark"), ":root {\n  --v2-text-text-base: #abcdef !important;\n}");
});
