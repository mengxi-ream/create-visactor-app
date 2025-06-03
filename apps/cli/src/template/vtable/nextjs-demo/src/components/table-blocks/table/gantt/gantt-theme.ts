import { customDarkTheme, customLightTheme } from "@/config/table-theme";

const theme = {
  light: {
    ...customLightTheme,
  },
  dark: {
    ...customDarkTheme,
  },
};

export default theme;

export type GanttThemeEnum = keyof typeof theme;
