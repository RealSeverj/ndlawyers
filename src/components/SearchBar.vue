<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const value = ref('');
const router = useRouter();

const onSearch = () => {
  if (value.value.trim()) {
    router.push(`/article/search=${value.value}`);
  }
};
</script>

<template>
  <div class="search-container">
    <b>文章搜索：</b>
    <a-input-search
      v-model:value="value"
      placeholder="请输入搜索内容"
      enter-button="搜索"
      size="large"
      @search="onSearch"
    />
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.search-container b {
  margin-right: 10px;
  margin-bottom: 3px;
  font-size: 20px;
  color: #1890ff;
}
</style>
