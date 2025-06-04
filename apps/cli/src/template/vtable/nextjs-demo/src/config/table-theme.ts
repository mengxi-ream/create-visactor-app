import dark from "./themes/dark";
import light from "./themes/light";

enum BgColorEnum {
  dark = "#282A2E",
  light = "#fff",
}

enum HeaderBgColorEnum {
  dark = "#373B45",
  light = "#f7f7f7",
}

const tableTheme = {
  dark,
  light,
};

type TableThemeType = keyof typeof tableTheme;

export { dark, light, tableTheme, BgColorEnum, HeaderBgColorEnum };

export type { TableThemeType };
