import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login.vue'
import Layout from '@/layout/index.vue'
export const constantRoutes: any = [
    {
      path: '/redirect',
      component: Layout,
      hidden: true,
      children: [
        {
          path: '/redirect/:path(.*)',
          component: () => import('@/views/redirect.vue')
        }
      ]
    },
    {
      path: '/login',
      component: Login,
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
      path: '/',
      component: Layout,
      redirect: 'index',
      hidden: true,
      children: [
        {
          path: '/index',
          component: () => import('@/views/index.vue'),
          name: 'index',
          // hidden: true,
          meta: { title: '首页', icon: 'monitor', noCache: true, affix: false }
        }
      ]
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes:constantRoutes
})

export default router