import Container from "@/components/container";
import { GanttChart } from "@/components/table-blocks";

export default function Gantt() {
  return (
    <div className="h-full">
      <Container className="laptop:col-span-2 py-4 relative">
        <GanttChart />
      </Container>
    </div>
  );
}
