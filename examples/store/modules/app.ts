import { getSidebarStatus, getSize, setSidebarStatus, setSize } from '@/utils/cookies'
import { defineStore } from 'pinia'
// import piniaPersistConfig from '../piniaPersist'
const useAppStore = defineStore('app',
  {
    state: () => ({
      sidebar: {
        opened: getSidebarStatus() !== 'closed',
        withoutAnimation: false,
        hide: false
      },
      device: 'desktop',
      size: getSize() || 'default'
    }),
    actions: {
      toggleSideBar(withoutAnimation: any) {
        // if (this.sidebar.hide) {
        //   return false;
        // }
        // this.sidebar.opened = !this.sidebar.opened
        // this.sidebar.withoutAnimation = withoutAnimation
        // if (this.sidebar.opened) {
        //   setSidebarStatus('opened')
        // } else {
        //   setSidebarStatus('closed')
        // }
        this.sidebar.opened = !this.sidebar.opened
        console.log(111, this.sidebar.opened)
        this.sidebar.withoutAnimation = withoutAnimation
        if (this.sidebar.opened) {
          setSidebarStatus('opened')
        } else {
          setSidebarStatus('closed')
        }
      },
      closeSideBar(withoutAnimation: any) {
        setSidebarStatus('closed')
        this.sidebar.opened = false
        this.sidebar.withoutAnimation = withoutAnimation
      },
      toggleDevice(device: string) {
        this.device = device
      },
      setSize(size: any) {
        this.size = size;
        setSize(size)
      },
      toggleSideBarHide(status: boolean) {
        this.sidebar.hide = status
      }
    },
    // persist: piniaPersistConfig('app')
  })

export default useAppStore