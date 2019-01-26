<template>
  <div>
  
    <div class='topic' v-if='topic'>
      <h2>{{topic.title}}</h2>
      <span>·作者{{topic.author.loginname}}·来自{{topic.tab}}</span>
      <button @click='collect(topic.id)' class='collect'>{{topic.is_collect ? '取消收藏' : '收藏'}}</button>
      <div v-html='topic.content' class='content'></div>
    </div>
    <div v-else>请稍等</div>
  
    <div class='reply'>
  
      <div class='title'>回复</div>
  
      <div class='inner' v-if='topic'>
        <div class='topic' v-for='reply in topic.replies' :key='reply.id'>
          <router-link :to='`/user/${reply.author.loginname}`'>
            <img :style="{ width: '30px', borderRadius: ' 3px' }" :src='reply.author.avatar_url' alt="" />
          </router-link>
          <span :style="{ marginLeft: '5px' }">{{reply.author.loginname}}</span>
          <div><button @click='ups(reply.id)'>点赞</button>{{reply.ups.length}}</div>
          <p v-html='reply.content'></p>
          <button @click='showArea(reply.author.loginname,reply.id)'>回复</button>
          <div v-if='reply.isShowArea'>
            <textarea v-model='otherComment' />
            <br/>
            <button @click='addOtherComment(reply.id)'>回复</button>
          </div>
          <div v-else></div>
        </div>
      </div>
      <div v-else>请稍等</div>
  
    </div>
  
    <div class='createtopic'>
      <div class='title'>添加回复</div>
      <div class='inner'>
        <textarea v-model='comment' />
        <button @click='addComment(topic.id)'>回复</button>
      </div>
    </div>
  
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'topic',
    data: () => ({
      topic: null,
      comment: '',
      otherComment: ''
    }),
    created() {
      this.getTopic()
    },
    methods: {
      getTopic() {
        const {
          id
        } = this.$route.params
        const {
          token
        } = sessionStorage
        axios
          .get(
            `https://cnodejs.org/api/v1/topic/${id}?${token ? `accesstoken=${token}` : ''}`
          )
          .then(res => {
            //  将该对象下的 replies 数组内的每一项添加一条属性  isShowArea 来控制该评论下的 文本输入框是否展示
            res.data.data.replies = res.data.data.replies.map(e => {
              e.isShowArea = false
              return e
            })
            this.topic = res.data.data
            console.log(this.topic)
            if (this.topic.tab === 'good') {
              this.topic.tab = '精华'
            } else if (this.topic.tab === 'ask') {
              this.topic.tab = '问答'
            } else if (this.topic.tab === 'job') {
              this.topic.tab = '招聘'
            } else if (this.topic.tab === 'share') {
              this.topic.tab = '分享'
            }
          })
      },
      addComment(id) {
        const {
          token
        } = sessionStorage
        const url = `https://cnodejs.org/api/v1/topic/${id}/replies`
        axios
          .post(url, {
            accesstoken: token,
            content: this.comment
          })
          .then(res => {
            this.getTopic()
            this.comment = ''
          })
      },
      ups(id) {
        const {
          token
        } = sessionStorage
        axios
          .post(`https://cnodejs.org/api/v1/reply/${id}/ups`, {
            accesstoken: token
          })
          .then(res => {
            console.log(res.data.action)
            const userId = sessionStorage.id
            const newTopic = { ...this.topic
            }
            // 一下操作是更新本地的点赞  也就是更新了 topic.replies 下面的某条评论下的 ups 数组
            // 当返回的 action 是 up 的时候，也就说明原来没点赞，点了之后就要讲你的 id 添加到 ups 内，反之删除，在这里为什么不使用 axios 请求重新获取数据，因为可以直接对 state 进行修改，就完全和网上的数据一致了，所以不发请求更新。
            // 判断是否点过赞 可以使用 res.data.action  也可以使用 获取主题详情的时候添加参数 token，返回的数据中 评论数组内会有 isuped 属性
            if (res.data.action === 'up') {
              newTopic.replies.find(e => e.id === id).ups.push(userId)
            } else {
              newTopic.replies.find(e => e.id === id).ups = newTopic.replies
                .find(e => e.id === id)
                .ups.filter(e => e !== userId)
            }
            this.topic = newTopic
          })
      },
      collect(id) {
        const {
          token
        } = sessionStorage
        const isCollect = this.topic.is_collect
        axios
          .post(
            `https://cnodejs.org/api/v1/topic_collect/${
                                isCollect ? 'de_collect' : 'collect'
                              }`, {
              accesstoken: token,
              topic_id: id
            }
          )
          .then(() => {
            const newTopic = { ...this.topic
            }
            newTopic.is_collect = !newTopic.is_collect
            this.topic = newTopic
          })
      },
      showArea(loginname, id) {
        const newTopic = { ...this.topic
        }
        // if (newTopic.replies.find(e => e.isShowArea)) {
        //   newTopic.replies.find(e => e.isShowArea).isShowArea = false
        // }
        // newTopic.replies.find(e => e.id === id).isShowArea = true
        newTopic.replies = newTopic.replies.map(e => {
          if (e.isShowArea) {
            e.isShowArea = false
          }
          if (e.id === id) {
            e.isShowArea = true
          }
          return e
        })
        this.topic = newTopic,
          this.otherComment = `@${loginname} `
      },
      addOtherComment (id) {
        const {
          token
        } = sessionStorage
        axios
          .post(`https://cnodejs.org/api/v1/topic/${this.topic.id}/replies`, {
            accesstoken: token,
            content: this.otherComment,
            reply_id: id
          })
          .then(res => {
            this.getTopic()
            this.otherComment = ''
          })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .topic {
    width: 78%;
    border-radius: 8px;
    background-color: #fff;
    padding: 20px;
    padding-bottom: 10px;
    .content {
      border-top: 1px solid #ccc;
    }
    .content img {
      width: 100%;
    }
    .collect {
      border-radius: 3px;
      background-color: #80bd01;
      color: #fff;
      border: none;
      cursor: pointer;
      margin-bottom: 10px;
    }
  }
  
  .reply {
    width: 78%;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 8px;
    >.title {
      width: 100%;
      padding: 10px;
      background-color: #f6f6f6;
      border-radius: 8px 8px 0 0;
    }
    >.inner {
      padding: 10px;
      background-color: #fff;
      border-radius: 0px 0px 8px 8px;
    }
    >.inner .topic {
      width: 100%;
      border: 0;
      border-radius: 0;
      border-bottom: 1px solid #ccc;
    }
    >.inner p {
      margin: 0;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    >.inner textarea {
      width: 200px;
      height: 100px;
      outline: none;
      border: none;
      border: 1px solid #ccc;
      border-radius: 3px;
      resize: none;
    }
    >.inner button {
      border-radius: 3px;
      background-color: #80bd01;
      color: #fff;
      border: none;
      cursor: pointer;
      margin-bottom: 10px;
    }
  }
  
  .createtopic {
    width: 78%;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 8px;
    .title {
      width: 100%;
      padding: 10px;
      background-color: #f6f6f6;
      border-radius: 8px 8px 0 0;
    }
    .inner {
      padding: 10px;
      background-color: #fff;
      border-radius: 0px 0px 8px 8px;
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
  }
</style>