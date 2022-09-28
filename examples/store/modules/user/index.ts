import { UserState } from './types'
import { Module, MutationTree, ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import { login, logout, getInfo, getPermBtm } from '@/api/login'
import { removeToken, setToken, getToken } from '@/utils/cookies'
import { ElMessage } from 'element-plus'

export const state: UserState = {
  token: getToken() || '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  email: '',
  nickName: '',
  userId: null,
  dept: {},
  permissions: [],
  permBtn: [],
  permCode: []
}
export const mutations: MutationTree<UserState> = {
  SET_TOKEN: (state: UserState, token: string) => {
    state.token = token
  },
  SET_NAME: (state: UserState, name: string) => {
    state.name = name
  },
  SET_AVATAR: (state: UserState, avatar: string) => {
    state.avatar = avatar
  },
  SET_INTRODUCTION: (state: UserState, introduction: string) => {
    state.introduction = introduction
  },
  SET_ROLES: (state: UserState, roles: string[]) => {
    state.roles = roles
  },
  SET_EMAIL: (state: UserState, email: string) => {
    state.email = email
  },
  SET_PERMISSION: (state: UserState, permissions: string[]) => {
    state.permissions = permissions
  },
  SET_NICK_NAME: (state: UserState, nickName: string) => {
    state.nickName = nickName
  },
  SET_USER_ID: (state: UserState, userId: any) => {
    state.userId = userId
  },
  SET_DEPT: (state: UserState, dept: any) => {
    state.dept = dept
  },
  SET_PERM_BTN: (state: UserState, permBtn: any) => {
    state.permBtn = permBtn
  },
  SET_PERM_CODE: (state: UserState, permCode: any) => {
    state.permCode = permCode
  }
}

export const actions: ActionTree<UserState, RootState> = {
  Login({ commit }: any, userInfo: any) {
    return new Promise((resolve: any, reject: any) => {
      login(userInfo)
        .then((res: any) => {
          if (res.success) {
            setToken(res.data)
            commit('SET_TOKEN', res.data)
          } else {
            ElMessage.error(res?.msg)
          }
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  GetInfo({ commit, state }: any) {
    if (state.token === '') {
      throw Error('token is undefined!')
    }
    getInfo().then(async (res: any) => {
      if (res?.success) {
        const user = res.data
        const avatar =
          user.avatar == ''
            ? require('@/assets/images/profile.jpg')
            : process.env.VUE_APP_BASE_API + user.avatar
        if (user.roles && user.roles.length > 0) {
          // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', user.roles)
        } else {
          commit('SET_ROLES', ['ROLE_DEFAULT'])
        }
        commit('SET_NAME', user.userName)
        commit('SET_AVATAR', avatar)
        commit('SET_NICK_NAME', user.nickName)
        commit('SET_USER_ID', user.userId)
        commit('SET_DEPT', user.dept)
        //获取按钮权限
        await getPermBtm().then((btmRes: any) => {
          console.log('获取的按钮权限', btmRes)
          if (btmRes?.success && btmRes.data.length > 0) {
            const permBtn = btmRes.data.map(item => item.menuId)
            const permCode = btmRes.data.map(item => item.perms || null)
            commit('SET_PERM_BTN', permBtn)
            commit('SET_PERM_CODE', permCode)
            commit('SET_PERMISSION', permCode)
          }
        })
        return res
      } else {
        throw Error('Verification failed, please Login again.')
      }
    })
  },
  // 退出系统
  LogOut({ commit }: any) {
    return new Promise((resolve: any, reject: any) => {
      logout()
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSION', [])
          removeToken()
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 前端退出
  FedLogOut({ commit }: any) {
    removeToken()
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    commit('SET_PERMISSION', [])
  }
}

export const user: Module<UserState, RootState> = {
  // namespaced: true,
  state,
  actions,
  mutations
}
