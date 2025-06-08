import { TopNav } from "@/components/nav";

export default function HeatMapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav title="HeatMap" />
      <main>{children}</main>
    </>
  );
}
