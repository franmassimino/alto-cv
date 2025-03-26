import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",  // Desactivar la regla no-explicit-any
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
