<script setup>
import Banner from '@/components/Banner.vue'
import NewsList from '@/components/NewsList.vue'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { searchArticles } from '@/api/article.js'
import { message } from 'ant-design-vue'
import SearchBar from '@/components/SearchBar.vue'

const newsList = ref([]);
const route = useRoute();
const keyword = ref(route.params.search);

const fetchSearchResults = async () => {
  try {
    newsList.value = await searchArticles(keyword.value);
  } catch (error) {
    message.error('Failed to search articles:', error);
  }
};

onMounted(fetchSearchResults);

watch(() => route.params.search, (newSearch) => {
  keyword.value = newSearch;
  fetchSearchResults();
});

console.log('newsList:', newsList);
</script>

<template>
  <Banner />
  <div class="article">
    <a-row style="margin-bottom: 20px">
      <SearchBar />
    </a-row>
    <a-row>
      <div class="float-mod">
        <h3>搜索结果：</h3>
        <NewsList :articles="newsList" />
      </div>
    </a-row>
  </div>
</template>

<style scoped>
.article {
  max-width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2.5% auto 32px;
}
.float-mod {
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 48px;
  min-width: 700px;
}
</style>
