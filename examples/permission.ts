import router from './router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/cookies'
import { ElMessage } from 'element-plus'
import { toRaw } from 'vue'

NProgress.configure({
  showSpinner: false
})

const whiteList = ['/login']
// console.log('permission', store)
// console.log('permission22', store.getters.permission_sysMenu.length)
router.beforeEach((to: any, from: any, next: Function) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.permission_sysMenu.length === 0) {
        // 路由信息是不是组装完
        store
          .dispatch('GetInfo')
          .then((res: any) => {
            console.log('user_info', res)
            // store.dispatch('permission/GetRouterPrefix').then(() => {
            store
              .dispatch('permission/generateRoutes')
              .then((accessRoutes: any) => {
                // console.log(123, accessRoutes)
                accessRoutes.forEach((rout: any) => {
                  router.addRoute(rout) // 动态添加可访问路由表
                })
                console.log('我看看路由表', accessRoutes)
                next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
              })
          })
          // })
          .catch(err => {
            store.dispatch('FedLogOut').then(() => {
              ElMessage.error(err.message || err.msg || '出现错误，请稍后再试')
              next({ path: '/' })
            })
          })
      } else {
        // 进入页面前设置菜单
        //如果是微应用则延迟渲染避免与主应用拦截器冲突
        if (!window.__POWERED_BY_QIANKUN__) {
          // 子应用单独运行，直接进入该系统
          const add_routes = toRaw(store.getters.permission_sysMenu)
          console.log('permission', to)
          if (to.path === '/index') {
            let lastChild =
              add_routes[0]?.children?.length > 0
                ? add_routes[0].children[0]
                : add_routes[0]
            if (to.path === lastChild.path) return false
            next(lastChild)
            NProgress.done()
          } else {
            console.log('子项目的next')
            next()
          }
        } else {
          console.log('主应用进入')
          next()
        }
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

router.afterEach((to: any) => {
  if (!to.meta?.noCache) {
    // 新增缓存tag
    store.dispatch('tagViews/addView', to)
  }
  NProgress.done()
})
