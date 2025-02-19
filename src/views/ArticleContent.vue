<script setup>
import ArticleShow from '@/components/ArticleShow.vue';
import { onMounted, ref } from 'vue';
import { fetchArticle, downloadArticle, updateArticleViews } from '@/api/article.js';
import { getCategoryLabel } from '@/api/sort.js';
import { message } from 'ant-design-vue'

const article = ref({});
const props = defineProps({
  articleId: {
    type: Number,
    required: true
  }
});

onMounted(async () => {
  try {
    article.value = await fetchArticle(props.articleId);
    console.log('Fetched article:', article.value);
    await updateArticleViews(props.articleId, article.value.views + 1); // 更新阅读量
  } catch (error) {
    console.error('Failed to fetch articles:', error);
  }
});

const handleDownload = async () => {
  try {
    await downloadArticle(props.articleId);
  } catch (error) {
    console.error('Failed to download article:', error);
  }
};

const handleCopy = async () => {
  try {
    const url = `${window.location.href}`;
    await navigator.clipboard.writeText(url);
    message.success('链接已复制到剪切板');
  } catch (error) {
    console.error('Failed to copy article link:', error);
  }
};
</script>

<template>
  <a-row class="header-style">
    <div class="article-header">
      <h1>{{ article.title }}</h1>
      <div class="article-meta">
        <span>阅读量: {{ article.views }}</span>
        <span>发布时间: {{ article.time }}</span>
        <span v-if="article.sort">文章分类: {{ getCategoryLabel(article.sort) }}</span>
      </div>
    </div>
  </a-row>
  <a-row class="content-style">
    <ArticleShow :article-id="props.articleId" />
  </a-row>
  <a-row class="footer-style">
    <a-button type="dashed" @click="handleDownload" style="margin-right: 10px">下载原文</a-button>
    <a-button type="dashed" @click="handleCopy">复制文章链接</a-button>
  </a-row>
</template>

<style scoped>
.header-style {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
}
.footer-style {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 auto;
}
.article-header {
  text-align: center;
  padding: 20px;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e6e6e6;
}

.article-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.article-meta {
  margin-top: 16px;
  font-size: 14px;
  color: #888;

}

.article-meta span {
  margin-right: 24px;
}
.content-style {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
</style>
