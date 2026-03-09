import nextConfig from "eslint-config-next";
import coreWebVitals from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-config-prettier";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextConfig,
  ...coreWebVitals,
  prettierConfig,
  {
    ignores: ["src/generated/**"],
  },
];
