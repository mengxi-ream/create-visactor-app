import { ListTable } from "@visactor/vtable";

class EventCenter {
  listenerIds: number[] = [];
  table: ListTable = {} as ListTable;

  constructor() {}

  get dropdownHandler() {
    return {
      insertRow: this.insertRow.bind(this),
      deleteRow: this.deleteRow.bind(this),
    };
  }

  init(table: ListTable) {
    this.table = table;
  }

  registerDropdown() {
    const { dropdownHandler } = this;
    const id = this.table.on("dropdown_menu_click", ({ col, row, menuKey }) => {
      dropdownHandler[menuKey as keyof typeof dropdownHandler](col, row);
    });
    this.listenerIds.push(id);
  }

  registerEvent() {
    this.releaseEvent();
    this.registerDropdown();
  }

  releaseEvent() {
    this.listenerIds.forEach((id) => {
      this.table.off(id);
    });
    this.listenerIds = [];
  }

  insertRow(col: number, row: number) {
    const { table } = this;
    const recordIndex = table.getRecordShowIndexByCell(col, row);
    table.addRecord(
      {
        orderDate: "2017-12-30",
        status: "success",
        trend: [
          {
            y: 840.1948253821874,
            x: "2017-12-29",
          },
          {
            y: 623.7589293675402,
            x: "2017-12-30",
          },
          {
            y: 790.8127916948127,
            x: "2017-12-31",
          },
          {
            y: 234.97216868252656,
            x: "2018-01-01",
          },
          {
            y: 889.9284701469046,
            x: "2018-01-02",
          },
          {
            y: 487.9295393436997,
            x: "2018-01-03",
          },
        ],
        totalSales: 3867.596724617671,
      },
      recordIndex + 1,
    );
  }

  deleteRow(col: number, row: number) {
    const { table } = this;
    const recordIndex = table.getRecordShowIndexByCell(col, row);
    table.deleteRecords([recordIndex]);
  }
}

const eventCenter = new EventCenter();

export const registerEvent = (table: ListTable) => {
  eventCenter.init(table);
  eventCenter.registerEvent();
};
