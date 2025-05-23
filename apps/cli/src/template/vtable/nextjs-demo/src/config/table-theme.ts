import type { TYPES } from "@visactor/vtable";

export const FONT_FAMILY = "'Gabarito', 'Gabarito Fallback'";

export const fontConfig = {
  fontFamily: FONT_FAMILY,
  fontWeight: "lighter",
  fontSize: 14,
};

const lightHeaderStyle = {
  bgColor: "#F7F7F7",
  color: "RGB(96,96,96)",
  ...fontConfig,
};

export const customDarkTheme: TYPES.ITableThemeDefine = {
  defaultStyle: {
    borderLineWidth: 0,
    ...fontConfig,
  },
  headerStyle: {
    ...fontConfig,
  },
  rowHeaderStyle: {
    ...fontConfig,
  },
  cornerHeaderStyle: {
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
  headerStyle: lightHeaderStyle,
  rowHeaderStyle: lightHeaderStyle,
  cornerHeaderStyle: lightHeaderStyle,
  bodyStyle: {
    ...fontConfig,
  },
};
