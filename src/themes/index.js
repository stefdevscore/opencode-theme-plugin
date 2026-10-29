import { hauntedHouse2026 } from "./haunted-house-2026/index.js";
import { happyHolidays2026 } from "./happy-holidays-2026/index.js";
import { defaultTheme } from "./default/index.js";
import { createThemeRegistry } from "../theme/registry.js";

// Composition root: adding a bundled theme requires only its import and registration.
export const themeRegistry = createThemeRegistry(defaultTheme, [
  hauntedHouse2026,
  happyHolidays2026,
]);
