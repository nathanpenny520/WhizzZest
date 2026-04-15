<template>
  <!-- SEO head 组件不需要渲染任何内容 -->
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const baseUrl = 'https://www.whizzzest-yanjingwanzai.top';

const seoData = computed(() => {
  const path = route.path;
  
  const pageSeo: Record<string, any> = {
    '/': {
      title: '焰境·万载 - 花炮之乡 | 江西万载文旅宣传网站',
      description: '探索千年烟花文化，体验非遗魅力，品味特色美食，领略万载风光。万载是中国花炮之乡，拥有1400多年烟花生产历史。',
      keywords: '万载,烟花,非遗,旅游,江西,万载古城,烟花之乡,万载花炮,得胜鼓,开口傩,万载美食,万载旅游',
      ogTitle: '焰境·万载 - 花炮之乡 | 江西万载文旅宣传网站', 
      image: `${baseUrl}/src/assets/images/yzxf_bswz.jpeg`
    },
    '/culture': {
      title: '非遗文化 - 焰境·万载',
      description: '探索万载千年传承的非物质文化遗产，包括万载花炮、得胜鼓、万载开口傩、夏布织造等，感受传统文化的魅力。',
      keywords: '万载非遗,得胜鼓,开口傩,夏布织造,非物质文化遗产,万载文化',
      ogTitle: '万载非遗文化 - 千年传承的烟花技艺',
      image: `${baseUrl}/src/assets/images/nuowu.jpeg`
    },
    '/food': {
      title: '美食特产 - 焰境·万载',
      description: '品尝万载六大碗、万载百合、罗城扎粉等特色美食，感受赣西独特的饮食文化。',
      keywords: '万载美食,万载特产,六大碗,罗城扎粉,万载百合,赣西美食',
      ogTitle: '万载美食特产 - 赣西特色美食',
      image: `${baseUrl}/src/assets/images/liudawan.jpeg`
    },
    '/industry': {
      title: '烟花产业 - 焰境·万载',
      description: '万载作为中国四大花炮主产区之一，烟花产业历史悠久，技术先进，产品畅销全球。',
      keywords: '万载烟花,花炮产业,中国花炮之乡,烟花制造,万载烟花企业',
      ogTitle: '万载烟花产业 - 中国花炮之乡',
      image: `${baseUrl}/src/assets/images/longhu_yanhuowanhui.jpeg`
    },
    '/routes': {
      title: '旅游线路 - 焰境·万载',
      description: '精心设计的万载旅游路线，带您领略千年烟花文化的魅力。',
      keywords: '万载旅游线路,万载古城一日游,万载自驾游,江西万载旅游',
      ogTitle: '万载旅游线路推荐',
      image: `${baseUrl}/src/assets/images/wanzai_travelling.jpeg`
    },
    '/viewing-spots': {
      title: '赏烟地点 - 焰境·万载',
      description: '探索万载最佳烟花观赏位置，感受璀璨烟花的魅力。',
      keywords: '万载烟花观赏,烟花景点,万载夜景,万载烟花观赏地点',
      ogTitle: '万载赏烟地点推荐',
      image: `${baseUrl}/src/assets/images/wanzai_yanhua.jpeg`
    },
    '/map': {
      title: '地图导览 - 焰境·万载',
      description: '万载旅游景点地图导览，为您的万载之旅提供参考。',
      keywords: '万载地图,万载景点分布,万载旅游地图,万载导览',
      ogTitle: '万载旅游地图导览',
      image: `${baseUrl}/src/assets/images/shouhui_map.jpg`
    },
    '/merchant': {
      title: '商家展示 - 焰境·万载',
      description: '万载特色商家展示，烟花企业、美食特产商家一览。',
      keywords: '万载商家,万载企业,烟花公司,万载特产商家',
      ogTitle: '万载商家展示',
      image: `${baseUrl}/src/assets/images/hezuoqiye.png`
    }
  };
  
  const defaultSeo = {
    title: '焰境·万载 - 花炮之乡 | 江西万载文旅宣传网站',
    description: '探索千年烟花文化，体验非遗魅力，品味特色美食，领略万载风光。',
    keywords: '万载,烟花,非遗,旅游,江西',
    ogTitle: '焰境·万载 - 花炮之乡 | 江西万载文旅宣传网站',   
    image: `${baseUrl}/src/assets/images/yzxf_bswz.jpeg`
  };
  
  const data = pageSeo[path] || defaultSeo;
  
  return {
    ...data,
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

  if (path === '/') {
    return {
      ...baseInfo,
      "@type": "WebSite",
      "name": '焰境·万载 - 花炮之乡 | 江西万载文旅宣传网站',  
      description: "探索千年烟花文化，体验非遗魅力，品味特色美食，领略万载风光",
      "url": baseUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/?s={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  }

  if (path === '/culture') {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "万载非遗文化 - 千年传承的烟花技艺",
      "description": "探索万载千年传承的非物质文化遗产，包括万载花炮、得胜鼓、万载开口傩、夏布织造等",
      "image": `${baseUrl}/src/assets/images/nuowu.jpeg`,
      "author": {
        "@type": "Organization",
        "name": "焰境·万载"
      },
      "datePublished": "2026-01-01"
    };
  }

  if (path === '/food') {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "万载美食特产 - 赣西特色美食",
      "description": "品尝万载六大碗、万载百合、罗城扎粉等特色美食，感受赣西独特的饮食文化",
      "image": `${baseUrl}/src/assets/images/liudawan.jpeg`,
      "author": {
        "@type": "Organization",
        "name": "焰境·万载"
      }
    };
  }

  if (path === '/industry') {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "万载烟花产业 - 中国花炮之乡",
      "description": "万载作为中国四大花炮主产区之一，烟花产业历史悠久，技术先进，产品畅销全球",
      "image": `${baseUrl}/src/assets/images/longhu_yanhuowanhui.jpeg`,
      "author": {
        "@type": "Organization",
        "name": "焰境·万载"
      }
    };
  }

  if (path === '/routes') {
    return {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": "万载旅游线路推荐",
      "description": "精心设计的万载旅游路线，带您领略千年烟花文化的魅力",
      "image": `${baseUrl}/src/assets/images/wanzai_travelling.jpeg`,
      "touristType": ["Cultural tourism", "Nature tourism"]
    };
  }

  if (path === '/viewing-spots') {
    return {
      ...baseInfo,
      "@type": "TouristAttraction",
      "name": "万载赏烟地点推荐",
      "description": "探索万载最佳烟花观赏位置，感受璀璨烟花的魅力"
    };
  }

  if (path === '/map') {
    return {
      "@context": "https://schema.org",
      "@type": "Map",
      "name": "万载旅游地图",
      "description": "展示万载景点分布，为您的万载之旅提供参考"
    };
  }

  if (path === '/merchant') {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "万载商家展示",
      "description": "万载特色商家展示，烟花企业、美食特产商家一览",
      "image": `${baseUrl}/src/assets/images/hezuoqiye.png`
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
