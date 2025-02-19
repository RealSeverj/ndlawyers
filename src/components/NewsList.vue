<script setup>
import { computed } from 'vue'
import { EyeOutlined } from '@ant-design/icons-vue';

const props = defineProps({
  articles: {
    type: Array,
    required: true
  }
});

const pagination = {
  pageSize: 5,
};

const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

const truncatedNewsList = computed(() => {
  return props.articles.map(news => ({
    ...news,
    truncatedContent: truncateText(news.content, 100)
  }));
});

</script>


<template>
  <a-list
    item-layout="vertical"
    size="middle"
    :pagination="pagination"
    :data-source="truncatedNewsList"
  >
    <template #footer>
      <div>
        <b>宁德市律师协会</b>
        权威发布
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item :key="item.title">
        <template #actions>
          <component :is="EyeOutlined"/>
          {{ item.views }}
        </template>
        <template #extra>
          <img
            style="
              width: 272px;
              height: 163px;
              object-fit: cover;
              object-position: center;
              border-radius: 8px"
            alt="logo"
            :src="item.image_path"
          />
        </template>
        <a-list-item-meta :description="item.time">
          <template #title>
            <a :href="`/article/${item.id}`">{{ item.title }}</a>
          </template>
        </a-list-item-meta>
        <div class="truncate-text">{{ item.truncatedContent }}</div>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped>
.truncate-text {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
