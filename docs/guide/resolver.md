# @t-ui-plus/resolver (暂不支持)
[![@t-ui-plus/resolver version badge](https://img.shields.io/npm/v/@t-ui-plus/resolver.svg?style=flat-square)](https://www.npmjs.org/package/@t-ui-plus/resolver)

## 简介

`@t-ui-plus/resolver` 是[t-ui-plus](https://t-ui-plus.com/)为 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 提供的官方解析器，可以按需自动导入`t-ui-plus`的组件及其样式文件。

##

- 安装

  ```sh
  pnpm i @t-ui-plus/resolver
  ```

- 配置

  ```ts {5,11}
  // vite.config.ts
  import { defineConfig } from 'vite'
  import Components from 'unplugin-vue-components/vite'

  import { TuiPlusResolver } from '@t-ui-plus/resolver'

  export default defineConfig({
    // ...
    plugins: [
      Components({
        resolvers: [TuiPlusResolver({ importStyle: 'css' })]
      })
    ]
  })
  ```

## 配置参数说明

| 参数名称             | 说明                     | 类型                                            | 默认值  | 是否必须 |
| -------------------- | ------------------------ | ----------------------------------------------- | ------- | -------- |
| `ssr`                | 是否是 ssr               | `boolean`                                       | `false` | 否       |
| `importStyle`        | 导入的样式文件类型       | `string` <t-tip content="'scss'/'css'"></t-tip> | `css`   | 否       |
| `exclude`            | 不需要加载的组件名称正则 | `RegExp`                                        |         | 否       |
| `noStylesComponents` | 不需要加载样式的组件名称 | `array` <t-tip content='string[]'></t-tip>      |         | 否       |
