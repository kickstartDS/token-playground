import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        preview: resolve(__dirname, "preview.html"),
      },
    },
  },
  publicDir: "node_modules/@kickstartds/ds-agency-premium/dist/static",
  server: {
    host: true,
    port: 5173
  }
});
