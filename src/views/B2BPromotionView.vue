<script setup lang="ts">
import { ref, computed } from 'vue'
import { Megaphone, Users, Target, TrendingUp, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-vue-next'

// B端推广活动数据
const promotionCampaigns = ref([
  {
    id: 1,
    name: 'AI技术大会推广',
    client: '某科技公司',
    budget: 50000,
    duration: 30,
    status: 'active',
    platforms: ['juejin', 'csdn', 'zhihu', 'toutiao'],
    startDate: '2025-01-15',
    endDate: '2025-02-15',
    progress: 65,
    reach: 150000,
    engagement: 8500,
    conversion: 420
  },
  {
    id: 2,
    name: '前端框架推广',
    client: '某互联网公司',
    budget: 30000,
    duration: 21,
    status: 'completed',
    platforms: ['juejin', 'csdn'],
    startDate: '2024-12-01',
    endDate: '2024-12-22',
    progress: 100,
    reach: 80000,
    engagement: 4500,
    conversion: 280
  },
  {
    id: 3,
    name: '云服务产品推广',
    client: '某云服务商',
    budget: 80000,
    duration: 45,
    status: 'planning',
    platforms: ['juejin', 'csdn', 'zhihu', 'toutiao', 'weibo'],
    startDate: '2025-02-01',
    endDate: '2025-03-18',
    progress: 0,
    reach: 0,
    engagement: 0,
    conversion: 0
  }
])

// 账号矩阵配置
const accountMatrix = ref([
  {
    id: 'anthony',
    name: '掘金安东尼',
    platforms: ['juejin', 'csdn', 'toutiao', 'infoq'],
    followers: 12000,
    avgReach: 15000,
    engagement: 8.5,
    price: 2000,
    status: 'active'
  },
  {
    id: 'aifs',
    name: '代码AI弗森',
    platforms: ['csdn', '_51cto'],
    followers: 8000,
    avgReach: 12000,
    engagement: 7.2,
    price: 1500,
    status: 'active'
  },
  {
    id: 'thirty',
    name: '三十而立方',
    platforms: ['zhihu'],
    followers: 5000,
    avgReach: 8000,
    engagement: 9.1,
    price: 1200,
    status: 'active'
  },
  {
    id: 'weekly',
    name: '前端周看',
    platforms: ['wechat'],
    followers: 3500,
    avgReach: 10000,
    engagement: 6.8,
    price: 1000,
    status: 'active'
  },
  {
    id: '404',
    name: '安东尼404',
    platforms: ['xiaohongshu'],
    followers: 2500,
    avgReach: 6000,
    engagement: 7.5,
    price: 800,
    status: 'active'
  }
])

// 内容模板
const contentTemplates = ref([
  {
    id: 1,
    name: '技术产品推广',
    category: 'tech',
    template: `# {产品名称} - 技术人的新选择

## 为什么选择{产品名称}？

{产品名称}是一款专为{目标用户}设计的{产品类型}，具有以下优势：

### 🚀 核心特性
- 特性1：{特性描述1}
- 特性2：{特性描述2}
- 特性3：{特性描述3}

### 💡 使用场景
- 场景1：{场景描述1}
- 场景2：{场景描述2}

### 📈 数据表现
- 性能提升：{性能数据}
- 用户反馈：{用户反馈}

立即体验：{产品链接}

#技术 #产品推广 #{相关标签}`,
    platforms: ['juejin', 'csdn', 'zhihu'],
    usage: 15
  },
  {
    id: 2,
    name: '活动宣传',
    category: 'event',
    template: `# 🎉 {活动名称} 即将开始！

## 活动亮点
- 时间：{活动时间}
- 地点：{活动地点}
- 主题：{活动主题}

## 嘉宾阵容
{嘉宾介绍}

## 报名方式
{报名链接}

#活动 #{活动标签} #技术大会`,
    platforms: ['juejin', 'csdn', 'zhihu', 'toutiao'],
    usage: 8
  },
  {
    id: 3,
    name: '课程推广',
    category: 'education',
    template: `# 📚 {课程名称} - 从入门到精通

## 课程大纲
- 模块1：{模块1名称}
- 模块2：{模块2名称}
- 模块3：{模块3名称}

## 学习收获
- 收获1：{收获描述1}
- 收获2：{收获描述2}

## 适合人群
- {人群1}
- {人群2}

立即报名：{课程链接}

#学习 #{技术栈} #课程`,
    platforms: ['juejin', 'csdn', 'zhihu'],
    usage: 12
  }
])

// 发布计划
const publishPlans = ref([
  {
    id: 1,
    campaignId: 1,
    accountId: 'anthony',
    platform: 'juejin',
    title: 'AI技术大会深度解析',
    scheduledTime: '2025-01-20 09:00',
    status: 'scheduled',
    content: '大会亮点分析...'
  },
  {
    id: 2,
    campaignId: 1,
    accountId: 'aifs',
    platform: 'csdn',
    title: 'AI技术大会参会心得',
    scheduledTime: '2025-01-20 14:00',
    status: 'scheduled',
    content: '参会体验分享...'
  },
  {
    id: 3,
    campaignId: 1,
    accountId: 'thirty',
    platform: 'zhihu',
    title: 'AI技术大会问答',
    scheduledTime: '2025-01-21 10:00',
    status: 'scheduled',
    content: '大会相关问题解答...'
  }
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

// 获取状态颜色
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-100'
    case 'completed': return 'text-blue-600 bg-blue-100'
    case 'planning': return 'text-yellow-600 bg-yellow-100'
    case 'scheduled': return 'text-purple-600 bg-purple-100'
    case 'published': return 'text-green-600 bg-green-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

// 获取状态图标
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active': return CheckCircle
    case 'completed': return CheckCircle
    case 'planning': return Clock
    case 'scheduled': return Calendar
    case 'published': return CheckCircle
    default: return AlertCircle
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
    <!-- 页面标题 -->
    <div class="bg-white/80 backdrop-blur-sm border-b border-purple-200">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <Megaphone class="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-800">B端推广中心</h1>
            <p class="text-gray-600 text-sm">多账号矩阵推广，最大化品牌曝光</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="max-w-7xl mx-auto px-6 py-6">
      <!-- 推广活动概览 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 border border-purple-200 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-purple-600 mb-2">
                {{ promotionCampaigns.length }}
              </div>
              <div class="text-gray-600">推广活动</div>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target class="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-blue-200 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-blue-600 mb-2">
                {{ formatNumber(accountMatrix.reduce((sum, acc) => sum + acc.followers, 0)) }}
              </div>
              <div class="text-gray-600">矩阵粉丝</div>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users class="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-green-200 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-green-600 mb-2">
                {{ formatCurrency(promotionCampaigns.reduce((sum, camp) => sum + camp.budget, 0)) }}
              </div>
              <div class="text-gray-600">总预算</div>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp class="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-orange-200 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-orange-600 mb-2">
                {{ formatNumber(promotionCampaigns.reduce((sum, camp) => sum + camp.reach, 0)) }}
              </div>
              <div class="text-gray-600">总触达</div>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Megaphone class="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- 推广活动列表 -->
      <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-lg mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Target class="w-5 h-5 mr-2 text-purple-600" />
          推广活动管理
        </h3>
        <div class="space-y-4">
          <div 
            v-for="campaign in promotionCampaigns" 
            :key="campaign.id"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-3">
                <h4 class="font-semibold text-gray-800">{{ campaign.name }}</h4>
                <span 
                  :class="`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`"
                >
                  {{ campaign.status === 'active' ? '进行中' : 
                     campaign.status === 'completed' ? '已完成' : 
                     campaign.status === 'planning' ? '计划中' : campaign.status }}
                </span>
              </div>
              <div class="text-right">
                <div class="font-bold text-gray-800">{{ formatCurrency(campaign.budget) }}</div>
                <div class="text-sm text-gray-600">预算</div>
              </div>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
              <div>
                <div class="text-sm text-gray-600">客户</div>
                <div class="font-medium">{{ campaign.client }}</div>
              </div>
              <div>
                <div class="text-sm text-gray-600">周期</div>
                <div class="font-medium">{{ campaign.duration }}天</div>
              </div>
              <div>
                <div class="text-sm text-gray-600">触达</div>
                <div class="font-medium">{{ formatNumber(campaign.reach) }}</div>
              </div>
              <div>
                <div class="text-sm text-gray-600">转化</div>
                <div class="font-medium">{{ formatNumber(campaign.conversion) }}</div>
              </div>
            </div>

            <!-- 进度条 -->
            <div class="mb-3">
              <div class="flex justify-between text-sm text-gray-600 mb-1">
                <span>进度</span>
                <span>{{ campaign.progress }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${campaign.progress}%` }"
                ></div>
              </div>
            </div>

            <!-- 平台标签 -->
            <div class="flex flex-wrap gap-2 mb-3">
              <span 
                v-for="platform in campaign.platforms" 
                :key="platform"
                class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {{ platform }}
              </span>
            </div>

            <div class="flex justify-end space-x-2">
              <button class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                查看详情
              </button>
              <button class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                编辑
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 账号矩阵配置 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- 账号矩阵 -->
        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Users class="w-5 h-5 mr-2 text-blue-600" />
            账号矩阵配置
          </h3>
          <div class="space-y-3">
            <div 
              v-for="account in accountMatrix" 
              :key="account.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span class="text-sm font-bold text-blue-600">{{ account.name.charAt(0) }}</span>
                </div>
                <div>
                  <div class="font-medium text-gray-800">{{ account.name }}</div>
                  <div class="text-sm text-gray-600">{{ account.platforms.join(', ') }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-bold text-gray-800">{{ formatNumber(account.followers) }}</div>
                <div class="text-sm text-gray-600">粉丝</div>
                <div class="text-sm text-green-600">{{ formatCurrency(account.price) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 内容模板 -->
        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar class="w-5 h-5 mr-2 text-green-600" />
            内容模板库
          </h3>
          <div class="space-y-3">
            <div 
              v-for="template in contentTemplates" 
              :key="template.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div class="font-medium text-gray-800">{{ template.name }}</div>
                <div class="text-sm text-gray-600">{{ template.platforms.join(', ') }}</div>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-600">使用 {{ template.usage }} 次</div>
                <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  使用模板
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 发布计划 -->
      <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar class="w-5 h-5 mr-2 text-indigo-600" />
          发布计划
        </h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-4 font-medium text-gray-600">账号</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600">平台</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600">标题</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600">发布时间</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600">状态</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="plan in publishPlans" 
                :key="plan.id"
                class="border-b border-gray-100 hover:bg-gray-50"
              >
                <td class="py-3 px-4 font-medium text-gray-800">{{ plan.accountId }}</td>
                <td class="py-3 px-4 text-gray-600">{{ plan.platform }}</td>
                <td class="py-3 px-4 text-gray-600">{{ plan.title }}</td>
                <td class="py-3 px-4 text-gray-600">{{ plan.scheduledTime }}</td>
                <td class="py-3 px-4">
                  <span 
                    :class="`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`"
                  >
                    {{ plan.status === 'scheduled' ? '已安排' : 
                       plan.status === 'published' ? '已发布' : plan.status }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <button class="text-blue-600 hover:text-blue-800 text-sm font-medium mr-2">
                    编辑
                  </button>
                  <button class="text-green-600 hover:text-green-800 text-sm font-medium">
                    发布
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
  background: #8b5cf6;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #7c3aed;
}
</style>
