<template>
  <button
    @click="toggleLanguage"
    class="flex items-center space-x-1 text-sm text-gray-700 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1"
    :aria-label="isZhCN ? '切换到英文' : '切换到中文'"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
    <span>{{ isZhCN ? 'EN' : '中文' }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const isZhCN = ref(true);

onMounted(() => {
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale) {
    locale.value = savedLocale;
    isZhCN.value = savedLocale === 'zh-CN';
  }
});

const toggleLanguage = () => {
  isZhCN.value = !isZhCN.value;
  const newLocale = isZhCN.value ? 'zh-CN' : 'en';
  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);
  document.documentElement.lang = newLocale;
};
</script>
