<script setup>
import { fetchArticles } from '@/api/article.js'
import { onMounted, ref, computed } from 'vue'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';

const newsList = ref([]); // 初始化为空数组
const props = defineProps({
  sort: {
    type: String,
    required: true
  }
});

onMounted(async () => {
  try {
    newsList.value = await fetchArticles(props.sort); // 等待异步操作完成
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
    truncatedDescription: truncateText(news.description, 50) // Limit to 50 characters
  }));
});
</script>

<template>
  <div class="news-header">
    <h2>工作动态</h2>
  </div>
  <a-carousel autoplay arrows>
    <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
        <left-outlined />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 10px">
        <right-outlined />
      </div>
    </template>
    <div v-for="news in truncatedNewsList" :key="news.id">
      <div class="banner">
        <a :href="`/article/${news.id}`"><img :src="news.image_path" alt="新闻图片"></a>
      </div>
    </div>
  </a-carousel>

  <div class="news-list">
    <a-list item-layout="horizontal" :data-source="truncatedNewsList">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.truncatedDescription">
            <template #title>
              <a :href="`/article/${item.id}`">{{ item.title }}</a>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style scoped>
.news-list {
  max-height: 300px; /* 设置固定高度 */
  overflow-y: auto; /* 启用垂直滚动 */
}
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

.banner {
  position: relative;
  height: 310px;
}
.banner img {
  object-fit: cover;
  object-position: center;
}

:deep(.slick-slide) {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background: none;
  overflow: hidden;
}

:deep(.slick-slide img) {
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: cover;   /* cover 或 contain，根据实际需求选择 */
  object-position: center;
  margin: auto;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 32px;
  height: 32px;
  font-size: 32px;
  color: #fff;
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.8;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style>
