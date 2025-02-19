<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <!-- 公共头部 -->
      <HeaderView />

      <!-- 主体内容（由路由决定展示哪个页面组件） -->
      <router-view />

      <!-- 公共页脚 -->
      <FooterView />
    </div>
  </a-config-provider>
</template>

<script>
import HeaderView from '@/components/Header.vue'
import FooterView from '@/components/Footer.vue'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

export default {
  name: 'App',
  components: {
    HeaderView,
    FooterView,
    'a-config-provider': ConfigProvider
  },
  data() {
    return {
      zhCN
    }
  }
}
</script>

<style>
/* 可根据需要定义全局样式 */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 头部和页脚通常固定高度，中间内容自适应 */
router-view {
  flex: 1;
}
</style>
