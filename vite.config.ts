import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import netlify from "@netlify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    netlify({
      functions: { enabled: true },
      blobs: { enabled: true },
      edgeFunctions: { enabled: false },
    }),
  ],
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
    port: 5173,
  },
});
