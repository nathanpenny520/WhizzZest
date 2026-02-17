<template>
  <nav v-if="breadcrumbs.length > 1" aria-label="面包屑导航" class="mb-6">
    <ol class="flex items-center space-x-2 text-sm">
      <li>
        <router-link to="/" class="text-gray-500 hover:text-red-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </router-link>
      </li>
      <li v-for="(crumb, index) in breadcrumbs" :key="crumb.path" class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <router-link
          v-if="index < breadcrumbs.length - 1"
          :to="crumb.path"
          class="text-gray-500 hover:text-red-600 transition-colors"
        >
          {{ crumb.name }}
        </router-link>
        <span v-else class="text-gray-800 font-medium" aria-current="page">
          {{ crumb.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();

const routeNameMap: Record<string, string> = {
  '/': 'breadcrumb.home',
  '/culture': 'breadcrumb.culture',
  '/food': 'breadcrumb.food',
  '/industry': 'breadcrumb.industry',
  '/routes': 'breadcrumb.routes',
  '/viewing-spots': 'breadcrumb.viewingSpots',
  '/map': 'breadcrumb.map'
};

const breadcrumbs = computed(() => {
  const result: { path: string; name: string }[] = [];
  const path = route.path;
  
  if (path === '/') {
    result.push({ path: '/', name: t('breadcrumb.home') });
  } else {
    result.push({ path: '/', name: t('breadcrumb.home') });
    
    const pathSegments = path.split('/').filter(Boolean);
    let currentPath = '';
    
    for (const segment of pathSegments) {
      currentPath += '/' + segment;
      const translateKey = routeNameMap[currentPath];
      const name = translateKey ? t(translateKey) : segment;
      result.push({ path: currentPath, name });
    }
  }
  
  return result;
});
</script>
