<script setup lang="ts">
import { useFansStore } from '@/stores/fans'
import { useAuthStore } from '@/stores/auth'
import { computed, ref, watch, onMounted } from 'vue'
import { Users, Eye, Sparkles, Zap, BarChart3, Settings, Home, Globe, TrendingUp, Megaphone, Target, LogIn, LogOut, User } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'
import LoginModal from '@/components/LoginModal.vue'

const fansStore = useFansStore()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// 从store获取数据
const activeAccount = computed(() => fansStore.currentSelectedAccount)
const globalStats = computed(() => fansStore.globalStats)

// 导航菜单配置（数据总览不显示在导航菜单中，只通过Logo点击访问）
const allNavigationItems = [
  { name: '矩阵策略', path: '/strategy', icon: Target, requiresAuth: true },
  { name: '流量转化', path: '/conversion', icon: TrendingUp, requiresAuth: true },
  { name: 'B端推广', path: '/promotion', icon: Megaphone, requiresAuth: true },
  { name: '账号管理', path: '/accounts', icon: Settings, requiresAuth: true },
  { name: '平台配置', path: '/platforms', icon: Globe, requiresAuth: true }
]

// 根据登录状态过滤导航菜单
const navigationItems = computed(() => {
  if (authStore.isAuthenticated) {
    return allNavigationItems
  }
  // 未登录时不显示需要登录的菜单项
  return []
})

// 移动端菜单状态
const showMobileMenu = ref(false)

// 信件弹窗状态
const showLetterModal = ref(false)

// 登录弹窗状态
const showLoginModal = ref(false)

// 导航方法
const navigateTo = (path: string) => {
  router.push(path)
  showMobileMenu.value = false
}

// 切换移动端菜单
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

// 登录成功回调
const handleLoginSuccess = () => {
  showLoginModal.value = false
}

// 退出登录
const handleLogout = () => {
  authStore.logout()
  if (route.meta.requiresAuth) {
    router.push('/')
  }
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

// 生成粒子样式
const getParticleStyle = (index: number) => {
  const size = Math.random() * 4 + 2 // 2-6px
  const left = Math.random() * 100 // 0-100%
  const animationDelay = Math.random() * 3 // 0-3s
  const animationDuration = Math.random() * 3 + 4 // 4-7s
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDelay: `${animationDelay}s`,
    animationDuration: `${animationDuration}s`
  }
}
</script>

