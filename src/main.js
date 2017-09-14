// 引用 vue 没什么要说的
import Vue from 'vue'
// 引用路由
import VueRouter from 'vue-router'
// 光引用不成，还得使用
Vue.use(VueRouter)

import VueResource from 'vue-resource'; 
Vue.use(VueResource)

import Zepto from './assets/js/zepto.min.js'
// 光引用不成，还得使用
Vue.use(Zepto)
import Sui from './assets/js/sm.min.js'
// 光引用不成，还得使用
Vue.use(Sui)
import SuiExtend from './assets/js/sm-extend.min.js'
// 光引用不成，还得使用
Vue.use(SuiExtend)

// 入口文件为 src/App.vue 文件 所以要引用
import App from './App.vue'
import store from './config/store'
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


// default 设置 , 如果 localStorage 没有设置语言和货币，则通过配置设置。
// 这样做的是为了搞多语言，可以多个子域名解析过来，不同的域名设置不同的默认货币和语言。
// 下面的语言必须在服务端进行了相应的设置。 @appserver/config/fecshop_local_services/Store.php 的  serverLangs 设置语言
// 下面的货币必须在服务端进行了相应的设置。 @common/config/fecshop_local_services/Page.php 的 currencys 设置货币
var current_domain = window.location.host;
console.log('current_domain ######' + current_domain);
var store_config = store.storeConfig;
var fecshop_lang = window.localStorage.getItem("fecshop-lang");
var fecshop_currency = window.localStorage.getItem("fecshop-currency");
if(!fecshop_lang || !fecshop_currency){
    console.log('### 111111111')
    for(var k in store_config){
        var one = store_config[k];
        console.log('### 2222')
        console.log('### 2222' + one.domain)
        console.log('### 3333' + current_domain)
        if(one.domain == current_domain){
            console.log('### domain config get')
            if(!fecshop_lang){
                console.log('### domain config set lang')
                window.localStorage.setItem("fecshop-lang",one.lang_code);
            }
            if(!fecshop_currency){
                console.log('### domain config set currency')
                window.localStorage.setItem("fecshop-currency",one.currency_code);
            }
        }
    }
}



Vue.prototype.saveReponseHeader = function (request){
    // fecshop-uuid
    var fecshop_uuid = request.getResponseHeader('fecshop-uuid');
    if(fecshop_uuid){
        var local_fecshop_uuid = window.localStorage.getItem("fecshop-uuid");
        if(local_fecshop_uuid != fecshop_uuid){
            window.localStorage.setItem("fecshop-uuid",fecshop_uuid);
            console.log('save header [fecshop-uuid] ######' + fecshop_uuid);
        }
    }
    
    var access_token = request.getResponseHeader('access-token');
    if(access_token){
        var local_access_token = window.localStorage.getItem("access-token");
        if(local_access_token != access_token){
            window.localStorage.setItem("access-token",access_token);
            console.log('save header [access-token] ######' + access_token);
        }
    }
    
    
    
}



Vue.prototype.getRequestHeader = function (){
    var headers = {};
    var fecshop_uuid = window.localStorage.getItem("fecshop-uuid");
    if(fecshop_uuid){
        console.log('fecshop uuid ######' + fecshop_uuid);
        headers['fecshop-uuid'] = fecshop_uuid;
    }
    
    var fecshop_lang = window.localStorage.getItem("fecshop-lang");
    if(fecshop_lang){
        console.log('fecshop lang ######' + fecshop_lang);
        headers['fecshop-lang'] = fecshop_lang;
    }
    var fecshop_currency = window.localStorage.getItem("fecshop-currency");
    if(fecshop_currency){
        console.log('fecshop currency ######' + fecshop_currency);
        headers['fecshop-currency'] = fecshop_currency;
    }
    var access_token = window.localStorage.getItem("access-token");
    if(access_token){
        console.log('fecshop access-token ######' + access_token);
        headers['access-token'] = access_token;
    }
    return headers;
    //console.log('get header ####');
}

// 跑起来吧
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
