<template>
  <header>
    <div class='container'>
      <router-link to='/'><img src='https://static2.cnodejs.org/public/images/cnodejs_light.svg' alt='' /></router-link>
      <div v-if='userInfo'>
        <router-link :to='`/user/${userInfo.loginname}`'><img :src='userInfo.avatar_url' alt='' /></router-link>
        <button @click='logout'>登出</button>
      </div>
      <div v-else>
        <input type='text' v-model='token' />
        <button @click='login'>vue登录</button>
      </div>
    </div>
  </header>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'header2019',
    data: () => ({
      token: '9948d556-1825-416f-934f-b3ce046403e3',
      userInfo: null
    }),
    created() {
      if (sessionStorage.loginname && sessionStorage.avatar_url) {
        this.userInfo = {
          loginname: sessionStorage.loginname,
          avatar_url: sessionStorage.avatar_url
        }
      }
    },
    methods: {
      login() {
        if (this.token.trim()) {
          axios
            .post('https://cnodejs.org/api/v1/accesstoken', {
              accesstoken: this.token
            })
            .then(res => {
              const {
                loginname,
                avatar_url,
                id
              } = res.data
  
              // 应该是vue中的sessionStorage储存方法
              sessionStorage.setItem('loginname', loginname)
              sessionStorage.setItem('avatar_url', avatar_url)
              sessionStorage.setItem('id', id)
              sessionStorage.setItem('token', this.token)
              // sessionStorage.loginname = loginname
              // sessionStorage.avatar_url = avatar_url
              // sessionStorage.id = id
              // sessionStorage.token = token
              // setLogin(true)
              this.userInfo = {
                loginname,
                avatar_url
              }
              this.token = ''
            })
            .catch(err => {
              alert('不对哦')
            })
        }
      },
      logout() {
        this.userInfo = null
        sessionStorage.clear()
        // const {
        //   setLogin
        // } = this.props
        // setLogin(false)
      }
    },
  }
</script>

<style lang="scss" scoped>
  header {
    width: 100%;
    display: flex;
    height: 50px;
    align-items: center;
    background-color: #444;
    .container {
      width: 85%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .container>a>img {
      width: 120px;
      height: 28px;
    }
    .container>div {
      display: flex;
      align-items: center;
    }
    .container>div>input {
      border-radius: 3px;
      outline: none;
      border: none;
    }
    .container>div>button {
      margin-left: 10px;
      border-radius: 3px;
      background-color: #80bd01;
      color: #fff;
      border: none;
      cursor: pointer;
    }
    .container>div>button:focus {
      outline: none;
    }
    .container>div img {
      width: 30px;
      height: 30px;
      border-radius: 3px;
    }
  }
</style>