<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- 导航栏 -->
    <nav class="bg-white/90 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-40">
      <div class="max-w-6xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <button 
            @click="navigateTo('/')"
            class="flex items-center space-x-4 hover:opacity-80 transition-opacity"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <span class="text-3xl animate-pulse">🚀</span>
            </div>
            <div class="flex flex-col">
              <span class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                TUARAN-KOLs
              </span>
              <span class="text-xs text-gray-500 font-medium tracking-wider">MATRIX ALLIANCE</span>
            </div>
          </button>
          
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
            
            <!-- 登录/用户信息 -->
            <div class="ml-2 flex items-center">
              <div v-if="authStore.isAuthenticated" class="flex items-center space-x-2">
                <div class="flex items-center space-x-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg">
                  <User class="w-4 h-4" />
                  <span class="text-sm font-medium">{{ authStore.user?.username }}</span>
                </div>
                <button
                  @click="handleLogout"
                  class="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  title="退出登录"
                >
                  <LogOut class="w-4 h-4" />
                </button>
              </div>
              <button
                v-else
                @click="showLoginModal = true"
                class="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <LogIn class="w-4 h-4" />
                <span class="text-sm font-medium">登录</span>
              </button>
            </div>
          </div>
          
          <!-- 移动端菜单按钮和登录按钮 -->
          <div class="md:hidden flex items-center space-x-2">
            <button
              v-if="!authStore.isAuthenticated"
              @click="showLoginModal = true"
              class="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md"
            >
              <LogIn class="w-5 h-5" />
            </button>
            <div v-else class="flex items-center space-x-1">
              <div class="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                {{ authStore.user?.username }}
              </div>
              <button
                @click="handleLogout"
                class="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                title="退出登录"
              >
                <LogOut class="w-5 h-5" />
              </button>
            </div>
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
        <!-- 极简Banner区域 - 只在数据总览页面显示 -->
        <div v-if="route.path === '/'" class="relative overflow-hidden">
          <!-- 粒子背景动效 -->
          <div class="absolute inset-0 z-0">
            <div class="particles-container">
              <div v-for="i in 20" :key="i" class="particle" :style="getParticleStyle(i)"></div>
            </div>
          </div>
          <div class="relative z-10 max-w-6xl mx-auto px-6 py-8">
            <!-- 主标题 -->
            <div class="space-y-3 mb-8">
              <div class="flex items-center justify-center space-x-3 mb-4">
                <!-- 致创作者的信 -->
                <div class="flex items-center space-x-3">
                  <button 
                    @click="showLetterModal = true"
                    class="group relative"
                  >
                    <div class="animate-bounce">
                      <div class="w-12 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg shadow-lg transform rotate-12 group-hover:rotate-6 transition-all duration-300 flex items-center justify-center">
                        <span class="text-xl text-white">✉️</span>
                      </div>
                    </div>
                    <div class="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                      <span class="text-xs">📬</span>
                    </div>
                  </button>
                  <button 
                    @click="showLetterModal = true"
                    class="text-sm text-gray-600 font-medium whitespace-nowrap hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                  >
                    致普通创作者的信
                  </button>
                </div>
                
                <!-- 登录入口（未登录时显示） -->
                <div v-if="!authStore.isAuthenticated" class="flex items-center space-x-2">
                  <div class="h-6 w-px bg-gray-300"></div>
                  <button
                    @click="showLoginModal = true"
                    class="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <LogIn class="w-3.5 h-3.5" />
                    <span>登录查看核心数据</span>
                  </button>
                </div>
              </div>
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

    <!-- 登录弹窗 -->
    <LoginModal 
      v-if="showLoginModal"
      @close="showLoginModal = false"
      @success="handleLoginSuccess"
    />

    <!-- 信件弹窗 -->
    <div v-if="showLetterModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click="showLetterModal = false">
      <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden" @click.stop>
        <!-- 弹窗头部 -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span class="text-xl">✉️</span>
              </div>
              <div>
                <h2 class="text-xl font-bold">致普通创作者的信</h2>
                <p class="text-blue-100 text-sm">TUARAN-KOLs</p>
              </div>
            </div>
            <button 
              @click="showLetterModal = false"
              class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <span class="text-white text-lg">×</span>
            </button>
          </div>
        </div>

        <!-- 信件内容 -->
        <div class="p-6 max-h-[60vh] overflow-y-auto">
          <div class="letter-paper bg-white border border-gray-200 p-6 space-y-4">
            <!-- 问候语 -->
            <div class="text-lg text-gray-800 leading-relaxed">
              亲爱的内容创作者朋友们，
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              大家好！我是矩阵号联盟的发起人。今天想和大家分享一个想法，一个关于内容创作新机遇的想法。
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              <strong>我们的初衷：从"大V联盟"到"矩阵号联盟"</strong>
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              我们都知道，在这个内容为王的时代，单打独斗已经很难在各大平台获得足够的曝光。大V们有他们的圈子，有他们的资源，有他们的影响力。但作为普通的内容创作者，我们是否也能找到属于自己的"联盟"？
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              于是，我想到了"矩阵号联盟"——一个专门为内容创作者打造的互助平台。
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              <strong>为什么是"矩阵"？</strong>
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              每个平台都会给每个账号一定的垂直领域流量，这是相对固定的。但突然给某个帖子/文章流量，往往是随机的。这就是我们的机会！
            </div>

            <div class="text-base text-gray-800 leading-relaxed font-semibold">
              1个号，多个平台，坚持发，1-2个月能有1w-10w流量。
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              再加上一些"科技狠活"——群里互赞、互相支持，就能形成一个完整的套路。
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              <strong>我们的价值主张</strong>
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              1. <strong>多号矩阵运营</strong>：1个号，多平台，垂直领域全覆盖，抓住大模型时代的内容创作机遇，结合平台基础流量和随机推荐机制。
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              2. <strong>流量承接与转化</strong>：将随机流量转化为固定关注，通过垂直内容建立用户粘性，最终实现商业价值变现。
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              3. <strong>商业闭环</strong>：卖"科技狠活"赚差价，卖"快速起号"课程和案例。1个号，多平台，1w粉丝、5w赞，1个月起号，价值2000+。
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              <strong>成功案例参考</strong>
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              就像 HelloGitHub 这样的超级垂直账号，发文就有粘性。用户觉得概念好就点关注，虽然平常不会一直看、转发评论，但这就是垂直内容的魅力。
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              <strong>我们的愿景</strong>
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              内容创作要抓住大模型的机会：多号（不同垂直领域，不同内容风格）、多平台（掘金、CSDN、知乎、头条、小红书...）、多垂直领域（编程、AI、职场、科技资讯...）、结合平台流量（基础流量 + 随机推荐）。
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              <strong>加入我们</strong>
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              矩阵号联盟不仅仅是一个工具平台，更是一个内容创作者的社区。在这里，我们可以：分享起号经验、互相点赞支持、交流垂直领域心得、共同探索变现路径。
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              <strong>抓住时代机遇</strong>
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              现在正是内容创作最好的时代。大模型降低了创作门槛，平台算法给了我们机会，垂直领域让我们有了专业定位。
            </div>

            <div class="text-base text-gray-800 leading-relaxed font-semibold">
              让我们一起，用矩阵的力量，在内容创作的道路上走得更远！
            </div>

            <div class="text-base text-gray-800 leading-relaxed">
              期待与你的相遇。
            </div>

            <!-- 签名 -->
            <div class="text-right mt-8">
              <div class="inline-block">
                <p class="font-bold text-gray-800">矩阵号联盟发起人：安东尼</p>
                <p class="text-gray-600 text-sm">2025年10月24日 程序员节</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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

/* 信件样式 */
.letter-paper {
  background: 
    linear-gradient(90deg, transparent 0%, transparent 24px, #f0f0f0 25px, #f0f0f0 26px, transparent 27px, transparent 49px, #f0f0f0 50px, #f0f0f0 51px, transparent 52px),
    linear-gradient(0deg, transparent 0%, transparent 24px, #f0f0f0 25px, #f0f0f0 26px, transparent 27px, transparent 49px, #f0f0f0 50px, #f0f0f0 51px, transparent 52px);
  background-size: 50px 100%, 100% 50px;
  border: 1px solid #d1d5db;
  min-height: 400px;
}

/* 粒子动画 */
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4);
  border-radius: 50%;
  opacity: 0.6;
  animation: floatUp linear infinite;
  bottom: -10px;
}

@keyframes floatUp {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}
</style>