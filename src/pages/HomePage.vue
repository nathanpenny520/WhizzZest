<template>
  <div class="min-h-screen">
    <!-- Hero Section with Carousel -->
    <section id="hero" class="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <!-- Carousel Container -->
      <div class="absolute inset-0 z-0 overflow-hidden">
        <!-- Carousel Slides -->
        <div 
          class="w-full h-full flex transition-transform duration-1000 ease-in-out"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div 
            v-for="(item, index) in displaySlides" 
            :key="index"
            class="w-full h-full flex-shrink-0"
          >
            <img
              :src="item.image"
              :alt="item.alt"
              class="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <!-- Navigation Buttons -->
        <button 
          @click="goToPrev"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all z-10"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          @click="goToNext"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all z-10"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <!-- Indicators -->
        <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
          <button 
            v-for="(_, index) in carouselItems" 
            :key="index"
            @click="goToSlide(index)"
            class="w-2 h-2 rounded-full transition-all"
            :class="activeSlide === index ? 'bg-white w-6' : 'bg-white bg-opacity-50'"
            :aria-label="`Go to slide ${index + 1}`"
          ></button>
        </div>
      </div>
      
      <!-- Hero Content -->
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">{{ t('home.hero.title') }}</h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          {{ t('home.hero.subtitle') }}
        </p>
        <div class="flex justify-center">
          <router-link
            to="/routes"
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
          >
            {{ t('home.hero.cta') }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">{{ t('home.features.title') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div id="icon-fireworks" class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <i class="fas fa-fire text-2xl text-red-600"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">{{ t('home.features.fireworks.title') }}</h3>
            <p class="text-gray-600">
              {{ t('home.features.fireworks.desc') }}
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div id="icon-food" class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <i class="fas fa-utensils text-2xl text-red-600"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">{{ t('home.features.food.title') }}</h3>
            <p class="text-gray-600">
              {{ t('home.features.food.desc') }}
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div id="icon-tourism" class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <i class="fas fa-map-marked-alt text-2xl text-red-600"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">{{ t('home.features.tourism.title') }}</h3>
            <p class="text-gray-600">
              {{ t('home.features.tourism.desc') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Culture Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="md:w-1/2">
            <h2 class="text-3xl font-bold mb-4">{{ t('home.culture.title') }}</h2>
            <p class="text-gray-600 mb-6">
              {{ t('home.culture.desc') }}
            </p>
            <router-link
              to="/culture"
              class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
              {{ t('home.culture.learnMore') }}
            </router-link>
          </div>
          <div class="md:w-1/2">
            <img
              src="../assets/images/nuowu.jpeg"
              :alt="t('home.culture.title')"
              class="w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Food Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row-reverse items-center gap-8">
          <div class="md:w-1/2">
            <h2 class="text-3xl font-bold mb-4">{{ t('home.food.title') }}</h2>
            <p class="text-gray-600 mb-6">
              {{ t('home.food.desc') }}
            </p>
            <router-link
              to="/food"
              class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
              {{ t('home.food.learnMore') }}
            </router-link>
          </div>
          <div class="md:w-1/2">
            <img
              src="../assets/images/liudawan.jpeg"
              :alt="t('home.food.title')"
              class="w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Industry Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="md:w-1/2">
            <h2 class="text-3xl font-bold mb-4">{{ t('home.industry.title') }}</h2>
            <p class="text-gray-600 mb-6">
              {{ t('home.industry.desc') }}
            </p>
            <router-link
              to="/industry"
              class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
              {{ t('home.industry.learnMore') }}
            </router-link>
          </div>
          <div class="md:w-1/2">
            <img
              src="../assets/images/longhu_yanhuowanhui.jpeg"
              :alt="t('home.industry.title')"
              class="w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Music Player Section -->
    <MusicPlayer />

    <!-- CTA Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">{{ t('home.cta.title') }}</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {{ t('home.cta.desc') }}
        </p>
        <router-link
          to="/routes"
          class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
        >
          {{ t('home.cta.viewRoutes') }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import MusicPlayer from '../components/MusicPlayer.vue';

const { t } = useI18n();

import image1 from '../assets/images/yzxf_bswz.jpeg';
import image2 from '../assets/images/guchen_xuejing.png';
import image3 from '../assets/images/sanshiba_pool.jpeg';
import image4 from '../assets/images/xianyuanyanxue.jpg';

const currentSlide = ref(0);
const activeSlide = ref(0);
const isAnimating = ref(false);

const carouselItems = ref([
  {
    image: image1,
    alt: '一朝相逢，便是万载'
  },
  {
    image: image2,
    alt: '万载古城'
  },
  {
    image: image3,
    alt: '三十把水库'
  },
  {
    image: image4,
    alt: '万载仙源研学'
  }
]);

const displaySlides = computed(() => {
  return carouselItems.value;
});

const goToSlide = (index: number) => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  currentSlide.value = index;
  activeSlide.value = index;
  setTimeout(() => {
    isAnimating.value = false;
  }, 1000);
};

const goToNext = () => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  const nextIndex = (currentSlide.value + 1) % carouselItems.value.length;
  currentSlide.value = nextIndex;
  activeSlide.value = nextIndex;
  setTimeout(() => {
    isAnimating.value = false;
  }, 1000);
};

const goToPrev = () => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  const prevIndex = (currentSlide.value - 1 + carouselItems.value.length) % carouselItems.value.length;
  currentSlide.value = prevIndex;
  activeSlide.value = prevIndex;
  setTimeout(() => {
    isAnimating.value = false;
  }, 1000);
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    goToPrev();
  } else if (event.key === 'ArrowRight') {
    goToNext();
  }
};

