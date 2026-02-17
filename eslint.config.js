import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import json from "@eslint/json";
import css from "@eslint/css";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JS/TS files
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // React
  pluginReact.configs.flat.recommended,

  // React Hooks
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // JSON
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },

  // CSS
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },

  // Prettier integration
  prettierConfig,
  // {
  //   plugins: { prettier },
  //   rules: {
  //     "prettier/prettier": [
  //       "error",
  //       {
  //         endOfLine: "auto",
  //       },
  //     ],
  //   },
  // },

  // Import plugin & short imports rules
  {
    plugins: { import: importPlugin },
    rules: {
      // enforce short imports (use alias @/ instead of relative ../../../)
      "import/no-relative-parent-imports": "error",
      "import/order": [
        "error",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          "newlines-between": "always",
        },
      ],
    },
  },

  // Custom professional rules
  {
    rules: {
      "react/react-in-jsx-scope": "off", // React 17+
      "react/prop-types": "off", // TS doesn't need prop-types
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off", // optional
      "no-console": "warn",
    },
  },
]);
