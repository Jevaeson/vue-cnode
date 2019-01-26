<template>
  <div class='bigbox'>
    <div class='wrap'>
      <ul>
        <li v-for='e in navArr' :key='e.type'>
          <router-link :to="`/${e.type === 'all' ? '' : e.type}`" :exact="e.type === 'all' ? true : false" active-class='active'>{{e.txt}}</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
    <Me/>
  </div>
</template>

<script>
import Me from './Me'
  export default {
    name: 'home',
    components: {
      Me
    },
    data: () => ({
      navArr: [{
          type: 'all',
          txt: '全部'
        },
        {
          type: 'good',
          txt: '精华'
        },
        {
          type: 'share',
          txt: '分享'
        },
        {
          type: 'ask',
          txt: '问答'
        },
        {
          type: 'job',
          txt: '招聘'
        }
      ]
    }),
  
  }
</script>

<style lang="scss" scoped>
  .bigbox {
    display: flex;
    justify-content: space-between;
    .wrap {
      width: 78%;
      border-radius: 8px;
      background-color: #fff;
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        height: 40px;
        background-color: #f6f6f6;
        align-items: center;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        li {
          margin-left: 20px;
          a {
            color: #80bd01;
            padding: 2px 4px;
            border-radius: 4px;
          }
          a.active {
            background-color: #80bd01;
            color: #fff;
          }
        }
      }
    }
  }
</style>