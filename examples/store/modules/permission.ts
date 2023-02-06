// import piniaPersistConfig from '../piniaPersist'
import { removeToken } from '@/utils/cookies'
// import { getRouters, getRouterPrefix } from '@/api/menu'
import { constantRoutes } from '@/router'
import Message from '@/utils/message'
import Blank from '@/components/Blank.vue'
import Layout from '@/layout/index.vue'
import menuData from './getData/menu.json'
// 匹配views里面所有的.vue文件
const modules = import.meta.glob('../../views/**/*.vue')

const usePermissionStore = defineStore('permission',{
  state: () => {
    return {
      routes: [] as any[],
      addRoutes: [] as any[],
      sysMenu: [] as any[],
      parentPath: '/pms2'
    }
  },
  actions: {
    // 获取子应用父级path
    // GetRouterPrefix() {
    //   return new Promise(async resolve => {
    //     let res = await getRouterPrefix()
    //     this.parentPath = res.data
    //     resolve(res.data)
    //   })
    // },
    // 获取路由数据
    generateRoutes() {
      // return new Promise(async resolve => {
      return new Promise( resolve => {
        // let res = await getRouterPrefix()
        // if (res.success) {
          // this.parentPath = res.data
          // resolve(res.data)
          // 向后端请求路由数据
          // let routerRes = await getRouters()
          let routerRes = menuData
          // console.log('获取路由', routerRes)
          rebuildRouter(routerRes?.data)
          let newRouter =
            routerRes?.data && filterAsyncRouter(routerRes?.data[0].children, 1, this)
          // console.log('generateRoutes', newRouter)
          if (routerRes.data == null || newRouter.length === 0) {
            Message({
              message: '您没有该系统的访问权限，请联系管理员',
              type: 'warning',
              duration: 5 * 1000
            })
            removeToken()
          }
          this.sysMenu = newRouter
          this.addRoutes = newRouter
          this.routes = constantRoutes.concat(newRouter)
          resolve(newRouter)
        // }
      })
    }
  },
  // persist: piniaPersistConfig('permission')
})
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
function filterAsyncRouter(asyncRouterMap: any[], hier: number, _that: any) {
  if (!asyncRouterMap) return []
  return asyncRouterMap.reduce((acc, route, index) => {
    // console.log(123, route)
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
    if (route.menuType === 'M') {
      if (hier === 1) {
        route.component = 'Layout'
      } else {
        route.component = 'Blank'
      }
      if (route.component == 'Layout') {
        route.component = Layout
      } else if (route.component == 'Blank') {
        route.component = Blank
      }
    } else {
      // console.log(7111, route.component)
      // route.component = loadView(route.component)
      route.component = loadView(route.component)
      // let appList = sessionStorage.getItem('appList')
      // if (appList) {
      //   let apps = JSON.parse(appList)
      //   for (let i = 0; i < apps.length; i++) {
      //     if (route.path.indexOf(apps[i].activeRule) > -1)
      //       route.component = Blank
      //   }
      // }
    }
    // 如果有子路由，递归添加
    if (route.children && route.children.length > 0) {
      route.children = filterAsyncRouter(route.children, hier + 1, _that)
    }
    // console.log(777, route.component)
    acc.push({
      name: name,
      hidden: route.hidden,
      path: _that.parentPath + route.path || '',
      children:
        route.children && route.children.length > 0 ? route.children : null,
      meta: {
        title: route.meta.title,
        icon: route.meta.icon,
        visible: route.visible
      },
      component: route.component
    })
    return acc
  }, [])
}
export const loadView = (view: string) => {
  let res
  for (const path in modules) {
    // const dir = path.split('views/')[1].split('.vue')[0]
    const dir = path.split('views/')[1]
    // console.log('loadView11', dir)
    if (dir === view) {
      res = () => modules[path]()
    }
  }
  // console.log('loadView', res)
  return res
}


export default usePermissionStore
