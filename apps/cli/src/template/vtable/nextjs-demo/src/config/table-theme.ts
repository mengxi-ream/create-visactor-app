import type { TYPES } from "@visactor/vtable";

export enum BgColorEnum {
  dark = "#282A2E",
  light = "#fff",
}

export const FONT_FAMILY = "'Gabarito', 'Gabarito Fallback'";

export const fontConfig = {
  fontFamily: FONT_FAMILY,
  fontWeight: "lighter",
  fontSize: 14,
};

const lightHeaderStyle = {
  bgColor: "#f7f7f7",
  color: "#606060",
  ...fontConfig,
};

const lightStyle = {
  bgColor: BgColorEnum.light,
};

const darkStyle = {
  bgColor: BgColorEnum.dark,
};

export const customDarkTheme: TYPES.ITableThemeDefine = {
  defaultStyle: {
    borderLineWidth: 0,
    ...fontConfig,
    ...darkStyle,
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
    ...darkStyle,
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
    ...lightStyle,
    ...fontConfig,
  },
};
