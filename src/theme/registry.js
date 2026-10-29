/**
 * Build an immutable catalog with a required fallback and unique identities.
 * Independent of OpenCode so other presentation surfaces can share it.
 * @param {import('./types.js').Theme} fallback
 * @param {readonly import('./types.js').Theme[]} additions
 */
export function createThemeRegistry(fallback, additions) {
  /** @type {Map<string, import('./types.js').Theme>} */
  const byID = new Map();
  const themes = Object.freeze([fallback, ...additions].map(theme => {
    if (!theme.id.trim() || byID.has(theme.id)) {
      throw new Error(`Invalid or duplicate theme ID: ${theme.id}`);
    }
    const entry = Object.freeze({
      ...theme,
      palettes: Object.freeze({
        light: Object.freeze({ ...theme.palettes.light }),
        dark: Object.freeze({ ...theme.palettes.dark }),
      }),
    });
    byID.set(entry.id, entry);
    return entry;
  }));
  return Object.freeze({
    themes,
    defaultID: fallback.id,
    /** @param {string} id @returns {import('./types.js').Theme} */
    get: id => byID.get(id) ?? themes[0],
  });
}
