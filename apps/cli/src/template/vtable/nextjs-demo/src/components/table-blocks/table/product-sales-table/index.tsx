"use client";

import { useTableTheme } from "@/components/providers/table-theme-provider";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { type TableThemeType } from "@/config/table-theme";
import { columns, sales } from "@/data/sales";
import VChart from "@visactor/vchart";
import { ListTable, register } from "@visactor/vtable";
import { InputEditor } from "@visactor/vtable-editors";
import { Ellipsis, LayoutGrid, List, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { registerEvent } from "./event-center";
import TableSpecGenerator from "./table-spec";

const tableSpecGenerator = new TableSpecGenerator();
const input_editor = new InputEditor();

register.chartModule("vchart", VChart);
register.editor("input-editor", input_editor);

export default function ProductTableTable() {
  const tableTheme = useTableTheme();
  const [selectedColumns, setSelectedColumns] = useState(columns);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (tableTheme.theme === "system") return;

    tableSpecGenerator.init({
      themeMode: tableTheme.theme! as TableThemeType,
      records: sales,
      selectedColumns,
      search,
    });
    const spec = tableSpecGenerator.generateSpec();

    const instance = new ListTable(
      document.getElementById("products-table") as HTMLElement,
      spec,
    );
    registerEvent(instance);

    return () => {
      instance?.release?.();
    };
  }, [tableTheme.theme, selectedColumns, search]);

  return (
    <div className="pt-3">
      <header className="w-full flex gap-2 items-center justify-between py-2 px-4">
        <Search className="size-4 text-muted-foreground" />
        <Input
          placeholder="search products name or keyword"
          className="w-full flex-auto"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
        <div className="flex gap-3">
          <List className="ml-4 size-4 text-muted-foreground cursor-pointer" />
          <LayoutGrid className="size-4 text-muted-foreground cursor-pointer" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Ellipsis className="size-4 text-muted-foreground cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {columns.map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    checked={selectedColumns.includes(column)}
                    key={column}
                    onClick={() => {
                      setSelectedColumns((prev) => {
                        if (prev.includes(column)) {
                          return prev.filter((col) => col !== column);
                        }
                        return [...prev, column];
                      });
                    }}
                  >
                    {column}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div id="products-table" className="w-full h-[80vh]"></div>
    </div>
  );
}
