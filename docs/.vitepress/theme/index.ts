import DefaultTheme from "vitepress/theme"
import type { App } from "vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import locale from "element-plus/es/locale/lang/zh-cn"
import plusZhCn from "@t-ui-plus/locale/lang/zh-cn"
// import en from "element-plus/es/locale/lang/en"
// import plusEn from "@t-ui-plus/locale/lang/en"
// 图标并进行全局注册
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import * as echarts from "echarts"
import "highlight.js/lib/common"
import hljsVuePlugin from "@highlightjs/vue-plugin/dist/highlightjs-vue.esm.min.js" // 引入echarts

// 基于element-plus二次封装基础组件
import TuiPlus from "../../../packages/t-ui-plus/index" // 引入t-ui-plus
// import "t-ui-plus/index.css"
import "../../../packages/theme-chalk/src/index.scss" // 引入主题样式

import TVHtml from "../components/TVHtml.vue"
import TIcon from "../components/TIcon.vue"
import TTip from "../components/TTip.vue"
import DocsCodeDemo from "./components/docs-code-demo.vue"
import MyLayout from "./components/layout.vue"

import directive from "./directives"
import "./styles/index.scss"

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }: { app: App }) {
    app.config.globalProperties.$echarts = echarts // 全局使用
    // 注册ElementPlus
    app.use(ElementPlus, {
      locale: { ...locale, ...plusZhCn }
      // locale: { ...en, ...plusEn }
    })
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    // 全局注册基础组件
    app.use(TuiPlus)

    app.component("highlightjs", hljsVuePlugin.component) // 注册代码高亮组件
    app.component("DocsCodeDemo", DocsCodeDemo)
    app.component("TVHtml", TVHtml)
    app.component("TIcon", TIcon)
    app.component("TTip", TTip)
    directive(app)
  }
}
