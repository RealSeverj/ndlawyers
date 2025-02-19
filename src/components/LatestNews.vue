<script setup>
import { onMounted, ref, computed } from 'vue'
import { fetchArticles } from '@/api/article.js'
import { getCategoryLabel} from '@/api/sort.js'

const newsList = ref([]); // 初始化为空数组

onMounted(async () => {
  try {
    newsList.value = await fetchArticles(); // 等待异步操作完成
  } catch (error) {
    console.error('Failed to fetch articles:', error);
  }
});

const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

const truncatedNewsList = computed(() => {
  return newsList.value.map(news => ({
    ...news,
    truncatedDescription: truncateText(news.description, 40) // Limit to 50 characters
  }));
});
</script>

<template>
  <!-- 列表头 -->
  <div class="news-header">
    <h2>最新新闻</h2>
  </div>
  <!-- 新闻列表 -->
  <div class="news-list">
    <div v-for="news in truncatedNewsList" :key="news.id" class="news-item">
      <a :href="`/article/${news.id}`" target="_blank">
        <a-card hoverable>
          <template #title>分类: {{ getCategoryLabel(news.sort) }}</template>
          <a-row :gutter="8">
            <a-col :span="8" class="inner-img">
              <img :src="news.image_path" alt="" />
            </a-col>
            <a-col :span="16">
              <b>{{ news.title }}</b>
              <p class="truncate-text">{{ news.truncatedDescription }}</p>
            </a-col>
          </a-row>
        </a-card>
      </a>
    </div>
  </div>
</template>

<style scoped>
/* 新闻列表头 */
.news-header {
  border-bottom: 2px solid #1890ff;
  margin-bottom: 16px;
  padding-bottom: 12px;
}
.news-header h2 {
  margin: 0;
  color: #1890ff;
  font-size: 20px;
}

.news-list {
  max-height: 665px; /* 设置固定高度 */
  overflow-y: auto; /* 启用垂直滚动 */
}

.news-item {
  display: flex;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}
.news-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}
.truncate-text {
  overflow: hidden;
  text-overflow: ellipsis;
}

.inner-img img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
}
</style>
