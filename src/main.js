// 引用 vue 没什么要说的
import Vue from 'vue'
// 引用路由
import VueRouter from 'vue-router'
// 光引用不成，还得使用
Vue.use(VueRouter)

import VueResource from 'vue-resource'; 
Vue.use(VueResource)

import Zepto from './js/zepto.min.js'
// 光引用不成，还得使用
Vue.use(Zepto)
import Sui from './js/sm.min.js'
// 光引用不成，还得使用
Vue.use(Sui)
import SuiExtend from './js/sm-extend.min.js'
// 光引用不成，还得使用
Vue.use(SuiExtend)




// 入口文件为 src/App.vue 文件 所以要引用
import App from './App.vue'
// 引用路由配置文件
import routes from './config/routes'
// 引用API文件
import api from './config/api'
// 将API方法绑定到全局
Vue.prototype.$api = api
// 使用配置文件规则
const router = new VueRouter({
  routes
})
// 跑起来吧
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
