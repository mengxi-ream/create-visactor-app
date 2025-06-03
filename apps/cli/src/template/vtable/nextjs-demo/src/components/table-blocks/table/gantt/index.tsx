"use client";

import { useTableTheme } from "@/components/providers/table-theme-provider";
import { Gantt } from "@visactor/vtable-gantt";
import { useEffect } from "react";
import theme from "./gantt-theme";

export default function GanttChart() {
  const tableTheme = useTableTheme();

  useEffect(() => {
    const spec = generateSpec(tableTheme.theme!);
    new Gantt(document.getElementById("gantt_table")!, spec);
  }, []);

  return <div id="gantt_table" className="w-full h-128 relative"></div>;
}

const generateSpec = (tableTheme: string) => {
  const records = [
    {
      id: "2",
      title: "项目启动与规划",
      start: "2024-07-01",
      end: "2024-07-6",
      progress: 100,
      parent: "0",
    },
    {
      id: "4",
      title: "技术方案设计",
      start: "2024-07-6",
      end: "2024-07-11",
      progress: 80,
      parent: "0",
    },
    {
      id: "6",
      title: "核心功能开发",
      start: "2024-07-12",
      end: "2024-07-18",
      progress: 60,
      parent: "0",
    },
    {
      id: "8",
      title: "系统测试",
      start: "2024-07-19",
      end: "2024-07-23",
      progress: 60,
      parent: "0",
    },
  ];

  const columns = [
    {
      field: "title",
      title: "Title",
      width: 200,
      style: {
        fontFamily: "PingFang SC",
        padding: [8, 16],
      },
    },
    {
      field: "progress",
      title: "Status",
      width: 100,
      style: {
        fontFamily: "PingFang SC",
        padding: [8, 16],
        textAlign: "center",
        color: (value) =>
          value >= 80 ? "#52c41a" : value >= 30 ? "#1890ff" : "#595959",
      },
    },
  ];

  return {
    records,
    taskListTable: {
      columns,
      // tableWidth: 400,
      minTableWidth: 100,
      maxTableWidth: 600,
      ...theme[tableTheme],
    },
    frame: {
      outerFrameStyle: {
        borderColor: "#ebedf0",
        borderLineWidth: 1,
        cornerRadius: 12,
        padding: [1, 1, 1, 1],
      },
      verticalSplitLine: {
        lineColor: "#f0f0f0",
        lineWidth: 1,
      },
    },
    grid: {
      backgroundColor: "#fafaff",
      weekendBackgroundColor: "rgba(94, 180, 245, 0.10)",
      verticalLine: {
        lineWidth: 1,
        lineColor: "#f5f5f5",
      },
      horizontalLine: {
        lineWidth: 1,
        lineColor: "#f5f5f5",
      },
    },
    headerRowHeight: 42,
    rowHeight: 40,
    taskBar: {
      startDateField: "start",
      endDateField: "end",
      progressField: "progress",
      moveable: true,
      hoverBarStyle: {
        barOverlayColor: "rgba(99, 144, 0, 0.2)",
      },
      labelText: "{title} {progress}%",
      labelTextStyle: {
        fontFamily: "Arial",
        fontSize: 16,
        textAlign: "left",
        textOverflow: "ellipsis",
        color: "rgb(240, 246, 251)",
      },
      barStyle: {
        width: 24,
        barColor: "#d6e4ff",
        completedBarColor: "#597ef7",
        cornerRadius: 12,
        borderLineWidth: 2,
        borderColor: "rgb(7, 88, 150)",
      },
      milestoneStyle: {
        width: 16,
        fillColor: (value) =>
          value.record.progress >= 100 ? "#597ef7" : "#d6e4ff",
        borderColor: "#597ef7",
        borderLineWidth: 0,
        labelText: "asdasdasd",
        labelTextStyle: {
          fontSize: 16,
          color: "rgb(1, 43, 75)",
        },
      },
    },
    timelineHeader: {
      colWidth: 50,
      backgroundColor: "#fafafa",
      horizontalLine: {
        lineWidth: 1,
        lineColor: "#f0f0f0",
      },
      verticalLine: {
        lineWidth: 1,
        lineColor: "#f0f0f0",
      },
      scales: [
        {
          unit: "week",
          step: 1,
          format(date: { dateIndex: number }) {
            return `W${date.dateIndex}`;
          },
          style: {
            fontSize: 12,
            fontFamily: "PingFang SC",
            textAlign: "center",
            textBaseline: "middle",
            color: "#262626",
            padding: [8, 0],
          },
        },
        {
          unit: "day",
          step: 1,
          format(date: { dateIndex: number }) {
            return `T${date.dateIndex.toString()}`;
          },
          style: {
            fontSize: 12,
            fontFamily: "PingFang SC",
            textAlign: "center",
            textBaseline: "middle",
            color: "#8c8c8c",
            padding: [8, 0],
          },
        },
      ],
    },
    markLine: [
      {
        date: "2024-07-11",
        style: {
          lineWidth: 1,
          lineColor: "blue",
          lineDash: [8, 4],
        },
      },
      {
        date: "2024-07-22",
        style: {
          lineWidth: 2,
          lineColor: "red",
          lineDash: [8, 4],
        },
      },
    ],
    scrollStyle: {
      scrollRailColor: "#f5f5f5",
      visible: "hover",
      width: 5,
      scrollSliderColor: "#ccc",
      hover: {
        scrollSliderColor: "#bbb",
      },
    },
  } as GanttConstructorOptions;
};
