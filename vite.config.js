import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ErrorOverlay } from "vite-plugin-error-overlay";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ErrorOverlay()],
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  resolve: {
    alias: [
      {
        find: /^moment$/,
        replacement: path.resolve(__dirname, "./alias.js"),
      },
      {
        find: /^gc-dv$/,
        replacement: path.resolve(
          __dirname,
          "./node_modules/@grapecity/activereports/lib/node_modules/gc-dv.js"
        ),
      },
      {
        find: /^\@grapecity\/ar-js-pagereport$/,
        replacement: path.resolve(
          __dirname,
          "./node_modules/@grapecity/activereports/lib/node_modules/@grapecity/ar-js-pagereport.js"
        ),
      },
      {
        find: /^barcodejs$/,
        replacement: path.resolve(
          __dirname,
          "./node_modules/@grapecity/activereports/lib/node_modules/barcodejs.js"
        ),
      },
    ],
  },
});
