import Inspect from "vite-plugin-inspect"
import type { PluginOption } from "vite"
import { defineConfig } from "vite"
import vueJsx from "@vitejs/plugin-vue-jsx"
import viteCompression from "vite-plugin-compression"

// 生产环境判断
const isEnvProduction = process.env.NODE_ENV === "production"

export default defineConfig({
  plugins: [
    Inspect() as PluginOption,
    vueJsx() as PluginOption,
    isEnvProduction
      ? (viteCompression({
          filter: /\.(js|css)$/i,
          // algorithm: 'brotliCompress',
          threshold: 10 * 1024 // 10kb
        }) as PluginOption)
      : undefined
  ],
  server: {
    host: "0.0.0.0",
    port: 2222,
    open: true
  }
})
