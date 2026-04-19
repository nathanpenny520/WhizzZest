<template>
  <!-- SEO head 组件不需要渲染任何内容 -->
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// 导入图片获取打包后的真实URL
import yzxfBswzImg from '../assets/images/yzxf_bswz.jpeg';
import nuowuImg from '../assets/images/nuowu.jpeg';
import liudawanImg from '../assets/images/liudawan.jpeg';
import hezuoqiyeImg from '../assets/images/hezuoqiye.png';
import studentTeamImg from '../assets/images/student-team.jpg';
import huapaoFutureImg from '../assets/images/huapao_future.jpeg';
import wanzaiTravellingImg from '../assets/images/wanzai_travelling.jpeg';
import viewingspotsHeroImg from '../assets/images/viewingspots_hero.jpeg';
import shouhuiMapImg from '../assets/images/shouhui_map.jpg';

const route = useRoute();
const baseUrl = 'https://www.whizzzest-yanjingwanzai.top';

const seoData = computed(() => {
  const path = route.path;

  const pageSeo: Record<string, any> = {
    // 中文页面
    '/': {
      title: '焰境·万载 - 花炮之乡 | 江西万载文旅宣传网站',
      description: '探索千年烟花文化，体验非遗魅力，品味特色美食，领略万载风光。万载是中国花炮之乡，拥有1400多年烟花生产历史。',
      keywords: '万载,烟花,非遗,旅游,江西,万载古城,烟花之乡,万载花炮,得胜鼓,开口傩,万载美食,万载旅游',
      ogTitle: '焰境·万载 - 花炮之乡 | 江西万载文旅宣传网站',
      image: yzxfBswzImg
    },
    '/culture': {
      title: '非遗文化 - 焰境·万载',
      description: '探索万载千年传承的非物质文化遗产，包括万载花炮、得胜鼓、万载开口傩、夏布织造等，感受传统文化的魅力。',
      keywords: '万载非遗,得胜鼓,开口傩,夏布织造,非物质文化遗产,万载文化',
      ogTitle: '万载非遗文化 - 千年传承的烟花技艺',
      image: nuowuImg
    },
    '/food': {
      title: '美食特产 - 焰境·万载',
      description: '品尝万载六大碗、万载百合、罗城扎粉等特色美食，感受赣西独特的饮食文化。',
      keywords: '万载美食,万载特产,六大碗,罗城扎粉,万载百合,赣西美食',
      ogTitle: '万载美食特产 - 赣西特色美食',
      image: liudawanImg
    },
    '/industry': {
      title: '烟花产业 - 焰境·万载',
      description: '万载作为中国四大花炮主产区之一，烟花产业历史悠久，技术先进，产品畅销全球。',
      keywords: '万载烟花,花炮产业,中国花炮之乡,烟花制造,万载烟花企业',
      ogTitle: '万载烟花产业 - 中国花炮之乡',
      image: huapaoFutureImg
    },
    '/routes': {
      title: '旅游线路 - 焰境·万载',
      description: '精心设计的万载旅游路线，带您领略千年烟花文化的魅力。',
      keywords: '万载旅游线路,万载古城一日游,万载自驾游,江西万载旅游',
      ogTitle: '万载旅游线路推荐',
      image: wanzaiTravellingImg
    },
    '/viewing-spots': {
      title: '赏烟地点 - 焰境·万载',
      description: '探索万载最佳烟花观赏位置，感受璀璨烟花的魅力。',
      keywords: '万载烟花观赏,烟花景点,万载夜景,万载烟花观赏地点',
      ogTitle: '万载赏烟地点推荐',
      image: viewingspotsHeroImg
    },
    '/map': {
      title: '地图导览 - 焰境·万载',
      description: '万载旅游景点地图导览，为您的万载之旅提供参考。',
      keywords: '万载地图,万载景点分布,万载旅游地图,万载导览',
      ogTitle: '万载旅游地图导览',
      image: shouhuiMapImg
    },
    '/merchant': {
      title: '商家展示 - 焰境·万载',
      description: '万载特色商家展示，烟花企业、美食特产商家一览。',
      keywords: '万载商家,万载企业,烟花公司,万载特产商家',
      ogTitle: '万载商家展示',
      image: hezuoqiyeImg
    },
    '/about': {
      title: '关于我们 - 焰境·万载',
      description: '焰境·万载团队介绍，了解我们如何致力于推广万载烟花文化与旅游资源。',
      keywords: '焰境·万载,团队介绍,万载文旅,项目背景',
      ogTitle: '关于我们 - 焰境·万载团队',
      image: studentTeamImg
    },
    // 英文页面
    '/en': {
      title: 'WhizzZest - Hometown of Fireworks | Wanzai Tourism',
      description: 'Explore millennium fireworks culture, experience intangible heritage charm, taste local delicacies, and discover Wanzai scenery. Wanzai is the hometown of Chinese fireworks with over 1400 years of history.',
      keywords: 'Wanzai,fireworks,intangible heritage,tourism,Jiangxi,Wanzai Ancient City,fireworks hometown,Wanzai fireworks,Desheng Drum,Kai Kou Nuo,Wanzai food,Wanzai tourism',
      ogTitle: 'WhizzZest - Hometown of Fireworks | Wanzai Tourism',
      image: yzxfBswzImg
    },
    '/en/culture': {
      title: 'Intangible Heritage - WhizzZest',
      description: 'Explore Wanzai\'s millennium-old intangible cultural heritage, including Wanzai fireworks, Desheng Drum, Kai Kou Nuo, Xia Bu weaving, and more.',
      keywords: 'Wanzai intangible heritage,Desheng Drum,Kai Kou Nuo,Xia Bu weaving,intangible cultural heritage,Wanzai culture',
      ogTitle: 'Wanzai Intangible Heritage - Millennium Fireworks Craft',
      image: nuowuImg
    },
    '/en/food': {
      title: 'Food & Specialties - WhizzZest',
      description: 'Taste Wanzai\'s Six Big Bowls, Wanzai Lily, Luochen Rice Noodles and other local delicacies, experience the unique culinary culture of western Jiangxi.',
      keywords: 'Wanzai food,Wanzai specialties,Six Big Bowls,Luochen Rice Noodles,Wanzai Lily,western Jiangxi cuisine',
      ogTitle: 'Wanzai Food & Specialties - Western Jiangxi Cuisine',
      image: liudawanImg
    },
    '/en/industry': {
      title: 'Fireworks Industry - WhizzZest',
      description: 'As one of China\'s four major fireworks production areas, Wanzai has a long history of fireworks industry with advanced technology and products sold globally.',
      keywords: 'Wanzai fireworks,fireworks industry,hometown of Chinese fireworks,fireworks manufacturing,Wanzai fireworks companies',
      ogTitle: 'Wanzai Fireworks Industry - Hometown of Chinese Fireworks',
      image: huapaoFutureImg
    },
    '/en/routes': {
      title: 'Travel Routes - WhizzZest',
      description: 'Carefully designed Wanzai travel routes to help you experience the charm of millennium fireworks culture.',
      keywords: 'Wanzai travel routes,Wanzai Ancient City day trip,Wanzai self-driving tour,Jiangxi Wanzai tourism',
      ogTitle: 'Wanzai Travel Routes Recommendation',
      image: wanzaiTravellingImg
    },
    '/en/viewing-spots': {
      title: 'Viewing Spots - WhizzZest',
      description: 'Discover the best fireworks viewing spots in Wanzai and experience the charm of dazzling fireworks.',
      keywords: 'Wanzai fireworks viewing,fireworks spots,Wanzai night view,Wanzai fireworks viewing locations',
      ogTitle: 'Wanzai Fireworks Viewing Spots Recommendation',
      image: viewingspotsHeroImg
    },
    '/en/map': {
      title: 'Map Guide - WhizzZest',
      description: 'Wanzai tourist attractions map guide to help plan your Wanzai journey.',
      keywords: 'Wanzai map,Wanzai attractions distribution,Wanzai tourism map,Wanzai guide',
      ogTitle: 'Wanzai Tourism Map Guide',
      image: shouhuiMapImg
    },
    '/en/merchant': {
      title: 'Merchants - WhizzZest',
      description: 'Wanzai featured merchants showcase, fireworks companies and local specialty shops.',
      keywords: 'Wanzai merchants,Wanzai companies,fireworks companies,Wanzai specialty shops',
      ogTitle: 'Wanzai Merchants Showcase',
      image: hezuoqiyeImg
    },
    '/en/about': {
      title: 'About Us - WhizzZest',
      description: 'WhizzZest team introduction, learn about our dedication to promoting Wanzai fireworks culture and tourism resources.',
      keywords: 'WhizzZest,team introduction,Wanzai tourism,project background',
      ogTitle: 'About Us - WhizzZest Team',
      image: studentTeamImg
    }
  };

  const defaultSeo = {
    title: '焰境·万载 - 花炮之乡 | 江西万载文旅宣传网站',
    description: '探索千年烟花文化，体验非遗魅力，品味特色美食，领略万载风光。',
    keywords: '万载,烟花,非遗,旅游,江西',
    ogTitle: '焰境·万载 - 花炮之乡 | 江西万载文旅宣传网站',
    image: yzxfBswzImg
  };

  const data = pageSeo[path] || defaultSeo;

  return {
    ...data,
    image: `${baseUrl}${data.image}`,
    canonical: `${baseUrl}${path === '/' ? '' : path}`
  };
});

