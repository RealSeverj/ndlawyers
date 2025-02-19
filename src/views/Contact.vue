<template>
  <div class="contact">
    <h1>联系我们</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">姓名</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>
      <div class="form-group">
        <label for="email">邮箱</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div class="form-group">
        <label for="message">留言</label>
        <textarea id="message" v-model="form.message" required></textarea>
      </div>
      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ContactView",
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: ""
      }
    };
  },
  methods: {
    submitForm() {
      // 此处可根据需要发送请求或做其它处理
      alert("表单已提交，感谢您的留言！");
      // 重置表单数据
      this.form.name = "";
      this.form.email = "";
      this.form.message = "";
    }
  }
}
</script>

<style scoped>
.contact {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  padding: 10px 20px;
  background-color: #409eff;
  color: #fff;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #66b1ff;
}
</style>
