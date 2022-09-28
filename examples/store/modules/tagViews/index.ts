import { Module, MutationTree, ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import { TagsViewState, TagView } from './types'

export const state: TagsViewState = {
  visitedViews: [],
  cachedViews: []
}
export const mutations: MutationTree<TagsViewState> = {
  ADD_VISITED_VIEW: (state: TagsViewState, view: TagView) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta?.title || 'no-name'
      })
    )
  },
  ADD_CACHED_VIEW: (state: TagsViewState, view: TagView) => {
    if (view.name === null) return
    if (state.cachedViews.includes(view.name?.toString())) return
    if (!view.meta?.noCache) {
      state.cachedViews.push(view.name?.toString())
    }
  },
  DEL_VISITED_VIEW: (state: TagsViewState, view: TagView) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW: (state: TagsViewState, view: TagView) => {
    if (view.name === null) return
    const index = state.cachedViews.indexOf(view.name?.toString())
    index > -1 && state.cachedViews.splice(index, 1)
  },
  DEL_OTHERS_VISITED_VIEWS: (state: TagsViewState, view: TagView) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta?.affix || v.path === view.path
    })
  },
  DEL_OTHERS_CACHED_VIEWS: (state: TagsViewState, view: TagView) => {
    if (view.name === null) return
    const index = state.cachedViews.indexOf(view.name?.toString())
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },
  DEL_ALL_VISITED_VIEWS: (state: TagsViewState) => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta?.affix)
    state.visitedViews = affixTags
  },
  DEL_ALL_CACHED_VIEWS: (state: TagsViewState) => {
    state.cachedViews = []
  },
  UPDATE_VISITED_VIEW: (state: TagsViewState, view: TagView) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}
export const actions: ActionTree<TagsViewState, RootState> = {
  addView({ dispatch, state }: any, view: TagView) {
    // commit('ADD_VISITED_VIEW', view)
    // commit('ADD_CACHED_VIEW', view)
    if (!state.noCache) {
      dispatch('addVisitedView', view)
      dispatch('addCachedView', view)
    }
  },
  addVisitedView({ commit }: any, view: TagView) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }: any, view: TagView) {
    commit('ADD_CACHED_VIEW', view)
  },
  delView({ dispatch, state }: any, view: TagView) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView({ commit, state }: any, view: TagView) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({ commit, state }: any, view: TagView) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },
  delOthersViews({ dispatch, state }: any, view: TagView) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews({ commit, state }: any, view: TagView) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews({ commit, state }: any, view: TagView) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },
  delAllViews({ dispatch, state }: any, view: TagView) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews({ commit, state }: any) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews({ commit, state }: any) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },
  updateVisitedView({ commit }: any, view: TagView) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export const tagViews: Module<TagsViewState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
}
