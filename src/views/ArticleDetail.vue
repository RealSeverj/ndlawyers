<script setup>
import BannerView from '@/components/Banner.vue';
import ArticleContent from '@/views/ArticleContent.vue';
import NewsList from '@/components/NewsList.vue';
import SiderMenu from '@/components/SiderMenu.vue';
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { LeftOutlined } from '@ant-design/icons-vue';
import { fetchArticles } from '@/api/article.js'

const route = useRoute();
const router = useRouter();
const articleId = ref(route.params.id);
const articles = ref([]);
const category = ref(route.params.category);
const componentKey = ref(0);
const isCategoryRoute = computed(() => !!category.value);

const fetchAndSetArticles = async (category) => {
  try {
    articles.value = await fetchArticles(category);
  } catch (error) {
    console.error('Failed to fetch articles:', error);
  }
  componentKey.value++;
};

onMounted(() => {
  fetchAndSetArticles(category.value);
});

watch(() => route.params.id, (newId) => {
  articleId.value = newId;
  componentKey.value++;
});

watch(() => route.params.category, (newCategory) => {
  category.value = newCategory;
  fetchAndSetArticles(newCategory);
});

const goBack = () => {
  router.back();
  fetchAndSetArticles(category.value);
};
</script>

<template>
  <BannerView />
  <div class="article">
    <a-row :gutter="16">
      <a-col :span="6">
        <div class="sticky-sider">
          <SiderMenu v-if="isCategoryRoute" :category="category" />
          <a-button v-else @click="goBack" type="text">
            <template #icon>
              <LeftOutlined />
            </template>
            返回上一界面
          </a-button>
        </div>
      </a-col>
      <a-col :span="18">
        <div class="float-mod">
          <component
            :is="isCategoryRoute ? NewsList : ArticleContent"
            :key="componentKey"
            :article-id="articleId"
            :articles="articles">
          </component>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.article {
  max-width: 75%;
  display: flex;
  justify-content: center;
  margin: 2.5% auto 32px;
}

.float-mod {
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 48px;
  min-width: 700px;
}

.sticky-sider {
  position: sticky;
  top: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 16px;
}
</style>
