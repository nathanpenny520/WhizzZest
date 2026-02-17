<template>
  <footer class="bg-gray-800 text-white py-12" role="contentinfo">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About Section -->
        <div>
          <h3 class="text-xl font-bold mb-4">{{ t('footer.about') }}</h3>
          <p class="text-gray-400">
            {{ t('footer.aboutDesc') }}
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xl font-bold mb-4">{{ t('footer.quickLinks') }}</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-gray-400 hover:text-white hover:underline transition-colors">
                {{ t('nav.home') }}
              </router-link>
            </li>
            <li>
              <router-link to="/culture" class="text-gray-400 hover:text-white hover:underline transition-colors">
                {{ t('nav.culture') }}
              </router-link>
            </li>
            <li>
              <router-link to="/food" class="text-gray-400 hover:text-white hover:underline transition-colors">
                {{ t('nav.food') }}
              </router-link>
            </li>
            <li>
              <router-link to="/industry" class="text-gray-400 hover:text-white hover:underline transition-colors">
                {{ t('nav.industry') }}
              </router-link>
            </li>
             <li>
              <router-link to="/routes" class="text-gray-400 hover:text-white hover:underline transition-colors">
                {{ t('nav.routes') }}
              </router-link>
            </li>
            <li>
              <router-link to="/viewing-spots" class="text-gray-400 hover:text-white hover:underline transition-colors">
                {{ t('nav.viewingSpots') }}
              </router-link>
            </li>
            <li>
              <router-link to="/map" class="text-gray-400 hover:text-white hover:underline transition-colors">
                {{ t('nav.map') }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- friendship Links -->
        <div>
          <h3 class="text-xl font-bold mb-4">{{ t('footer.friendLinks') }}</h3>
          <ul class="space-y-2">
            <li>
              <a href="http://www.wanzai.gov.cn/" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white hover:underline transition-colors">
                {{ t('footer.wanzaiGov') }}
              </a>
            </li>
            <li>
              <a href="https://www.douyin.com/user/MS4wLjABAAAAhy0jc-hMIansK5QmD-5fikKmvNrSA2qUn9qmDNFTsqOoVZX0TJa4VoLiNU-bBP_f?from_tab_name=main" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white hover:underline transition-colors">
                {{ t('footer.wanzaiDouyin') }}
              </a>
            </li>
            <li>
              <a href="https://www.chinafireworks.org.cn/" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white hover:underline transition-colors">
                {{ t('footer.chinaFireworks') }}
              </a>
            </li>
          </ul>
          
          <!-- WeChat Public Accounts -->
          <div class="mt-6 grid grid-cols-2 gap-4">
            <div class="flex flex-col items-center">
              <img src="@/assets/images/wanzai_gov_QR.jpg" alt="万载人民政府微信公众号" class="w-32 h-32 object-contain" loading="lazy">
              <p class="mt-2 text-sm text-gray-400 text-center">{{ t('footer.wechatGov') }}</p>
            </div>
            <div class="flex flex-col items-center">
              <img src="@/assets/images/wanzai_wenlv_QR.jpeg" alt="万载文旅微信公众号" class="w-32 h-32 object-contain" loading="lazy">
              <p class="mt-2 text-sm text-gray-400 text-center">{{ t('footer.wechatWenlv') }}</p>
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-xl font-bold mb-4">{{ t('footer.contact') }}</h3>
          <ul class="space-y-2">
            <li class="text-gray-400">
              <i class="fas fa-envelope mr-2"></i>
              nathanpenny@qq.com
            </li>
            <li class="text-gray-400">
              <i class="fas fa-globe mr-2"></i>
              <a href="https://github.com/nathanpenny520/WhizzZest.git" class="hover:text-white hover:underline transition-colors">
                {{ t('footer.github') }}
              </a>
            </li>
             <li class="text-gray-400">
              <i class="fas fa-globe mr-2"></i>
              <a href="https://gitee.com/nathanpenny520/WhizzZest.git" class="hover:text-white hover:underline transition-colors">
                {{ t('footer.gitee') }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>{{ t('footer.copyright') }} {{ new Date().getFullYear() }} {{ t('siteName') }} {{ t('footer.allRightsReserved') }}</p>
          <p class="mt-2">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="hover:text-white hover:underline transition-colors">
              {{ t('footer.icp') }}
            </a>
          </p>
        </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