const svgIconConfig = {
  fireworks: {
    elementId: 'icon-fireworks',
    svgPath: '/icons/firework.svg',
    fallbackIcon: 'fas fa-fire'
  },
  food: {
    elementId: 'icon-food',
    svgPath: '/icons/food.svg',
    fallbackIcon: 'fas fa-utensils'
  },
  tourism: {
    elementId: 'icon-tourism',
    svgPath: '/icons/travelling.svg',
    fallbackIcon: 'fas fa-map-marked-alt'
  }
};

const loadSvgIcon = async (iconKey: keyof typeof svgIconConfig, svgPath: string) => {
  const config = svgIconConfig[iconKey];
  if (!config) {
    console.error(`Icon configuration not found for key: ${iconKey}`);
    return;
  }

  config.svgPath = svgPath;

  try {
    const element = document.getElementById(config.elementId);
    if (!element) {
      console.error(`Element not found with id: ${config.elementId}`);
      return;
    }

    const response = await fetch(svgPath);
    if (!response.ok) {
      throw new Error(`Failed to load SVG: ${response.status}`);
    }

    const svgContent = await response.text();

    element.innerHTML = '';

    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = svgContent;
    const importedSvg = tempDiv.querySelector('svg');
    
    if (importedSvg) {
      Array.from(importedSvg.attributes).forEach(attr => {
        svgElement.setAttribute(attr.name, attr.value);
      });
      
      while (importedSvg.firstChild) {
        svgElement.appendChild(importedSvg.firstChild);
      }
    }

    svgElement.setAttribute('class', 'w-10 h-10 text-red-600');
    svgElement.setAttribute('style', 'max-width: 100%; max-height: 100%;');

    element.appendChild(svgElement);

    console.log(`SVG icon loaded successfully for ${iconKey}`);
  } catch (error) {
    console.error(`Error loading SVG icon for ${iconKey}:`, error);
    useFallbackIcon(iconKey);
  }
};

const useFallbackIcon = (iconKey: keyof typeof svgIconConfig) => {
  const config = svgIconConfig[iconKey];
  if (!config) return;

  const element = document.getElementById(config.elementId);
  if (!element) return;

  element.innerHTML = `<i class="${config.fallbackIcon} text-2xl text-red-600"></i>`;
};

const loadAllSvgIcons = async (iconPaths: Record<keyof typeof svgIconConfig, string>) => {
  const loadPromises = Object.entries(iconPaths).map(([key, path]) => {
    return loadSvgIcon(key as keyof typeof svgIconConfig, path);
  });

  await Promise.all(loadPromises);
};

onMounted(() => {
  loadAllSvgIcons({
    fireworks: '/icons/firework.svg',
    food: '/icons/food.svg',
    tourism: '/icons/travelling.svg'
  });
  
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

defineExpose({
  loadSvgIcon,
  loadAllSvgIcons,
  svgIconConfig
});
</script>

<style scoped>
</style>
