import { BgColorEnum } from "@/config/table-theme";
import type { Sales } from "@/data/sales";
import type { ILinearProgressChartSpec } from "@visactor/vchart";
import { ListTable, VCircle, VGroup } from "@visactor/vtable";
import type { TYPES } from "@visactor/vtable";

enum StatusColor {
  success = "#2ccb73",
  fail = "#df4772",
}

enum EllipsisIcon {
  "light" = "ellipsis",
  "dark" = "ellipsis-dark",
}

type StatusColorType = keyof typeof StatusColor;
type ListTableConstructorOptions = TYPES.ListTableConstructorOptions;

class TableSpecGenerator {
  records: Sales;
  theme: string;
  selectedColumns: string[];

  constructor() {
    this.records = [];
    this.selectedColumns = [];
    this.theme = "";
  }

  get generalColumnSpec() {
    return {
      headerStyle: {
        textAlign: "center",
      },
      style: {
        textAlign: "center",
      },
    };
  }

  get buttonStyleMap(): Record<string, TYPES.ButtonStyle> {
    return {
      light: {
        buttonColor: "#F1f1f3",
        buttonBorderColor: "#F8F8F8",
        buttonBorderRadius: 10,
        buttonHoverColor: "#F1f1f3",
        buttonHoverBorderColor: "#F8F8F8",
      },
      dark: {
        buttonColor: "#29282f",
        buttonBorderColor: "#29282f",
        buttonBorderRadius: 10,
        buttonHoverColor: "#29282f",
        buttonHoverBorderColor: "#29282f",
      },
    };
  }

  get buttonColorMap(): Record<string, string> {
    return {
      light: "#29292B",
      dark: "#fff",
    };
  }

  get buttonStyle() {
    const { theme } = this;
    return this.buttonStyleMap[theme];
  }

  get buttonColor() {
    const { theme } = this;
    return this.buttonColorMap[theme];
  }

  get menu() {
    return {
      renderMode: "html",
      contextMenuItems: [
        { text: "向下插入空行", menuKey: "insertRow" },
        { text: "删除该行", menuKey: "deleteRow" },
      ],
    };
  }

  get chartSpec() {
    const theme = this.theme as keyof typeof BgColorEnum;
    return {
      type: "linearProgress",
      data: { id: "id0" },
      direction: "horizontal",
      xField: "value",
      yField: "label",
      seriesField: "type",
      cornerRadius: 20,
      bandWidth: 12,
      padding: 10,
      theme: {
        background: BgColorEnum[theme],
      },
      axes: [
        {
          orient: "right",
          type: "band",
          domainLine: { visible: false },
          tick: { visible: false },
          label: {
            style: {
              fontSize: 14,
              fontWeight: "bold",
              fill: "#32a645",
            },
          },
          maxWidth: "60%", // 配置坐标轴的最大空间
        },
        {
          orient: "bottom",
          label: { visible: true, inside: true },
          type: "linear",
          visible: false,
          grid: {
            visible: false,
          },
        },
      ],
    } as ILinearProgressChartSpec;
  }

  init(props: {
    records: Sales;
    theme: string;
    selectedColumns: string[];
    search: string;
  }) {
    const { records, theme, selectedColumns, search } = props;
    this.records = this.filterRecords(records, search);
    this.theme = theme;
    this.selectedColumns = selectedColumns;
  }

  filterRecords(records: Sales, search: string) {
    return records.filter((record) => {
      return [record.productName, record.city].some((value) =>
        value.includes(search),
      );
    });
  }

  generateColumns() {
    const selectedColumns = [
      ...this.selectedColumns,
      "status",
      "totalSales",
      "isCheck",
      "options",
      "button",
      "trend",
      "progress",
    ];
    const { theme } = this;
    const raw = [
      {
        field: "isCheck",
        title: "",
        width: 30,
        headerType: "checkbox",
        cellType: "checkbox",
      },
      {
        field: "productName",
        title: "Name",
        sort: true,
        editor: "input-editor",
      },

      {
        field: "city",
        title: "City",
        sort: true,
        editor: "input-editor",
      },
      {
        field: "orderDate",
        title: "OrderDate",
        sort: true,
      },
      {
        field: "sales",
        title: "Sales",
        sort: true,
        fieldFormat: (record) => {
          return record.sales ? `$${record.sales}` : "";
        },
        editor: "input-editor",
      },
      {
        field: "status",
        title: "Status",
        sort: true,
        width: 60,
        customLayout: ({ table, row, col, rect }) => {
          const { height, width } = rect ?? table.getCellRect(col, row);
          const { status } = table.getCellOriginRecord(col, row);
          const color = StatusColor[status as StatusColorType];
          const container = (
            <VGroup
              attribute={{
                width,
                height,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <VCircle
                attribute={{
                  fill: color,
                  radius: 3,
                  boundsPadding: [0, 14, 0, 14],
                }}
              ></VCircle>
            </VGroup>
          );
          return {
            rootContainer: container,
            renderDefault: false,
          };
        },
      },
      {
        field: "totalSales",
        title: "Total Sales",
        width: 60,
        fieldFormat: (record) => {
          const text = record.totalSales?.toFixed(2);
          return text ? `$${text}` : "";
        },
      },
      {
        field: "trend",
        title: "Sales Trend",
        cellType: "sparkline",
        width: 30,
        sparklineSpec({
          table,
          row,
          col,
        }: {
          table: ListTable;
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
        field: "progress",
        title: "Schedule",
        width: 100,
        cellType: "chart",
        chartModule: "vchart",
        style: {
          padding: 1,
        },
        chartSpec: this.chartSpec,
      },
      {
        field: "button",
        title: "Share",
        cellType: "button",
        text: "share",
        width: 60,
        style: {
          color: this.buttonColor,
          padding: 14,
          textAlign: "center",
          buttonStyle: this.buttonStyle,
        },
      },
      {
        field: "options",
        title: "Options",
        icon: EllipsisIcon[theme as keyof typeof EllipsisIcon],
        width: 60,
      },
    ] as TYPES.ColumnsDefine;

    return raw
      .map((item) => {
        return {
          ...this.generalColumnSpec,
          ...item,
        };
      })
      .filter((item) => selectedColumns.includes(String(item.field!)));
  }

  generateSpec() {
    const { records, theme, menu } = this;
    return {
      records,
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
      columns: this.generateColumns(),
      customMergeCell: [
        {
          text: "Total Sales",
          range: { start: { col: 6, row: 0 }, end: { col: 7, row: 0 } },
        },
      ],
      theme,
      menu,
      keyboardOptions: {
        copySelected: true,
        pasteValueToCell: true,
        selectAllOnCtrlA: true,
      },
    } as ListTableConstructorOptions;
  }
}

export default TableSpecGenerator;
