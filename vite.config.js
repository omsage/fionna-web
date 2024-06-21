import { defineConfig } from "vite";
import { join } from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    hmr: true,
    port: 3003,
    proxy: {
      "/serverproxy": {
        target: "http://localhost:3417",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/serverproxy/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
});
