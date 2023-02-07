import DefaultTheme from 'vitepress/theme'
import demo from 'vitepress-demoblock/demo.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 基于element-plus二次封装基础组件
import TuiPlus from '../../../packages'
import '../../public/css/index.css'

export default {
  ...DefaultTheme,
  enhanceApp({app}) {
    // 注册ElementPlus
  app.use(ElementPlus, {
    locale // 语言设置
  })
  // 注册所有图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
   // 全局注册基础组件
   app.use(TuiPlus)
   app.component('demo', demo)
  }
}
