# 快速开始

## 全局使用

> ### 前提条件：使用项目必须全局注册 Element-plus 组件库

```js
// main.ts
import { createApp } from "vue"
import App from "./App.vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import locale from "element-plus/es/locale/lang/zh-cn"
// element-plus图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import TuiPlus from "@wocwin/t-ui-plus"
import "@wocwin/t-ui-plus/index.css"
const app = createApp(App)
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 注册ElementPlus
app.use(ElementPlus, {
  locale // 语言设置
  // size: Cookies.get('size') || 'medium' // 尺寸设置
})
app.use(TuiPlus)
app.mount("#app")
```
## 按需引入

```js
// 在main.js中按下引入
import '@wocwin/t-ui-plus/index.css'
// 单个.vue文件引入
<script setup lang="ts">
  import {TDetail, TForm} from "@wocwin/t-ui-plus"
</script>
```

### Vue - Official （Volar）支持

如果您使用 Vue - Official （Volar），请在 tsconfig.json 中通过 compilerOptions.type 指定全局组件类型。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["@wocwin/t-ui-plus/index.d.ts"]
  }
}
```

## 自动按需导入 <el-tag  effect="dark">待完善</el-tag>


- 1. 安装插件

  ```sh
  pnpm install -D unplugin-vue-components unplugin-auto-import @t-ui-plus/resolver
  ```

- 2.  配置 `vite.config.ts` 或者配置 `webpack(vue).config.js`

  ::: code-group

  ```ts {6,16} [vite.config.ts]
  // vite.config.ts
  import { defineConfig } from 'vite'
  import AutoImport from 'unplugin-auto-import/vite'
  import Components from 'unplugin-vue-components/vite'
  import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
  import { TuiPlusResolver } from '@t-ui-plus/resolver'

  export default defineConfig({
    // ...
    plugins: [
      // ...
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver(), TuiPlusResolver()]
      })
    ]
  })
  ```

  ```js {5,15} [webpack.config.js]
  // webpack.config.js
  const AutoImport = require('unplugin-auto-import/webpack')
  const Components = require('unplugin-vue-components/webpack')
  const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
  const { TuiPlusResolver } = require('@t-ui-plus/resolver')

  module.exports = {
    // ...
    plugins: [
      // ...
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [TuiPlusResolver(), ElementPlusResolver()]
      })
    ]
  }
  ```

  ```js {6,17} [vue.config.js]
  // vue.config.js
  const { defineConfig } = require('@vue/cli-service')
  const AutoImport = require('unplugin-auto-import/webpack')
  const Components = require('unplugin-vue-components/webpack')
  const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
  const { TuiPlusResolver } = require('@t-ui-plus/resolver')

  module.exports = defineConfig({
    // ...
    configureWebpack: {
      plugins: [
        // ...
        AutoImport({
          resolvers: [ElementPlusResolver()]
        }),
        Components({
          resolvers: [TuiPlusResolver(), ElementPlusResolver()]
        })
      ]
    }
  })
  ```