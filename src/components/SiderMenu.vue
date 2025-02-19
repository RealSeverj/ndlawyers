<template>
  <a-menu
    :key="categoryKey"
    :selectedKeys="[selectedKey]"
    @click="handleClick"
    mode="inline"
  >
    <a-menu-item
      v-for="item in filteredMenuItems"
      :key="item.value"
      :title="item.label"
    >
      {{ item.label }}
    </a-menu-item>
  </a-menu>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
  category: String
});

const router = useRouter();
const route = useRoute();
const selectedKey = ref(route.params.category);

const menuItems = ref([
  {
    value: '2',
    label: '关于协会',
    children: [
      { value: '2-1', label: '协会简介' },
      { value: '2-2', label: '协会章程' },
      { value: '2-3', label: '组织机构' },
      { value: '2-4', label: '协会设置' },
      { value: '2-5', label: '理事会' },
      { value: '2-6', label: '常务理事会' },
      { value: '2-7', label: '监事会' },
      { value: '2-8', label: '规则制度' },
    ],
  },
  {
    value: '3',
    label: '行业党建',
    children: [
      { value: '3-1', label: '党委介绍' },
      { value: '3-2', label: '党员律师风采' },
      { value: '3-3', label: '学习教育' },
      { value: '3-4', label: '工作动态' },
    ],
  },
  {
    value: '4',
    label: '业务研究',
    children: [
      { value: '4-1', label: '专业论文' },
      { value: '4-2', label: '业务指引' },
    ],
  },
  {
    value: '5',
    label: '资讯中心',
    children: [
      { value: '5-1', label: '公告通知' },
      { value: '5-2', label: '工作动态' },
    ],
  },
  {
    value: '6',
    label: '会员服务',
    children: [
      { value: '6-2', label: '实习人员办事指南' },
      { value: '6-3', label: '下载中心' },
      { value: '6-4', label: '律所招聘' },
    ],
  },
  {
    value: '7',
    label: '会员风采',
    children: [
      { value: '7-1', label: '律师社会责任报告' },
      { value: '7-2', label: '律所风采' },
      { value: '7-3', label: '律师风采' },
    ],
  },
]);

const filteredMenuItems = ref([]);
const categoryKey = computed(() => props.category.split('|')[0]);

const updateMenuItems = (category) => {
  const mainCategory = category.split('|')[0];
  const categoryItem = menuItems.value.find(item => item.value === mainCategory);
  filteredMenuItems.value = categoryItem ? categoryItem.children : [];
};

watch(() => props.category, (newCategory) => {
  updateMenuItems(newCategory);
  selectedKey.value = newCategory.split('|').pop();
});

watch(() => route.params.category, (newCategory) => {
  selectedKey.value = newCategory.split('|').pop();
  updateMenuItems(newCategory);
});

onMounted(() => {
  updateMenuItems(props.category);
  selectedKey.value = props.category.split('|').pop();
});

const handleClick = (menuInfo) => {
  const { key } = menuInfo;
  const mainCategory = props.category.split('|')[0];
  router.push(`/article/category=${mainCategory}|${key}`);
};
</script>
