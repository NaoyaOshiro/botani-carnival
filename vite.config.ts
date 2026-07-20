import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const plugins = [react(), tailwindcss()];

export default defineConfig(({ command }) => ({
  // GitHub Pages のプロジェクトページはサブパス配信（例: /botani-carnival/）。
  // 本番ビルド時のみ base を付与し、ローカル開発（vite dev）はルート直下にする。
  // 独自ドメインや別ホストに移す場合は VITE_BASE_PATH で上書き可能。
  base: command === "build" ? process.env.VITE_BASE_PATH ?? "/botani-carnival/" : "/",
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
}));
