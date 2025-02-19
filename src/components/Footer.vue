<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p>©2025 宁德市律师协会. All rights reserved.</p>
      <nav class="footer-nav">
        <a href="/about">关于我们</a>
        <a href="/contact">联系我们</a>
      </nav>
      <nav class="footer-record" style="margin-top: 20px">
        <a style="display: inline;">工信部网站备案号：</a>
        <a style="display: inline;" href="https://beian.miit.gov.cn/state/outPortal/loginPortal.action#/Integrated/recordQuery">闽ICP备12006442号-1</a>
      </nav>
      </div>
  </footer>
</template>

<script>
export default {
  name: "FooterView"
}
</script>

<style scoped>
.app-footer {
  background-color: rgba(242, 242, 242, 0.7);
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid #eaeaea;
}

.footer-content {
  max-width: 20000px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-nav {
  margin-top: 10px;
}

.footer-nav a {
  margin: 0 10px;
  color: rgb(51, 51, 51);
  text-decoration: none;
}

.footer-nav a:hover {
  text-decoration: none;
}
</style>
