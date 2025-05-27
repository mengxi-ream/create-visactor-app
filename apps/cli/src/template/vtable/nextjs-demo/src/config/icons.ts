import * as VTable from "@visactor/vtable";

type ColumnIconOption = VTable.TYPES.ColumnIconOption;

const icons: { name: string; spec: ColumnIconOption }[] = [
  {
    name: "ellipsis",
    spec: {
      type: "svg",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-icon lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`,
      width: 22,
      height: 22,
      name: "ellipsis",
      positionType: VTable.TYPES.IconPosition.inlineFront,
      marginRight: 0,
      cursor: "pointer",
    },
  },
  {
    name: "ellipsis-dark",
    spec: {
      type: "svg",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dee2e6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-icon lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`,
      width: 22,
      height: 22,
      name: "ellipsis-dark",
      positionType: VTable.TYPES.IconPosition.inlineFront,
      marginRight: 0,
      cursor: "pointer",
    },
  },
  {
    name: "minus",
    spec: {
      type: "svg",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus-icon lucide-minus"><path d="M5 12h14"/></svg>`,
      width: 22,
      height: 22,
      name: "minus",
      positionType: VTable.TYPES.IconPosition.left,
      marginRight: 0,
      cursor: "pointer",
    },
  },
];

export default icons;
