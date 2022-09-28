import { Module, MutationTree } from 'vuex'
import store from '@/store'
import { RootState } from '@/store/types'
import { constantRoutes } from '@/router'
import { PermissionState } from './types'
import { removeToken } from '@/utils/cookies'
import { getRouters, getRouterPrefix } from '@/api/menu'
import Message from '@/utils/message'
import RouterView from '@/components/RouterView/index.vue'
import Layout from '@/layout/index.vue'

export const state: PermissionState = {
  routes: [],
  addRoutes: [],
  sysMenu: [],
  parentPath: ''
}

export const mutations: MutationTree<PermissionState> = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_MENU: (state, sysMenu) => {
    state.sysMenu = sysMenu
  },
  SET_PARENT_PATH: (state, path) => {
    state.parentPath = path
  }
}

const actions = {
  // 获取子应用父级path
  GetRouterPrefix({ commit }: any) {
    return new Promise(async resolve => {
      let res = await getRouterPrefix()
      commit('SET_PARENT_PATH', res.data)
      resolve(res.data)
    })
  },
  generateRoutes({ commit }: any) {
    return new Promise(async resolve => {
      let res = await getRouterPrefix()
      if (res.success) {
        commit('SET_PARENT_PATH', res.data)
        // resolve(res.data)
        // 向后端请求路由数据
        let routerRes = await getRouters()
        rebuildRouter(routerRes?.data)
        let newRouter = filterAsyncRouter(routerRes?.data[0].children, 1)
        // console.log('generateRoutes', newRouter)
        if (routerRes.data == null || newRouter.length === 0) {
          Message({
            message: '您没有该系统的访问权限，请联系管理员',
            type: 'warning',
            duration: 5 * 1000
          })
          removeToken()
        }
        resolve(addRouter(commit, newRouter))
      }
    })
  }
}

function addRouter(commit, newRouter) {
  // console.log('addRouter', newRouter)
  commit('SET_MENU', newRouter)
  const accessedRoutes = newRouter
  commit('SET_ROUTES', accessedRoutes)
  return accessedRoutes
}
//处理路由格式
function rebuildRouter<T extends any[]>(router: T, path: string = '') {
  if (router?.length) {
    for (let i = 0; i < router.length; i++) {
      if (router[i].hasOwnProperty('path')) {
        let reset = router[i].path.replace(/(^\/|\/$)/g, '')
        router[i].path = path == '/' ? path + reset : path + '/' + reset
      }
      if (router[i].hasOwnProperty('children') && router[i].children) {
        rebuildRouter(router[i].children, router[i].path)
      }
    }
  }

  return router
}
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(
  asyncRouterMap: any[],
  hier: number
  // systemIndex?: number,
  // moduleIndex?: number
): any[] {
  if (!asyncRouterMap) return []
  return asyncRouterMap.reduce((acc, route, index) => {
    // 组织组件名称，用于缓存识别组件
    let name = 'no-name'
    if (route.path) {
      let pathNames = route.path.match(/\w+/g)
      if (pathNames) {
        if (pathNames[pathNames.length - 1] !== 'index') {
          name = pathNames[pathNames.length - 1].replace(
            /\w/,
            (str: string) => {
              return str.toUpperCase()
            }
          )
        } else {
          name = pathNames[pathNames.length - 2].replace(
            /\w/,
            (str: string) => {
              return str.toUpperCase()
            }
          )
        }
      }
    }
    // if (route.menuType === 'M') {
    //   // route.component =
    //   //   hier === 1 && route.component !== 'bigScreen' ? Layout : RouterView
    //   // if (route.children && route.children.length > 0) {
    //   //   route.children = filterAsyncRouter(
    //   //     route.children,
    //   //     hier + 1,
    //   //     hier === 1 ? index : systemIndex,
    //   //     hier === 2 ? index : moduleIndex
    //   //   )
    //   // }

    // } else {
    //   //如果是菜单,则匹配是否是微前端子应用激活路径,是的话则用RouterView代替避免报错
    //   route.component = loadView(route.component)
    //   let appList = sessionStorage.getItem('appList')
    //   if (appList) {
    //     let apps = JSON.parse(appList)
    //     for (let i = 0; i < apps.length; i++) {
    //       if (route.path.indexOf(apps[i].activeRule) > -1)
    //         route.component = RouterView
    //     }
    //   }
    //   if (route.children && route.children.length > 0) {
    //     // 菜单下隐藏子菜单
    //     const hideMenus = filterAsyncRouter(
    //       route.children,
    //       hier + 1,
    //       hier === 1 ? index : systemIndex,
    //       hier === 2 ? index : moduleIndex
    //     )
    //     hideMenus.forEach(menu => {
    //       menu.meta.activePath = route.path
    //     })
    //     acc = acc.concat(hideMenus)
    //   }
    // }
    if (route.menuType === 'M') {
      // console.log(33, route, hier)
      if (hier === 1) {
        route.component = 'Layout'
      } else {
        route.component = 'RouterView'
      }
      // route.component = hier === 1 ? Layout : RouterView
      // console.log(44, route, hier)
      // route.component = Layout
      if (route.component == 'Layout') {
        route.component = Layout
      } else if (route.component == 'RouterView') {
        route.component = RouterView
      }
    } else {
      // console.log(7111, route.component)
      route.component = loadView(route.component)
      let appList = sessionStorage.getItem('appList')
      if (appList) {
        let apps = JSON.parse(appList)
        for (let i = 0; i < apps.length; i++) {
          if (route.path.indexOf(apps[i].activeRule) > -1)
            route.component = RouterView
        }
      }
    }
    // if (route.component) {
    //   if (route.component == 'Layout') {
    //     route.component = Layout
    //   } else if (route.component == 'RouterView') {
    //     route.component = RouterView
    //   } else {
    //     route.component = loadView(route.component)
    //     let appList = sessionStorage.getItem('appList')
    //     if (appList) {
    //       let apps = JSON.parse(appList)
    //       for (let i = 0; i < apps.length; i++) {
    //         if (route.path.indexOf(apps[i].activeRule) > -1)
    //           route.component = RouterView
    //       }
    //     }
    //   }
    // }
    // 如果有子路由，递归添加
    if (route.children && route.children.length > 0) {
      route.children = filterAsyncRouter(route.children, hier + 1)
      // const hideMenus = filterAsyncRouter(route.children, hier + 1)
      // hideMenus.forEach(menu => {
      //   menu.meta.activePath = route.path
      // })
      // acc = acc.concat(hideMenus)
    }
    // console.log(111, route, store.getters.parentPath)
    acc.push({
      name: name,
      hidden: route.hidden,
      // path: route.path || "",
      path: store.getters.parentPath + route.path || '',
      children:
        route.children && route.children.length > 0 ? route.children : null,
      meta: {
        title: route.meta.title,
        icon: route.meta.icon,
        visible: route.visible
        // systemIndex: [
        //   hier === 1 ? index : systemIndex,
        //   hier === 2 ? index : moduleIndex
        // ]
      },
      component: route.component
    })
    // console.log(222, acc)
    return acc
  }, [])
}

export const loadView = (view: string) => {
  // console.log(333, view)
  // return (resolve: any) => require([`@/views/${view}`], resolve)
  return () => require.ensure([], require => require(`@/views/${view}`))
}

export const permission: Module<PermissionState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
}
