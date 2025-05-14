import { ChartGantt, Gauge, Map, type LucideIcon } from "lucide-react";

export type SiteConfig = typeof siteConfig;
export type Navigation = {
  icon: LucideIcon;
  name: string;
  href: string;
};

export const siteConfig = {
  title: "VisActor Next Template",
  description: "Template for VisActor and Next.js",
};

export const navigations: Navigation[] = [
  {
    icon: Gauge,
    name: "Products",
    href: "/",
  },
  {
    icon: ChartGantt,
    name: "Gantt",
    href: "/gantt",
  },
  {
    icon: Map,
    name: "Heatmap",
    href: "/heatmap",
  },
];
