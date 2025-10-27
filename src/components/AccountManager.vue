<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, Edit, Trash2, Save, X, Users, Globe, Star } from 'lucide-vue-next'
import { useFansStore } from '@/stores/fans'
import type { MatrixAccount, CommunityType } from '@/types'

const fansStore = useFansStore()

// 状态管理
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingAccount = ref<MatrixAccount | null>(null)

// 新账号表单
const newAccount = ref({
  name: '',
  displayName: '',
  description: '',
  avatar: '👤',
  themeColor: 'blue',
  platforms: [] as CommunityType[],
  isMain: false,
  verticalField: ''
})

// 平台配置
const platformOptions: Array<{ value: CommunityType; label: string; icon: string }> = [
  { value: 'csdn', label: 'CSDN', icon: '📝' },
  { value: 'juejin', label: '掘金', icon: '⛏️' },
  { value: 'toutiao', label: '头条', icon: '📰' },
  { value: 'zhihu', label: '知乎', icon: '🧠' },
  { value: '_51cto', label: '51CTO', icon: '💻' },
  { value: 'wechat', label: '微信', icon: '💬' },
  { value: 'weibo', label: '微博', icon: '🐦' },
  { value: 'infoq', label: 'InfoQ', icon: 'ℹ️' },
  { value: 'xiaohongshu', label: '小红书', icon: '📖' }
]

const themeColors = [
  { value: 'blue', label: '蓝色', class: 'bg-blue-500' },
  { value: 'green', label: '绿色', class: 'bg-green-500' },
  { value: 'purple', label: '紫色', class: 'bg-purple-500' },
  { value: 'pink', label: '粉色', class: 'bg-pink-500' },
  { value: 'orange', label: '橙色', class: 'bg-orange-500' },
  { value: 'red', label: '红色', class: 'bg-red-500' },
  { value: 'amber', label: '琥珀色', class: 'bg-amber-500' },
  { value: 'cyan', label: '青色', class: 'bg-cyan-500' }
]

// 计算属性
const accounts = computed(() => fansStore.matrixAccounts)

// 方法
const openAddModal = () => {
  newAccount.value = {
    name: '',
    displayName: '',
    description: '',
    avatar: '👤',
    themeColor: 'blue',
    platforms: [],
    isMain: false,
    verticalField: ''
  }
  showAddModal.value = true
}

const openEditModal = (account: MatrixAccount) => {
  editingAccount.value = { ...account }
  showEditModal.value = true
}

const closeModals = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingAccount.value = null
}

const addAccount = () => {
  if (!newAccount.value.name || !newAccount.value.displayName) return
  
  const account: MatrixAccount = {
    id: `account-${Date.now()}`,
    name: newAccount.value.name,
    displayName: newAccount.value.displayName,
    description: newAccount.value.description,
    avatar: newAccount.value.avatar,
    themeColor: newAccount.value.themeColor,
    status: 'active',
    platforms: newAccount.value.platforms,
    isMain: newAccount.value.isMain,
    verticalField: newAccount.value.verticalField || '未分类'
  }
  
  fansStore.matrixAccounts.push(account)
  closeModals()
}

const updateAccount = () => {
  if (!editingAccount.value) return
  
  const index = fansStore.matrixAccounts.findIndex(acc => acc.id === editingAccount.value!.id)
  if (index !== -1) {
    fansStore.matrixAccounts[index] = { ...editingAccount.value }
  }
  closeModals()
}

const deleteAccount = (accountId: string) => {
  if (confirm('确定要删除这个账号吗？此操作不可撤销。')) {
    const index = fansStore.matrixAccounts.findIndex(acc => acc.id === accountId)
    if (index !== -1) {
      fansStore.matrixAccounts.splice(index, 1)
    }
  }
}

