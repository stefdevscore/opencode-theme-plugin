/**
 * Render trusted, bundled palettes; theme modules own all visual choices.
 * Empty palettes contribute no CSS, preserving host styling.
 * @param {import('./types.js').Theme} theme
 * @param {import('./types.js').Appearance} mode
 */
export function renderTheme(theme, mode) {
  const declarations = Object.entries(theme.palettes[mode])
    .map(([token, value]) => `  ${token}: ${value} !important;`);
  return declarations.length ? `:root {\n${declarations.join("\n")}\n}` : "";
}
