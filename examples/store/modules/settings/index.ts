import { Module, MutationTree, ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import { SettingsState } from './types'

export const state: SettingsState = {
  theme: '#355db4',
  showSettings: false,
  showTagsView: true,
  fixedHeader: false,
  showSidebarLogo: true,
  sidebarTextTheme: true
}
export const mutations: MutationTree<SettingsState> = {
  CHANGE_SETTING: (
    state: SettingsState,
    payload: { key: string; value: any }
  ) => {
    const { key, value } = payload
    switch (key) {
      case 'theme':
        state.theme = value
        break
      case 'fixedHeader':
        state.fixedHeader = value
        break
      case 'showSettings':
        state.showSettings = value
        break
      case 'showSidebarLogo':
        state.showSidebarLogo = value
        break
      case 'showTagsView':
        state.showTagsView = value
        break
      case 'sidebarTextTheme':
        state.sidebarTextTheme = value
        break
      default:
        break
    }
  }
}
export const actions: ActionTree<SettingsState, RootState> = {
  getChangeSetting({ commit }, payload: { key: string; value: any }) {
    commit('CHANGE_SETTING', payload)
  }
}

export const settings: Module<SettingsState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
}
