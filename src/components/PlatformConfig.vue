<script setup lang="ts">
import { ref, computed } from 'vue'
import { Globe, Plus, Edit, Trash2, Save, X, Settings } from 'lucide-vue-next'
import type { CommunityType } from '@/types'

// 平台配置接口
interface PlatformConfig {
  id: CommunityType
  name: string
  icon: string
  color: string
  url: string
  gradient: string
  description: string
  isActive: boolean
}

// 状态管理
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingPlatform = ref<PlatformConfig | null>(null)

// 平台配置数据
const platformConfigs = ref<PlatformConfig[]>([
  {
    id: 'csdn',
    name: 'CSDN',
    icon: '📝',
    color: 'red',
    url: 'https://blog.csdn.net',
    gradient: 'from-red-500 to-pink-500',
    description: '中国专业IT社区',
    isActive: true
  },
  {
    id: 'juejin',
    name: '掘金',
    icon: '⛏️',
    color: 'blue',
    url: 'https://juejin.cn',
    gradient: 'from-blue-500 to-cyan-500',
    description: '面向全球中文开发者的技术社区',
    isActive: true
  },
  {
    id: 'toutiao',
    name: '头条',
    icon: '📰',
    color: 'orange',
    url: 'https://www.toutiao.com',
    gradient: 'from-orange-500 to-yellow-500',
    description: '字节跳动旗下内容平台',
    isActive: true
  },
  {
    id: 'zhihu',
    name: '知乎',
    icon: '🧠',
    color: 'cyan',
    url: 'https://www.zhihu.com',
    gradient: 'from-cyan-500 to-blue-500',
    description: '中文互联网最大的知识分享平台',
    isActive: true
  },
  {
    id: '_51cto',
    name: '51CTO',
    icon: '💻',
    color: 'green',
    url: 'https://www.51cto.com',
    gradient: 'from-green-500 to-emerald-500',
    description: '中国领先的IT技术社区',
    isActive: true
  },
  {
    id: 'wechat',
    name: '微信',
    icon: '💬',
    color: 'green',
    url: 'https://mp.weixin.qq.com',
    gradient: 'from-green-500 to-teal-500',
    description: '微信公众号平台',
    isActive: true
  },
  {
    id: 'weibo',
    name: '微博',
    icon: '🐦',
    color: 'red',
    url: 'https://weibo.com',
    gradient: 'from-red-500 to-rose-500',
    description: '中国最大的社交媒体平台',
    isActive: true
  },
  {
    id: 'infoq',
    name: 'InfoQ',
    icon: 'ℹ️',
    color: 'purple',
    url: 'https://www.infoq.cn',
    gradient: 'from-purple-500 to-violet-500',
    description: '全球软件开发技术社区',
    isActive: true
  },
  {
    id: 'xiaohongshu',
    name: '小红书',
    icon: '📖',
    color: 'pink',
    url: 'https://www.xiaohongshu.com',
    gradient: 'from-pink-500 to-rose-500',
    description: '生活方式分享平台',
    isActive: true
  }
])

// 新平台表单
const newPlatform = ref({
  id: '' as CommunityType,
  name: '',
  icon: '🌐',
  color: 'blue',
  url: '',
  gradient: 'from-blue-500 to-cyan-500',
  description: '',
  isActive: true
})

// 颜色选项
const colorOptions = [
  { value: 'red', label: '红色', class: 'bg-red-500' },
  { value: 'blue', label: '蓝色', class: 'bg-blue-500' },
  { value: 'green', label: '绿色', class: 'bg-green-500' },
  { value: 'purple', label: '紫色', class: 'bg-purple-500' },
  { value: 'pink', label: '粉色', class: 'bg-pink-500' },
  { value: 'orange', label: '橙色', class: 'bg-orange-500' },
  { value: 'yellow', label: '黄色', class: 'bg-yellow-500' },
  { value: 'cyan', label: '青色', class: 'bg-cyan-500' },
  { value: 'amber', label: '琥珀色', class: 'bg-amber-500' },
  { value: 'emerald', label: '翠绿色', class: 'bg-emerald-500' }
]

