<script setup lang="ts">
import { ref, computed } from 'vue'
import { Target, Users, TrendingUp, Smartphone, Globe, BarChart3, Plus, Edit, Trash2 } from 'lucide-vue-next'

// 手机号管理
const phoneNumbers = ref([
  {
    id: 1,
    number: '187****1234',
    status: 'active',
    accounts: 3,
    totalFollowers: 15000,
    monthlyRevenue: 5000,
    platforms: ['juejin', 'csdn', 'zhihu']
  },
  {
    id: 2,
    number: '198****5678',
    status: 'active',
    accounts: 2,
    totalFollowers: 8000,
    monthlyRevenue: 3000,
    platforms: ['toutiao', 'weibo']
  },
  {
    id: 3,
    number: '139****9999',
    status: 'planning',
    accounts: 0,
    totalFollowers: 0,
    monthlyRevenue: 0,
    platforms: []
  }
])

// 垂直领域配置
const verticalFields = ref([
  {
    id: 1,
    name: '前端开发',
    description: 'Vue、React、Angular等技术栈',
    targetAudience: '前端工程师、全栈开发者',
    contentStrategy: '技术教程、最佳实践、源码解析',
    platforms: ['juejin', 'csdn', 'zhihu'],
    phoneNumber: '187****1234',
    accounts: ['掘金安东尼', '前端周看'],
    monthlyGoal: 50000,
    currentReach: 35000,
    conversionRate: 2.5
  },
  {
    id: 2,
    name: 'AI/机器学习',
    description: '人工智能、深度学习、大模型',
    targetAudience: 'AI工程师、算法工程师、数据科学家',
    contentStrategy: '算法解析、模型训练、AI应用',
    platforms: ['csdn', 'zhihu', 'infoq'],
    phoneNumber: '198****5678',
    accounts: ['代码AI弗森'],
    monthlyGoal: 30000,
    currentReach: 20000,
    conversionRate: 3.2
  },
  {
    id: 3,
    name: '职场成长',
    description: '职业规划、技能提升、职场经验',
    targetAudience: '职场新人、技术管理者、转行人员',
    contentStrategy: '职业规划、面试技巧、职场故事',
    platforms: ['zhihu', 'toutiao', 'xiaohongshu'],
    phoneNumber: '139****9999',
    accounts: ['三十而立方'],
    monthlyGoal: 20000,
    currentReach: 0,
    conversionRate: 0
  },
  {
    id: 4,
    name: '科技资讯',
    description: '最新科技动态、行业趋势分析',
    targetAudience: '科技爱好者、投资人、创业者',
    contentStrategy: '热点解读、趋势分析、产品评测',
    platforms: ['toutiao', 'weibo', 'xiaohongshu'],
    phoneNumber: '187****1234',
    accounts: ['安东尼404'],
    monthlyGoal: 40000,
    currentReach: 25000,
    conversionRate: 2.8
  }
])

// 账号分配策略
const accountAllocation = ref([
  {
    phoneNumber: '187****1234',
    accounts: [
      { name: '掘金安东尼', field: '前端开发', platform: 'juejin', followers: 10871, status: 'active' },
      { name: '安东尼404', field: '科技资讯', platform: 'xiaohongshu', followers: 4576, status: 'active' },
      { name: '前端周看', field: '前端开发', platform: 'wechat', followers: 3500, status: 'active' }
    ]
  },
  {
    phoneNumber: '198****5678',
    accounts: [
      { name: '代码AI弗森', field: 'AI/机器学习', platform: 'csdn', followers: 638, status: 'active' },
      { name: '三十而立方', field: '职场成长', platform: 'zhihu', followers: 350, status: 'active' }
    ]
  }
])

// 流量分配策略
const trafficAllocation = ref({
  totalTraffic: 100000,
  distribution: [
    { platform: 'juejin', percentage: 35, traffic: 35000, conversion: 875 },
    { platform: 'csdn', percentage: 25, traffic: 25000, conversion: 500 },
    { platform: 'zhihu', percentage: 20, traffic: 20000, conversion: 600 },
    { platform: 'toutiao', percentage: 15, traffic: 15000, conversion: 375 },
    { platform: '其他', percentage: 5, traffic: 5000, conversion: 125 }
  ]
})

// 变现策略
const monetizationStrategy = ref({
  totalRevenue: 15000,
  channels: [
    { name: '知识付费', revenue: 8000, percentage: 53.3, growth: 15 },
    { name: '社群运营', revenue: 4000, percentage: 26.7, growth: 25 },
    { name: '广告合作', revenue: 2000, percentage: 13.3, growth: 10 },
    { name: '咨询服务', revenue: 1000, percentage: 6.7, growth: 30 }
  ]
})

// 格式化数字
const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toLocaleString()
}

// 格式化金额
const formatCurrency = (amount: number): string => {
  return '¥' + amount.toLocaleString()
}

// 获取状态颜色
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-100'
    case 'planning': return 'text-yellow-600 bg-yellow-100'
    case 'inactive': return 'text-red-600 bg-red-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

