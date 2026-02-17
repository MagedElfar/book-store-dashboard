import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true, // TypeScript errors
      eslint: {
        useFlatConfig: true,
        dev: { logLevel: ['error'] },
        lintCommand: "eslint './src/**/*.{ts,tsx,js,jsx}'", // ESLint errors
      },
    }),
  ],

  resolve: {
    alias: [
      {
        find: /^src(.+)/,
        replacement: path.resolve(process.cwd(), 'src/$1'),
      },
      {
        find: '@',
        replacement: path.resolve(process.cwd(), 'src'),
      },
    ],
  },
});
