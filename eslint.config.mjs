
import pluginJs from "@eslint/js";
import pkg from "eslint-plugin-react";
const { configs } = pkg;
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {
    languageOptions: {
      globals: {
        require: "readonly",
        process: "readonly",
        module: "readonly",
        console: "readonly",
        fetch: "readonly",
      },
      env: {
        browser: true,
        es2021: true,
        node: true,
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the react version
      }
    },
    rules: {
      ...configs.recommended.rules,
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    }
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
];