// 计算完成率
const getCompletionRate = (current: number, goal: number): number => {
  return goal > 0 ? Math.round((current / goal) * 100) : 0
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">

    <!-- 主要内容 -->
    <div class="max-w-7xl mx-auto px-6 py-6">
      <!-- 策略概览 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 border border-indigo-200 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-indigo-600 mb-2">
                {{ phoneNumbers.length }}
              </div>
              <div class="text-gray-600">手机号</div>
            </div>
            <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Smartphone class="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-purple-200 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-purple-600 mb-2">
                {{ verticalFields.length }}
              </div>
              <div class="text-gray-600">垂直领域</div>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Globe class="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-green-200 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-green-600 mb-2">
                {{ formatNumber(phoneNumbers.reduce((sum, phone) => sum + phone.totalFollowers, 0)) }}
              </div>
              <div class="text-gray-600">总粉丝</div>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users class="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-orange-200 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-orange-600 mb-2">
                {{ formatCurrency(phoneNumbers.reduce((sum, phone) => sum + phone.monthlyRevenue, 0)) }}
              </div>
              <div class="text-gray-600">月收入</div>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp class="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- 手机号管理 -->
      <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-lg mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800 flex items-center">
            <Smartphone class="w-5 h-5 mr-2 text-indigo-600" />
            手机号管理
          </h3>
          <button class="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus class="w-4 h-4" />
            <span>添加手机号</span>
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="phone in phoneNumbers" 
            :key="phone.id"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Smartphone class="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <div class="font-semibold text-gray-800">{{ phone.number }}</div>
                  <span 
                    :class="`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(phone.status)}`"
                  >
                    {{ phone.status === 'active' ? '活跃' : 
                       phone.status === 'planning' ? '计划中' : phone.status }}
                  </span>
                </div>
              </div>
              <div class="flex space-x-1">
                <button class="p-1 text-gray-400 hover:text-gray-600">
                  <Edit class="w-4 h-4" />
                </button>
                <button class="p-1 text-gray-400 hover:text-red-600">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">账号数量</span>
                <span class="font-medium">{{ phone.accounts }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">总粉丝</span>
                <span class="font-medium">{{ formatNumber(phone.totalFollowers) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">月收入</span>
                <span class="font-medium text-green-600">{{ formatCurrency(phone.monthlyRevenue) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 垂直领域配置 -->
      <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-lg mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800 flex items-center">
            <Globe class="w-5 h-5 mr-2 text-purple-600" />
            垂直领域配置
          </h3>
          <button class="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Plus class="w-4 h-4" />
            <span>添加领域</span>
          </button>
        </div>
        <div class="space-y-4">
          <div 
            v-for="field in verticalFields" 
            :key="field.id"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span class="text-lg">{{ field.name.charAt(0) }}</span>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800">{{ field.name }}</h4>
                  <p class="text-sm text-gray-600">{{ field.description }}</p>
                </div>
              </div>
              <div class="flex space-x-2">
                <button class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                  编辑
                </button>
                <button class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                  策略
                </button>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
              <div>
                <div class="text-sm text-gray-600">目标受众</div>
                <div class="font-medium text-sm">{{ field.targetAudience }}</div>
              </div>
              <div>
                <div class="text-sm text-gray-600">内容策略</div>
                <div class="font-medium text-sm">{{ field.contentStrategy }}</div>
              </div>
              <div>
                <div class="text-sm text-gray-600">平台</div>
                <div class="font-medium text-sm">{{ field.platforms.join(', ') }}</div>
              </div>
              <div>
                <div class="text-sm text-gray-600">手机号</div>
                <div class="font-medium text-sm">{{ field.phoneNumber }}</div>
              </div>
            </div>

            <!-- 进度条 -->
            <div class="mb-3">
              <div class="flex justify-between text-sm text-gray-600 mb-1">
                <span>月度目标完成度</span>
                <span>{{ getCompletionRate(field.currentReach, field.monthlyGoal) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${getCompletionRate(field.currentReach, field.monthlyGoal)}%` }"
                ></div>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4 text-sm">
              <div class="text-center">
                <div class="font-bold text-gray-800">{{ formatNumber(field.currentReach) }}</div>
                <div class="text-gray-600">当前触达</div>
              </div>
              <div class="text-center">
                <div class="font-bold text-gray-800">{{ formatNumber(field.monthlyGoal) }}</div>
                <div class="text-gray-600">月度目标</div>
              </div>
              <div class="text-center">
                <div class="font-bold text-gray-800">{{ field.conversionRate }}%</div>
                <div class="text-gray-600">转化率</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 流量分配策略 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 流量分配 -->
        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <BarChart3 class="w-5 h-5 mr-2 text-blue-600" />
            流量分配策略
          </h3>
          <div class="space-y-4">
            <div 
              v-for="dist in trafficAllocation.distribution" 
              :key="dist.platform"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span class="text-sm font-bold text-blue-600">{{ dist.platform.charAt(0).toUpperCase() }}</span>
                </div>
                <div>
                  <div class="font-medium text-gray-800">{{ dist.platform }}</div>
                  <div class="text-sm text-gray-600">{{ dist.percentage }}% 分配</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-bold text-gray-800">{{ formatNumber(dist.traffic) }}</div>
                <div class="text-sm text-gray-600">流量</div>
                <div class="text-sm text-green-600">{{ formatNumber(dist.conversion) }} 转化</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 变现策略 -->
        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp class="w-5 h-5 mr-2 text-green-600" />
            变现策略分析
          </h3>
          <div class="space-y-4">
            <div 
              v-for="channel in monetizationStrategy.channels" 
              :key="channel.name"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span class="text-sm font-bold text-green-600">{{ channel.name.charAt(0) }}</span>
                </div>
                <div>
                  <div class="font-medium text-gray-800">{{ channel.name }}</div>
                  <div class="text-sm text-gray-600">{{ channel.percentage }}% 占比</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-bold text-gray-800">{{ formatCurrency(channel.revenue) }}</div>
                <div class="text-sm text-gray-600">月收入</div>
                <div class="text-sm text-green-600">+{{ channel.growth }}% 增长</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: #6366f1;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4f46e5;
}
</style>
