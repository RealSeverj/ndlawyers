<script setup>
import { h, ref } from 'vue';
import {
  HomeOutlined,
  AppstoreOutlined,
  QuestionOutlined,
  MailOutlined,
  BookOutlined,
  ReadOutlined,
  CustomerServiceOutlined,
  TrophyOutlined
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedKeys = ref([]);
const openKeys = ref([]);
const items = ref([
  {
    key: '1',
    label: '首页',
    icon: h(HomeOutlined),
    to: '/',
  },
  {
    key: '2',
    label: '关于协会',
    icon: h(QuestionOutlined),
    to: '/article/category=2',
    children: [
      {
        key: '2-1',
        label: '协会简介',
        to: '/article/category=2|2-1',
      },{
        key: '2-2',
        label: '协会章程',
        to: '/article/category=2|2-2',
      },{
        key: '2-3',
        label: '组织机构',
        to: '/article/category=2|2-3',
      },{
        key: '2-4',
        label: '协会设置',
        to: '/article/category=2|2-4',
      },{
        key: '2-5',
        label: '理事会',
        to: '/article/category=2|2-5',
      },{
        key: '2-6',
        label: '常务理事会',
        to: '/article/category=2|2-6',
      },{
        key: '2-7',
        label: '监事会',
        to: '/article/category=2|2-7',
      },{
        key: '2-8',
        label: '规则制度',
        to: '/article/category=2|2-8',
      },{
        key: '2-9',
        label: '福建社会组织网',
        to: 'http://112.54.44.39:8088/shzz_njgs/',
      },
    ],
  },
  {
    key: '3',
    label: '行业党建',
    icon: h(AppstoreOutlined),
    to: '/article/category=3',
    children: [
      {
        key: '3-1',
        label: '党委介绍',
        to: '/article/category=3|3-1',
      },{
        key: '3-2',
        label: '党员律师风采',
        to: '/article/category=3|3-2',
      },{
        key: '3-3',
        label: '学习教育',
        to: '/article/category=3|3-3',
      },{
        key: '3-4',
        label: '工作动态',
        to: '/article/category=3|3-4',
      },
    ],
  },
  {
    key: '4',
    label: '业务研究',
    icon: h(BookOutlined),
    to: '/article/category=4',
    children: [
      {
        key: '4-1',
        label: '专业论文',
        to: '/article/category=4|4-1',
      },{
        key: '4-2',
        label: '业务指引',
        to: '/article/category=4|4-2',
      },
    ],
  },
  {
    key: '5',
    label: '资讯中心',
    icon: h(ReadOutlined),
    to: '/article/category=5',
    children: [
      {
        key: '5-1',
        label: '公告通知',
        to: '/article/category=5|5-1',
      },{
        key: '5-2',
        label: '工作动态',
        to: '/article/category=5|5-2',
      },
    ],
  },
  {
    key: '6',
    label: '会员服务',
    icon: h(CustomerServiceOutlined),
    to: '/article/category=6',
    children: [
      {
        key: '6-1',
        label: '福建网络律师学院',
        to: 'http://fjlawyer.pkulaw.com/',
      },{
        key: '6-2',
        label: '实习人员办事指南',
        to: '/article/category=6|6-2',
      },
      {
        key: '6-3',
        label: '下载中心',
        to: '/article/category=6|6-3',
      },
      {
        key: '6-4',
        label: '律所招聘',
        to: '/article/category=6|6-4',
      },
    ],
  },
  {
    key: '7',
    label: '会员风采',
    icon: h(TrophyOutlined),
    to: '/article/category=7',
    children: [
      {
        key: '7-1',
        label: '律师社会责任报告',
        to: '/article/category=7|7-1',
      },{
        key: '7-2',
        label: '律所风采',
        to: '/article/category=7|7-2',
      },{
        key: '7-3',
        label: '律师风采',
        to: '/article/category=7|7-3',
      }
    ],
  },
  {
    key: '8',
    label: '联系我们',
    icon: h(MailOutlined),
    to: '/contact',
  }
]);

// Create a map for key-to-path mappings
const keyToPathMap = {};
const buildKeyToPathMap = (items) => {
  items.forEach(item => {
    if (item.to) {
      keyToPathMap[item.key] = item.to;
    }
    if (item.children) {
      buildKeyToPathMap(item.children);
    }
  });
};
buildKeyToPathMap(items.value);

const handleClick = menuInfo => {
  const { key } = menuInfo;
  const path = keyToPathMap[key];
  if (path) {
    if (path.startsWith('http')) {
      window.location.href = path;
    } else {
      router.push(path);
    }
  }
  console.log('click ', menuInfo);
};
</script>

<template>
  <a-layout-header style="">
    <div class="header-content">

      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>

      <div class="menu" style="">
        <a-menu
          style="align-items: flex-end"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          :items="items"
          @click="handleClick"
          mode="horizontal"
          :style="{ lineHeight: '64px', borderBottom: 'none'}"
        />
      </div>
    </div>
    <a-divider style="height: 2px; background-color: rgba(220,231,244,0.41); margin-top: -6px" />
  </a-layout-header>

</template>

<script>
export default {
  name: "HeaderView"
};
</script>

<style scoped>

.header-content {
  display: flex;
  justify-content: space-between;
  margin-left: 5%;
  margin-right: 5%;
}
.logo img {
  height: 60px; /* 适当调整 Logo 大小 */
  vertical-align: middle;
  margin-bottom: 12px;
}

</style>
