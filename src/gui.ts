import { Schema } from "effect";
import { Command, Plugin, Store, Style } from "@opencode/plugin/gui";
import { themeRegistry } from "./themes/index.js";
import { renderTheme } from "./theme/render.js";

export default Plugin.define({
  stores: {
    preferences: Store.global(Schema.Struct({ theme: Schema.String }), { theme: themeRegistry.defaultID }),
  },
  setup(ctx) {
    ctx.add(Style, () => renderTheme(themeRegistry.get(ctx.stores.preferences.value.theme), ctx.appearance.mode()));
    ctx.add(Command, {
      id: "select",
      title: "Themes: Select desktop theme",
      run: async () => {
        const selected = await ctx.dialogs.select({
          title: "Desktop theme",
          current: themeRegistry.get(ctx.stores.preferences.value.theme).id,
          options: themeRegistry.themes.map(theme => ({ title: theme.name, value: theme.id })),
        });
        if (selected === undefined || ctx.signal.aborted) return;
        ctx.stores.preferences.set({ theme: selected });
      },
    });
  },
});
