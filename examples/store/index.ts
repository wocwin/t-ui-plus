import { createStore, createLogger } from 'vuex'
import { app } from './modules/app/index'
import { user } from './modules/user/index'
import { permission } from './modules/permission/index'
import { settings } from './modules/settings/index'
import { tagViews } from './modules/tagViews/index'
import getters from './getters'
// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []
// Plug in session storage based persistence
// plugins.push(createPersistedState({ storage: window.sessionStorage }))

const store = createStore({
  plugins,
  modules: {
    app,
    settings,
    permission,
    user,
    tagViews
  },
  getters
})

// export function useStore(): Store {
//   return store as Store
// }
export default store
