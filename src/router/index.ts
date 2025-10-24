import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '首页',
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: '/dashboard',
      redirect: '/'
    },
    {
      path: '/accounts',
      name: '账号管理',
      component: () => import('@/components/AccountManager.vue')
    },
    {
      path: '/platforms',
      name: '平台配置',
      component: () => import('@/components/PlatformConfig.vue')
    },
    {
      path: '/plan/:platform/:account',
      name: '平台计划',
      component: () => import('@/views/PlatformPlanView.vue')
    }
  ],
})

export default router
