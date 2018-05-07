<template>
    <div class="main container one-column content">
        <div class="col-main">
            <div class="account-ds">
                <div class="bar bar-nav account-top-m">
                    
                    <a @click="routerGo()"  href="javascript:void(0)" class="button button-link button-nav pull-left">
                        <span class="icon icon-left"></span>
                    </a>
                    
                    <h1 class='title'>{{ $t("message.cart") }}</h1>
                </div>
            </div>
            <div class="fecshop_message" v-if="errormsg">
                <div class="error-msg">
                    <div>
                        {{errormsg}}
                    </div>
                </div>
            </div>
        
            <div v-if="pageInitComplete && cart_products && cart_products.length > 0" class="product_page"  >        
            
                <div class="cart">
                    
                    <div class="cart_info">
                        <div class="cart_select_div">
                            <input @click="selectAll()"  v-model="selectAllStatus" id="cart_select_all" type="checkbox" name="cart_select_all" class="cart_select cart_select_all">
                            &nbsp;
                            <label for="cart_select_all">Select All Product</label>
                        </div>
                        <div v-for="(productOne,index) in cart_products " class="row">
                            <div class="col-33">
                                <input @click="selectOne(index)" v-model="productOne.active" type="checkbox" name="cart_select_item" class="cart_select cart_select_item">
                                <router-link :to="productOne.url" title="productOne.name"  class="product-image">
                                    <img :src="productOne.img_url"   alt="productOne.name" width="75" height="75">
                                </router-link>
                            </div>
                            <div class="col-66">
                                <h2 class="product-name">
                                    <router-link :to="productOne.url" title="productOne.name"  >
                                        {{productOne.name}}
                                    </router-link>
                                </h2>
                                
                                <ul class="options" v-if="productOne.custom_option_info" >
                                    <li v-for="(val,label) in productOne.custom_option_info">
                                        {{label}}:{{val}} 
                                    </li> 
                                </ul>
                                <div class="clear"></div>
                                
                                <span class="cart-price">
                                    <span class="price">
                                        {{currency.symbol}}
                                        {{productOne.product_price}}
                                    </span>                
                                </span>
                                <div class="cart_qty"> 
                                    <a @click="updateInfo('less_one',productOne.item_id)" href="javascript:void(0)" class="cartqtydown changeitemqty" :rel="productOne.item_id" :num="productOne.qty">-</a>
                                    <input v-model="productQty[productOne.item_id]" name="cart[qty]" size="4" title="Qty" class="input-text qty" :rel="productOne.item_id" maxlength="12" >
                                    <a @click="updateInfo('add_one',productOne.item_id)" href="javascript:void(0)" class="cartqtyup changeitemqty" :rel="productOne.item_id" :num="productOne.qty">+</a>
                                    <div class="clear"></div>
                                </div>
                                <a  @click="updateInfo('remove',productOne.item_id)" href="javascript:void(0)"  :rel="productOne.item_id" title="Remove item" class="btn-remove btn-remove2">
                                    <span class="icon icon-remove">
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cart-collaterals">
                        <div class="col2-set">
                            <div class="col-1">
                            </div>
                            <div class="col-2">
                                <div id="discount-coupon-form" >
                                    <div class="discount">
                                        <h2>{{ $t("message.discount_codes") }}</h2>
                                        <div class="discount-form">
                                            <div class="input-box">
                                                <div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">
                                                    <input v-model="coupon_code" style="color:#777;" class="input-text" id="coupon_code" name="coupon_code" value="">
                                                </div>
                                            </div>
                                            <div class="buttons-coupon">
                                                <a @click="addCoupon()" data-role="button" href="javascript:void(0)"  class="submitbutton ui-link ui-btn ui-shadow ui-corner-all" role="button">
                                                    <span><span>{{couponLabel}}</span></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                        </div>
                        <div class="cart_cost">
                            <div class="row no-gutter">
                                <div class="col-66">{{ $t("message.subtotal") }} :  </div>
                                <div class="col-33">{{currency.symbol}}{{cart_info.product_total ? cart_info.product_total : 0.00}}</div>
                            </div>
                            
                            <div class="row no-gutter">
                                <div class="col-66">{{ $t("message.sub_weight") }} :  </div>
                                <div class="col-33">{{cart_info.product_weight ? cart_info.product_weight : 0.00}} Kg</div>
                            </div>
                            
                            <div class="row no-gutter">
                                <div class="col-66">{{ $t("message.sub_volume") }} :  </div>
                                <div class="col-33">{{cart_info.product_volume ? cart_info.product_volume : 0.00}} c㎡</div>
                            </div>
                            
                            
                            <div class="row no-gutter">
                                <div class="col-66">{{ $t("message.shipping_cost") }} : </div>
                                <div class="col-33">{{currency.symbol}}{{cart_info.shipping_cost ? cart_info.shipping_cost : 0.00}}</div>
                            </div>
                            
                            
                            <div class="row no-gutter">
                                <div class="col-66">{{ $t("message.discount") }} :</div>
                                <div class="col-33">-{{currency.symbol}} {{cart_info.coupon_cost ? cart_info.coupon_cost : 0.00}}</div>
                            </div>
                            
                            <div class="row no-gutter">
                                <div class="col-66">{{ $t("message.grand_total") }} :</div>
                                <div class="col-33">{{currency.symbol}} {{cart_info.grand_total ? cart_info.grand_total : 0.00}}</div>
                            </div>
                        </div>
                        <div class="totals cart-totals">
                            <div class="proceed_to_checkout">
                                <div class="row no-gutter">
                                    <div class="col-50">
                                        <button @click="goToPay()"
                                            type="button" 
                                            title="Proceed to Checkout" 
                                            class="button btn-proceed-checkout btn-checkout"
                                        >
                                            <span>
                                                <span>
                                                    {{ $t("message.proceed_to_pay") }}
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                    <div class="col-50">
                                        <a @click="paypalExpressStart()"  class="express_paypal" href="javascript:void(0)">
                                            <img src="//img.fancyecommerce.com/images/pay.png"  />
                                        </a>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                    
                </div>
            </div>
        
            <div v-if="pageInitComplete && (!cart_products)" class="empty_cart ">
                <div id="empty_cart_info">
                    Your Shopping Cart is empty
                    <router-link to="/"  class="">
                        Start shopping now!
                    </router-link>
                    <br>
                    Please 
                        <router-link to="/customer/account/login"  class="">
                            log in
                        </router-link>
                    to view the products you have previously added to your Shopping Cart.
                </div>
            </div> 
            <div v-if="pageInitComplete && (!cart_products)" class="empty_cart_img">
                
            </div>
        </div>
    </div>
