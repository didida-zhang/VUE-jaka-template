/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-12-01 11:36:20
 * @Description:
 */
/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "vue"],
  rules: {
    "@typescript-eslint/no-explicit-any": 0,
    "no-unsafe-optional-chaining": 0,
  },
  ignorePatterns: [
    "**/dist/**",
    "**/node_modules/**",
    "dist/",
    "node_modules/",
  ],
};
