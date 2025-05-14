import { tableTitle } from "@/components/primitives";
import type { LucideIcon } from "lucide-react";

export default function TableTitle({
  title,
  icon: Icon,
}: {
  title: string;
  icon?: LucideIcon;
}) {
  return (
    <h2 className={`${tableTitle({})} flex items-center`}>
      {Icon && <Icon className="text-primary mr-2 shrink-0" size={16} />}{" "}
      {title}
    </h2>
  );
}
