import {
  BgColorEnum,
  HeaderBgColorEnum,
  tableTheme,
  type TableThemeType,
} from "@/config/table-theme";
import records from "@/data/project-progress";
import { formatMonthYear, formatWeekdayDay } from "@/lib/utils";
import { TYPES, VRender } from "@visactor/vtable-gantt";

type GanttConstructorOptions = TYPES.GanttConstructorOptions;
type ColumnsDefine = TYPES.ITableColumnsDefine;
type TaskBarCustomLayoutArgumentType = TYPES.TaskBarCustomLayoutArgumentType;
type ITaskBarCustomLayoutObj = TYPES.ITaskBarCustomLayoutObj;
type DateCustomLayoutArgumentType = TYPES.DateCustomLayoutArgumentType;
type IDateCustomLayoutObj = TYPES.IDateCustomLayoutObj;

const { Group, Text, Rect } = VRender;
const taskBarColor = ["#4FD1C3", "#68D291", "#F6AD56"];
const LineColorEnum = {
  light: "#d1d5da",
  dark: "#444A54",
};

class GanttSpecGenerator {
  themeMode = "" as TableThemeType;

  constructor() {}

  get taskTableColumns() {
    return [
      {
        field: "title",
        title: "Title",
        width: 200,
        tree: true,
      },
      {
        field: "duration",
        title: "Duration",
        width: 100,
        fieldFormat({ duration }) {
          return `${duration} days`;
        },
      },
      {
        field: "progress",
        title: "Status",
        width: 100,
        cellType: "progressbar",
        fieldFormat({ progress }) {
          return `${progress} %`;
        },
        barType: "negative_no_axis",
        style: {
          textAlign: "right",
          barHeight: 20,
          barBottom: "30%",
          barBgColor: "rgba(217,217,217,0.3)",
        },
      },
    ] as ColumnsDefine;
  }

  get theme() {
    return tableTheme[this.themeMode];
  }

  get barTextColor() {
    const textColorMap = {
      light: "#fff",
      dark: "#fff",
    };
    return textColorMap[this.themeMode];
  }

  get gridBgColor() {
    return BgColorEnum[this.themeMode] as string;
  }

  get headerBgColor() {
    return HeaderBgColorEnum[this.themeMode];
  }

  get lineColor() {
    return LineColorEnum[this.themeMode];
  }

  toggleTheme(theme: TableThemeType) {
    this.themeMode = theme;
  }

  itemBarLayout(
    args: TaskBarCustomLayoutArgumentType,
  ): ITaskBarCustomLayoutObj {
    const { taskRecord, width, height, index } = args;
    const { defaultStyle } = this.theme;
    const { fontFamily, fontSize, fontWeight } = defaultStyle!;
    const barColor = taskBarColor[index % 3];

    const container = new Group({
      width,
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      fill: barColor,
      cornerRadius: 10,
      boundsPadding: [0, 0, 0, 10],
    });

    const text = new Text({
      text: taskRecord.title,
      fontSize: fontSize as number,
      fontFamily: fontFamily as string,
      fontWeight: fontWeight as number,
      fill: "#fff",
      boundsPadding: [0, 10],
    });

    container.add(text);

    return {
      renderDefaultBar: false,
      renderDefaultResizeIcon: false,
      renderDefaultText: false,
      rootContainer: container,
    };
  }

  parentBarLayout(
    args: TaskBarCustomLayoutArgumentType,
  ): ITaskBarCustomLayoutObj {
    const { taskRecord, width, height } = args;
    const { headerStyle } = this.theme;
    const { fontFamily, fontSize, fontWeight, color = "#fff" } = headerStyle!;
    const group = new Group({
      width,
      height,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    });

    const text = new Text({
      text: taskRecord.title,
      fontSize: fontSize as number,
      fontFamily: fontFamily as string,
      fontWeight: fontWeight as number,
      fill: color as string,
      boundsPadding: [0, 10, 0, 10],
    });

    const textWidth = text.clipedWidth as number;

    const inner = new Rect({
      width: width - textWidth - 30,
      height: 5,
      fill: this.lineColor,
      cornerRadius: 10,
      boundsPadding: [0, 0, 0, 10],
    });

    group.add(inner);
    group.add(text);

    return {
      rootContainer: group,
      renderDefaultBar: false,
      renderDefaultResizeIcon: false,
      renderDefaultText: false,
    };
  }

  generateTaskBarLayout(
    args: TaskBarCustomLayoutArgumentType,
  ): ITaskBarCustomLayoutObj {
    const { taskRecord } = args;
    if (!taskRecord?.children) return this.itemBarLayout(args);
    return this.parentBarLayout(args);
  }

  dateCustomLayout(args: DateCustomLayoutArgumentType): IDateCustomLayoutObj {
    const { width, height, title } = args;
    const { headerStyle } = this.theme;
    const {
      fontFamily,
      fontSize,
      fontWeight,
      color = "#fff",
      bgColor,
    } = headerStyle!;

    const container = new Group({
      width,
      height,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fill: bgColor as string,
    });

    const text = new Text({
      text: title,
      fontSize: fontSize as number,
      fontFamily: fontFamily as string,
      fontWeight: fontWeight as number,
      fill: color as string,
      boundsPadding: [0, 10],
    });

    container.add(text);

    return {
      rootContainer: container,
      renderDefaultText: false,
    };
  }

  generateSpec() {
    const generateTaskBarLayout = this.generateTaskBarLayout.bind(this);
    const dateCustomLayout = this.dateCustomLayout.bind(this);
    const underlayBackgroundColor = this.theme.underlayBackgroundColor;
    const theme = this.theme;
    const { headerStyle } = theme;
    const lineColor = this.lineColor;
    return {
      records,
      taskListTable: {
        columns: this.taskTableColumns,
        minTableWidth: 100,
        maxTableWidth: 600,
        theme,
      },
      frame: {
        outerFrameStyle: {
          borderLineWidth: 0,
        },
        verticalSplitLine: {
          lineColor,
          lineWidth: 1,
        },
        verticalSplitLineMoveable: true,
      },
      grid: {
        weekendBackgroundColor: "rgba(94, 180, 245, 0.10)",
        verticalLine: {
          lineWidth: 1,
        },
        backgroundColor: this.gridBgColor,
      },
      headerRowHeight: 42,
      rowHeight: 40,
      taskBar: {
        resizable: false,
        startDateField: "start",
        endDateField: "end",
        progressField: "progress",
        moveable: true,
        selectable: false,
        customLayout: generateTaskBarLayout,
        hoverBarStyle: {
          barOverlayColor: "",
        },
        style: {
          cornerRadius: 10,
        },
      },
      timelineHeader: {
        colWidth: 50,
        backgroundColor: headerStyle?.bgColor,
        horizontalLine: {
          lineWidth: 1,
          lineColor,
        },
        verticalLine: {
          lineWidth: 0,
        },
        scales: [
          {
            unit: "month",
            step: 1,
            format(date: { startDate: Date }) {
              const { startDate } = date;
              return formatMonthYear(startDate);
            },
            customLayout: dateCustomLayout,
          },
          {
            unit: "day",
            step: 1,
            customLayout: dateCustomLayout,
            format(date: { startDate: Date }) {
              const { startDate } = date;
              return formatWeekdayDay(startDate);
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
      groupBy: true,
      underlayBackgroundColor,
    } as GanttConstructorOptions;
  }
}

export default GanttSpecGenerator;
