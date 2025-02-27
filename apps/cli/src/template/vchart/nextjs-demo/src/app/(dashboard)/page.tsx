import {
  AverageTicketsCreated,
  Conversions,
  CustomerSatisfication,
  Metrics,
  TicketByChannels,
} from "@/components/chart-blocks";
import Container from "@/components/container";

export default function Home() {
  return (
    <div>
      <Metrics />
      <div className="border-border laptop:grid-cols-3 laptop:divide-x laptop:divide-y-0 laptop:divide-border grid grid-cols-1 divide-y border-b">
        <Container className="laptop:col-span-2 py-4">
          <AverageTicketsCreated />
        </Container>
        <Container className="laptop:col-span-1 py-4">
          <Conversions />
        </Container>
      </div>
      <div className="border-border laptop:grid-cols-2 laptop:divide-x laptop:divide-y-0 laptop:divide-border grid grid-cols-1 divide-y border-b">
        <Container className="laptop:col-span-1 py-4">
          <TicketByChannels />
        </Container>
        <Container className="laptop:col-span-1 py-4">
          <CustomerSatisfication />
        </Container>
      </div>
    </div>
  );
}
