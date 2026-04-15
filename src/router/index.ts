import { createRouter, createWebHistory } from 'vue-router';
import i18n from '../locales';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue'),
    meta: {
      title: '焰境·万载 - 首页',
      locale: 'zh-CN'
    }
  },
  {
    path: '/en',
    name: 'HomeEn',
    component: () => import('../pages/HomePage.vue'),
    meta: {
      title: 'WhizzZest - Home',
      locale: 'en'
    }
  },
  {
    path: '/culture',
    name: 'Culture',
    component: () => import('../pages/CulturePage.vue'),
    meta: {
      title: '焰境·万载 - 非遗文化',
      locale: 'zh-CN'
    }
  },
  {
    path: '/en/culture',
    name: 'CultureEn',
    component: () => import('../pages/CulturePage.vue'),
    meta: {
      title: 'WhizzZest - Culture',
      locale: 'en'
    }
  },
  {
    path: '/food',
    name: 'Food',
    component: () => import('../pages/FoodPage.vue'),
    meta: {
      title: '焰境·万载 - 美食特产',
      locale: 'zh-CN'
    }
  },
  {
    path: '/en/food',
    name: 'FoodEn',
    component: () => import('../pages/FoodPage.vue'),
    meta: {
      title: 'WhizzZest - Food & Specialties',
      locale: 'en'
    }
  },
  {
    path: '/industry',
    name: 'Industry',
    component: () => import('../pages/IndustryPage.vue'),
    meta: {
      title: '焰境·万载 - 烟花产业',
      locale: 'zh-CN'
    }
  },
  {
    path: '/en/industry',
    name: 'IndustryEn',
    component: () => import('../pages/IndustryPage.vue'),
    meta: {
      title: 'WhizzZest - Fireworks Industry',
      locale: 'en'
    }
  },
  {
    path: '/routes',
    name: 'Routes',
    component: () => import('../pages/RoutesPage.vue'),
    meta: {
      title: '焰境·万载 - 旅游线路',
      locale: 'zh-CN'
    }
  },
  {
    path: '/en/routes',
    name: 'RoutesEn',
    component: () => import('../pages/RoutesPage.vue'),
    meta: {
      title: 'WhizzZest - Travel Routes',
      locale: 'en'
    }
  },
  {
    path: '/viewing-spots',
    name: 'ViewingSpots',
    component: () => import('../pages/ViewingSpotsPage.vue'),
    meta: {
      title: '焰境·万载 - 赏烟地点',
      locale: 'zh-CN'
    }
  },
  {
    path: '/en/viewing-spots',
    name: 'ViewingSpotsEn',
    component: () => import('../pages/ViewingSpotsPage.vue'),
    meta: {
      title: 'WhizzZest - Viewing Spots',
      locale: 'en'
    }
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../pages/MapPage.vue'),
    meta: {
      title: '焰境·万载 - 地图导览',
      locale: 'zh-CN'
    }
  },
  {
    path: '/en/map',
    name: 'MapEn',
    component: () => import('../pages/MapPage.vue'),
    meta: {
      title: 'WhizzZest - Map',
      locale: 'en'
    }
  },
  {
    path: '/merchant',
    name: 'Merchant',
    component: () => import('../pages/MerchantPage.vue'),
    meta: {
      title: '焰境·万载 - 商家展示',
      locale: 'zh-CN'
    }
  },
  {
    path: '/en/merchant',
    name: 'MerchantEn',
    component: () => import('../pages/MerchantPage.vue'),
    meta: {
      title: 'WhizzZest - Merchants',
      locale: 'en'
    }
  },
  {
    path: '/firework',
    name: 'Firework',
    component: () => import('../pages/FireworkPage.vue'),
    meta: {
      title: '焰境·万载 - 数字烟花',
      locale: 'zh-CN'
    }
  },
  {
    path: '/en/firework',
    name: 'FireworkEn',
    component: () => import('../pages/FireworkPage.vue'),
    meta: {
      title: 'WhizzZest - Digital Fireworks',
      locale: 'en'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    } else {
      // 滚动到页面最顶部
      return {
        top: 0,
        behavior: 'smooth'
      };
    }
  }
});

// Set document title and language based on route meta
router.beforeEach((to, _from, next) => {
  document.title = to.meta.title as string || '焰境·万载';
  
  const locale = to.meta.locale as string;
  if (locale && i18n.global.locale.value !== locale) {
    i18n.global.locale.value = locale as 'zh-CN' | 'en';
  }
  
  next();
});

export default router;