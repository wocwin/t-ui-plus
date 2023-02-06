// 因为用了“unplugin-auto-import”插件 可以不需要再import Pinia的API
// import { createPinia } from 'pinia'
// 持久化处理
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 创建pinia状态管理对象
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
