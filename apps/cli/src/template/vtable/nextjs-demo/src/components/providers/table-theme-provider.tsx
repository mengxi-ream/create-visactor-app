"use client";

import { customDarkTheme, customLightTheme } from "@/config/table-theme";
import { registerIcon } from "@/lib/registerIcon";
import * as VTable from "@visactor/vtable";
import { useTheme } from "next-themes";
import { createContext, useContext, useEffect, useState } from "react";

type TableTheme = "light" | "dark" | "system";

interface TableThemeContextI {
  theme: TableTheme | undefined;
}

export const TableThemeContext = createContext<TableThemeContextI>({
  theme: undefined,
});

export function TableThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme: modeTheme } = useTheme();
  const [theme, setTheme] = useState<TableTheme>("system");

  useEffect(() => {
    const updateTheme = () => {
      if (modeTheme === "light" || modeTheme === "dark") {
        setTheme(modeTheme);
      } else if (modeTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        setTheme(systemTheme);
      }
    };

    updateTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (modeTheme === "system") {
        updateTheme();
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [modeTheme]);

  return (
    <TableThemeContext.Provider value={{ theme }}>
      {children}
    </TableThemeContext.Provider>
  );
}

export function useTableTheme() {
  const context = useContext(TableThemeContext);
  if (!context) {
    throw new Error("useTableTheme must be used within a TableThemeProvider");
  }
  return context;
}

const registerTheme = () => {
  const lightTheme: VTable.TYPES.PartialTableThemeDefine =
    VTable.themes.ARCO.extends({
      ...customLightTheme,
    });

  const darkTheme: VTable.TYPES.PartialTableThemeDefine =
    VTable.themes.DARK.extends({
      ...customDarkTheme,
    });

  VTable.register.theme("light", lightTheme);
  VTable.register.theme("dark", darkTheme);
};

registerTheme();
registerIcon();