// 计算属性
const activePlatforms = computed(() => platformConfigs.value.filter(p => p.isActive))
const inactivePlatforms = computed(() => platformConfigs.value.filter(p => !p.isActive))

// 方法
const openAddModal = () => {
  newPlatform.value = {
    id: '' as CommunityType,
    name: '',
    icon: '🌐',
    color: 'blue',
    url: '',
    gradient: 'from-blue-500 to-cyan-500',
    description: '',
    isActive: true
  }
  showAddModal.value = true
}

const openEditModal = (platform: PlatformConfig) => {
  editingPlatform.value = { ...platform }
  showEditModal.value = true
}

const closeModals = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingPlatform.value = null
}

const addPlatform = () => {
  if (!newPlatform.value.name || !newPlatform.value.id) return
  
  const platform: PlatformConfig = {
    id: newPlatform.value.id,
    name: newPlatform.value.name,
    icon: newPlatform.value.icon,
    color: newPlatform.value.color,
    url: newPlatform.value.url,
    gradient: newPlatform.value.gradient,
    description: newPlatform.value.description,
    isActive: newPlatform.value.isActive
  }
  
  platformConfigs.value.push(platform)
  closeModals()
}

const updatePlatform = () => {
  if (!editingPlatform.value) return
  
  const index = platformConfigs.value.findIndex(p => p.id === editingPlatform.value!.id)
  if (index !== -1) {
    platformConfigs.value[index] = { ...editingPlatform.value }
  }
  closeModals()
}

const deletePlatform = (platformId: CommunityType) => {
  if (confirm('确定要删除这个平台配置吗？此操作不可撤销。')) {
    const index = platformConfigs.value.findIndex(p => p.id === platformId)
    if (index !== -1) {
      platformConfigs.value.splice(index, 1)
    }
  }
}

const togglePlatformStatus = (platformId: CommunityType) => {
  const platform = platformConfigs.value.find(p => p.id === platformId)
  if (platform) {
    platform.isActive = !platform.isActive
  }
}

const getGradientClass = (gradient: string) => {
  return `bg-gradient-to-r ${gradient}`
}
</script>

