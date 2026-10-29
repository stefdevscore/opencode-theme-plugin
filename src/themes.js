// Initial token-only palette for validating desktop integration. Not a complete theme.
export const themes = [
  { id: "default", name: "OpenCode default" },
  { id: "ocean", name: "Ocean (prototype)" },
];

/** @param {string} id @param {"light" | "dark"} mode */
export function themeCss(id, mode) {
  if (id !== "ocean") return "";
  const dark = mode === "dark";
  return `:root {
    --v2-background-bg-base: ${dark ? "#101c28" : "#f0f8fc"} !important;
    --v2-background-bg-deep: ${dark ? "#0b1520" : "#e2eff6"} !important;
    --v2-background-bg-layer-01: ${dark ? "#152535" : "#e7f2f8"} !important;
    --v2-text-text-base: ${dark ? "#dbeef8" : "#163449"} !important;
    --v2-text-text-muted: ${dark ? "#a1bccd" : "#426174"} !important;
    --v2-text-text-accent: ${dark ? "#72d6ec" : "#00677c"} !important;
  }`;
}
