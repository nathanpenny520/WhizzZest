<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section id="hero" class="relative h-[50vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          src="../assets/images/wanzai_travelling.jpeg"
          :alt="t('routes.hero.title')"
          class="w-full h-full object-cover"
          loading="eager"
        />
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('routes.hero.title') }}</h1>
        <p class="text-xl mb-6">{{ t('routes.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Routes Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <!-- 古城文化之旅 -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-6 text-center">{{ t('routes.routes.ancient') }}</h2>
          <div class="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div class="p-6">
              <h3 class="text-xl font-bold mb-4 text-red-600">{{ t('routes.routes.ancient') }}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p class="text-gray-600 mb-4">
                    {{ t('routes.routes.ancientMorning') }}
                  </p>
                  <p class="text-gray-600 mb-4">
                    {{ t('routes.routes.ancientNoon') }}
                  </p>
                  <p class="text-gray-600 mb-4">
                    {{ t('routes.routes.ancientAfternoon') }}
                  </p>
                  <p class="text-gray-600">
                    {{ t('routes.routes.ancientEvening') }}
                  </p>
                </div>
                <img
                  src="../assets/images/guc_wenhua_tra.jpg"
                  :alt="t('routes.routes.ancient')"
                  class="w-full h-100 object-contain rounded-lg bg-gray-100"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 山水文化之旅 -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-6 text-center">{{ t('routes.routes.mountain') }}</h2>
          <div class="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div class="p-6">
              <h3 class="text-xl font-bold mb-4 text-red-600">{{ t('routes.routes.mountain') }}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p class="text-gray-600 mb-4">
                    {{ t('routes.routes.mountainMorning') }}
                  </p>
                  <p class="text-gray-600 mb-4">
                    {{ t('routes.routes.mountainNoon') }}
                  </p>
                  <p class="text-gray-600 mb-4">
                    {{ t('routes.routes.mountainAfternoon') }}
                  </p>
                  <p class="text-gray-600">
                    {{ t('routes.routes.mountainEvening') }}
                  </p>
                </div>
                <img
                  src="../assets/images/shans_wenhua_tra.jpeg"
                  :alt="t('routes.routes.mountain')"
                  class="w-full h-100 object-contain rounded-lg bg-gray-100"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 红色文化之旅 -->
        <div>
          <h2 class="text-3xl font-bold mb-6 text-center">{{ t('routes.routes.red') }}</h2>
          <div class="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div class="p-6">
              <h3 class="text-xl font-bold mb-4 text-red-600">{{ t('routes.routes.red') }}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p class="text-gray-600 mb-4">
                    {{ t('routes.routes.redMorning') }}
                  </p>
                  <p class="text-gray-600 mb-4">
                    {{ t('routes.routes.redNoon') }}
                  </p>
                  <p class="text-gray-600 mb-4">
                    {{ t('routes.routes.redAfternoon') }}
                  </p>
                  <p class="text-gray-600">
                    {{ t('routes.routes.redEvening') }}
                  </p>
                </div>
                <img
                  src="../assets/images/hongs_wenhua_tra.jpg"
                  :alt="t('routes.routes.red')"
                  class="w-full h-100 object-contain rounded-lg bg-gray-100"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-red-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">{{ t('routes.cta.title') }}</h2>
        <p class="text-xl mb-8 max-w-3xl mx-auto">
          {{ t('routes.cta.desc') }}
        </p>
        <router-link
          to="/viewing-spots"
          class="inline-block bg-white hover:bg-gray-100 text-red-600 font-bold py-3 px-8 rounded-full transition-colors"
        >
          {{ t('routes.cta.cta') }}
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
/* Add any additional styles here */
</style>