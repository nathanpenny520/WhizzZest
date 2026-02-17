<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section id="hero" class="relative h-[50vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          src="../assets/images/nuowu.jpeg"
          :alt="t('culture.hero.title')"
          class="w-full h-full object-cover"
          loading="eager"
        />
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('culture.hero.title') }}</h1>
        <p class="text-xl mb-6">{{ t('culture.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Culture List Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <!-- 万载花炮 -->
        <div class="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div class="md:w-1/2">
            <div class="video-container relative w-full rounded-lg shadow-lg overflow-hidden bg-gray-900 aspect-video">
              <iframe 
                style="width: 100%; height: 100%;" 
                frameborder="no" 
                allowfullscreen 
                mozallowfullscreen 
                webkitallowfullscreen 
                src="//go.plvideo.cn/front/video/preview?vid=j23a58c7fde33063d6f20d346fc4f64f_j"
              ></iframe>
            </div>
            <p class="text-sm text-gray-600 mt-3">{{ t('common.videoHint') }}</p>
          </div>
          <div class="md:w-1/2">
            <h2 class="text-2xl font-bold mb-4 text-red-600">{{ t('culture.sections.fireworks.title') }}</h2>
            <p class="text-gray-600 mb-4">
              {{ t('culture.sections.fireworks.desc1') }}
            </p>
            <p class="text-gray-600 mb-4">
              {{ t('culture.sections.fireworks.desc2') }}
            </p>
            <p class="text-gray-600">
              {{ t('culture.sections.fireworks.desc3') }}
            </p>
          </div>
        </div>

        <!-- 得胜鼓 -->
         <div class="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div class="md:w-1/2">
            <div class="video-container relative w-full rounded-lg shadow-lg overflow-hidden bg-gray-900 aspect-video">
              <iframe 
                style="width: 100%; height: 100%;" 
                frameborder="no" 
                allowfullscreen 
                mozallowfullscreen 
                webkitallowfullscreen 
                src="//go.plvideo.cn/front/video/preview?vid=j23a58c7fda122f6725d8b17dba3585f_j"
              ></iframe>
            </div>
            <p class="text-sm text-gray-600 mt-3">{{ t('common.videoHint') }}</p>
          </div>
          <div class="md:w-1/2">
            <h2 class="text-2xl font-bold mb-4 text-red-600">{{ t('culture.sections.deshenggu.title') }}</h2>
            <p class="text-gray-600 mb-4">
              {{ t('culture.sections.deshenggu.desc1') }}
            </p>
            <p class="text-gray-600 mb-4">
              {{ t('culture.sections.deshenggu.desc2') }}
            </p>
            <p class="text-gray-600">
              {{ t('culture.sections.deshenggu.desc3') }}
            </p>
          </div>
        </div>

       <!-- 夏布织造 -->
        <div class="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div class="md:w-1/2">
            <div class="video-container relative w-full rounded-lg shadow-lg overflow-hidden bg-gray-900 aspect-video">
              <iframe 
                style="width: 100%; height: 100%;" 
                frameborder="no" 
                allowfullscreen 
                mozallowfullscreen 
                webkitallowfullscreen 
                src="//go.plvideo.cn/front/video/preview?vid=j23a58c7fd22c51deb6cc67589260f5a_j"
              ></iframe>
            </div>
            <p class="text-sm text-gray-600 mt-3">{{ t('common.videoHint') }}</p>
          </div>
          <div class="md:w-1/2">
            <h2 class="text-2xl font-bold mb-4 text-red-600">{{ t('culture.sections.xiaBu.title') }}</h2>
            <p class="text-gray-600 mb-4">
              {{ t('culture.sections.xiaBu.desc1') }}
            </p>
            <p class="text-gray-600 mb-4">
              {{ t('culture.sections.xiaBu.desc2') }}
            </p>
            <p class="text-gray-600">
              {{ t('culture.sections.xiaBu.desc3') }}
            </p>
          </div>

        </div>

        <!-- 万载开口傩 -->
        <div class="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div class="md:w-1/2">
            <div class="video-container relative w-full rounded-lg shadow-lg overflow-hidden bg-gray-900 aspect-video">
              <iframe 
                style="width: 100%; height: 100%;" 
                frameborder="no" 
                allowfullscreen 
                mozallowfullscreen 
                webkitallowfullscreen 
                src="//go.plvideo.cn/front/video/preview?vid=j23a58c7fddade1263ff8c5de2bf4a15_j"
              ></iframe>
            </div>
            <p class="text-sm text-gray-600 mt-3">{{ t('common.videoHint') }}</p>
          </div>
          <div class="md:w-1/2">
            <h2 class="text-2xl font-bold mb-4 text-red-600">{{ t('culture.sections.kaiKouNuo.title') }}</h2>
            <p class="text-gray-600 mb-4">
              {{ t('culture.sections.kaiKouNuo.desc1') }}
            </p>
            <p class="text-gray-600 mb-4">
              {{ t('culture.sections.kaiKouNuo.desc2') }}
            </p>
            <p class="text-gray-600">
              {{ t('culture.sections.kaiKouNuo.desc3') }}
            </p>
          </div>
        </div>

       <!-- 纸棚山歌 -->
        <div class="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div class="md:w-1/2">
            <div class="video-container relative w-full rounded-lg shadow-lg overflow-hidden bg-gray-900 aspect-video">
              <iframe 
                style="width: 100%; height: 100%;" 
                frameborder="no" 
                allowfullscreen 
                mozallowfullscreen 
                webkitallowfullscreen 
                src="//go.plvideo.cn/front/video/preview?vid=j23a58c7fddfc358e618f35b5edfcf4b_j"
              ></iframe>
            </div>
            <p class="text-sm text-gray-600 mt-3">{{ t('common.videoHint') }}</p>
          </div>
          <div class="md:w-1/2">
            <h2 class="text-2xl font-bold mb-4 text-red-600">{{ t('culture.sections.zhiPeng.title') }}</h2>
            <p class="text-gray-600 mb-4">
              {{ t('culture.sections.zhiPeng.desc1') }}
            </p>
            <p class="text-gray-600 mb-4">
              {{ t('culture.sections.zhiPeng.desc2') }}
            </p>
            <p class="text-gray-600">
              {{ t('culture.sections.zhiPeng.desc3') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    
    <!-- CTA Section -->
    <section class="py-16 bg-red-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">{{ t('culture.cta.title') }}</h2>
        <p class="text-xl mb-8 max-w-3xl mx-auto">
          {{ t('culture.cta.desc') }}
        </p>
        <router-link
          to="/routes"
          class="inline-block bg-white hover:bg-gray-100 text-red-600 font-bold py-3 px-8 rounded-full transition-colors"
        >
          {{ t('common.viewRoutes') }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

@media (max-width: 768px) {
  .video-container {
    aspect-ratio: 16/9;
  }
}

@media (max-width: 640px) {
  .video-container {
    min-height: 200px;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .video-container {
    min-height: 300px;
  }
}

@media (min-width: 1025px) {
  .video-container {
    min-height: 400px;
  }
}
</style>