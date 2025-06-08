"use client";

import { useTableTheme } from "@/components/providers/table-theme-provider";
import { heatMapSales } from "@/data/sales-heatmap";
import * as VTable from "@visactor/vtable";
import { useEffect } from "react";
import HeatMapSpecGenerator from "./heatmap-spec";

const heatMapGenerator = new HeatMapSpecGenerator({
  records: heatMapSales,
});

export default function HeatMap() {
  const tableTheme = useTableTheme();

  useEffect(() => {
    const theme = tableTheme.theme;
    if (!theme || theme === "system") {
      return;
    }
    heatMapGenerator.toggleTheme(theme);
    const spec = heatMapGenerator.generateSpec();
    const instance = new VTable.PivotTable(
      document.getElementById("heatMap") as HTMLElement,
      spec,
    );

    return () => {
      instance.release();
    };
  }, [tableTheme.theme]);

  return <div id="heatMap" className="w-full h-[70vh]"></div>;
}
