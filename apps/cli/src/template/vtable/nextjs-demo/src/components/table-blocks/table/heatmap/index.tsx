"use client";

import { useTableTheme } from "@/components/providers/table-theme-provider";
import { customDarkTheme, customLightTheme } from "@/config/table-theme";
import { heatMapSales } from "@/data/sales-heatmap";
import * as VTable from "@visactor/vtable";
import type { TYPES } from "@visactor/vtable";
import { useEffect } from "react";

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

export default function HeatMap() {
  const tableTheme = useTableTheme();

  useEffect(() => {
    if (tableTheme.theme === "system") {
      return;
    }

    new VTable.PivotTable(document.getElementById("heatMap") as HTMLElement, {
      records: heatMapSales,
      rows: [
        {
          dimensionKey: "region",
          title: "Area",
          width: "auto",
          showSort: false,
          headerType: "link",
          linkDetect: true,
          linkJump: false,
        },
      ],
      columns: [
        {
          dimensionKey: "category",
          title: "Category",
          headerStyle: {
            textAlign: "right",
          },
          showSort: false,
          headerType: "link",
        },
      ],
      indicators: [
        {
          indicatorKey: "sales",
          width: 200,
          showSort: false,
          format() {
            return "";
          },
          style: {
            color: "white",
            bgColor: (args) => {
              return getColor(100000, 2000000, args.dataValue);
            },
          },
        },
      ],
      hideIndicatorName: true,
      theme: tableTheme.theme as TYPES.ITableThemeDefine,
    });
  }, [tableTheme.theme]);

  return <div id="heatMap" className="w-full h-[80vh]"></div>;
}

function getColor(min: number, max: number, n: string): string {
  if (max === min) {
    if (Number(n) > 0) {
      return "rgb(255,0,0)";
    }
    return "rgb(255,255,255)";
  }
  if (n === "") return "rgb(255,255,255)";
  const c = (Number(n) - min) / (max - min) + 0.1;
  const red = (1 - c) * 200 + 55;
  const green = (1 - c) * 200 + 55;
  return `rgb(${red},${green},255)`;
}
