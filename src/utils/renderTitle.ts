import gradient from "gradient-string";

import { TITLE_TEXT } from "~/consts.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";

// colors brought in from vscode poimandres theme
const poimandresTheme = {
  blue: "#add7ff",
  cyan: "#89ddff",
  green: "#5de4c7",
};

export const renderTitle = () => {
  const Gradient = gradient(Object.values(poimandresTheme));

  // resolves weird behavior where the ascii is offset
  const pkgManager = getUserPkgManager();
  if (pkgManager === "yarn" || pkgManager === "pnpm") {
    console.log("");
  }
  console.log(Gradient.multiline(TITLE_TEXT));
};
