import { defineConfig } from "vite";
import postcss from "./postcss.config.js";
import react from "@vitejs/plugin-react";
import path from 'path'; // Import the path module
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __BE_ROUTER_PORT__: JSON.stringify(process.env.BE_ROUTER_PORT),
    global: {},
    process: {env: {TEST_SSR: false}}
  },
  css: {
    postcss,
  },
  plugins: [react()],
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
      },
      {
        find: "@sea",
        replacement: path.resolve(__dirname, "./addons/fe_Sea/src"),
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    port: process.env.FE_CATALOG_PORT,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './certs/localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './certs/localhost.crt'))
    }
  },
  optimizeDeps: {
    include: [
      // Add specific dependencies from your addons here
      // For example, if "@builder/utils" and "@sea/core" are dependencies within your projects, you'd list them like so:
      // '@builder/App',
      // '@sea/App',
      // You might need to add actual package names as used within those projects
    ]
  }
});
