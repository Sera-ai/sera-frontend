import { defineConfig } from "vite";
import postcss from "./postcss.config.js";
import react from "@vitejs/plugin-react";
import visualizer from "rollup-plugin-visualizer";

import path from "path"; // Import the path module
import fs from "fs";

function getContainerId() {
  try {
    const cgroup = fs.readFileSync('/proc/self/cgroup', 'utf8');
    const lines = cgroup.split('\n');
    for (const line of lines) {
      if (line.includes('docker')) {
        return line.split('/').pop();
      }
    }
  } catch (error) {
    console.error('Error reading /proc/self/cgroup:', error);
  }
  return null;
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __BE_ROUTER_PORT__: "443",
    '__DEBUG__': false,
    global: {},
    SERA_HOSTNAME: JSON.stringify(require('os').hostname()),
    SERA_CONTAINER_ID: JSON.stringify(getContainerId()),
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
