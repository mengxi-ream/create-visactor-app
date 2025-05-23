"use client";

import { useTableTheme } from "@/components/providers/table-theme-provider";
import { heatMapSales } from "@/data/sales-heatmap";
import * as VTable from "@visactor/vtable";
import { useEffect } from "react";
import HeatMapGenerator from "./heatmap";

export default function HeatMap() {
  const tableTheme = useTableTheme();

  useEffect(() => {
    const theme = tableTheme.theme;
    if (!theme || theme === "system") {
      return;
    }
    const heatMapGenerator = new HeatMapGenerator({
      records: heatMapSales,
      theme,
    });
    const spec = heatMapGenerator.generateSpec();
    new VTable.PivotTable(
      document.getElementById("heatMap") as HTMLElement,
      spec,
    );
  }, [tableTheme.theme]);

  return <div id="heatMap" className="w-full h-[80vh]"></div>;
}
