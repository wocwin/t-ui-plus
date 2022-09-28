import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
// import Blank from '@/components/RouterView/index.vue'
import login from '@/views/login.vue'
import redirect from '@/views/redirect.vue'

export const constantRoutes: any = window.__POWERED_BY_QIANKUN__
  ? [
      {
        path: '/login',
        name: 'login',
        component: login,
        hidden: true,
        meta: {
          rootPage: true,
          noCache: true
        }
      },
      {
        path: '/redirect',
        name: 'redirect',
        component: Layout,
        hidden: true,
        children: [
          {
            path: ':path(.*)',
            name: 'redirectPage',
            component: redirect,
            meta: {
              noCache: true
            }
          }
        ]
      },
      {
        path: '',
        component: Layout,
        redirect: 'index',
        hidden: true,
        children: [
          {
            path: '/index',
            component: () => import('@/views/index.vue'),
            name: 'index',
            hidden: true,
            meta: { title: '首页', icon: 'monitor', noCache: true, affix: true }
          }
        ]
      }
    ]
  : [
      {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
          {
            path: '/redirect/:path(.*)',
            component: redirect
          }
        ]
      },
      {
        path: '/login',
        component: login,
        hidden: true,
        meta: {
          noCache: true
        }
      },
      {
        path: '/404',
        component: () => import('@/views/error/404.vue'),
        hidden: true
      },
      {
        path: '/401',
        component: () => import('@/views/error/401.vue'),
        hidden: true
      },
      {
        path: '',
        component: Layout,
        redirect: '/table',
        hidden: true,
        children: [
          {
            path: '/index',
            component: () => import('@/views/index.vue'),
            name: 'index',
            hidden: true,
            meta: { title: '首页', icon: 'monitor', noCache: true, affix: true }
          }
        ]
      },
      {
        path: '/demo',
        component: Layout,
        redirect: '/table',
        name: 'demo页面',
        meta: {
          title: 'demo页面',
          icon: 'monitor'
        },
        children: [
          {
            path: '/table',
            name: '基本测试',
            component: () => import('@/views/vue3Demo/test/table/index.vue'),
            meta: { title: '基本测试' }
          },
          {
            path: '/test1',
            name: 'test1页面',
            component: () => import('@/views/vue3Demo/test/test1/index.vue'),
            meta: { title: 'test1页面' }
          },
          {
            path: '/query',
            name: 'query页面',
            component: () => import('@/views/vue3Demo/test/query/index.vue'),
            meta: { title: 'query页面' }
          }
        ]
      },
      {
        path: '/t-menu',
        name: 'menu页面',
        component: Layout,
        meta: { title: 'menu页面', icon: 'monitor' },
        children: [
          {
            path: '/menu1',
            name: 'menu1页面',
            component: () => import('@/views/vue3Demo/menu/menu1/index.vue'),
            meta: { title: 'menu1页面' }
          },
          {
            path: '/menu2',
            name: 'menu2页面',
            component: () => import('@/views/vue3Demo/menu/menu2/index.vue'),
            meta: { title: 'menu2页面' }
          }
        ]
      }
    ]

const router = createRouter({
  history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/' : '/webdemo'),
  routes: constantRoutes
})
export default router
