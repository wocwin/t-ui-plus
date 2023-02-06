import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import vueSetupExtend from 'vite-plugin-vue-setup-extend' // 设置neme属性
import AutoImport from 'unplugin-auto-import/vite' // 自动导入
import viteCompression from 'vite-plugin-compression' // 静态资源压缩

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueJsx(),
    vueSetupExtend(),
    AutoImport({
      imports: ['vue'], // 自动导入vue相关API
    }),
    viteCompression({
      verbose: true,
      disable: false, // 不禁用压缩
      deleteOriginFile: false, // 压缩后是否删除原文件
      threshold: 10240, // 压缩前最小文件大小
      algorithm: 'gzip', // 压缩算法
      ext: '.gz' // 文件类型
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3200,
    open: true,
    https: false
  },
  resolve: {
    // 配置别名
    alias: {
      '@': resolve(__dirname, '../examples'),
      components: resolve(__dirname, '../examples/components')
    },
    // 类型： string[] 导入时想要省略的扩展名列表。
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
  }
})
