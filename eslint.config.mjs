import { defineConfig } from "eslint-define-config";
import pkg from "eslint-plugin-react";
const { configs: reactEslintConfigs } = pkg;
import typescriptEslintPkg from "@typescript-eslint/eslint-plugin";
const { configs: typescriptEslintConfigs } = typescriptEslintPkg;
import importPlugin from "eslint-plugin-import";
import parser from "@typescript-eslint/parser";
import globals from "globals";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default defineConfig([
  ...pluginQuery.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        node: true,
        jest: true,
      },
      parser: parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      react: pkg,
      import: importPlugin,
      "@typescript-eslint": typescriptEslintPkg,
      prettier: eslintPluginPrettier,
    },
    rules: {
      // Use valid import rules
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error",
      "import/no-unresolved": "off",
      "import/no-extraneous-dependencies": "warn",
      "import/export": "error",
      "import/no-duplicates": "warn",
      "import/prefer-default-export": "warn",
      ...typescriptEslintConfigs.recommended.rules,
      ...reactEslintConfigs.recommended.rules,
      "react/display-name": "off", // Disable or change this rule as needed
      "@typescript-eslint/ban-ts-comment": "warn", // Example rule
      "react/react-in-jsx-scope": "off",
      "no-console": "warn", // Example rule
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Example rule
      "@typescript-eslint/no-explicit-any": "warn",
      "prettier/prettier": "error",
      ...eslintConfigPrettier.rules,
      "import/prefer-default-export": "off",
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the version of React
      },
    },
    ignores: ["node_modules/", "dist/", "build/", "*.config.js", "*.test.js", "*.config.mjs"],
  },
]);
