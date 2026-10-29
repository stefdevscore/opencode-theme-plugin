# opencode-theme-plugin

Experimental desktop theme manager for OpenCode v2.2.0. Initial scaffold, not a released or live-verified integration.

The GUI-only plugin contributes a **Themes: Select desktop theme** command. It remembers the selection through OpenCode's global plugin store, follows the host's light/dark appearance, and contributes CSS through the native `Style` registry. The default selection contributes no overrides. Ocean is a small proof-of-concept palette, not a complete theme.

## Development

Requires Node.js 24 or newer.

```sh
npm ci
npm test
npm run dev
```

## Local installation

Build with `npm run build`, then add the absolute path to this directory to `plugins` in your global `opencode.jsonc`:

```json
{
  "plugins": ["/absolute/path/to/opencode-theme-plugin"]
}
```

Preserve existing plugin entries. OpenCode loads the `./gui-experimental` export; no server or model requests are needed. Disable this plugin in Settings > Extensions > Plugins to remove its styling.

## Verification still needed

- Apply Ocean in the desktop app and inspect native surfaces and dialogs.
- Restart and verify selection persistence; check multiple windows and appearance changes.
- Disable, reload, and remove the plugin; confirm host styling returns.
- Expand token coverage and verify code, diffs, terminal, accessibility, and contrast separately.

The GUI API is experimental. CSS token names are host implementation details pinned initially to v2.2.0. This plugin does not register themes in the built-in selector or modify application files. Terminal themes are outside the initial scope.

References: [GUI plugins](https://opencode.ai/v2/docs/build/plugins/gui/), [Style registry](https://opencode.ai/v2/docs/build/plugins/gui/#styles).
