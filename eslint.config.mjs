import { defineConfig, globalIgnores } from "eslint/config";

// Minimal ESLint config - TypeScript compiler handles type checking
const eslintConfig = defineConfig([
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    ".vercel/**",
    "prisma/**",
    "public/**",
    "**/*.config.*",
  ]),
]);

export default eslintConfig;
