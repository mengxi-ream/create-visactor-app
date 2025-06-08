import icons from "@/config/icons";
import * as VTable from "@visactor/vtable";

export function registerIcon() {
  icons.forEach((icon) => {
    VTable.register.icon(icon.name, icon.spec);
  });
}

registerIcon();
