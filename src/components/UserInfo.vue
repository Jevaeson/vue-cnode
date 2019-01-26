<template>
  <div class='userinfo' v-if='userInfo'>
    <div class='user'>
      <div class='home'>
        <router-link to='/'>主页</router-link>
      </div>
      <div class='inner'>
        <router-link :to='`/user/${userInfo.loginname}`'><img :src='userInfo.avatar_url' alt="" /></router-link>
        <span>{{userInfo.loginname}}</span>
        <p>{{userInfo.score}}积分</p>
      </div>
    </div>
    <div class='create'>
      <div class='title'>
        <h4>最近创建的话题</h4>
      </div>
      <div class='recent_topics' v-for='item in userInfo.recent_topics' :key='item.id'>
        <router-link :to='`/user/${item.author.loginname}`'><img :src='item.author.avatar_url' alt="" /></router-link>
        <p>
          <router-link :to='`/topic/${item.id}`'>{{item.title}}</router-link>
        </p>
      </div>
    </div>
    <div class='create'>
      <div class='title'>
        <h4>最近参与的话题</h4>
      </div>
      <div class='recent_replies' v-for='item in userInfo.recent_replies' :key='item.id'>
        <router-link :to='`/user/${item.author.loginname}`'><img :src='item.author.avatar_url' alt="" /></router-link>
        <p>
          <router-link :to='`/topic/${item.id}`'>{{item.title}}</router-link>
        </p>
      </div>
    </div>
  </div>
  <div v-else>请稍等……</div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'userinfo2019',
    data: () => ({
      userInfo: null
    }),
    created() {
      this.getUserInfo()
    },
    watch: {
      loginname() {
        this.getUserInfo()
      }
    },
    computed: {
      loginname() {
        const {
          path
        } = this.$route
        return path.replace('/user/', '')
      }
    },
    methods: {
      getUserInfo() {
        axios
          .get(`https://cnodejs.org/api/v1/user/${this.loginname}`)
          .then(res => {
            this.userInfo = res.data.data
          })
          .catch(err => {
            alert(err)
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user {
    width: 78%;
    background-color: #fff;
    border-radius: 8px;
    .inner {
      padding: 10px;
    }
    .inner>a>img {
      width: 40px;
      height: 40px;
      border-radius: 3px;
    }
    .inner>p {
      margin-top: 10px;
      margin-bottom: 0px;
      color: #778087;
    }
    .inner>span {
      color: #778087;
      font-size: 16px;
      margin-left: 10px;
    }
    .home {
      padding: 10px;
      background-color: #f6f6f6;
      border-radius: 8px 8px 0 0;
    }
    .home>a {
      color: #80bd01;
    }
  }
  
  .create {
    margin-top: 20px;
    width: 78%;
    background-color: #fff;
    border-radius: 8px;
    .title {
      padding: 10px;
      background-color: #f6f6f6;
      border-radius: 8px 8px 0 0;
      h4 {
        margin: 0;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
      }
    }
    .recent_topics {
      display: flex;
      align-items: center;
      padding: 10px;
    }
    .recent_topics>p {
      margin: 0;
    }
    .recent_topics>p>a {
      color: #08c;
    }
    .recent_topics>a>img {
      width: 30px;
      height: 30px;
      border-radius: 3px;
      margin-right: 10px;
    }
    .recent_replies {
      display: flex;
      align-items: center;
      padding: 10px;
    }
    .recent_replies>p {
      margin: 0;
    }
    .recent_replies>p>a {
      color: #08c;
    }
    .recent_replies>a>img {
      width: 30px;
      height: 30px;
      border-radius: 3px;
      margin-right: 10px;
    }
  }
</style>