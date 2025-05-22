import Container from "@/components/container";
import { ProductSalesTable } from "@/components/table-blocks";

export default function Gantt() {
  return (
    <div className="border-border laptop:grid-cols-3 laptop:divide-x laptop:divide-y-0 laptop:divide-border grid grid-cols-1 divide-y border-b">
      <Container className="laptop:col-span-2 py-4">
        <ProductSalesTable />
      </Container>
    </div>
  );
}
