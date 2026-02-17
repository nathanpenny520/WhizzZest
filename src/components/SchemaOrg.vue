<template>
  <Head>
    <Script type="application/ld+json">
      {{ jsonLd }}
    </Script>
  </Head>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const jsonLd = computed(() => {
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
    "url": "https://executively-prosupport-particia.ngrok-free.app/",
    "telephone": "0795-8822888",
    "sameAs": [
      "https://www.douyin.com/user/MS4wLjABAAAAhy0jc-hMIansK5QmD-5fikKmvNrSA2qUn9qmDNFTsqOoVZX0TJa4VoLiNU-bBP_f"
    ]
  };

  const pageType = route.path;

  if (pageType === '/') {
    return {
      ...baseInfo,
      "@type": "WebSite",
      "name": "焰境·万载 - 江西万载文旅官网",
      "description": "探索千年烟花文化，体验非遗魅力，品味特色美食，领略万载风光",
      "url": "https://executively-prosupport-particia.ngrok-free.app/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://executively-prosupport-particia.ngrok-free.app/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };
  }

  if (pageType === '/culture') {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "万载非遗文化 - 千年传承的烟花技艺",
      "description": "探索万载千年传承的非物质文化遗产，包括万载花炮、得胜鼓、万载开口傩、夏布织造等",
      "image": "https://executively-prosupport-particia.ngrok-free.app/src/assets/images/nuowu.jpeg",
      "author": {
        "@type": "Organization",
        "name": "焰境·万载"
      },
      "datePublished": "2024-01-01"
    };
  }

  if (pageType === '/food') {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "万载美食特产 - 赣西特色美食",
      "description": "品尝万载六大碗、万载百合、罗城扎粉等特色美食，感受赣西独特的饮食文化",
      "image": "https://executively-prosupport-particia.ngrok-free.app/src/assets/images/liudawan.jpeg",
      "author": {
        "@type": "Organization",
        "name": "焰境·万载"
      }
    };
  }

  if (pageType === '/industry') {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "万载烟花产业 - 中国花炮之乡",
      "description": "万载作为中国四大花炮主产区之一，烟花产业历史悠久，技术先进，产品畅销全球",
      "image": "https://executively-prosupport-particia.ngrok-free.app/src/assets/images/longhu_yanhuowanhui.jpeg",
      "author": {
        "@type": "Organization",
        "name": "焰境·万载"
      }
    };
  }

  if (pageType === '/routes') {
    return {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": "万载旅游线路推荐",
      "description": "精心设计的万载旅游路线，带您领略千年烟花文化的魅力",
      "image": "https://executively-prosupport-particia.ngrok-free.app/src/assets/images/wanzai_travelling.jpeg",
      "touristType": ["Cultural tourism", "Nature tourism"]
    };
  }

  if (pageType === '/viewing-spots') {
    return {
      ...baseInfo,
      "@type": "TouristAttraction",
      "name": "万载赏烟地点推荐",
      "description": "探索万载最佳烟花观赏位置，感受璀璨烟花的魅力"
    };
  }

  if (pageType === '/map') {
    return {
      "@context": "https://schema.org",
      "@type": "Map",
      "name": "万载旅游地图",
      "description": "展示万载景点分布，为您的万载之旅提供参考"
    };
  }

  return baseInfo;
});
</script>
