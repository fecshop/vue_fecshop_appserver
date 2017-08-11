// 引入子路由
import Frame from '../frame/subroute.vue'

import appHeader from '../views/header.vue'

import leftMenu from '../views/leftmenu.vue'
import leftAccount from '../views/leftaccount.vue'
import appFooter from '../views/footer.vue'

import appHomeBody from '../views/body/home/Index.vue' //
import appPaymentSuccessBody from '../views/body/payment/Success.vue' 
import appCmsPageBody from '../views/body/cms/Page.vue' 


import appCategoryBody from '../views/body/category/Index.vue' //
import appProductBody from '../views/body/product/Index.vue' //
import appProductReviewAddBody from '../views/body/product/review/Add.vue' 
import appProductReviewListBody from '../views/body/product/review/List.vue'


import appCustomerAccountForgotpasswordBody from '../views/body/customer/account/Forgotpassword.vue'
import appCustomerAccountResetpasswordBody from '../views/body/customer/account/Resetpassword.vue'
import appCustomerAccountResetpasswordSuccessBody from '../views/body/customer/account/ResetpasswordSuccess.vue'
import appCustomerAccountIndexBody from '../views/body/customer/account/Index.vue'
import appCustomerAccountLoginBody from '../views/body/customer/account/Login.vue'
import appCustomerAccountRegisterBody from '../views/body/customer/account/Register.vue'

import appCustomerOrderBody from '../views/body/customer/Order.vue'
import appCustomerEditaccountBody from '../views/body/customer/Editaccount.vue'
import appCustomerAddressBody from '../views/body/customer/Address.vue'
import appCustomerProductreviewBody from '../views/body/customer/Productreview.vue'
import appCustomerProductfavoriteBody from '../views/body/customer/Productfavorite.vue'
import appCustomerContactsBody from '../views/body/customer/Contacts.vue'

import appCheckoutCartBody from '../views/body/checkout/Cart.vue'
import appCheckoutOnepageBody from '../views/body/checkout/Onepage.vue'  

 




// 配置路由
export default [
  {
    path: '/',  // 首页
    components: {
      header: appHeader,
      body: appHomeBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  {
    path: '/catalog/category/:category_id', // 分类
    components: {
      header: appHeader,
      body: appCategoryBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  {
    path: '/catalog/product/:product_id',  // 产品
    components: {
      header: appHeader,
      body: appProductBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  //////////
  {
    path: '/customer/account/index',  // 账户中心
    components: {
      header: appHeader,
      body: appCustomerAccountIndexBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  {
    path: '/customer/account/login',  // 登录页面
    components: {
      header: appHeader,
      body: appCustomerAccountLoginBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  {
    path: '/customer/account/register',  // 注册页面
    components: {
      header: appHeader,
      body: appCustomerAccountRegisterBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  {
    path: '/customer/order',  // 用户订单
    components: {
      header: appHeader,
      body: appCustomerOrderBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  {
    path: 'customer/editaccount',  // 用户信息编辑
    components: {
      header: appHeader,
      body: appCustomerEditaccountBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  {
    path: '/customer/address',  // 用户地址
    components: {
      header: appHeader,
      body: appCustomerAddressBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  {
    path: '/customer/productreview',  // 用户评论
    components: {
      header: appHeader,
      body: appCustomerProductreviewBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  {
    path: '/customer/productfavorite',  // 用户收藏
    components: {
      header: appHeader,
      body: appCustomerProductfavoriteBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  {
    path: 'customer/contacts',  // 联系我们页面
    components: {
      header: appHeader,
      body: appCustomerContactsBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  
  {
    path: 'customer/account/forgotpassword',  // 忘记密码
    components: {
      header: appHeader,
      body: appCustomerAccountForgotpasswordBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
   {
    path: 'customer/account/resetpassword',  // 重置密码
    components: {
      header: appHeader,
      body: appCustomerAccountResetpasswordBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  {
    path: 'customer/account/resetpasswordsuccess',  // 重置密码
    components: {
      header: appHeader,
      body: appCustomerAccountResetpasswordSuccessBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  
  {
    path: '/checkout/cart',  // 购物车
    components: {
      header: appHeader,
      body: appCheckoutCartBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  {
    path: '/checkout/onepage',  // 下单页面
    components: {
      header: appHeader,
      body: appCheckoutOnepageBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  {
    path: '/catalog/reviewproduct/add',  // 产品增加评论
    components: {
      header: appHeader,
      body: appProductReviewAddBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  
  {
    path: 'catalog/reviewproduct/lists',  // 产品评论列表
    components: {
      header: appHeader,
      body: appProductReviewListBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  
  {
    path: 'payment/success',  // 下单成功页面
    components: {
      header: appHeader,
      body: appPaymentSuccessBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  {
    path: 'cms/page/:page_id',  // 下单成功页面
    components: {
      header: appHeader,
      body: appCmsPageBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  
]
