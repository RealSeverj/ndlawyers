<script setup>
import BannerView from '@/components/Banner.vue'
import NewsList from '@/components/NewsList.vue'
import Carousel from '@/components/Carousel.vue'
import LatestNews from '@/components/LatestNews.vue'
import SearchBar from '@/components/SearchBar.vue'
import { onMounted, ref } from 'vue'
import { fetchArticles } from '@/api/article.js'

const newsList = ref([]); // 初始化为空数组

onMounted(async () => {
  try {
    newsList.value = await fetchArticles(); // 等待异步操作完成
  } catch (error) {
    console.error('Failed to fetch articles:', error);
  }
});

</script>

<template>
  <div class="home">
    <!-- Banner 区域 -->
    <BannerView />
    <div class="main-row">
      <a-row :gutter="32">
        <a-col :span="14">
          <a-row style="margin-bottom: 20px">
            <div class="float-mod" style="width: 100%">
              <SearchBar />
            </div>
          </a-row>
          <div class="float-mod">
            <Carousel :sort="''" />
          </div>
        </a-col>
        <a-col :span="10">
          <div class="float-mod">
            <LatestNews />
          </div>
        </a-col>
      </a-row>
    </div>
    <!-- 底部新闻列表 -->
    <div class="bottom-row">
      <NewsList :articles="newsList" class="float-mod"/>
    </div>
  </div>
</template>

<style scoped>
.float-mod {
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 16px;
}

.home {
  padding: 20px;
}

/* 主体布局 */
.main-row {
  margin: 2.5% auto 0;
  max-width: 75%;
  display: flex;
  justify-content: center;
}
.bottom-row {
  margin: 2.5% auto 0;
  max-width: 75%;
  display: flow;
}
</style>
