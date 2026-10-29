# opencode-theme-plugin

Experimental desktop theme manager for OpenCode v2.2.0. Initial scaffold, not a released package.

The GUI-only plugin contributes a **Themes: Select desktop theme** command. It remembers the selection through OpenCode's global plugin store, follows the host's light/dark appearance, and contributes CSS through the native `Style` registry.

Available scaffolds: **Haunted House, 2026** and **Happy Holidays, 2026**. Both have empty light/dark palettes and currently preserve OpenCode's styling. The default and any removed or unknown theme selections also preserve host styling.

## Theme structure

- `src/themes/<theme-id>/index.js`: theme identity and its light/dark palettes.
- `src/themes/index.js`: available themes and default fallback.
- `src/theme/types.ts`: shared theme contract.
- `src/theme/registry.js`: immutable catalog, unique IDs and safe fallback.
- `src/theme/render.js`: shared palette-to-CSS renderer.
- `src/gui.ts`: picker and persisted preferences.

To develop a theme, add its CSS token values to its own palettes. To add another theme, create its module and register it in `src/themes/index.js`. Keep visual choices inside theme modules.

Theme definitions contain data only. The renderer and registry are pure modules with no OpenCode dependencies; the GUI entry owns host integration and persistence. The catalog copies and freezes registered palettes to prevent accidental cross-theme mutation and rejects duplicate IDs. Tests use independent fixtures so adding real palettes does not require rewriting scaffold assertions. No theme-specific conditionals belong in the GUI or renderer.

## Development

Requires Node.js 24 or newer.

```sh
npm ci
npm test
npm run dev
```

### Branches and delivery

`main` holds the reviewed baseline. `development` is the long-lived integration branch; use feature branches and pull requests into it, then promote reviewed changes to `main` through a pull request.

GitHub Actions runs on pushes and pull requests targeting either branch. It verifies typechecking, build, tests and dependency audit on Node 24 (Linux/macOS) and Node 26 (Linux). A packaging test checks the distributed GUI entry and package contents. After verification, Actions uploads a commit-labelled npm tarball retained for 14 days. `CI required` is the stable aggregate status for branch protection.

Delivery currently means a downloadable build artifact. npm publication and GitHub releases are not automated; `private: true` prevents accidental npm publication. Desktop UI behavior still requires manual QA because CI does not launch OpenCode.

## Local installation

Build with `npm run build`, then add the absolute path to this directory to `plugins` in your global `opencode.jsonc`:

```json
{
  "plugins": ["/absolute/path/to/opencode-theme-plugin"]
}
```

Preserve existing plugin entries. OpenCode loads the `./gui-experimental` export; no server or model requests are needed. Disable this plugin in Settings > Extensions > Plugins to remove its styling.

## Verification still needed

- Fully quit/relaunch and verify selection persistence; check multiple windows and appearance changes.
- Inspect broader native surfaces and dialogs, and verify removal.
- Expand token coverage and verify code, diffs, terminal, accessibility, and contrast separately.

The GUI API is experimental. CSS token names are host implementation details pinned initially to v2.2.0. This plugin does not register themes in the built-in selector or modify application files. Terminal themes are outside the initial scope.

References: [GUI plugins](https://opencode.ai/v2/docs/build/plugins/gui/), [Style registry](https://opencode.ai/v2/docs/build/plugins/gui/#styles).
