<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useFansStore } from '@/stores/fans'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart, ScatterChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

// 注册 ECharts 组件
use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const fansStore = useFansStore()

// 图表类型
const chartType = ref<'scatter' | 'bar' | 'pie'>('scatter')

// 计算属性
const chartData = computed(() => {
  const accounts = fansStore.matrixAccounts
  const accountStats = accounts.map(account => {
    const stats = fansStore.getAccountStats(account.id)
    return {
      name: account.displayName,
      fans: stats.totalFans,
      reads: stats.totalReads,
      likes: stats.totalLikes,
      articles: stats.totalArticles,
      color: getAccountColor(account.themeColor)
    }
  })

  return accountStats
})

// 获取账号颜色
const getAccountColor = (themeColor: string): string => {
  const colorMap: Record<string, string> = {
    blue: '#3b82f6',
    green: '#10b981',
    purple: '#8b5cf6',
    pink: '#ec4899',
    orange: '#f59e0b',
    red: '#ef4444',
    amber: '#f59e0b',
    cyan: '#06b6d4'
  }
  return colorMap[themeColor] || '#3b82f6'
}

// 散点图配置 - 展示账号间的数据关系
const scatterChartOption = computed(() => {
  const accounts = chartData.value
  
  return {
    title: {
      text: '矩阵账号数据分布',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const data = params.data
        return `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 4px;">${data.name}</div>
            <div>粉丝数: ${data.value[1].toLocaleString()}</div>
            <div>阅读量: ${data.value[2].toLocaleString()}</div>
            <div>点赞量: ${data.value[3].toLocaleString()}</div>
          </div>
        `
      }
    },
    legend: {
      data: ['账号数据点'],
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: '粉丝数',
      nameLocation: 'middle',
      nameGap: 30
    },
    yAxis: {
      type: 'value',
      name: '阅读量',
      nameLocation: 'middle',
      nameGap: 50
    },
    series: [
      {
        name: '账号数据点',
        type: 'scatter',
        data: accounts.map((acc, index) => [
          acc.fans,
          Math.round(acc.reads / 1000),
          Math.round(acc.likes / 1000),
          acc.articles,
          acc.name
        ]),
        symbolSize: (data: any) => Math.max(20, Math.min(60, data[2] / 10)),
        itemStyle: {
          color: (params: any) => {
            const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']
            return colors[params.dataIndex % colors.length]
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})

// 柱状图配置
const barChartOption = computed(() => {
  const accounts = chartData.value
  const categories = accounts.map(acc => acc.name)
  
  return {
    title: {
      text: '矩阵账号数据对比',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['粉丝数', '阅读量(千)', '点赞量(千)', '文章数'],
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: '数量'
    },
    series: [
      {
        name: '粉丝数',
        type: 'bar',
        data: accounts.map(acc => acc.fans),
        itemStyle: {
          color: '#3b82f6'
        }
      },
      {
        name: '阅读量(千)',
        type: 'bar',
        data: accounts.map(acc => Math.round(acc.reads / 1000)),
        itemStyle: {
          color: '#10b981'
        }
      },
      {
        name: '点赞量(千)',
        type: 'bar',
        data: accounts.map(acc => Math.round(acc.likes / 1000)),
        itemStyle: {
          color: '#f59e0b'
        }
      },
      {
        name: '文章数',
        type: 'bar',
        data: accounts.map(acc => acc.articles),
        itemStyle: {
          color: '#8b5cf6'
        }
      }
    ]
  }
})

// 饼图配置
const pieChartOption = computed(() => {
  const accounts = chartData.value
  
  return {
    title: {
      text: '矩阵账号粉丝分布',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    series: [
      {
        name: '粉丝分布',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        data: accounts.map(acc => ({
          value: acc.fans,
          name: acc.name,
          itemStyle: {
            color: acc.color
          }
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})

// 当前图表配置
const currentChartOption = computed(() => {
  switch (chartType.value) {
    case 'scatter':
      return scatterChartOption.value
    case 'bar':
      return barChartOption.value
    case 'pie':
      return pieChartOption.value
    default:
      return scatterChartOption.value
  }
})

// 切换图表类型
const switchChartType = (type: 'scatter' | 'bar' | 'pie') => {
  chartType.value = type
}
</script>

<template>
  <div class="bg-white rounded-lg border border-gray-200 p-6">
    <!-- 图表头部 -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span class="text-white text-sm">📊</span>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-800">数据可视化</h3>
          <p class="text-sm text-gray-600">矩阵账号数据图表分析</p>
        </div>
      </div>
      
      <!-- 图表类型切换 -->
      <div class="flex items-center space-x-2">
        <button 
          @click="switchChartType('scatter')"
          :class="`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
            chartType === 'scatter' 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`"
        >
          分布图
        </button>
        <button 
          @click="switchChartType('bar')"
          :class="`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
            chartType === 'bar' 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`"
        >
          对比图
        </button>
        <button 
          @click="switchChartType('pie')"
          :class="`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
            chartType === 'pie' 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`"
        >
          饼图
        </button>
      </div>
    </div>

    <!-- 图表容器 -->
    <div class="h-96">
      <v-chart 
        :option="currentChartOption" 
        class="w-full h-full"
        autoresize
      />
    </div>

    <!-- 数据摘要 -->
    <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="text-center p-3 bg-blue-50 rounded-lg">
        <div class="text-2xl font-bold text-blue-600">
          {{ chartData.reduce((sum, acc) => sum + acc.fans, 0).toLocaleString() }}
        </div>
        <div class="text-sm text-blue-600">总粉丝数</div>
      </div>
      <div class="text-center p-3 bg-green-50 rounded-lg">
        <div class="text-2xl font-bold text-green-600">
          {{ Math.round(chartData.reduce((sum, acc) => sum + acc.reads, 0) / 10000) / 100 }}w
        </div>
        <div class="text-sm text-green-600">总阅读量</div>
      </div>
      <div class="text-center p-3 bg-yellow-50 rounded-lg">
        <div class="text-2xl font-bold text-yellow-600">
          {{ Math.round(chartData.reduce((sum, acc) => sum + acc.likes, 0) / 10000) / 100 }}w
        </div>
        <div class="text-sm text-yellow-600">总点赞数</div>
      </div>
      <div class="text-center p-3 bg-purple-50 rounded-lg">
        <div class="text-2xl font-bold text-purple-600">
          {{ chartData.reduce((sum, acc) => sum + acc.articles, 0) }}
        </div>
        <div class="text-sm text-purple-600">总文章数</div>
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
