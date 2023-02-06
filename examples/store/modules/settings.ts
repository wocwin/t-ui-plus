import piniaPersistConfig from '../piniaPersist'
const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      theme: '#355db4',
      showSettings: false,
      showTagsView: true,
      fixedHeader: true,
      showSidebarLogo: true,
      sidebarTextTheme: true
    }
  },
  actions: {
    getChangeSetting(payload: { key: string; value: any }) {
      const { key, value } = payload
      switch (key) {
        case 'theme':
          this.theme = value
          break
        case 'fixedHeader':
          this.fixedHeader = value
          break
        case 'showSettings':
          this.showSettings = value
          break
        case 'showSidebarLogo':
          this.showSidebarLogo = value
          break
        case 'showTagsView':
          this.showTagsView = value
          break
        case 'sidebarTextTheme':
          this.sidebarTextTheme = value
          break
        default:
          break
      }
    }
  },
  persist: piniaPersistConfig('settings')
})
export default useSettingsStore