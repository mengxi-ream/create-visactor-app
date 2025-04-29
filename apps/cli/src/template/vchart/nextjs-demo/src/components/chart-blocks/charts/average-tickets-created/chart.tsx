"use client";

import { averageTicketsCreated } from "@/data/average-tickets-created";
import type { TicketMetric } from "@/types/types";
import { VChart } from "@visactor/react-vchart";
import type { IBarChartSpec } from "@visactor/vchart";

const generateSpec = (data: TicketMetric[]): IBarChartSpec => ({
  type: "bar",
  data: [
    {
      id: "barData",
      values: data,
    },
  ],
  xField: "date",
  yField: "count",
  seriesField: "type",
  padding: [10, 0, 10, 0],
  legends: {
    visible: false,
  },
  stack: false,
  tooltip: {
    trigger: ["click", "hover"],
  },
  bar: {
    state: {
      hover: {
        outerBorder: {
          distance: 2,
          lineWidth: 2,
        },
      },
    },
    style: {
      cornerRadius: [12, 12, 12, 12],
      zIndex: (datum) => {
        return datum.type === "resolved" ? 2 : 1;
      },
    },
  },
});

export default function Chart() {
  const spec = generateSpec(averageTicketsCreated);
  return <VChart spec={spec} />;
}
