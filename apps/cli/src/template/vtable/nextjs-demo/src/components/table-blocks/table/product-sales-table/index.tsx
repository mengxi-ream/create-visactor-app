"use client";

import { useTableTheme } from "@/components/providers/table-theme-provider";
import { sales } from "@/data/sales";
import VChart from "@visactor/vchart";
import * as VTable from "@visactor/vtable";
import { useEffect } from "react";
import TableSpecGenerator from "./tableSpec";

VTable.register.chartModule("vchart", VChart);

const tableSpecGenerator = new TableSpecGenerator();

export default function ProductTableTable() {
  const tableTheme = useTableTheme();

  useEffect(() => {
    if (tableTheme.theme === "system") {
      return;
    }
    tableSpecGenerator.init({
      theme: tableTheme.theme!,
      records: sales,
    });
    const spec = tableSpecGenerator.generateSpec();

    new VTable.ListTable(
      document.getElementById("products-table") as HTMLElement,
      spec,
    );
  }, [tableTheme.theme]);

  return <div id="products-table" className="w-full h-[80vh]"></div>;
}
