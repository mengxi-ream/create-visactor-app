import Container from "@/components/container";
import { metrics } from "@/data/metrics";
import MetricCard from "./components/metric-card";

export default function Metrics() {
  return (
    <Container className="phone:grid-cols-2 laptop:grid-cols-4 grid grid-cols-1 gap-y-6  py-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </Container>
  );
}
