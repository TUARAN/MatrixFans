import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '首页',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      redirect: '/'
    },
    {
      path: '/accounts',
      name: '账号管理',
      component: () => import('@/components/AccountManager.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/platforms',
      name: '平台配置',
      component: () => import('@/components/PlatformConfig.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/plan/:platform/:account',
      name: '平台计划',
      component: () => import('@/views/PlatformPlanView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/conversion',
      name: '流量转化',
      component: () => import('@/views/TrafficConversionView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/promotion',
      name: 'B端推广',
      component: () => import('@/views/B2BPromotionView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/strategy',
      name: '矩阵策略',
      component: () => import('@/views/MatrixStrategyView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/letter',
      name: '致创作者的信',
      component: () => import('@/views/LetterView.vue'),
      meta: { requiresAuth: false }
    }
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // 如果路由需要登录，检查登录状态
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // 未登录，重定向到首页并提示需要登录
    next('/')
  } else {
    next()
  }
})

export default router
