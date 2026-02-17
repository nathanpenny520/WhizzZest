<template>
  <nav class="bg-white shadow-md" role="navigation" aria-label="主导航">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <router-link to="/" class="flex items-center space-x-2 text-2xl font-bold text-red-600" @click="closeMobileMenu">
            <img src="/favicon.svg" :alt="t('nav.home')" class="h-8 w-auto">
            {{ t('siteName') }}
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="text-gray-700 hover:text-red-600 font-medium transition-colors" active-class="text-red-600">
            {{ t('nav.home') }}
          </router-link>
          <router-link to="/culture" class="text-gray-700 hover:text-red-600 font-medium transition-colors" active-class="text-red-600">
            {{ t('nav.culture') }}
          </router-link>
          <router-link to="/food" class="text-gray-700 hover:text-red-600 font-medium transition-colors" active-class="text-red-600">
            {{ t('nav.food') }}
          </router-link>
          <router-link to="/industry" class="text-gray-700 hover:text-red-600 font-medium transition-colors" active-class="text-red-600">
            {{ t('nav.industry') }}
          </router-link>

          <router-link to="/routes" class="text-gray-700 hover:text-red-600 font-medium transition-colors" active-class="text-red-600">
            {{ t('nav.routes') }}
          </router-link>
          <router-link to="/viewing-spots" class="text-gray-700 hover:text-red-600 font-medium transition-colors" active-class="text-red-600">
            {{ t('nav.viewingSpots') }}
          </router-link>
          <router-link to="/map" class="text-gray-700 hover:text-red-600 font-medium transition-colors" active-class="text-red-600">
            {{ t('nav.map') }}
          </router-link>
          
          <!-- Language Switcher -->
          <LanguageSwitcher />
        </div>

        <!-- Mobile Navigation Button -->
        <div class="md:hidden">
          <button 
            @click="toggleMobileMenu" 
            class="text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
            :aria-expanded="mobileMenuOpen"
            aria-controls="mobile-menu"
            aria-label="切换移动菜单"
          >
            <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <transition name="slide">
        <div v-if="mobileMenuOpen" id="mobile-menu" class="md:hidden py-4 space-y-4 overflow-hidden" role="menu">
          <router-link 
            to="/" 
            class="block text-gray-700 hover:text-red-600 font-medium transition-colors" 
            @click="closeMobileMenu"
            role="menuitem"
          >
            {{ t('nav.home') }}
          </router-link>
          <router-link 
            to="/culture" 
            class="block text-gray-700 hover:text-red-600 font-medium transition-colors" 
            @click="closeMobileMenu"
            role="menuitem"
          >
            {{ t('nav.culture') }}
          </router-link>
          <router-link 
            to="/food" 
            class="block text-gray-700 hover:text-red-600 font-medium transition-colors" 
            @click="closeMobileMenu"
            role="menuitem"
          >
            {{ t('nav.food') }}
          </router-link>
          <router-link 
            to="/industry" 
            class="block text-gray-700 hover:text-red-600 font-medium transition-colors" 
            @click="closeMobileMenu"
            role="menuitem"
          >
            {{ t('nav.industry') }}
          </router-link>

          <router-link 
            to="/routes" 
            class="block text-gray-700 hover:text-red-600 font-medium transition-colors" 
            @click="closeMobileMenu"
            role="menuitem"
          >
            {{ t('nav.routes') }}
          </router-link>
          <router-link 
            to="/viewing-spots" 
            class="block text-gray-700 hover:text-red-600 font-medium transition-colors" 
            @click="closeMobileMenu"
            role="menuitem"
          >
            {{ t('nav.viewingSpots') }}
          </router-link>
          <router-link 
            to="/map" 
            class="block text-gray-700 hover:text-red-600 font-medium transition-colors" 
            @click="closeMobileMenu"
            role="menuitem"
          >
            {{ t('nav.map') }}
          </router-link>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from './LanguageSwitcher.vue';

const { t } = useI18n();
const route = useRoute();
const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

watch(() => route.path, () => {
  closeMobileMenu();
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
