import { TopNav } from "@/components/nav";

export default function GanttLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav title="Gantt" />
      <main>{children}</main>
    </>
  );
}
