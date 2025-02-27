/**
 * @type {import('prettier').Config & import("@ianvs/prettier-plugin-sort-imports").PluginConfig}
 */
export const config = {
  plugins: [
    "prettier-plugin-packagejson",
    "@ianvs/prettier-plugin-sort-imports",
  ],
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
};
