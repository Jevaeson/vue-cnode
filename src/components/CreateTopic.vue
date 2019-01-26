<template>
  <div class='creattopic'>
    <div class='home'>
      <router-link to='/'>主页</router-link>
      <span>/发布话题</span>
    </div>
    <div class='inner'>
      <span class='little'>标题</span>
      <input type="text" v-model='title' />
      <span class='little'>内容</span>
      <textarea v-model='content' />
      <button @click='handelSubmit'>提交</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'creattopic',
    data: () => ({
      title: '',
      content: ''
    }),
    methods: {
      handelSubmit() {
        if (this.title.trim().length >= 7 && this.content.trim()) {
          const contentObj = {
            accesstoken: sessionStorage.token,
            title: this.title,
            content: this.content,
            tab: 'dev'
          }
          const uri = 'https://cnodejs.org/api/v1/topics'
          axios.post(uri, contentObj).then(res => {
            this.title = ''
            this.content = ''
            // 跳转到刚刚发布的页面
            this.$router.push(`/topic/${res.data.topic_id}`)
          })
        } else {
          alert('输入不正确')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .creattopic {
    width: 78%;
    border-radius: 8px;
    background-color: #fff;
    .home {
      padding: 10px;
      background-color: #f6f6f6;
      border-radius: 8px 8px 0 0;
    }
    .home>a {
      color: #80bd01;
    }
    .inner {
      padding: 10px;
    }
    .inner input {
      width: 200px;
      outline: none;
      border: none;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
    .inner textarea {
      width: 200px;
      height: 100px;
      outline: none;
      border: none;
      border: 1px solid #ccc;
      border-radius: 3px;
      resize: none;
    }
    .inner button:hover {
      background-color: #05c;
    }
    .inner button {
      width: 50px;
      display: block;
      color: #fff;
      background-color: #00b3d4;
      border: none;
      border-radius: 3px;
      outline: none;
      transition: all 500ms ease;
    }
    .inner .little {
      display: block;
      margin-bottom: 10px;
    }
  }
</style>