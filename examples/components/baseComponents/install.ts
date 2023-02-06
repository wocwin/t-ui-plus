/*  统一注册 baseComponents 目录下的全部组件 */
import { App } from 'vue'

export default {
  install: (app: App) => {
    // 引入所有组件下的安装模块
    const modules:any = import.meta.globEager('./**/install.ts')
    for (const path in modules) {
      app.use(modules[path].default)
    }
  }
}
