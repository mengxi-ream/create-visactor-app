import type { TYPES } from "@visactor/vtable";

export const FONT_FAMILY = "'Gabarito', 'Gabarito Fallback'";

export const fontConfig = {
  fontFamily: FONT_FAMILY,
  fontWeight: "lighter",
};

export const customDarkTheme: TYPES.ITableThemeDefine = {
  defaultStyle: {
    borderLineWidth: 0,
    ...fontConfig,
  },
  headerStyle: {
    ...fontConfig,
  },
  bodyStyle: {
    ...fontConfig,
  },
};

export const customLightTheme: TYPES.ITableThemeDefine = {
  defaultStyle: {
    borderLineWidth: 0,
    ...fontConfig,
  },
  headerStyle: {
    bgColor: "#F7F7F7",
    color: "RGB(96,96,96)",
    ...fontConfig,
  },
  bodyStyle: {
    ...fontConfig,
  },
};
