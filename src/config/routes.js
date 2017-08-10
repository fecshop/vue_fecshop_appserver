// 引入子路由
import Frame from '../frame/subroute.vue'

import appHeader from '../views/header.vue'

import leftMenu from '../views/leftmenu.vue'
import leftAccount from '../views/leftaccount.vue'
import appFooter from '../views/footer.vue'

import appHomeBody from '../views/body/home/body.vue'
import appCategoryBody from '../views/body/category/body.vue'
import appProductBody from '../views/body/product/body.vue'

// 配置路由
export default [
  {
    path: '/',
    components: {
      header: appHeader,
      body: appHomeBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  {
    path: '/catalog/category/:category_id',
    components: {
      header: appHeader,
      body: appCategoryBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  {
    path: '/catalog/product/:product_id',
    components: {
      header: appHeader,
      body: appProductBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
]
