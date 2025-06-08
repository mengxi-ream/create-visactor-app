import Container from "@/components/container";
import { ProductSalesTable } from "@/components/table-blocks";

export default function Home() {
  return (
    <div className="border-border laptop:divide-x laptop:divide-y-0 laptop:divide-border grid grid-cols-1 divide-y border-b h-full">
      <Container className="laptop:col-span-2 h-full">
        <ProductSalesTable />
      </Container>
    </div>
  );
}
