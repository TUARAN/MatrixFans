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
    },
    {
      path: '/conversion',
      name: '流量转化',
      component: () => import('@/views/TrafficConversionView.vue')
    },
    {
      path: '/promotion',
      name: 'B端推广',
      component: () => import('@/views/B2BPromotionView.vue')
    },
    {
      path: '/strategy',
      name: '矩阵策略',
      component: () => import('@/views/MatrixStrategyView.vue')
    },
    {
      path: '/letter',
      name: '致创作者的信',
      component: () => import('@/views/LetterView.vue')
    }
  ],
})

export default router
