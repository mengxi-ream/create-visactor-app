/**
 * @type {import('prettier').Config}
 */
export const config = {
  plugins: ["prettier-plugin-packagejson"],
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
};
