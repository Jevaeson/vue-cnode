import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import Topic from './components/Topic'
import CreateTopic from './components/CreateTopic'
import UserInfo from './components/UserInfo'
import Topics from './components/Topics'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: Topics
        },
        {
          path: '/good',
          component: Topics
        },
        {
          path: '/ask',
          component: Topics
        },
        {
          path: '/share',
          component: Topics
        },
        {
          path: '/job',
          component: Topics
        }
      ]
    },
    {
      path: '/topic/create',
      component: CreateTopic
    },
    {
      path: '/topic/:id',
      component: Topic
    },
    {
      path: '/user/:loginname',
      component: UserInfo
    }
  ],
  mode: 'history'
})

export default router
