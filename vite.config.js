import { defineConfig } from "vite";
import postcss from "./postcss.config.js";
import react from "@vitejs/plugin-react";
import visualizer from "rollup-plugin-visualizer";

import path from "path"; // Import the path module
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __BE_ROUTER_PORT__: "443",
    '__DEBUG__': false,
    global: {},
    process: { env: { TEST_SSR: false } },
  },
  css: {
    postcss,
  },
  plugins: [
    react(),
    visualizer({
      open: true, // This automatically opens the report in your browser after build
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
      {
        find: "@builder",
        replacement: path.resolve(__dirname, "./addons/fe_Builder/src"),
      }
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    port: 5173,
  },
  optimizeDeps: {
    include: ["@builder/App"],
  },
});
