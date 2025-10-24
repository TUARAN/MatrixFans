<script setup lang="ts">
import { useFansStore } from '@/stores/fans'
import { computed, ref, watch, onMounted } from 'vue'
import { Users, Eye, Sparkles, Zap, BarChart3, Settings, Home, Globe, TrendingUp, Megaphone, Target } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'

const fansStore = useFansStore()
const router = useRouter()
const route = useRoute()

// 从store获取数据
const activeAccount = computed(() => fansStore.currentSelectedAccount)
const globalStats = computed(() => fansStore.globalStats)

// 导航菜单
const navigationItems = [
  { name: '数据总览', path: '/', icon: Home },
  { name: '矩阵策略', path: '/strategy', icon: Target },
  { name: '流量转化', path: '/conversion', icon: TrendingUp },
  { name: 'B端推广', path: '/promotion', icon: Megaphone },
  { name: '账号管理', path: '/accounts', icon: Settings },
  { name: '平台配置', path: '/platforms', icon: Globe }
]

// 移动端菜单状态
const showMobileMenu = ref(false)

// 导航方法
const navigateTo = (path: string) => {
  router.push(path)
  showMobileMenu.value = false
}

// 切换移动端菜单
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

// 获取各账号统计数据
const anthonyStats = computed(() => fansStore.getAccountStats('anthony'))
const anthony404Stats = computed(() => fansStore.getAccountStats('anthony404'))
const frontendWeeklyStats = computed(() => fansStore.getAccountStats('frontend-weekly'))
const aifsStats = computed(() => fansStore.getAccountStats('code-ai-frosen'))
const thirtyStats = computed(() => fansStore.getAccountStats('thirty-cube'))

// 账号切换方法
const switchAccount = (accountName: string) => {
  fansStore.switchSelectedAccount(accountName)
}

// 格式化数字
const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toLocaleString()
}

// 数字从0到目标值的动画
const animatedFans = ref(0)
const animatedReads = ref(0)
const animatedLikes = ref(0)
const animatedFansDisplay = computed(() => formatNumber(animatedFans.value))
const animatedReadsDisplay = computed(() => formatNumber(animatedReads.value))
const animatedLikesDisplay = computed(() => formatNumber(animatedLikes.value))

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

function animateTo(target: number, outRef: { value: number }, duration = 1200) {
  const start = 0
  const startTime = performance.now()
  function tick(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(1, elapsed / duration)
    const eased = easeOutCubic(progress)
    outRef.value = Math.round(start + (target - start) * eased)
    if (progress < 1) requestAnimationFrame(tick)
  }
  outRef.value = 0
  requestAnimationFrame(tick)
}

onMounted(() => {
  animateTo(globalStats.value.totalFans, animatedFans)
  animateTo(globalStats.value.totalReads, animatedReads)
  animateTo(globalStats.value.totalLikes, animatedLikes)
})

watch(globalStats, (val) => {
  animateTo(val.totalFans, animatedFans)
  animateTo(val.totalReads, animatedReads)
  animateTo(val.totalLikes, animatedLikes)
})
</script>

<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- 导航栏 -->
    <nav class="bg-white/90 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-40">
      <div class="max-w-6xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-lg">🚀</span>
            </div>
            <span class="text-xl font-bold text-gray-800">矩阵号联盟</span>
          </div>
          
          <!-- 导航菜单 -->
          <div class="hidden md:flex items-center space-x-1">
            <button 
              v-for="item in navigationItems" 
              :key="item.path"
              @click="navigateTo(item.path)"
              :class="`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                route.path === item.path 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`"
            >
              <component :is="item.icon" class="w-4 h-4" />
              <span class="text-sm font-medium">{{ item.name }}</span>
            </button>
          </div>
          
          <!-- 移动端菜单按钮 -->
          <div class="md:hidden">
            <button 
              @click="toggleMobileMenu"
              class="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 移动端菜单 -->
    <div 
      v-if="showMobileMenu" 
      class="md:hidden bg-white border-b border-gray-200 shadow-lg"
    >
      <div class="px-4 py-2 space-y-1">
        <button 
          v-for="item in navigationItems" 
          :key="item.path"
          @click="navigateTo(item.path)"
          :class="`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            route.path === item.path 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
          }`"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span class="font-medium">{{ item.name }}</span>
        </button>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="min-h-screen">
        <!-- 极简Banner区域 -->
        <div class="relative overflow-hidden">
          <div class="relative z-10 max-w-6xl mx-auto px-6 py-8">
            <!-- 主标题 -->
            <div class="text-center space-y-3 mb-8">
              <div class="flex items-center justify-center space-x-3 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span class="text-2xl">🚀</span>
                </div>
                <h1 class="text-4xl font-bold text-gray-800">
                  矩阵号联盟
                </h1>
                <!-- 致创作者的信 -->
                <button 
                  @click="navigateTo('/letter')"
                  class="group relative ml-4"
                >
                  <div class="animate-bounce">
                    <div class="w-12 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg shadow-lg transform rotate-12 group-hover:rotate-6 transition-all duration-300 flex items-center justify-center">
                      <span class="text-xl text-white">✉️</span>
                    </div>
                  </div>
                  <div class="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                    <span class="text-xs">📬</span>
                  </div>
                  <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 font-medium">
                    致普通创作者的信
                  </div>
                </button>
              </div>
              <p class="text-lg text-gray-600">多账号矩阵涨粉数据管理平台</p>
              <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span class="flex items-center space-x-1">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>实时数据</span>
                </span>
                <span class="flex items-center space-x-1">
                  <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>多平台支持</span>
                </span>
                <span class="flex items-center space-x-1">
                  <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>智能分析</span>
                </span>
              </div>
            </div>
            
            <!-- 主要统计卡片 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <!-- 全网粉丝量 -->
              <div class="bg-white rounded-2xl p-4 md:p-8 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-4xl font-bold text-blue-600 mb-2">
                      {{ animatedFansDisplay }}
                    </div>
                    <div class="text-gray-600 text-lg font-medium">全网粉丝量</div>
                  </div>
                  <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users class="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              <!-- 全网阅读量 -->
              <div class="bg-white rounded-2xl p-4 md:p-8 border border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-4xl font-bold text-indigo-600 mb-2">
                      {{ animatedReadsDisplay }}
                    </div>
                    <div class="text-gray-600 text-lg font-medium">全网阅读量</div>
                  </div>
                  <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Eye class="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              <!-- 全网点赞量 -->
              <div class="bg-white rounded-2xl p-4 md:p-8 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-4xl font-bold text-purple-600 mb-2">
                      {{ animatedLikesDisplay }}
                    </div>
                    <div class="text-gray-600 text-lg font-medium">全网点赞量</div>
                  </div>
                  <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles class="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- 路由视图 -->
        <router-view />
    </div>
  </div>
</template>

<style scoped>
/* 极简滚动条 */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: #3b82f6;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2563eb;
}
</style>