import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Pagination } from 'element-ui'
Vue.use(Pagination)

// 以下是时间插件 并且转化为中文
const moment = require('moment')
require('moment/locale/zh-cn')
Vue.use(require('vue-moment'), {
  moment
})

Vue.config.productionTip = false
// ReactDOM.render(<App />,dom节点)
// 将虚拟的 vue dom 节点，渲染到真实的 dom 节点上
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
