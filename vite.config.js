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
        replacement: path.resolve(__dirname, "./src/fe_Builder/src"),
<<<<<<< HEAD
<<<<<<< HEAD
      },
      {
        find: "@sea",
        replacement: path.resolve(__dirname, "./src/fe_Sea/app"),
=======
>>>>>>> c355e4449bed78b3d2dee4e443ede8969e2dfc9b
=======
>>>>>>> c355e4449bed78b3d2dee4e443ede8969e2dfc9b
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
});
