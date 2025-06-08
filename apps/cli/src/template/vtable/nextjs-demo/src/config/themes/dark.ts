import type { TYPES } from "@visactor/vtable";
import { fontConfig } from "./public";

function getBackgroundColor(args: TYPES.StylePropertyFunctionArg): string {
  const { row, table } = args;
  const index = row - table.frozenRowCount;
  if (!(index & 1)) {
    return "#2d3137";
  }
  return "#282a2e";
}

/**
 * dark theme
 * @name DARK
 * @memberof VTable.themes.DARK
 */
export default {
  name: "DARK",
  underlayBackgroundColor: "transparent",
  defaultStyle: {
    color: "#D3D5DA",
    bgColor: "#282A2E",
    lineHeight: 12,
    borderColor: "#444A54",
    padding: [8, 12, 8, 12],
    borderLineWidth: 0,
    hover: {
      cellBgColor: "#2F4774",
    },
    ...fontConfig,
  },
  headerStyle: {
    color: "#D3D5DA",
    bgColor: "#373b45",
    lineHeight: 12,
    borderColor: "#444A54",
    padding: [8, 12, 8, 12],
    hover: {
      cellBgColor: "#2F4774",
    },
    borderLineWidth: 0,
    ...fontConfig,
  },
  rowHeaderStyle: {
    borderLineWidth: 0,
  },
  cornerHeaderStyle: {
    borderLineWidth: 0,
  },
  bodyStyle: {
    color: "#e5e7ea",
    bgColor: getBackgroundColor,
    lineHeight: 12,
    borderColor: "#444A54",
    padding: [8, 12, 8, 12],
    hover: {
      cellBgColor: "#29364D",
    },
    ...fontConfig,
  },
  columnResize: {
    lineWidth: 1,
    lineColor: "#416EFF",
    bgColor: "#D9E2FF",
    width: 3,
  },
  selectionStyle: {
    cellBgColor: "rgba(255, 255, 255, 0.1)",
    cellBorderColor: "#4284FF",
    cellBorderLineWidth: 2,
  },
  functionalIconsStyle: {
    sort_color: "#FFFFFF",
    sort_color_opacity: "0.75",
    sort_color_2: "#416EFF",
    sort_color_opacity_2: "1",
    frozen_color: "#FFFFFF",
    frozen_color_opacity: "0.75",
    collapse_color: "#FFF",
    collapse_color_opacity: "0.75",
    expand_color: "#FFF",
    expand_color_opacity: "0.75",
    dragReorder_color: "#FFF",
    dragReorder_color_opacity: "0.75",
  },
} as TYPES.ITableThemeDefine;
