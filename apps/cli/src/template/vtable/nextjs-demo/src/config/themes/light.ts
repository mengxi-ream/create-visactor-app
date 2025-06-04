import type { TYPES } from "@visactor/vtable";
import { fontConfig } from "./public";

function getBackgroundColor(args: TYPES.StylePropertyFunctionArg): string {
  const { row, table } = args;
  const index = row - table.frozenRowCount;
  if (!(index & 1)) {
    return "#FFF";
  }
  return "#fbfbfc";
}

/**
 * arco theme
 * @name ARCO
 * @memberof VTable.themes.choices
 */
export default {
  name: "ARCO",
  underlayBackgroundColor: "#FFF",
  defaultStyle: {
    color: "#1B1F23",
    bgColor: "#fff",
    lineHeight: 14,
    borderColor: "#e1e4e8",
    padding: [8, 12, 8, 12],
    borderLineWidth: 0,
    ...fontConfig,
  },
  headerStyle: {
    bgColor: "#f7f7f7",
    color: "#606060",
    lineHeight: 14,
    borderColor: "#e1e4e8",
    padding: [8, 12, 8, 12],
    hover: {
      cellBgColor: "#c8daf6",
    },
    borderLineWidth: 0,
    ...fontConfig,
  },
  rowHeaderStyle: {
    bgColor: "#f7f7f7",
    color: "#606060",
    lineHeight: 12,
    borderColor: "#e1e4e8",
    padding: [8, 12, 8, 12],
    hover: {
      cellBgColor: "#c8daf6",
    },
    borderLineWidth: 0,
    ...fontConfig,
  },
  cornerHeaderStyle: {
    bgColor: "#f7f7f7",
    color: "#606060",
    lineHeight: 12,
    borderColor: "#e1e4e8",
    padding: [8, 12, 8, 12],
    hover: {
      cellBgColor: "#c8daf6",
    },
    borderLineWidth: 0,
    ...fontConfig,
  },
  bodyStyle: {
    padding: [8, 12, 8, 12],
    color: "#141414",
    textAlign: "left",
    bgColor: getBackgroundColor,
    borderColor: "#e1e4e8",
    lineHeight: 14,
    hover: {
      cellBgColor: "#F7F8FA",
      inlineRowBgColor: "#F3F8FF",
      inlineColumnBgColor: "#F3F8FF",
    },
    borderLineWidth: 0,
    ...fontConfig,
  },
  frameStyle: {
    borderColor: "#d1d5da",
    borderLineWidth: 1,
    borderLineDash: [],
    cornerRadius: 4,
    shadowBlur: 6,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: "rgba(00, 24, 47, 0.06)",
  },
  columnResize: {
    lineWidth: 1,
    lineColor: "#416EFF",
    bgColor: "#D9E2FF",
    width: 3,
  },
  selectionStyle: {
    cellBgColor: "rgba(0, 0, 255,0.1)",
    cellBorderLineWidth: 2,
    cellBorderColor: "#3073f2",
  },
} as TYPES.ITableThemeDefine;
