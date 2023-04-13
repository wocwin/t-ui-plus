# T-ui-Plus

## [Vue2 基础组件传送门](https://github.com/wocwin/t-ui)

> 基于 Element-ui 和 ant-design-vue 二次封装基础组件地址

## 介绍

> 基于 vue3+ ts+ Element-plus 二次封装组件

这是我在学习 Vue3 中基于[Element-plus](https://element-plus.org/zh-CN/) 二次封装基础组件文档，希望对你有用。可查看 [详细组件案例文档](https://wocwin.github.io/t-ui-plus/) 预览

<p align="center">
  <a href="https://github.com/vuejs/vue" target="_blank">
    <img src="https://img.shields.io/badge/vue-3.2.36-brightgreen.svg" alt="vue3">
  </a>
  <a href="https://gitee.com/wocwin/t-ui-plus/stargazers" target="_blank">
    <img src="https://gitee.com/wocwin/t-ui-plus/badge/star.svg?theme=dark" alt="t-ui-plus">
  </a>
   <a href="https://github.com/wocwin/t-ui-plus/stargazers" target="_blank">
    <img src="https://img.shields.io/github/stars/wocwin/t-ui-plus.svg" alt="t-ui-plus">
  </a>
   <a href="https://www.npmjs.com/package/@wocwin/t-ui-plus" target="_blank">
      <img alt="npm" src="https://img.shields.io/npm/v/@wocwin/t-ui-plus.svg" />
    </a>
</p>

## 动态效果图

<img src="./public/TuiPlus__demo.gif">

## npm 方式安装使用

```shell
npm i @wocwin/t-ui-plus
```

### 全局注册使用

```js
// 在main.js中按下引入
import TuiPlus from '@wocwin/t-ui-plus'
import '@wocwin/t-ui-plus/lib/style.css'
Vue.use(TuiPlus)
```

### 按需引入

```js
// 在main.js中按下引入
import '@wocwin/t-ui-plus/lib/style.css'
// 单个.vue文件引入
<script setup lang="ts">
  import {TDetail, TForm} from "@wocwin/t-ui-plus"
</script>
```

## 安装依赖

```shell
pnpm install

```

## 使用[t-ui-plus组件的后台管理系统地址](https://github.com/wocwin/wocwin-admin)

## 本地运行 vuepress 中组件文档

```shell
// docs项目(文档demo示例)基于vue3+vite项目
npm run docs:dev

```
## 微信交流群

|                  微信二维码                   |
| :--------------------------------------: |
| <img src="./public/weixin.jpg" width=170> |
