<script setup lang="ts">
import { ArrowLeft, Heart, Users, Target, TrendingUp, Star } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- 返回按钮 -->
    <div class="fixed top-4 left-4 z-10">
      <button 
        @click="goBack"
        class="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <ArrowLeft class="w-4 h-4" />
        <span class="text-sm font-medium">返回首页</span>
      </button>
    </div>

    <!-- 信件内容 -->
    <div class="max-w-3xl mx-auto px-6 py-12">
      <!-- 信件样式容器 -->
      <div class="letter-paper bg-white shadow-lg">
        <!-- 信件内容 -->
        <div class="p-8 space-y-4">
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
</template>

<style scoped>
/* 信件样式 */
.letter-paper {
  background: linear-gradient(transparent 0%, transparent 24px, #e5e5e5 25px, #e5e5e5 26px, transparent 27px, transparent 49px, #e5e5e5 50px, #e5e5e5 51px, transparent 52px);
  background-size: 100% 50px;
  border: 1px solid #d1d5db;
  min-height: 600px;
}
</style>