</template>
<script>

var root = process.env.API_ROOT;
var website_root = process.env.WEBSITE_ROOT;

export default {
    data () {
        return {
            pageInitUrl: root + '/checkout/cart/index' ,
            addCouponUrl: root + '/checkout/cart/addcoupon' ,
            cancelCouponUrl: root + '/checkout/cart/cancelcoupon' ,
            updateInfoUrl: root + '/checkout/cart/updateinfo' ,
            selectOneUrl: root + '/checkout/cart/selectone' ,
            selectAllUrl: root + '/checkout/cart/selectall' ,
            
            paypalExpressStartUrl: root + '/payment/paypal/express/start' ,
            selectAllStatus: 0,
            errormsg:'',
            cart_products:[],
            productQty:{},
            cart_info:{},
            pageInitComplete:false,
            currency:'',
            couponLabel:'Add Coupon',
            couponType:1, // 1 代表 add coupon 2 代表 cancel coupon
            coupon_code:'',
            refer_url: '',
            correctmsg:''
        }
    },
    created: function(){
        this.pageInit();
    },
    beforeRouteEnter (to, from, next) {
        var website_root = process.env.WEBSITE_ROOT
        var fullPath = from.fullPath
        var name = from.name
        console.log(fullPath);
        console.log(from);  
        if (fullPath !== '/' || typeof(name) === 'undefined' ) {
            var referUrl = website_root + "/#" + fullPath
            console.log(referUrl)
        } else {
            referUrl = ''
        }
        next( vm => {
            vm.refer_url = referUrl;
        });  
    },
    methods: {
        routerGo: function(){
            this.$router.go(-1);
        },
        paypalExpressStart: function(){
            var self = this;
            self.errormsg = '';
            
            $.showIndicator();
            var url = self.paypalExpressStartUrl;
            $.ajax({
                url: url,
                async: true,
                timeout: 120000,
                type: 'post',
                headers: self.getRequestHeader(),
                data:{ 
                    'return_url': website_root + '/#/payment/paypal/express/review',
                    'cancel_url': website_root + '/#/checkout/cart',
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 200){
                        self.saveReponseHeader(request);
                        var redirectUrl = reponseData.data.redirectUrl;
                        console.log(redirectUrl);
                        window.location.href = redirectUrl;
                    }else if(reponseData.code == 1500001){
                        $.toast('generate order fail');
                    }else if(reponseData.code == 1500002){
                        $.toast('generate order fail');
                    }else if(reponseData.code == 1500003){
                        $.toast('Get paypal express token fail');
                    }else{
                        $.toast('generate order fail');
                    }
                    self.saveReponseHeader(request); 
                    self.errormsg = reponseData.data.error;
                    
                },
                error:function(){
                    $.hideIndicator();
                    $.toast('system error');
                    console.log('get address list page init error');
                }
            });
        },
        updateInfo: function(up_type,item_id){
            var self = this;
            self.errormsg = '';
            var qty = self.productQty[item_id];
            if(!qty || qty <= 0){
                self.productQty[item_id] = 1;
                self.errormsg = 'product qty is error';
                return;
            }
            if(up_type == 'less_one'){
                if(qty <=1){
                    self.productQty[item_id] = 1;
                    return;
                }
            }
            $.showIndicator();
            var url = self.updateInfoUrl;
            $.ajax({
                url: url,
                async: true,
                timeout: 120000,
                type: 'post',
                headers: self.getRequestHeader(),
                data:{ 
                    up_type:up_type,
                    item_id:item_id
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 200){
                        self.saveReponseHeader(request);
                        self.pageInit();
                    }else{
                        self.saveReponseHeader(request); 
                        self.errormsg = 'update cart product qty fail';
                        $.toast('update qty fail');
                    }
                    
                },
                error:function(){
                    $.hideIndicator();
                    $.toast('system error');
                    console.log('get address list page init error');
                }
            });
        },
        selectOne: function(index){
            var cp = this.cart_products;
            var productOne = cp[index];
            var item_id = productOne.item_id;
            var active = productOne.active;
            var self = this;
            self.errormsg = '';
            $.showIndicator();
            var url = self.selectOneUrl;
            active = active ? 1 : 0;
            $.ajax({
                url: url,
                async: true,
                timeout: 120000,
                type: 'get',
                headers: self.getRequestHeader(),
                data:{ 
                    checked: active,
                    item_id: item_id
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 200){
                        self.saveReponseHeader(request);
                        self.pageInit();
                    }else{
                        self.saveReponseHeader(request); 
                        self.errormsg = 'select cart product fail';
                        $.toast('select cart product fail');
                    }
                    
                },
                error:function(){
                    $.hideIndicator();
                    $.toast('system error');
                    console.log('get address list page init error');
                }
            });
        },
        
        selectAll: function(){
            var self = this;
            self.errormsg = '';
            $.showIndicator();
            // if (!self.selectAllStatus) {
            //    self.selectAllStatus = 1;
            // } else {
            //    self.selectAllStatus = 0;
            // }
            var active = self.selectAllStatus ? 1 : 0;
            var url = self.selectAllUrl;
            //alert(active);
            $.ajax({
                url: url,
                async: true,
                timeout: 120000,
                type: 'get',
                headers: self.getRequestHeader(),
                data:{ 
                    checked: active,
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 200){
                        self.saveReponseHeader(request);
                        self.pageInit();
                    }else{
                        self.saveReponseHeader(request); 
                        self.errormsg = 'select cart product fail';
                        $.toast('select cart product fail');
                    }
                    
                },
                error:function(){
                    $.hideIndicator();
                    $.toast('system error');
                    console.log('get address list page init error');
                }
            });
        },
        
        goToPay: function(){
            this.$router.push('/checkout/onepage');
        },
        initSelectAll: function(){
            var self = this;
            var products = self.cart_products;
            // 检查各个select是否全部选择，如果全部选择，则 selectAllStatus = 1
            var selectAll = 1;
            for(var x in products){
                var productOne = products[x];
                if (productOne['active'] != 1) {
                    selectAll = 0;
                }
            }
            self.selectAllStatus = selectAll;
        },
        pageInit: function(){
            var self = this;
            self.errormsg = '';
            self.correctmsg = '';
            $.showIndicator();
            $.ajax({
                url: self.pageInitUrl,
                async: true,
                timeout: 120000,
                type: 'get',
                headers: self.getRequestHeader(),
                data:{ 
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 200){
                        self.currency = reponseData.data.currency;
                        self.cart_products = reponseData.data.cart_info.products;
                        var products = self.cart_products;
                        // 现在已经改成了服务端发送购物车数据，因此，购物车页面不再发送购物车数据。
                        // var traceCart = [];
                        for(var x in products){
                            var productOne = products[x];
                            self.productQty[productOne.item_id] = productOne.qty;
                            //  var traceProduct = {
                            //      'sku': productOne.sku,
                            //      'qty': productOne.qty,
                            //      'price': productOne.base_product_price
                            //  };
                            //  traceCart.push(traceProduct)
                        }
                        
                        self.cart_info = reponseData.data.cart_info;
                        self.coupon_code = self.cart_info.coupon_code;
                        if(self.coupon_code){
                            self.couponType = 2;
                            self.couponLabel = 'Cancel Coupon';
                        }
                        console.log('get editAccount info success');
                        // cart trace
                        // var traceData = {"cart": JSON.stringify(traceCart), "refer_url": self.refer_url};
                        var traceData = {"refer_url": self.refer_url};  // 购物车信息的接收，改成服务端发送，因此去掉："cart": JSON.stringify(traceCart)
                        var routerQ = self.$route.query
                        for (var k in routerQ) {
                            traceData[k] = routerQ[k]
                        }
                        self.reloadTraceJs(traceData);
                        self.saveReponseHeader(request); 
                        self.initSelectAll();
                    }
                    //console.log('cart_products.length:'+ self.cart_products.length);
                    self.pageInitComplete = true;
                    
                },
                error:function(){
                    $.hideIndicator();
                    $.toast('system error');
                    console.log('get address list page init error');
                }
            });
            
        },
        addCoupon: function(){
            var self = this;
            var coupon_code = self.coupon_code;
            self.errormsg = '';
            if(!coupon_code){
                self.errormsg = 'coupon code can not empty';
                return;
            }
            $.showIndicator();
            var url = '';
            if(self.couponType == 1){
                url = self.addCouponUrl;
            }else{
                url = self.cancelCouponUrl;
            }
            $.ajax({
                url: url,
                async: true,
                timeout: 120000,
                type: 'post',
                headers: self.getRequestHeader(),
                data:{ 
                    coupon_code:coupon_code
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 1100003){
                        self.setLoginSuccessRedirectUrl('/checkout/cart');
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(reponseData.code == 200){
                        self.saveReponseHeader(request);
                        self.pageInit();
                        if(self.couponType == 1){
                            self.couponType = 2;
                            self.couponLabel = 'Cancel Coupon';
                        }else{
                            self.couponType = 1;
                            self.couponLabel = 'Add Coupon';
                            self.self.coupon_code = '';
                        }
                    }else{
                        self.saveReponseHeader(request); 
                        if(self.couponType == 1){
                            self.errormsg = 'add coupon error,coupon code is wrong or has timeout';
                        }else{
                            self.errormsg = 'cancel coupon error';
                        }
                    }
                    
                },
                error:function(){
                    $.hideIndicator();
                    $.toast('system error');
                    console.log('get address list page init error');
                }
            });
            
        }
    
    
    }
    
    
    
}
</script>