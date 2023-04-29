import DefaultTheme from 'vitepress/theme'
// 演示组件
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import { useComponents } from './useComponents'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 基于element-plus二次封装基础组件
import TuiPlus from '../../../packages'
import '../../public/css/index.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    // 注册ElementPlus
    ctx.app.use(ElementPlus, {
      locale, // 语言设置
    })
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      ctx.app.component(key, component)
    }
    // 全局注册基础组件
    ctx.app.use(TuiPlus)
    useComponents(ctx.app)
    // app.component('Demo', Demo)
    // app.component('DemoBlock', DemoBlock)
  },
}
