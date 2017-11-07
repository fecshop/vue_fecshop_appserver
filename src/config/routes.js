// 引入子路由
import Frame from '../frame/subroute.vue'

import appHeader from '../views/Header.vue'

import leftMenu from '../views/Leftmenu.vue'
import leftAccount from '../views/Leftaccount.vue'
import appFooter from '../views/Footer.vue'

//import appContentBody from '../views/body/home/Index.vue'

import appHomeBody from '../views/body/home/Index.vue' 
import appPaymentSuccessBody from '../views/body/payment/Success.vue' 
import appCmsPageBody from '../views/body/cms/Page.vue' 

import appCheckmoneyStartBody from     '../views/body/payment/checkmoney/Start.vue'

import appPaypalExpressReviewBody from '../views/body/payment/paypal/express/Review.vue'

import appPaypalStandardStartBody from '../views/body/payment/paypal/standard/Start.vue'
import appPaypalStandardReviewBody from '../views/body/payment/paypal/standard/Review.vue'

import appAlipayStandardStartBody from '../views/body/payment/alipay/standard/Start.vue'
import appAlipayStandardReviewBody from '../views/body/payment/alipay/standard/Review.vue'


  
import appCategoryBody from '../views/body/category/Index.vue' //
import appSearchBody from '../views/body/search/Index.vue' 
import appProductBody from '../views/body/product/Index.vue' //
import appProductReviewAddBody from '../views/body/product/review/Add.vue' 
import appProductReviewListBody from '../views/body/product/review/List.vue'

import appCustomerGoogleLoginVBody from '../views/body/customer/google/Loginv.vue'
import appCustomerFacebookLoginVBody from '../views/body/customer/facebook/Loginv.vue'


import appCustomerAccountForgotpasswordBody from '../views/body/customer/account/Forgotpassword.vue'
import appCustomerAccountResetpasswordBody from '../views/body/customer/account/Resetpassword.vue'
import appCustomerAccountForgotpasswordsubmitBody from '../views/body/customer/account/Forgotpasswordsubmit.vue'

import appCustomerAccountResetpasswordSuccessBody from '../views/body/customer/account/ResetpasswordSuccess.vue'
import appCustomerAccountIndexBody from '../views/body/customer/account/Index.vue'
import appCustomerAccountLoginBody from '../views/body/customer/account/Login.vue'
import appCustomerAccountRegisterBody from '../views/body/customer/account/Register.vue'

import appCustomerOrderBody from '../views/body/customer/Order.vue'
import appCustomerOrderViewBody from '../views/body/customer/order/View.vue'
import appCustomerEditaccountBody from '../views/body/customer/Editaccount.vue'
import appCustomerAddressBody from '../views/body/customer/Address.vue'
import appCustomerAddressEditBody from '../views/body/customer/address/Edit.vue'

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
      //bodycontent:appContentBody,
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
    path: '/search/:searchtext', // 分类
    components: {
      header: appHeader,
      body: appSearchBody,
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
    path: '/customer/order/view/:order_id',  // 用户订单
    components: {
      header: appHeader,
      body: appCustomerOrderViewBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  {
    path: '/customer/editaccount',  // 用户信息编辑
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
    path: '/customer/address/edit/:address_id',  // 用户地址
    components: {
      header: appHeader,
      body: appCustomerAddressEditBody,
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
    path: '/customer/contacts',  // 联系我们页面
    components: {
      header: appHeader,
      body: appCustomerContactsBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  
  
  
  {
    path: '/customer/google/loginv',  // 忘记密码
    components: {
      header: appHeader,
      body: appCustomerGoogleLoginVBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  {
    path: '/customer/facebook/loginv',  // 忘记密码
    components: {
      header: appHeader,
      body: appCustomerFacebookLoginVBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  {
    path: '/customer/account/forgotpassword',  // 忘记密码
    components: {
      header: appHeader,
      body: appCustomerAccountForgotpasswordBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  {
    path: '/customer/account/forgotpasswordsubmit',  // 忘记密码
    components: {
      header: appHeader,
      body: appCustomerAccountForgotpasswordsubmitBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  

  
   {
    path: '/customer/account/resetpassword/:resetToken',  // 重置密码
    components: {
      header: appHeader,
      body: appCustomerAccountResetpasswordBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  {
    path: '/customer/account/resetpasswordsuccess',  // 重置密码
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
    path: '/product/review/add/:product_id',  // 产品增加评论
    components: {
      header: appHeader,
      body: appProductReviewAddBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  
  {
    path: '/product/review/lists/:product_id',  // 产品评论列表
    components: {
      header: appHeader,
      body: appProductReviewListBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  
  {
    path: '/payment/success',  // 下单成功页面
    components: {
      header: appHeader,
      body: appPaymentSuccessBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  {
    path: '/cms/page/:page_key',  // 下单成功页面
    components: {
      header: appHeader,
      body: appCmsPageBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  {
    path: '/payment/checkmoney/start',  // 下单成功页面
    components: {
      header: appHeader,
      body: appCheckmoneyStartBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  {
    path: '/payment/paypal/standard/start',  // 下单成功页面
    components: {
      header: appHeader,
      body: appPaypalStandardStartBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  {
    path: '/payment/paypal/standard/review',  // 下单成功页面
    components: {
      header: appHeader,
      body: appPaypalStandardReviewBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  
  {
    path: '/payment/paypal/express/review',  // 下单成功页面
    components: {
      header: appHeader,
      body: appPaypalExpressReviewBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  
  
  {
    path: '/payment/alipay/standard/start',  // alipay 支付开始页面
    components: {
      header: appHeader,
      body: appAlipayStandardStartBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  },
  
  {
    path: '/payment/alipay/standard/review',  // alipay 支付支付成功后返回的页面
    components: {
      header: appHeader,
      body: appAlipayStandardReviewBody,
      footer: appFooter,
      leftmenu: leftMenu,
      leftaccount: leftAccount
    }
  }
  
  
]
