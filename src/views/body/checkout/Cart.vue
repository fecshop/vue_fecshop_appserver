<template>
    <div class="main container one-column content">
        <div class="col-main">
            <div class="account-ds">
                <div class="bar bar-nav account-top-m">
                    
                    <a @click="routerGo()"  href="javascript:void(0)" class="button button-link button-nav pull-left">
                        <span class="icon icon-left"></span>
                    </a>
                    
                    <h1 class='title'>Cart</h1>
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
                        <div v-for="(productOne,index) in cart_products " class="row">
                            <div class="col-20">
                                <router-link :to="productOne.url" title="productOne.name"  class="product-image">
                                    <img :src="productOne.img_url"   alt="productOne.name" width="75" height="75">
                                </router-link>
                            </div>
                            <div class="col-80">
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
                                        <h2>Discount Codes</h2>
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
                                <div class="col-80">Subtotal:  </div>
                                <div class="col-20">{{currency.symbol}}{{cart_info.product_total ? cart_info.product_total : 0.00}}</div>
                            </div>
                            
                            <div class="row no-gutter">
                                <div class="col-80">Shipping Cost: </div>
                                <div class="col-20">{{currency.symbol}}{{cart_info.shipping_cost ? cart_info.shipping_cost : 0.00}}</div>
                            </div>
                            
                            
                            <div class="row no-gutter">
                                <div class="col-80">Discount :</div>
                                <div class="col-20">-{{currency.symbol}} {{cart_info.coupon_cost ? cart_info.coupon_cost : 0.00}}</div>
                            </div>
                            
                            <div class="row no-gutter">
                                <div class="col-80">Grand Total :</div>
                                <div class="col-20">{{currency.symbol}} {{cart_info.grand_total ? cart_info.grand_total : 0.00}}</div>
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
                                                    Proceed to Pay
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
            paypalExpressStartUrl: root + '/payment/paypal/express/start' ,
            
            errormsg:'',
            cart_products:[],
            productQty:{},
            cart_info:{},
            pageInitComplete:false,
            currency:'',
            couponLabel:'Add Coupon',
            couponType:1, // 1 代表 add coupon 2 代表 cancel coupon
            coupon_code:'',
            correctmsg:''
        }
    },
    created: function(){
        this.pageInit();
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
                    $.hideIndicator();
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
                    if(reponseData.code == 200){
                        self.saveReponseHeader(request);
                        self.pageInit();
                    }else{
                        self.saveReponseHeader(request); 
                        self.errormsg = 'update cart product qty fail';
                        $.toast('update qty fail');
                    }
                    $.hideIndicator();
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
                    if(reponseData.code == 200){
                        self.currency = reponseData.data.currency;
                        self.cart_products = reponseData.data.cart_info.products;
                        var products = self.cart_products;
                        for(var x in products){
                            var productOne = products[x];
                            self.productQty[productOne.item_id] = productOne.qty;
                        }
                        
                        self.cart_info = reponseData.data.cart_info;
                        self.coupon_code = self.cart_info.coupon_code;
                        if(self.coupon_code){
                            self.couponType = 2;
                            self.couponLabel = 'Cancel Coupon';
                        }
                        console.log('get editAccount info success');
                        self.saveReponseHeader(request); 
                    }
                    //console.log('cart_products.length:'+ self.cart_products.length);
                    self.pageInitComplete = true;
                    $.hideIndicator();
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
                    if(reponseData.code == 1100003){
                        $.hideIndicator();
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
                    $.hideIndicator();
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