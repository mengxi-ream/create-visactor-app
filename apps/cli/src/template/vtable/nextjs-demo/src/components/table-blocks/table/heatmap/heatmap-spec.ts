import { BgColorEnum } from "@/config/table-theme";
import type { HeatMapSales } from "@/data/sales-heatmap";
import * as VTable from "@visactor/vtable";

enum HeatMapColorEnum {
  Min = "rgb(210,210,255)",
  Max = "rgb(0,0,255)",
}

class HeatMapSpecGenerator {
  spec: VTable.TYPES.PivotTableConstructorOptions;
  records: HeatMapSales;
  max: number;
  min: number;
  theme = "";

  constructor(prop: { records: HeatMapSales }) {
    const { records } = prop;
    this.spec = {};
    this.records = records;
    const { max, min } = this.getMaxMin(records, "sales");
    this.max = max;
    this.min = min;
  }

  toggleTheme(theme: string) {
    this.theme = theme;
  }

  generateSpec(): VTable.TYPES.PivotTableConstructorOptions {
    const theme = this.theme as keyof typeof BgColorEnum;
    const getScaleColor = this.getScaleColor.bind(this);
    return {
      heightMode: "standard",
      columns: [
        {
          dimensionKey: "state",
          title: "State",
          headerStyle: { textAlign: "center", bgColor: BgColorEnum[theme] },
        },
      ],
      rows: [
        {
          dimensionKey: "category",
          title: "Category",
          width: "auto",
          headerStyle: { bgColor: BgColorEnum[theme] },
        },
      ],
      indicators: [
        {
          indicatorKey: "sales",
          title: "Sales",
          width: 110,
          format: () => {
            return "";
          },
          style: {
            borderLineWidth: 5,
            borderColor: BgColorEnum[theme],
            bgColor(args) {
              const { dataValue } = args;
              return getScaleColor(Number(dataValue));
            },
          },
        },
      ],
      corner: {
        headerStyle: { bgColor: BgColorEnum[theme] },
      },
      records: this.records,
      hideIndicatorName: true,
      defaultRowHeight: 60,
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