<template>
  <div class="space-y-6">
    <!-- 头部操作栏 -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Globe class="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 class="text-lg font-semibold text-gray-800">平台配置管理</h2>
          <p class="text-sm text-gray-600">管理支持的平台和配置</p>
        </div>
      </div>
      
      <button 
        @click="openAddModal"
        class="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <Plus class="w-4 h-4" />
        <span>添加平台</span>
      </button>
    </div>

    <!-- 活跃平台 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-800 flex items-center space-x-2">
        <div class="w-2 h-2 bg-green-400 rounded-full"></div>
        <span>活跃平台</span>
        <span class="text-sm text-gray-500">({{ activePlatforms.length }})</span>
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="platform in activePlatforms" 
          :key="platform.id"
          class="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
        >
          <div class="p-4">
            <!-- 平台头部 -->
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-3">
                <div 
                  :class="`w-10 h-10 ${getGradientClass(platform.gradient)} rounded-lg flex items-center justify-center`"
                >
                  <span class="text-lg">{{ platform.icon }}</span>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800">{{ platform.name }}</h4>
                  <p class="text-sm text-gray-600">{{ platform.description }}</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-1">
                <button 
                  @click="openEditModal(platform)"
                  class="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <Edit class="w-4 h-4" />
                </button>
                <button 
                  @click="deletePlatform(platform.id)"
                  class="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- 平台信息 -->
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <span class="text-xs text-gray-500">平台ID:</span>
                <span class="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{{ platform.id }}</span>
              </div>
              
              <div class="flex items-center space-x-2">
                <span class="text-xs text-gray-500">网站:</span>
                <a 
                  :href="platform.url" 
                  target="_blank"
                  class="text-xs text-blue-500 hover:text-blue-700 underline"
                >
                  {{ platform.url }}
                </a>
              </div>
              
              <div class="flex items-center space-x-2">
                <span class="text-xs text-gray-500">状态:</span>
                <span class="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  活跃
                </span>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="flex items-center justify-between mt-4">
              <button 
                @click="togglePlatformStatus(platform.id)"
                class="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                停用平台
              </button>
              <a 
                :href="platform.url" 
                target="_blank"
                class="flex items-center space-x-1 text-xs text-blue-500 hover:text-blue-700 transition-colors"
              >
                <span>访问</span>
                <Globe class="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 停用平台 -->
    <div v-if="inactivePlatforms.length > 0" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-800 flex items-center space-x-2">
        <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
        <span>停用平台</span>
        <span class="text-sm text-gray-500">({{ inactivePlatforms.length }})</span>
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="platform in inactivePlatforms" 
          :key="platform.id"
          class="bg-gray-50 rounded-lg border border-gray-200 opacity-75"
        >
          <div class="p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-3">
                <div 
                  :class="`w-10 h-10 ${getGradientClass(platform.gradient)} rounded-lg flex items-center justify-center`"
                >
                  <span class="text-lg">{{ platform.icon }}</span>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-600">{{ platform.name }}</h4>
                  <p class="text-sm text-gray-500">{{ platform.description }}</p>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                已停用
              </span>
              <button 
                @click="togglePlatformStatus(platform.id)"
                class="text-xs text-blue-500 hover:text-blue-700 transition-colors"
              >
                启用平台
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加平台模态框 -->
    <div 
      v-if="showAddModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">添加新平台</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </div>

        <div class="space-y-4">
          <!-- 基本信息 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">平台ID</label>
            <input 
              v-model="newPlatform.id"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="输入平台ID"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">平台名称</label>
            <input 
              v-model="newPlatform.name"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="输入平台名称"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">描述</label>
            <textarea 
              v-model="newPlatform.description"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="2"
              placeholder="输入平台描述"
            ></textarea>
          </div>

          <!-- 图标和颜色 -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">图标</label>
              <input 
                v-model="newPlatform.icon"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="选择图标"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">主题色</label>
              <select 
                v-model="newPlatform.color"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option v-for="color in colorOptions" :key="color.value" :value="color.value">
                  {{ color.label }}
                </option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">网站地址</label>
            <input 
              v-model="newPlatform.url"
              type="url" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="输入网站地址"
            />
          </div>

          <!-- 状态设置 -->
          <div class="flex items-center space-x-2">
            <input 
              type="checkbox" 
              v-model="newPlatform.isActive"
              class="rounded"
            />
            <label class="text-sm font-medium text-gray-700">启用平台</label>
          </div>
        </div>

        <div class="flex items-center justify-end space-x-3 mt-6">
          <button 
            @click="closeModals"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            取消
          </button>
          <button 
            @click="addPlatform"
            class="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Save class="w-4 h-4" />
            <span>保存</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 编辑平台模态框 -->
    <div 
      v-if="showEditModal && editingPlatform" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">编辑平台</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </div>

        <div class="space-y-4">
          <!-- 基本信息 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">平台ID</label>
            <input 
              v-model="editingPlatform.id"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">平台名称</label>
            <input 
              v-model="editingPlatform.name"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">描述</label>
            <textarea 
              v-model="editingPlatform.description"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="2"
            ></textarea>
          </div>

          <!-- 图标和颜色 -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">图标</label>
              <input 
                v-model="editingPlatform.icon"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">主题色</label>
              <select 
                v-model="editingPlatform.color"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option v-for="color in colorOptions" :key="color.value" :value="color.value">
                  {{ color.label }}
                </option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">网站地址</label>
            <input 
              v-model="editingPlatform.url"
              type="url" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- 状态设置 -->
          <div class="flex items-center space-x-2">
            <input 
              type="checkbox" 
              v-model="editingPlatform.isActive"
              class="rounded"
            />
            <label class="text-sm font-medium text-gray-700">启用平台</label>
          </div>
        </div>

        <div class="flex items-center justify-end space-x-3 mt-6">
          <button 
            @click="closeModals"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            取消
          </button>
          <button 
            @click="updatePlatform"
            class="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Save class="w-4 h-4" />
            <span>保存</span>
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
