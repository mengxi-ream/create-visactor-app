import type { LucideIcon } from "lucide-react";
import Container from "../container";
import { ThemeToggle } from "../theme-toggle";

export default function TopNav({
  title,
  icon: Icon,
}: {
  title: string;
  icon?: LucideIcon;
}) {
  return (
    <Container className="border-border flex h-16 items-center justify-between border-b">
      <div className={`flex items-center`}>
        {Icon && <Icon className="mr-2 shrink-0" size={16} />}
        <h1 className="text-2xl font-medium">{title}</h1>
      </div>
      <ThemeToggle />
    </Container>
  );
}
