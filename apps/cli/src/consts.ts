import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export const CREATE_VISACTOR_APP = "create-visactor-app";
export const DEFAULT_APP_NAME = "my-visactor-app";
