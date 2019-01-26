<template>
  <div v-if='topics.length'>
    <ul>
      <li v-for='topic in topics' :key='topic.id'>
        <router-link :to='`/user/${topic.author.loginname}`'><img :src='topic.author.avatar_url'></router-link>
        <span class='reply'>{{topic.reply_count}}</span>
        <span>/</span>
        <span class='visit'>{{topic.visit_count}}</span>
        <span class='top' :style="{display: topic.top ? 'block' : 'none'}">置顶</span>
        <span class='top' :style="{display: topic.good ? 'block' : 'none'}">精华</span>
        <router-link :to='`/topic/${topic.id}`'>{{topic.title}}</router-link>
        <span class='time'>{{ topic.last_reply_at | moment("from", "now") }}</span>
      </li>
    </ul>
    <div class='par'>
      <!-- 给路由一个唯一的key值 当匹配到动态路由时也会重新创建组件 这样点击其他导航也会出现 请稍等 -->
      <el-pagination background layout="prev, pager, next" :total="100" @current-change="handleCurrentChange" :key='$route.path'></el-pagination>
    </div>
  </div>
  <div v-else>请稍等……</div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'topics',
    data: () => ({
      topics: []
    }),
    created() {
      this.getPosts()
    },
    watch: {
      tab() {
        this.getPosts()
      }
    },
    computed: {
      tab() {
        const {
          path
        } = this.$route
        return path.replace('/', '')
      }
    },
    methods: {
      getPosts() {
        axios
          .get(`https://cnodejs.org/api/v1/topics?tab=${this.tab}`)
          .then(res => {
            this.topics = res.data.data
          })
      },
      handleCurrentChange(page) {
        const url = `https://cnodejs.org/api/v1/topics?tab=${this.tab}&page=${page}`
        axios.get(url).then(res => {
          this.topics = res.data.data
        })
      }
    },
  
  }
</script>

<style lang="scss" scoped>
  ul {
    padding: 0;
    margin: 0;
    li {
      border-bottom: 1px solid #f0f0f0;
      height: 50px;
      display: flex;
      align-items: center;
      padding-left: 10px;
      position: relative;
    }
    li:hover {
      background-color: #f5f5f5;
    }
    li img {
      width: 30px;
      height: 30px;
      border-radius: 3px;
      margin-right: 10px;
    }
    li>a {
      color: #333;
    }
    li>span {
      font-size: 10px;
    }
    li>.reply {
      color: #9e78c0;
    }
    li>.visit {
      color: #b4b4b4;
      margin-right: 10px;
    }
    li>.top {
      background-color: #80bd01;
      margin-right: 5px;
      color: #fff;
      padding: 2px 4px;
      border-radius: 3px;
      font-size: 12px;
    }
    li .time {
      position: absolute;
      right: 20px;
      font-size: 12px;
    }
  }
  
  .par {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
  }
</style>