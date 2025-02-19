<template>
  <div class="banner">
    <img src="@/assets/banner.jpg" alt="Banner图片">
    <div class="overlay">
      <h1>神圣·责任·正义·智慧</h1>
      <p>宁德律师事务所陪伴在您身旁</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerView"
};
</script>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  margin-top: -10px;
  border-radius: 15px;
}
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.banner::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
}
.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  z-index: 1;
}
</style>
