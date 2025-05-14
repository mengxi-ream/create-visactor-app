"use client";

import { useTableTheme } from "@/components/providers/table-theme-provider";
import { customDarkTheme, customLightTheme } from "@/config/table-theme";
import { sales } from "@/data/sales";
import VChart from "@visactor/vchart";
import * as VTable from "@visactor/vtable";
import type { TYPES } from "@visactor/vtable";
import { useEffect } from "react";

enum StatusColor {
  success = "#2ccb73",
  fail = "#df4772",
}

type StatusColorType = keyof typeof StatusColor;
type ListTableConstructorOptions = TYPES.ListTableConstructorOptions;

VTable.register.chartModule("vchart", VChart);

const lightTheme: VTable.TYPES.PartialTableThemeDefine =
  VTable.themes.ARCO.extends({
    ...customLightTheme,
  });

const darkTheme: VTable.TYPES.PartialTableThemeDefine =
  VTable.themes.DARK.extends({
    ...customDarkTheme,
  });

VTable.register.theme("light", lightTheme);
VTable.register.theme("dark", darkTheme);

export default function ProductTableTable() {
  const tableTheme = useTableTheme();

  useEffect(() => {
    if (tableTheme.theme === "system") {
      return;
    }
    const options = integrateOptions(tableTheme.theme);

    new VTable.ListTable(
      document.getElementById("products-table") as HTMLElement,
      options,
    );
  }, [tableTheme.theme]);

  return <div id="products-table" className="w-full h-[80vh]"></div>;
}

const integrateOptions = (theme?: string) => {
  return {
    records: sales,
    widthMode: "adaptive",
    heightMode: "standard",
    defaultRowHeight: 50,
    hover: {
      highlightMode: "row",
    },
    select: {
      highlightMode: "row",
      highlightInRange: true,
    },
    columns: [
      {
        field: "isCheck",
        title: "",
        width: 60,
        headerType: "checkbox",
        cellType: "checkbox",
      },
      { field: "orderDate", title: "orderDate", sort: true },
      { field: "city", title: "city", sort: true },
      { field: "productName", title: "productName", sort: true },
      {
        field: "sales",
        title: "sales",
        sort: true,
        fieldFormat: (record) => {
          return `$${record.sales}`;
        },
      },
      {
        field: "status",
        title: "status",
        sort: true,
        customLayout: ({ table, row, col, rect }) => {
          const { height, width } = rect ?? table.getCellRect(col, row);
          const { status } = table.getCellOriginRecord(col, row);
          const color = StatusColor[status as StatusColorType];
          const container = (
            <VTable.VGroup
              attribute={{
                width,
                height,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <VTable.VCircle
                attribute={{
                  fill: color,
                  radius: 3,
                  boundsPadding: [0, 14, 0, 14],
                }}
              ></VTable.VCircle>
            </VTable.VGroup>
          );
          return {
            rootContainer: container,
            renderDefault: false,
          };
        },
      },
      {
        field: "trend",
        title: "sales trend",
        cellType: "sparkline",
        width: 50,
        sparklineSpec({
          table,
          row,
          col,
        }: {
          table: VTable.ListTable;
          row: number;
          col: number;
        }) {
          const { status } = table.getCellOriginRecord(col, row);
          const color = StatusColor[status as StatusColorType];

          return {
            type: "line",
            xField: "x",
            yField: "y",
            pointShowRule: "none",
            smooth: true,
            line: {
              style: {
                stroke: color,
                strokeWidth: 2,
              },
            },
            hover: {
              style: {
                stroke: color,
                strokeWidth: 1,
                fill: color,
                shape: "circle",
                size: 2,
              },
            },

            crosshair: {
              style: {
                stroke: "gray",
                strokeWidth: 1,
              },
            },
          };
        },
      },
      {
        field: "button",
        title: "share",
        cellType: "button",
        text: "share",
        style: {
          color: "#29292B",
          padding: 14,
          buttonStyle: {
            buttonColor: "#F1f1f3",
            buttonBorderColor: "#F8F8F8",
            buttonBorderRadius: 10,
            buttonHoverColor: "#F1f1f3",
            buttonHoverBorderColor: "#F8F8F8",
          },
        },
      },
    ],
    theme,
  } as ListTableConstructorOptions;
};
