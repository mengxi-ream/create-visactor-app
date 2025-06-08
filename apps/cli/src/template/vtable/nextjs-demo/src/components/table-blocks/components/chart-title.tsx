import { chartTitle } from "@/components/primitives";
import type { LucideIcon } from "lucide-react";

export default function ChartTitle({
  title,
  icon: Icon,
}: {
  title: string;
  icon?: LucideIcon;
}) {
  return (
    <h2 className={`${chartTitle({})} flex items-center`}>
      {Icon && <Icon className="text-primary mr-2 shrink-0" size={16} />}{" "}
      {title}
    </h2>
  );
}