const jsonLd = computed(() => {
  const path = route.path;

  const baseInfo = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "万载县",
    "description": "江西省万载县 - 中国花炮之乡，拥有1400多年烟花生产历史",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "万载县",
      "addressRegion": "江西省",
      "addressCountry": "CN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "27.9333",
      "longitude": "114.4333"
    },
    "url": baseUrl,
    "telephone": "0795-8822888",
    "sameAs": [
      "https://www.douyin.com/user/MS4wLjABAAAAhy0jc-hMIansK5QmD-5fikKmvNrSA2qUn9qmDNFTsqOoVZX0TJa4VoLiNU-bBP_f"
    ]
  };

  // 首页 - 中文
  if (path === '/') {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "焰境·万载 - 花炮之乡 | 汆西万载文旅宣传网站",
      "description": "探索千年烟花文化，体验非遗魅力，品味特色美食，领略万载风光",
      "url": baseUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/?s={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  }

  // 首页 - 英文
  if (path === '/en') {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "WhizzZest - Hometown of Fireworks | Wanzai Tourism",
      "description": "Explore millennium fireworks culture, experience intangible heritage charm, taste local delicacies, and discover Wanzai scenery",
      "url": baseUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/?s={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  }

  // 非遗文化
  if (path === '/culture' || path === '/en/culture') {
    const isEn = path === '/en/culture';
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": isEn ? "Wanzai Intangible Heritage - Millennium Fireworks Craft" : "万载非遗文化 - 千年传承的烟花技艺",
      "description": isEn
        ? "Explore Wanzai's millennium-old intangible cultural heritage, including Wanzai fireworks, Desheng Drum, Kai Kou Nuo, Xia Bu weaving"
        : "探索万载千年传承的非物质文化遗产，包括万载花炮、得胜鼓、万载开口傩、夏布织造等",
      "image": `${baseUrl}${nuowuImg}`,
      "author": {
        "@type": "Organization",
        "name": isEn ? "WhizzZest" : "焰境·万载"
      },
      "datePublished": "2026-01-01"
    };
  }

  // 美食特产
  if (path === '/food' || path === '/en/food') {
    const isEn = path === '/en/food';
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": isEn ? "Wanzai Food & Specialties - Western Jiangxi Cuisine" : "万载美食特产 - 赣西特色美食",
      "description": isEn
        ? "Taste Wanzai's Six Big Bowls, Wanzai Lily, Luochen Rice Noodles and other local delicacies"
        : "品尝万载六大碗、万载百合、罗城扎粉等特色美食，感受赣西独特的饮食文化",
      "image": `${baseUrl}${liudawanImg}`,
      "author": {
        "@type": "Organization",
        "name": isEn ? "WhizzZest" : "焰境·万载"
      }
    };
  }

  // 烟花产业
  if (path === '/industry' || path === '/en/industry') {
    const isEn = path === '/en/industry';
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": isEn ? "Wanzai Fireworks Industry - Hometown of Chinese Fireworks" : "万载烟花产业 - 中国花炮之乡",
      "description": isEn
        ? "As one of China's four major fireworks production areas, Wanzai has a long history of fireworks industry"
        : "万载作为中国四大花炮主产区之一，烟花产业历史悠久，技术先进，产品畅销全球",
      "image": `${baseUrl}${huapaoFutureImg}`,
      "author": {
        "@type": "Organization",
        "name": isEn ? "WhizzZest" : "焰境·万载"
      }
    };
  }

  // 旅游线路
  if (path === '/routes' || path === '/en/routes') {
    const isEn = path === '/en/routes';
    return {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": isEn ? "Wanzai Travel Routes Recommendation" : "万载旅游线路推荐",
      "description": isEn
        ? "Carefully designed Wanzai travel routes to help you experience the charm of millennium fireworks culture"
        : "精心设计的万载旅游路线，带您领略千年烟花文化的魅力",
      "image": `${baseUrl}${wanzaiTravellingImg}`,
      "touristType": ["Cultural tourism", "Nature tourism"]
    };
  }

  // 赏烟地点
  if (path === '/viewing-spots' || path === '/en/viewing-spots') {
    const isEn = path === '/en/viewing-spots';
    return {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      "name": isEn ? "Wanzai Fireworks Viewing Spots Recommendation" : "万载赏烟地点推荐",
      "description": isEn
        ? "Discover the best fireworks viewing spots in Wanzai"
        : "探索万载最佳烟花观赏位置，感受璀璨烟花的魅力",
      "image": `${baseUrl}${viewingspotsHeroImg}`
    };
  }

  // 地图导览
  if (path === '/map' || path === '/en/map') {
    const isEn = path === '/en/map';
    return {
      "@context": "https://schema.org",
      "@type": "Map",
      "name": isEn ? "Wanzai Tourism Map" : "万载旅游地图",
      "description": isEn
        ? "Showing Wanzai attractions distribution to help plan your journey"
        : "展示万载景点分布，为您的万载之旅提供参考"
    };
  }

  // 商家展示
  if (path === '/merchant' || path === '/en/merchant') {
    const isEn = path === '/en/merchant';
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": isEn ? "Wanzai Merchants Showcase" : "万载商家展示",
      "description": isEn
        ? "Wanzai featured merchants showcase, fireworks companies and local specialty shops"
        : "万载特色商家展示，烟花企业、美食特产商家一览",
      "image": `${baseUrl}${hezuoqiyeImg}`
    };
  }

  // 关于我们
  if (path === '/about' || path === '/en/about') {
    const isEn = path === '/en/about';
    return {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": isEn ? "About Us - WhizzZest Team" : "关于我们 - 焰境·万载团队",
      "description": isEn
        ? "WhizzZest team introduction, learn about our dedication to promoting Wanzai fireworks culture"
        : "焰境·万载团队介绍，了解我们如何致力于推广万载烟花文化与旅游资源",
      "image": `${baseUrl}${studentTeamImg}`,
      "mainEntity": {
        "@type": "Organization",
        "name": isEn ? "WhizzZest" : "焰境·万载",
        "url": baseUrl
      }
    };
  }

  return baseInfo;
});

useHead({
  title: computed(() => seoData.value.title),
  meta: [
    { name: 'description', content: computed(() => seoData.value.description) },
    { name: 'keywords', content: computed(() => seoData.value.keywords) },
    { property: 'og:title', content: computed(() => seoData.value.ogTitle) },
    { property: 'og:description', content: computed(() => seoData.value.description) },
    { property: 'og:url', content: computed(() => seoData.value.canonical) },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: computed(() => seoData.value.image) },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => seoData.value.ogTitle) },
    { name: 'twitter:description', content: computed(() => seoData.value.description) },
    { name: 'twitter:image', content: computed(() => seoData.value.image) }
  ],
  link: [
    { rel: 'canonical', href: computed(() => seoData.value.canonical) }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify(jsonLd.value))
    }
  ]
});
</script>