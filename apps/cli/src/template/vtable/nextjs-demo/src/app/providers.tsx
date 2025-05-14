"use client";

import { ModeThemeProvider } from "@/components/providers/mode-theme-provider";
import { TableThemeProvider } from "@/components/providers/table-theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModeThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TableThemeProvider>{children}</TableThemeProvider>
    </ModeThemeProvider>
  );
}
