// 引入子路由
import Frame from '../frame/subroute.vue'
// 引用模板
import index from '../page/index.vue'
import content from '../page/content.vue'
// 引入子页面
import userIndex from '../page/user/index.vue'
import userInfo from '../page/user/info.vue'
import userLove from '../page/user/love.vue'
import appHeader from '../fecshopPage/header.vue'
import appHomeBody from '../fecshopPage/body/home/body.vue'
import leftMenu from '../fecshopPage/leftmenu.vue'
import leftAccount from '../fecshopPage/leftaccount.vue'
import appFooter from '../fecshopPage/footer.vue'
// 配置路由
export default [
  {
    path: '/',
    component: index
  },
  {
    path: '/terry',
    components: {
      header: appHeader,
      body: appHomeBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  {
    path: '/content',
    component: content
  },
  {
    path: '/user',
    component: Frame,
    children: [
      {path: '/', component: userIndex},
      {path: 'info', component: userInfo},
      {path: 'love', component: userLove}
    ]
  }
]
