import type { HeatMapSales } from "@/data/sales-heatmap";
import * as VTable from "@visactor/vtable";

enum HeatMapColorEnum {
  Min = "rgb(210,210,255)",
  Max = "rgb(0,0,255)",
}

class HeatMapSpecGenerator {
  spec: VTable.TYPES.PivotTableConstructorOptions;
  records: HeatMapSales;
  theme: string;
  max: number;
  min: number;

  constructor(prop: { records: HeatMapSales; theme: string }) {
    const { records, theme } = prop;
    this.spec = {};
    this.records = records;
    this.theme = theme;
    const { max, min } = this.getMaxMin(records, "sales");
    this.max = max;
    this.min = min;
  }

  generateSpec(): VTable.TYPES.PivotTableConstructorOptions {
    const getScaleColor = this.getScaleColor.bind(this);
    return {
      heightMode: "standard",
      columns: [
        {
          dimensionKey: "state",
          title: "State",
          headerStyle: { textAlign: "center" },
        },
      ],
      rows: [{ dimensionKey: "category", title: "Category", width: "auto" }],
      indicators: [
        {
          indicatorKey: "sales",
          title: "Sales",
          width: 200,
          format: () => {
            return "";
          },
          style: {
            bgColor(args) {
              const { dataValue } = args;
              return getScaleColor(Number(dataValue));
            },
          },
        },
      ],
      records: this.records,
      hideIndicatorName: true,
      hover: {
        disableHover: true,
      },
      theme: this.theme as VTable.TYPES.ITableThemeDefine,
    };
  }

  getMaxMin(
    data: { [key: string]: string | number }[],
    key: string,
  ): { max: number; min: number } {
    const nums = data.map((d) => Number(d[key]));
    return {
      max: Math.max(...nums),
      min: Math.min(...nums),
    };
  }

  colorPrelude(color: string) {
    return color
      .match(/\(([^)]+)\)/)![1]
      .split(",")
      .map((item) => Number(item));
  }

  getScaleColor(value: number) {
    if (!value) {
      return HeatMapColorEnum.Min;
    }
    const step = this.max - this.min;
    const n = value - this.min;
    const startColor = HeatMapColorEnum.Min;
    const endColor = HeatMapColorEnum.Max;
    const sColor = this.colorPrelude(startColor);
    const eColor = this.colorPrelude(endColor);
    const rColor = Math.trunc((eColor[0] - sColor[0]) * (n / step) + sColor[0]);
    const gColor = Math.trunc((eColor[1] - sColor[1]) * (n / step) + sColor[1]);
    const bColor = Math.trunc((eColor[2] - sColor[2]) * (n / step) + sColor[2]);
    const res = this.rgbToHex(rColor, gColor, bColor);
    return res;
  }

  rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}

export default HeatMapSpecGenerator;
