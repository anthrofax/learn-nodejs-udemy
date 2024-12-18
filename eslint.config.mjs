import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      // Atur aturan tertentu menjadi peringatan
      "no-unused-vars": "warn", // Jadi kuning
      "no-console": "off", // Matikan aturan
    },
  },
];
