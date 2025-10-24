<script setup lang="ts">
import { ref, computed } from 'vue'
import { TrendingUp, Users, DollarSign, Target, Share2, MessageCircle, QrCode, Link, BarChart3 } from 'lucide-vue-next'

// 流量转化数据
const conversionData = ref({
  totalTraffic: 100000, // 总流量
  convertedUsers: 2500,  // 转化用户
  conversionRate: 2.5,   // 转化率
  revenue: 15000,        // 收入
  communityMembers: 1200, // 社群成员
  wechatFollowers: 800,   // 微信关注
  emailSubscribers: 500   // 邮件订阅
})

// 转化渠道
const conversionChannels = ref([
  {
    name: '微信群',
    icon: '👥',
    color: 'green',
    count: 1200,
    conversionRate: 1.2,
    revenue: 8000,
    description: '技术交流群，高价值用户'
  },
  {
    name: '公众号',
    icon: '📱',
    color: 'blue',
    count: 800,
    conversionRate: 0.8,
    revenue: 4000,
    description: '深度内容，持续关注'
  },
  {
    name: '知识星球',
    icon: '⭐',
    color: 'yellow',
    count: 300,
    conversionRate: 0.3,
    revenue: 2000,
    description: '付费社群，高粘性'
  },
  {
    name: '邮件列表',
    icon: '📧',
    color: 'purple',
    count: 500,
    conversionRate: 0.5,
    revenue: 1000,
    description: '定期推送，长期维护'
  }
])

// 变现策略
const monetizationStrategies = ref([
  {
    name: '知识付费',
    type: 'course',
    revenue: 8000,
    description: '技术课程、培训',
    icon: '🎓',
    color: 'blue'
  },
  {
    name: '社群运营',
    type: 'community',
    revenue: 4000,
    description: '付费社群、会员',
    icon: '👥',
    color: 'green'
  },
  {
    name: '广告合作',
    type: 'advertising',
    revenue: 2000,
    description: '品牌推广、软文',
    icon: '📢',
    color: 'orange'
  },
  {
    name: '咨询服务',
    type: 'consulting',
    revenue: 1000,
    description: '技术咨询、方案',
    icon: '💼',
    color: 'purple'
  }
])

// 流量来源分析
const trafficSources = ref([
  { platform: '掘金', traffic: 35000, conversion: 875, rate: 2.5 },
  { platform: 'CSDN', traffic: 25000, conversion: 500, rate: 2.0 },
  { platform: '知乎', traffic: 20000, conversion: 600, rate: 3.0 },
  { platform: '头条', traffic: 15000, conversion: 375, rate: 2.5 },
  { platform: '其他', traffic: 5000, conversion: 125, rate: 2.5 }
])

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
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- 页面标题 -->
    <div class="bg-white/80 backdrop-blur-sm border-b border-blue-200">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <TrendingUp class="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-800">流量转化中心</h1>
            <p class="text-gray-600 text-sm">将阅读量转化为实际收益和社群价值</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="max-w-7xl mx-auto px-6 py-6">
      <!-- 核心转化指标 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 border border-blue-200 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-blue-600 mb-2">
                {{ formatNumber(conversionData.totalTraffic) }}
              </div>
              <div class="text-gray-600">总流量</div>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 class="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-green-200 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-green-600 mb-2">
                {{ formatNumber(conversionData.convertedUsers) }}
              </div>
              <div class="text-gray-600">转化用户</div>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users class="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-yellow-200 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-yellow-600 mb-2">
                {{ conversionData.conversionRate }}%
              </div>
              <div class="text-gray-600">转化率</div>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Target class="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-purple-200 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-purple-600 mb-2">
                {{ formatCurrency(conversionData.revenue) }}
              </div>
              <div class="text-gray-600">总收入</div>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign class="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- 转化渠道分析 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- 转化渠道 -->
        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Share2 class="w-5 h-5 mr-2 text-blue-600" />
            转化渠道分析
          </h3>
          <div class="space-y-4">
            <div 
              v-for="channel in conversionChannels" 
              :key="channel.name"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="text-2xl">{{ channel.icon }}</div>
                <div>
                  <div class="font-medium text-gray-800">{{ channel.name }}</div>
                  <div class="text-sm text-gray-600">{{ channel.description }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-bold text-gray-800">{{ formatNumber(channel.count) }}</div>
                <div class="text-sm text-gray-600">{{ channel.conversionRate }}% 转化率</div>
                <div class="text-sm text-green-600">{{ formatCurrency(channel.revenue) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 变现策略 -->
        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <DollarSign class="w-5 h-5 mr-2 text-green-600" />
            变现策略
          </h3>
          <div class="space-y-4">
            <div 
              v-for="strategy in monetizationStrategies" 
              :key="strategy.name"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="text-2xl">{{ strategy.icon }}</div>
                <div>
                  <div class="font-medium text-gray-800">{{ strategy.name }}</div>
                  <div class="text-sm text-gray-600">{{ strategy.description }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-bold text-green-600">{{ formatCurrency(strategy.revenue) }}</div>
                <div class="text-sm text-gray-600">月收入</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 流量来源分析 -->
      <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-lg mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart3 class="w-5 h-5 mr-2 text-indigo-600" />
          流量来源与转化分析
        </h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-4 font-medium text-gray-600">平台</th>
                <th class="text-right py-3 px-4 font-medium text-gray-600">流量</th>
                <th class="text-right py-3 px-4 font-medium text-gray-600">转化用户</th>
                <th class="text-right py-3 px-4 font-medium text-gray-600">转化率</th>
                <th class="text-right py-3 px-4 font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="source in trafficSources" 
                :key="source.platform"
                class="border-b border-gray-100 hover:bg-gray-50"
              >
                <td class="py-3 px-4 font-medium text-gray-800">{{ source.platform }}</td>
                <td class="py-3 px-4 text-right text-gray-600">{{ formatNumber(source.traffic) }}</td>
                <td class="py-3 px-4 text-right text-gray-600">{{ formatNumber(source.conversion) }}</td>
                <td class="py-3 px-4 text-right">
                  <span 
                    :class="`px-2 py-1 rounded-full text-xs font-medium ${
                      source.rate >= 3 ? 'bg-green-100 text-green-700' :
                      source.rate >= 2 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`"
                  >
                    {{ source.rate }}%
                  </span>
                </td>
                <td class="py-3 px-4 text-right">
                  <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    优化策略
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 快速操作 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <QrCode class="w-5 h-5 text-blue-600" />
            </div>
            <h4 class="font-semibold text-gray-800">生成引流码</h4>
          </div>
          <p class="text-gray-600 text-sm mb-4">为不同平台生成专属引流二维码</p>
          <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            立即生成
          </button>
        </div>

        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageCircle class="w-5 h-5 text-green-600" />
            </div>
            <h4 class="font-semibold text-gray-800">社群管理</h4>
          </div>
          <p class="text-gray-600 text-sm mb-4">管理微信群、知识星球等社群</p>
          <button class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
            进入管理
          </button>
        </div>

        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Link class="w-5 h-5 text-purple-600" />
            </div>
            <h4 class="font-semibold text-gray-800">链接追踪</h4>
          </div>
          <p class="text-gray-600 text-sm mb-4">创建追踪链接，分析转化路径</p>
          <button class="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
            创建链接
          </button>
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
  background: #3b82f6;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2563eb;
}
</style>
