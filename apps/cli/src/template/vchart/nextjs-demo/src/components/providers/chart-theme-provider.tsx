"use client";

import { customDarkTheme, customLightTheme } from "@/config/chart-theme";
import { ThemeManager, type ITheme } from "@visactor/vchart";
import { useTheme } from "next-themes";
import { createContext, useContext, useEffect, useState } from "react";

type ChartTheme = "light" | "dark" | "system";

interface ChartThemeContextI {
  theme: ChartTheme | undefined;
}

export const ChartThemeContext = createContext<ChartThemeContextI>({
  theme: undefined,
});

export function ChartThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme: modeTheme } = useTheme();
  const [theme, setTheme] = useState<ChartTheme>("system");

  useEffect(() => {
    registerTheme();
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      if (modeTheme === "light" || modeTheme === "dark") {
        setTheme(modeTheme);
        ThemeManager.setCurrentTheme(modeTheme);
      } else if (modeTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        setTheme("system");
        ThemeManager.setCurrentTheme(systemTheme);
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
    <ChartThemeContext.Provider value={{ theme }}>
      {children}
    </ChartThemeContext.Provider>
  );
}

export function useChartTheme() {
  const context = useContext(ChartThemeContext);
  if (!context) {
    throw new Error("useChartTheme must be used within a ChartThemeProvider");
  }
  return context;
}

const registerTheme = () => {
  const font = "'Gabarito', 'Gabarito Fallback'";
  const lightTheme: Partial<ITheme> = {
    ...customLightTheme,
    fontFamily: font,
  };
  const darkTheme: Partial<ITheme> = {
    ...customDarkTheme,
    fontFamily: font,
  };
  ThemeManager.registerTheme("light", lightTheme);
  ThemeManager.registerTheme("dark", darkTheme);
};
