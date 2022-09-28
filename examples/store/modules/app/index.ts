import { Module, MutationTree, ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import {
  getSidebarStatus,
  getSize,
  setSidebarStatus,
  setSize
} from '@/utils/cookies'
import { AppState, DeviceType } from './types'

export const state: AppState = {
  device: DeviceType.Desktop,
  sidebar: {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  },
  // language: getLocale(),
  size: getSize() || 'medium'
}
export const mutations: MutationTree<AppState> = {
  TOGGLE_SIDEBAR: (state: AppState, withoutAnimation: boolean) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = withoutAnimation
    if (state.sidebar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  },
  CLOSE_SIDEBAR: (state: AppState, withoutAnimation: boolean) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus('closed')
  },
  TOGGLE_DEVICE: (state: AppState, device: DeviceType) => {
    state.device = device
  },
  SET_SIZE: (state: AppState, size: string) => {
    state.size = size
    setSize(state.size)
  }
}
export const actions: ActionTree<AppState, RootState> = {
  toggleSideBar({ commit }, withoutAnimation) {
    commit('TOGGLE_SIDEBAR', withoutAnimation)
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export const app: Module<AppState, RootState> = {
  // namespaced: true,
  state,
  actions,
  mutations
}
