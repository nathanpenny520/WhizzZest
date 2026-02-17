<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section id="hero" class="relative h-[50vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          src="../assets/images/shouhui_map.jpg"
          :alt="t('map.hero.title')"
          class="w-full h-full object-cover"
          loading="eager"
        />
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('map.hero.title') }}</h1>
        <p class="text-xl mb-6">{{ t('map.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Static Map Section -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <div class="bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <!-- Static Map Image -->
          <div class="w-full aspect-[4/3] relative">
            <img 
              src="../assets/images/tra_map.jpg"
              alt="万载旅游手绘地图"
              class="w-full h-full object-contain"
              loading="lazy"
            />
            <div class="absolute bottom-4 right-4 bg-white bg-opacity-80 px-4 py-2 rounded-full text-sm">
              万载旅游手绘地图
            </div>
          </div>
          <!-- Additional Images -->
          <div class="w-full space-y-6 p-4">
            <img 
              src="../assets/images/site_intro_1.jpg"
              alt="万载景点介绍"
              class="w-full h-auto object-contain"
              loading="lazy"
            />
            <img 
              src="../assets/images/site_intro_2.jpg"
              alt="万载景点介绍2"
              class="w-full h-auto object-contain"
              loading="lazy"
            />
            <img 
              src="../assets/images/site_intro_3.jpg"
              alt="万载景点介绍3"
              class="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

   
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
/* Add any additional styles here */
</style>