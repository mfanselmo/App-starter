/** @type {import("prettier").Config} */
const config = {
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("@trivago/prettier-plugin-sort-imports"),
  ],
  trailingComma: "all",
  semi: true,
  importOrder: [
    "<THIRD_PARTY_MODULES>",

    "^@/app/(.*)$",
    "^@/server(/(.*))?$",

    "^@/lib/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/form/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

module.exports = config;
