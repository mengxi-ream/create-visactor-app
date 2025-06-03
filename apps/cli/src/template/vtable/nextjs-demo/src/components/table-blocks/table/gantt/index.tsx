"use client";

import { useTableTheme } from "@/components/providers/table-theme-provider";
import * as VTableGantt from "@visactor/vtable-gantt";
import { useEffect } from "react";
import GanttSpecGenerator from "./gantt-spec";
import type { GanttThemeEnum } from "./gantt-theme";

const ganttSpecGenerator = new GanttSpecGenerator();

export default function GanttChart() {
  const tableTheme = useTableTheme();
  const theme = tableTheme.theme as GanttThemeEnum;

  useEffect(() => {
    const container = document.getElementById("gantt_table");
    if (!container) {
      return;
    }
    ganttSpecGenerator.toggleTheme(theme);
    const spec = ganttSpecGenerator.generateSpec();
    new VTableGantt.Gantt(container, spec);
  }, [theme]);

  return <div id="gantt_table" className="w-full h-128 relative"></div>;
}
