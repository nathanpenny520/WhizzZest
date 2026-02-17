import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue'),
    meta: {
      title: '焰境·万载 - 首页'
    }
  },
  {
    path: '/culture',
    name: 'Culture',
    component: () => import('../pages/CulturePage.vue'),
    meta: {
      title: '焰境·万载 - 非遗文化'
    }
  },
  {
    path: '/food',
    name: 'Food',
    component: () => import('../pages/FoodPage.vue'),
    meta: {
      title: '焰境·万载 - 美食特产'
    }
  },
  {
    path: '/industry',
    name: 'Industry',
    component: () => import('../pages/IndustryPage.vue'),
    meta: {
      title: '焰境·万载 - 烟花产业'
    }
  },

  {
    path: '/routes',
    name: 'Routes',
    component: () => import('../pages/RoutesPage.vue'),
    meta: {
      title: '焰境·万载 - 旅游线路'
    }
  },
  {
    path: '/viewing-spots',
    name: 'ViewingSpots',
    component: () => import('../pages/ViewingSpotsPage.vue'),
    meta: {
      title: '焰境·万载 - 赏烟地点'
    }
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../pages/MapPage.vue'),
    meta: {
      title: '焰境·万载 - 地图导览'
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

// Set document title based on route meta
router.beforeEach((to, _from, next) => {
  document.title = to.meta.title as string || '焰境·万载';
  next();
});

export default router;