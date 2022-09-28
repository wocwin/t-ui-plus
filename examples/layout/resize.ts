
import store from '@/store'
import { DeviceType } from '@/store/modules/app/types'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
// const store = useStore()
const WIDTH = 992 // refer to Bootstrap's responsive design

export default function() {
  const device = computed(() => {
    return store.state.app.device
  })

  const sidebar = computed(() => {
    return store.state.app.sidebar
  })

  const currentRoute = useRoute()
  const watchRouter = watch(() => currentRoute.name, () => {
    if (store.state.app.device === DeviceType.Mobile && store.state.app.sidebar.opened) {
      store.dispatch('closeSideBar', false)
    }
  })

  const isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const resizeMounted = () => {
    if (isMobile()) {
      store.dispatch('toggleDevice', DeviceType.Mobile)
      store.dispatch('closeSideBar', true)
    }
  }

  const resizeHandler = () => {
    if (!document.hidden) {
      store.dispatch('toggleDevice', isMobile() ? DeviceType.Mobile : DeviceType.Desktop)
      if (isMobile()) {
        store.dispatch('closeSideBar', true)
      }
    }
  }
  const addEventListenerOnResize = () => {
    window.addEventListener('resize', resizeHandler)
  }

  const removeEventListenerResize = () => {
    window.removeEventListener('resize', resizeHandler)
  }

  return {
    device,
    sidebar,
    resizeMounted,
    addEventListenerOnResize,
    removeEventListenerResize,
    watchRouter
  }
}
