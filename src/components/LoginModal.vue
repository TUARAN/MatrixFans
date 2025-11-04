<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { X } from 'lucide-vue-next'

const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const emit = defineEmits<{
  close: []
  success: []
}>()

const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = '请输入用户名和密码'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const success = await authStore.login(username.value, password.value)
    if (success) {
      emit('success')
      emit('close')
    } else {
      errorMessage.value = '登录失败，请检查用户名和密码'
    }
  } catch (error) {
    errorMessage.value = '登录出错，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

const handleClose = () => {
  username.value = ''
  password.value = ''
  errorMessage.value = ''
  emit('close')
}

// 回车键登录
const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleLogin()
  }
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click="handleClose">
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4" @click.stop>
      <!-- 弹窗头部 -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-2xl">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold">登录 TUARAN-KOLs</h2>
            <p class="text-blue-100 text-sm mt-1">登录后查看核心数据和管理功能</p>
          </div>
          <button 
            @click="handleClose"
            class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- 登录表单 -->
      <div class="p-6">
        <div class="space-y-4">
          <!-- 用户名 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              用户名
            </label>
            <input
              v-model="username"
              type="text"
              placeholder="请输入用户名"
              @keypress="handleKeyPress"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              :disabled="isLoading"
            />
          </div>

          <!-- 密码 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              密码
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="请输入密码"
              @keypress="handleKeyPress"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              :disabled="isLoading"
            />
          </div>

          <!-- 错误提示 -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ errorMessage }}
          </div>

          <!-- 登录按钮 -->
          <button
            @click="handleLogin"
            :disabled="isLoading || !username || !password"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            <span v-if="!isLoading">登录</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              登录中...
            </span>
          </button>

          <!-- 提示信息 -->
          <div class="text-center text-sm text-gray-500 pt-2">
            <p>演示版本：输入任意用户名和密码即可登录</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

