import type { Sales } from "@/data/sales";
import * as VTable from "@visactor/vtable";
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

  constructor() {
    this.records = [];
    this.theme = "";
  }

  init(props: { records: Sales; theme: string }) {
    const { records, theme } = props;
    this.records = records;
    this.theme = theme;
  }

  generateSpec() {
    const { records, theme } = this;
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
      columns: [
        {
          field: "isCheck",
          title: "",
          width: 60,
          headerType: "checkbox",
          cellType: "checkbox",
          style: {
            textAlign: "center",
          },
        },
        {
          field: "orderDate",
          title: "orderDate",
          style: {
            textAlign: "center",
          },
          sort: true,
        },
        {
          field: "city",
          title: "city",
          style: {
            textAlign: "center",
          },
          sort: true,
        },
        {
          field: "productName",
          title: "productName",
          style: {
            textAlign: "center",
          },
          sort: true,
        },
        {
          field: "sales",
          title: "sales",
          sort: true,
          style: {
            textAlign: "center",
          },
          fieldFormat: (record) => {
            return `$${record.sales}`;
          },
        },
        {
          field: "status",
          title: "status",
          sort: true,
          style: {
            textAlign: "center",
          },
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
          width: 60,
          style: {
            textAlign: "center",
          },
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
          width: 50,
          style: {
            color: "#29292B",
            padding: 14,
            textAlign: "center",
            buttonStyle: {
              buttonColor: "#F1f1f3",
              buttonBorderColor: "#F8F8F8",
              buttonBorderRadius: 10,
              buttonHoverColor: "#F1f1f3",
              buttonHoverBorderColor: "#F8F8F8",
            },
          },
        },
        {
          field: "options",
          title: "options",
          icon: EllipsisIcon[theme as keyof typeof EllipsisIcon],
          width: 30,
          headerStyle: {
            textAlign: "center",
          },
          style: {
            textAlign: "center",
          },
        },
      ],

      theme,
    } as ListTableConstructorOptions;
  }
}

export default TableSpecGenerator;