const togglePlatform = (platform: CommunityType) => {
  if (editingAccount.value) {
    const index = editingAccount.value.platforms.indexOf(platform)
    if (index > -1) {
      editingAccount.value.platforms.splice(index, 1)
    } else {
      editingAccount.value.platforms.push(platform)
    }
  } else {
    const index = newAccount.value.platforms.indexOf(platform)
    if (index > -1) {
      newAccount.value.platforms.splice(index, 1)
    } else {
      newAccount.value.platforms.push(platform)
    }
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-6">
    <div class="space-y-6">
      <!-- 头部操作栏 -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Users class="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 class="text-lg font-semibold text-gray-800">账号管理</h2>
          <p class="text-sm text-gray-600">管理你的矩阵账号</p>
        </div>
      </div>
      
      <button 
        @click="openAddModal"
        class="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <Plus class="w-4 h-4" />
        <span>添加账号</span>
      </button>
    </div>

    <!-- 账号列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="account in accounts" 
        :key="account.id"
        class="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
      >
        <div class="p-4">
          <!-- 账号头部 -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <div 
                :class="`w-10 h-10 bg-gradient-to-br from-${account.themeColor}-400 to-${account.themeColor}-600 rounded-lg flex items-center justify-center`"
              >
                <span class="text-lg">{{ account.avatar }}</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">{{ account.displayName }}</h3>
                <p class="text-sm text-gray-600">{{ account.name }}</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-1">
              <button 
                @click="openEditModal(account)"
                class="p-1 text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Edit class="w-4 h-4" />
              </button>
              <button 
                @click="deleteAccount(account.id)"
                class="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- 账号描述 -->
          <p class="text-sm text-gray-600 mb-3">{{ account.description }}</p>

          <!-- 状态标签 -->
          <div class="flex items-center space-x-2 mb-3">
            <span 
              :class="`px-2 py-1 text-xs rounded-full ${
                account.status === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`"
            >
              {{ account.status === 'active' ? '活跃' : '暂停' }}
            </span>
            <span 
              v-if="account.isMain"
              class="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full"
            >
              主账号
            </span>
          </div>

          <!-- 平台标签 -->
          <div class="flex flex-wrap gap-1">
            <span 
              v-for="platform in account.platforms" 
              :key="platform"
              class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
            >
              {{ platformOptions.find(p => p.value === platform)?.label || platform }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加账号模态框 -->
    <div 
      v-if="showAddModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">添加新账号</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </div>

        <div class="space-y-4">
          <!-- 基本信息 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">账号名称</label>
            <input 
              v-model="newAccount.name"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="输入账号名称"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">显示名称</label>
            <input 
              v-model="newAccount.displayName"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="输入显示名称"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">描述</label>
            <textarea 
              v-model="newAccount.description"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="2"
              placeholder="输入账号描述"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">垂直领域</label>
            <input 
              v-model="newAccount.verticalField"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="如：编程领域、AI大模型、职场发展等"
            />
          </div>

          <!-- 头像和主题色 -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">头像</label>
              <input 
                v-model="newAccount.avatar"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="选择头像"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">主题色</label>
              <select 
                v-model="newAccount.themeColor"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option v-for="color in themeColors" :key="color.value" :value="color.value">
                  {{ color.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- 平台选择 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">选择平台</label>
            <div class="grid grid-cols-3 gap-2">
              <label 
                v-for="platform in platformOptions" 
                :key="platform.value"
                class="flex items-center space-x-2 p-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input 
                  type="checkbox" 
                  :value="platform.value"
                  v-model="newAccount.platforms"
                  class="rounded"
                />
                <span class="text-sm">{{ platform.icon }} {{ platform.label }}</span>
              </label>
            </div>
          </div>

          <!-- 主账号设置 -->
          <div class="flex items-center space-x-2">
            <input 
              type="checkbox" 
              v-model="newAccount.isMain"
              class="rounded"
            />
            <label class="text-sm font-medium text-gray-700">设为主账号</label>
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
            @click="addAccount"
            class="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Save class="w-4 h-4" />
            <span>保存</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 编辑账号模态框 -->
    <div 
      v-if="showEditModal && editingAccount" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">编辑账号</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </div>

        <div class="space-y-4">
          <!-- 基本信息 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">账号名称</label>
            <input 
              v-model="editingAccount.name"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">显示名称</label>
            <input 
              v-model="editingAccount.displayName"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">描述</label>
            <textarea 
              v-model="editingAccount.description"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="2"
            ></textarea>
          </div>

          <!-- 头像和主题色 -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">头像</label>
              <input 
                v-model="editingAccount.avatar"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">主题色</label>
              <select 
                v-model="editingAccount.themeColor"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option v-for="color in themeColors" :key="color.value" :value="color.value">
                  {{ color.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- 平台选择 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">选择平台</label>
            <div class="grid grid-cols-3 gap-2">
              <label 
                v-for="platform in platformOptions" 
                :key="platform.value"
                class="flex items-center space-x-2 p-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input 
                  type="checkbox" 
                  :value="platform.value"
                  :checked="editingAccount.platforms.includes(platform.value)"
                  @change="togglePlatform(platform.value)"
                  class="rounded"
                />
                <span class="text-sm">{{ platform.icon }} {{ platform.label }}</span>
              </label>
            </div>
          </div>

          <!-- 主账号设置 -->
          <div class="flex items-center space-x-2">
            <input 
              type="checkbox" 
              v-model="editingAccount.isMain"
              class="rounded"
            />
            <label class="text-sm font-medium text-gray-700">设为主账号</label>
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
            @click="updateAccount"
            class="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Save class="w-4 h-4" />
            <span>保存</span>
          </button>
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
  background: #3b82f6;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2563eb;
}
</style>
