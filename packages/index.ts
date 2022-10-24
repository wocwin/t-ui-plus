import TLayoutPage from './layout-page'
import TLayoutPageItem from './layout-page-item'
import TQueryCondition from './query-condition'
import TTable from './table'
import TForm from './form'

// 存储组件列表
const components = [
  TLayoutPage,
  TLayoutPageItem,
  TQueryCondition,
  TTable,
  TForm
]

// 插件声明：声明所有插件
// 插件注册：在 Vue 项目的入口文件中，通过 ( app.use(插件) ) 进行注册
const installComponents = (app: any) => {
  components.forEach((comp: any) => {
    app.component(comp.name as string, comp)
  })
}
// vue插件
// - install：每个插件都有一个 install 方法
// - 参数：是通过 Vue.createApp() 创建的 app 实例
const install = (app: any, router?: any) => {
  // !router && installRouter(app);
  installComponents(app)
}

export default {
  ...components, // 按需引入
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
}
