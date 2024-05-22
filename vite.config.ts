import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import vueSetupExtend from 'vite-plugin-vue-setup-extend' // 设置neme属性
// import AutoImport from 'unplugin-auto-import/vite' // 自动导入
// import viteCompression from 'vite-plugin-compression' // 静态资源压缩
// import {visualizer} from 'rollup-plugin-visualizer' // 打包后的视图文件
import replace from '@rollup/plugin-replace'
import dts from 'vite-plugin-dts'
import terser from '@rollup/plugin-terser'
import minimist from 'minimist'
const { f } = minimist(process.argv.slice(2))
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts(),
    vueJsx(),
    vueSetupExtend(),
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify('production') // 或者 'production'
      }
    })
    // viteCompression({
    //   verbose: true,
    //   disable: false, // 不禁用压缩
    //   deleteOriginFile: false, // 压缩后是否删除原文件
    //   threshold: 10240, // 压缩前最小文件大小
    //   algorithm: 'gzip', // 压缩算法
    //   ext: '.gz', // 文件类型
    // }),
    // visualizer({
    //   open:true,  //注意这里要设置为true，否则无效
    //   gzipSize:true,
    //   brotliSize:true
    // })
  ],
  server: {
    host: '0.0.0.0',
    port: 3300,
    open: true,
    https: false,
    proxy: {
      '^/mes': {
        target: `http://10.0.10.243:5000/mesv2/`,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/mes/, ''),
      },
      '^/portal-user': {
        target: `http://10.0.10.240:8172`,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/portal-user/, '/portal-user'),
      },
      '^/portal-sso': {
        target: `http://10.0.10.240:8171`,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/portal-sso/, '/portal-sso'),
      },
    },
  },
  resolve: {
    // 配置别名
    alias: {
      // '@': resolve(__dirname, 'examples'),
      '@': resolve(__dirname, 'packages'),
    },
    // 类型： string[] 导入时想要省略的扩展名列表。
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
  },
  build: {
    outDir: 'lib',
    emptyOutDir: false, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。若 outDir 在根目录之外则会抛出一个警告避免意外删除掉重要的文件。
    rollupOptions: {
      plugins: [
        terser()
      ],
      // 请确保外部化那些你的库中不需要的依赖
      external: f === 'iife' ? ['vue'] : ['vue', '@vueuse/core'],
      output: {
        name: 'TuiPlus',
        /*
         output.format:
         • amd – 异步模块加载，适用于 RequireJS 等模块加载器
         • cjs – CommonJS，适用于 Node 环境和其他打包工具（别名：commonjs）
         • es – 将 bundle 保留为 ES 模块文件，适用于其他打包工具，以及支持 <script type=module> 标签的浏览器。（别名：esm，module）
         • iife – 自执行函数，适用于 <script> 标签（如果你想为你的应用程序创建 bundle，那么你可能会使用它）。iife 表示“自执行 函数表达式”
         • umd – 通用模块定义规范，同时支持 amd，cjs 和 iife
         • system – SystemJS 模块加载器的原生格式（别名：systemjs）
       */
        // format: 'es', // 用于指定生成的 bundle 的格式，默认 'es'，可选 'amd' 'cjs' 'es' 'iife' 'umd' 'system'
        exports: 'named', // 用于指定导出模式，默认是 auto，指根据 input 模块导出推测你的意图
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          '@vueuse/core': 'Core',
        },
      },
    },
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      formats: f === 'iife' ? ['iife'] : ['es', 'umd'],
      // entry: './packages/index.ts',
      name: 'TuiPlus',
      // formats: ['es', 'cjs'],
      // formats: ['es', 'umd', 'cjs'],
      fileName: 't-ui-plus',
    },
    // cssCodeSplit: true, // 启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时一并获取。如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
    // cssMinify: 'esbuild', // 默认与 build.minify 一致，允许用户覆盖 CSS 最小化压缩的配置，而不是使用默认的 build.minify
    reportCompressedSize: false, // 默认 true，启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    // chunkSizeWarningLimit: 500 // 默认500，规定触发警告的 chunk 大小，单位kbs
  },
})
