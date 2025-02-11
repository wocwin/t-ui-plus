import { debounce, throttle, formatNumber } from "./utils"
import type { Component, App } from "vue"
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import locale from 'element-plus/lib/locale/lang/zh-cn' // 因element-plus默认是英文，我们指定一下默认中文
import TLayoutPage from "./layout-page"
import TLayoutPageItem from "./layout-page-item"
import TQueryCondition from "./query-condition"
import TTable from "./table"
import TForm from "./form"
import TSelect from "./select"
import TSelectTable from "./select-table"
import TDetail from "./detail"
import TButton from "./button"
import TStepWizard from "./step-wizard"
import TTimerBtn from "./timer-btn"
import TModuleForm from "./module-form"
import TAdaptivePage from "./adaptive-page"
import TDatePicker from "./date-picker"
import TRadio from "./radio"
import TCheckbox from "./checkbox"
import TChart from "./chart"
import TTabs from "./tabs"
import TSelectIcon from "./select-icon"
import TInput from "./input"
// 存储组件列表
const components: {
  [propName: string]: Component
} = {
  TLayoutPage,
  TLayoutPageItem,
  TQueryCondition,
  TTable,
  TForm,
  TSelect,
  TSelectTable,
  TDetail,
  TButton,
  TStepWizard,
  TTimerBtn,
  TModuleForm,
  TAdaptivePage,
  TDatePicker,
  TRadio,
  TCheckbox,
  TChart,
  TTabs,
  TSelectIcon,
  TInput
}
// vue插件
// - install：每个插件都有一个 install 方法
// - 参数：是通过 Vue.createApp() 创建的 app 实例
const TuiPlus = {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      // console.log('name--11', name, component)
      app.component(name, component)
    });
  }
}
// 自动注册（针对CDN环境）
// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
  // @ts-ignore
  const Vue = window.Vue;
  const originalCreateApp = Vue.createApp;
  Vue.createApp = function (...args) {
    const app = originalCreateApp.apply(this, args);
    TuiPlus.install(app);
    // 如果依赖 ElementPlus 的自动注册
    // @ts-ignore
    if (window.ElementPlus) {
      // @ts-ignore
      app.use(window.ElementPlus);
    }
    return app;
  };
}

// 按需引入
export {
  TLayoutPage,
  TLayoutPageItem,
  TQueryCondition,
  TTable,
  TForm,
  TSelect,
  TSelectTable,
  TDetail,
  TButton,
  TStepWizard,
  TTimerBtn,
  TModuleForm,
  TAdaptivePage,
  TDatePicker,
  TRadio,
  TCheckbox,
  TChart,
  TTabs,
  TSelectIcon,
  TInput
}
/**
 * @description 公共方法
 */
export { throttle, debounce, formatNumber }
// 导出的对象必须具有 install，才能被 Vue.use() 方法安装
export default TuiPlus
