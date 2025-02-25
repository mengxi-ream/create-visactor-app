import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export const TITLE_TEXT = `  ▗▖  ▗▖ ▗▄▄▖▗▖ ▗▖ ▗▄▖ ▗▄▄▖▗▄▄▄▖
  ▐▌  ▐▌▐▌   ▐▌ ▐▌▐▌ ▐▌▐▌ ▐▌ █  
  ▐▌  ▐▌▐▌   ▐▛▀▜▌▐▛▀▜▌▐▛▀▚▖ █  
   ▝▚▞▘ ▝▚▄▄▖▐▌ ▐▌▐▌ ▐▌▐▌ ▐▌ █  
`;
export const CREATE_VCHART_APP = "create-vchart-app";
export const DEFAULT_APP_NAME = "my-vchart-app";
