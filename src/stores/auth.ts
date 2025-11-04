import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // 登录状态
  const isLoggedIn = ref<boolean>(false)
  const user = ref<{ username: string; email?: string } | null>(null)

  // 从本地存储恢复登录状态
  const initAuth = () => {
    const savedAuth = localStorage.getItem('tuaran-kols-auth')
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth)
        isLoggedIn.value = authData.isLoggedIn || false
        user.value = authData.user || null
      } catch (e) {
        console.error('Failed to parse auth data', e)
      }
    }
  }

  // 登录方法（简单验证，实际应该调用后端API）
  const login = (username: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // 简单的验证逻辑，实际应该调用后端
      // 这里暂时允许任何用户名和密码登录（演示用）
      setTimeout(() => {
        if (username && password) {
          isLoggedIn.value = true
          user.value = { username }
          
          // 保存到本地存储
          localStorage.setItem('tuaran-kols-auth', JSON.stringify({
            isLoggedIn: true,
            user: { username }
          }))
          
          resolve(true)
        } else {
          resolve(false)
        }
      }, 500) // 模拟网络延迟
    })
  }

  // 登出方法
  const logout = () => {
    isLoggedIn.value = false
    user.value = null
    localStorage.removeItem('tuaran-kols-auth')
  }

  // 计算属性
  const isAuthenticated = computed(() => isLoggedIn.value)

  // 初始化
  initAuth()

  return {
    isLoggedIn,
    user,
    isAuthenticated,
    login,
    logout,
    initAuth
  }
})

