<template>
  <div class='userinfo'>
    <div class='top'>个人信息</div>
    <div v-if='userInfo' class='inner'>
      <router-link :to='`/user/${userInfo.loginname}`'><img :src='userInfo.avatar_url' alt='' /></router-link>
      <span>{{userInfo.loginname}}</span>
      <router-link to='/topic/create' class='create'>发布话题</router-link>
    </div>
    <div v-else>请登录</div>
  </div>
</template>

<script>
  export default {
    name: 'me',
    data: () => ({
      userInfo: null
    }),
    created() {
      if (sessionStorage.loginname && sessionStorage.avatar_url) {
        this.userInfo = {
          loginname: sessionStorage.loginname,
          avatar_url: sessionStorage.avatar_url
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .userinfo {
    width: 290px;
    height: 170px;
    border-radius: 8px;
    background-color: #fff;
    .top {
      height: 40px;
      color: #51585c;
      padding: 10px;
      background-color: #f6f6f6;
      border-radius: 8px;
      border-bottom-left-radius: none;
      border-bottom-left-radius: none;
    }
    .inner {
      padding: 10px;
    }
    .inner>a>img {
      width: 48px;
      height: 48px;
      border-radius: 3px;
    }
    .inner>span {
      color: #778087;
      font-size: 16px;
      margin-left: 5px;
    }
    .inner>.create {
      line-height: 30px;
      width: 100px;
      border-radius: 3px;
      background-color: #80bd01;
      color: #fff;
      padding: 0px 10px;
      display: block;
      text-align: center;
      margin-top: 20px;
    }
  }
</style>