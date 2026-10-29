export type Appearance = "light" | "dark";
export type Palette = Readonly<Record<`--v2-${string}`, string>>;

export interface Theme {
  readonly id: string;
  readonly name: string;
  readonly palettes: Readonly<Record<Appearance, Palette>>;
}
