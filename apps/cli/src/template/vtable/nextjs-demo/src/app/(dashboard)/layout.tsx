import { TopNav } from "@/components/nav";
import { AlignJustify } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <TopNav title="Products" icon={AlignJustify} />
      <main className="h-full flex-auto">{children}</main>
    </div>
  );
}
