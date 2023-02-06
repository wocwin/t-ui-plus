import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/cookies'
import { ElMessage } from 'element-plus'
// import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import useUserStore from '@/store/modules/user'
import usePermissionStore from '@/store/modules/permission'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach((to: any, from: any, next: Function) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (usePermissionStore().sysMenu.length === 0) {
        // 路由信息是不是组装完
        useUserStore().GetInfo()
        usePermissionStore().generateRoutes()
          .then((accessRoutes: any) => {
            // console.log('全局路由守卫', accessRoutes)
            accessRoutes.forEach((rout: any) => {
              router.addRoute(rout) // 动态添加可访问路由表
            })
            // console.log('我看看路由表', accessRoutes)
            next({ ...to, replace: true })
          })
          .catch((err: { message: any; msg: any }) => {
              useUserStore().FedLogOut()
              ElMessage.error(err.message || err.msg || '出现错误，请稍后再试')
              next({ path: '/' })
          })
      } else {
        // 进入页面前设置菜单
        // if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
        //   // 子应用单独运行，直接进入该系统
        //   // const add_routes = toRaw(usePermissionStore().sysMenu)
        //   const add_routes = toRaw(usePermissionStore().sysMenu)
        //   if (to.path === '/index') {
        //     let lastChild =
        //       add_routes[0]?.children?.length > 0
        //         ? add_routes[0].children[0]
        //         : add_routes[0]
        //     if (to.path === lastChild.path) return false
        //     next(lastChild)
        //     NProgress.done()
        //   } else {
        //     console.log('子项目的next')
        //     next()
        //   }
        // } else {
          console.log('主应用进入')
          next()
        // }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
