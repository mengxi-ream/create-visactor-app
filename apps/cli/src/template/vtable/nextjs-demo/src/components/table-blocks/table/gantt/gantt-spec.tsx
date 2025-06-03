import records from "@/data/project-progress";
import { TYPES } from "@visactor/vtable-gantt";
import ganttTheme, { type GanttThemeEnum } from "./gantt-theme";

type GanttConstructorOptions = TYPES.GanttConstructorOptions;
type ColumnsDefine = TYPES.ITableColumnsDefine;

class GanttSpecGenerator {
  themeMode = "" as GanttThemeEnum;

  constructor() {}

  get taskTableColumns() {
    const theme = this.theme;
    const { headerStyle, bodyStyle: style } = theme;
    console.log(theme, "gantt-theme");
    return [
      {
        field: "title",
        title: "Title",
        width: 200,
        headerStyle,
        style,
      },
      {
        field: "duration",
        title: "Duration",
        width: 100,
        headerStyle,
        style,
      },
      {
        field: "progress",
        title: "Status",
        width: 100,
        headerStyle,
        style,
      },
    ] as ColumnsDefine;
  }

  get theme() {
    return ganttTheme[this.themeMode];
  }

  toggleTheme(theme: GanttThemeEnum) {
    this.themeMode = theme;
  }

  generateSpec() {
    const theme = this.theme;

    return {
      records,
      taskListTable: {
        columns: this.taskTableColumns,
        minTableWidth: 100,
        maxTableWidth: 600,
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
          content: "",
        },
        {
          date: "2024-07-22",
          style: {
            lineWidth: 2,
            lineColor: "red",
            lineDash: [8, 4],
          },
          content: "",
        },
      ],
      scrollStyle: {
        scrollRailColor: "#f5f5f5",
        visible: "focus",
        width: 5,
        scrollSliderColor: "#ccc",
        hover: {
          scrollSliderColor: "#bbb",
        },
      },
    } as GanttConstructorOptions;
  }
}

export default GanttSpecGenerator;
