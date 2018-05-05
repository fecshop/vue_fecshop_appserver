<template>
    <div class="main container one-column content">
        <div class="col-main">
            
            <div class="account-ds">
                <div class="bar bar-nav account-top-m">
                    
                    <a @click="routerGo()"  href="javascript:void(0)" class="button button-link button-nav pull-left">
                        <span class="icon icon-left"></span>
                    </a>
                    
                    <h1 class='title'>Checkout</h1>
                </div>
            </div>
            <div class="fecshop_message" v-if="errormsg">
                <div class="error-msg">
                    <div>
                        {{errormsg}}
                    </div>
                </div>
            </div>
            <div  id="onestepcheckout-form">
                <div style="margin: 0;" class="group-select">
                    <p class="onestepcheckout-description">
                        Welcome to the checkout,Fill in the fields below to complete your purchase!
                    </p>
                    <p v-if="isCustomerPassword && isGuest" class="onestepcheckout-login-link">
                        <router-link to="/customer/account/login" id="onestepcheckout-login-link" >
                            Already registered? Click here to login
                        </router-link>
                    </p>
                    
                    <div class="onestepcheckout-place-order-loading" :style="'display:'+ fetchAjaxWait">
                        <img src="//img.fancyecommerce.com/images/opc-ajax-loader.gif">&nbsp;&nbsp;
                        Please wait, fetch address info from paypal...
                    </div>
                            
                    <div class="onestepcheckout-threecolumns checkoutcontainer onestepcheckout-skin-generic onestepcheckout-enterprise">
                        <div class="onestepcheckout-column-left">
                            <div class="guest_address">
                                
                                <div id="billing_address" >		
                                    <ul>
                                        <li>
                                            <p class="onestepcheckout-numbers onestepcheckout-numbers-1">
                                                Shipping Address
                                            </p>
                                        </li>
                                        <li :style="'display:' + displayAddressDetails">
                                            <div>
                                                
                                                
                                                <ul  id="billing_address_list" class="billing_address_list_new" >			
                                                    <li class="clearfix">
                                                        <div class="input-box input-firstname">
                                                            <label for="billing:firstname">
                                                                First Name
                                                                <span class="required">*</span>
                                                            </label>
                                                            <input v-model="cart_address.first_name" id="billing:firstname" name="billing[first_name]" class="required-entry input-text" type="text">
                                                        </div>
                                                        <div class="input-box input-lastname">
                                                            <label for="billing:lastname">
                                                                Last Name
                                                                <span class="required">*</span>
                                                            </label>
                                                            <input v-model="cart_address.last_name"  id="billing:lastname" name="billing[last_name]" class="required-entry input-text" type="text">
                                                        </div>
                                                        <div class="clear"></div>
                                                    </li>
                                                    <li class="clearfix">
                                                        <div  class="  input-box input-email">
                                                            <label for="billing:email">
                                                                Email Address
                                                                <span class="required">*</span>
                                                            </label>
                                                            <input  v-model="cart_address.email" class="validate-email required-entry input-text" title="Email Address" id="billing:email" name="billing[email]" type="text">
                                                            <div class="customer_email_validation">
                                                            
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div  class="input-box input-telephone">
                                                            <label for="billing:telephone">
                                                                Telephone <span class="required">*</span>
                                                            </label>
                                                            <input v-model="cart_address.telephone"  id="billing:telephone" class="required-entry input-text" title="Telephone" name="billing[telephone]" type="text">
                                                        </div>
                                                    </li>
                                                    <li class="clearfix">
                                                        <div class="input-box input-address">
                                                            <label for="billing:street1">
                                                                Street<span class="required">*</span>
                                                            </label>
                                                            <input v-model="cart_address.street1"  class="required-entry input-text onestepcheckout-address-line" id="billing:street1" name="billing[street1]" title="Street Address 1" type="text">
                                                            
                                                            <input v-model="cart_address.street2"  class="input-text onestepcheckout-address-line" id="billing:street2" name="billing[street2]" title="Street Address 2" type="text">
                                                        </div>
                                                    </li>
                                                    <li class="clearfix">
                                                        <div class="input-box input-country">
                                                            <label for="billing:country">
                                                                Country <span class="required">*</span></label>
                                                                <select @change="changeCountry()" v-model="country" title="Country" class="billing_country validate-select" id="billing:country" name="billing[country]">
                                                                    <template v-for="(countryName,countryCode) in countryArr">
                                                                        <option :value="countryCode">{{countryName}}</option>
                                                                    </template>
                                                                </select>
                                                            </div>
                                                    </li>
                                                    <li class="clearfix">
                                                        <div class="input-box input-state">
                                                            <label for="billing:state" class="required">
                                                                State<span class="required">*</span>
                                                            </label>
                                                            <div class="state_html">
                                                                <input @change="changeState()" v-if="!stateArr" v-model="state" id="state" name="billing[state]"  title="State" class="address_state input-text" style="" type="text">
                                                                <select @change="changeState()" v-if="stateArr" v-model="state" id="address:state" class="address_state validate-select" title="State" name="billing[state]">
                                                                    <option value="">Please select region, state or province</option>
                                                                    <template v-for="(stateName,stateCode) in stateArr">
                                                                         <option :value="stateCode">{{stateName}}</option>
                                                                    </template>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li class="clearfix">
                                                        <div class="input-box input-city">
                                                            <label for="billing:city">
                                                                City <span class="required">*</span>
                                                            </label>
                                                            <input v-model="cart_address.city"  id="billing:city" class="required-entry input-text" title="City" name="billing[city]" type="text">
                                                        </div>
                                                    </li>
                                                    <li class="clearfix">
                                                        <div class="input-box input-zip">
                                                            <label for="billing:zip">
                                                                Zip Code <span class="required">*</span>
                                                            </label>
                                                            <input v-model="cart_address.zip" class="validate-zip-international required-entry input-text" id="billing:zip" name="billing[zip]" title="Zip Code" type="text">
                                                        </div>
                                                    </li>
                                                    
                                                </ul>							
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                
                            </div>
                        </div>

                        <div class="onestepcheckout-column-middle">
                            <div class="shipping_method_html">
                                <div class="onestepcheckout-shipping-method">
                                    <p class="onestepcheckout-numbers onestepcheckout-numbers-2">
                                        Shipping Method
                                    </p>
                                    <div class="onestepcheckout-shipping-method-block">    
                                        <dl class="shipment-methods">
                                            
                                            <div v-for="(shipping,index) in shippings" class="shippingmethods">
                                                <div class="flatrate">
                                                    {{shipping.label}}
                                                </div>
                                                <div>
                                                    <input @change="changeShipping()" v-model="shipping_method"  data-role="none"  type="radio" :id="'s_method_flatrate_flatrate'+shipping.shipping_i" :value="shipping.method" class="validate-one-required-by-name" name="shipping_method">
                                                    <label :for="'s_method_flatrate_flatrate'+shipping.shipping_i">{{shipping.name}}
                                                        <strong>                 
                                                            <span class="price">
                                                                {{shipping.symbol}}
                                                                {{shipping.cost}}
                                                            </span>
                                                        </strong>
                                                    </label>
                                                </div>
                                            </div>
                                            
                                        </dl>
                                    </div>
                                </div>


                            </div>
                          
                            <div class="onestepcheckout-coupons">
                                <div style="display: none;" id="coupon-notice"></div>
                                <div class="op_block_title">
                                    Coupon codes (optional)
                                </div>
                                <label for="id_couponcode">
                                    Enter your coupon code if you have one.
                                </label>
                                
                                <input v-model="coupon_code" style="color:#777;" class="input-text" id="id_couponcode" name="coupon_code" >
                                <br>
                                <button @click="addCoupon()" style="" type="button" class="submitbutton add_coupon_submit" id="onestepcheckout-coupon-add">
                                    {{couponLabel}}
                                </button>
                                <div class="clear"></div>
                                <div class="coupon_add_log"></div>
                            </div>
                            
                            <div class="onestepcheckout-coupons">
    							<div class="op_block_title">{{ $t("message.order_remark") }}</div> 
    							<label for="id_couponcode">{{ $t("message.fill_order_remark") }}</label> 
    							<textarea v-model="order_remark" class="order_remark" name="order_remark" style="width:94%;height:100px;padding:10px;"></textarea>
    						</div>
                        </div>

                        <div class="onestepcheckout-column-right">
                            <div class="review_order_view">
                                
                                
                                
                                <p class="onestepcheckout-numbers onestepcheckout-numbers-4">
                                    Review your order
                                </p>
                                <div class="onestepcheckout-summary">
                                    <table class="onestepcheckout-summary">
                                        <thead>
                                            <tr>
                                                <th class="image"></th>
                                                <th class="name">Name</th>
                                                <th class="qty">Qty</th>
                                                <th class="total">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="product in cart_info.products">
                                                <td class='image'>
                                                    
                                                    <router-link :to="'/catalog/product/'+product.product_id" class="product-image" >
                                                        <img :src="product.imgUrl" alt="2121" >
                                                    </router-link>
                                                    
                                                </td>
                                                
                                                <td class="name">
                                                    <h2 class="product-name">
                                                        <router-link :to="'/catalog/product/'+product.product_id" :title="product.name" class="product-image" >
                                                            {{product.name}}
                                                        </router-link>
                                                    </h2>
                                                    <ul v-if="product.custom_option_info">
                                                        <li v-for="(val,label) in product.custom_option_info">
                                                            {{label}}:
                                                            {{val}}
                                                        </li>  
                                                    </ul>
                                                </td>
                                                <td class="qty">
                                                    {{product.qty}}
                                                </td>
                                                <td class="total">
                                                    <span class="price">
                                                        {{currency_info.symbol}}
                                                        {{product.product_row_price}}
                                                    </span>
                                                </td>
                                            </tr>
                                            		
                                        </tbody>
                                    </table>
                                    <table class="onestepcheckout-totals">
                                        <tbody>
                                            <tr>
                                                <td >
                                                    Subtotal
                                                </td>
                                                <td class="value">
                                                    <span class="price">
                                                        {{currency_info.symbol}}
                                                        {{cart_info.product_total}}
                                                        
                                                    </span>       
                                                </td>
                                            </tr>
                                            <tr>
                                                <td >
                                                    Shipping Cost
                                                </td>
                                                <td class="value">
                                                    <span class="price">
                                                        {{currency_info.symbol}}
                                                        {{cart_info.shipping_cost}}
                                                    </span> 
                                                </td>
                                            </tr>
                                            <tr>
                                                <td >
                                                    Discount
                                                </td>
                                                <td class="value">
                                                    <span class="price">-{{currency_info.symbol}} {{cart_info.coupon_cost}}
                                                    </span> 
                                                </td>
                                            </tr>
                                            <tr class="grand-total">
                                                <td >
                                                    Grand Total
                                                </td>
                                                <td class="value">
                                                    <span class="price">{{currency_info.symbol}}{{cart_info.grand_total}}
                                                    </span>   
                                                </td>
                                            </tr>						
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div class="onestepcheckout-place-order">
                                <a @click="submitOrder()" class="large orange onestepcheckout-button" href="javascript:void(0)" id="onestepcheckout-place-order">
                                    Place order now
                                </a>
                                <div :style="'display:'+displaySubmitOrder" class="onestepcheckout-place-order-loading">
                                    <img src="//img.fancyecommerce.com/images/opc-ajax-loader.gif">&nbsp;&nbsp;
                                    Please wait, processing your order...
                                </div>
                            </div>
                        </div>
                        <div style="clear: both;">&nbsp;</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

var root = process.env.API_ROOT;

export default {
    data () {
        return {
            pageInitUrl: root + '/payment/paypal/express/review' ,
            changeCountryUrl: root + '/checkout/onepage/changecountry' ,
            addCouponUrl: root + '/checkout/cart/addcoupon' ,
            cancelCouponUrl: root + '/checkout/cart/cancelcoupon' , 
            submitOrderUrl: root + '/payment/paypal/express/submitorder' ,
            getShippingAndCartInfoUrl: root + '/checkout/onepage/getshippingandcartinfo' ,
            errormsg:'',
            customerPasswordDisplay:'none',
            customer_password:'',
            confirm_password:'',
            cart_address:{},
            cart_address_id:'',
            isGuest: 1,
            countryArr: {},
            country: '',
            stateArr: '',
            state: '',
            displayAddressDetails: 'none',
            currency_info: {},
            shippings: '',
            //payments: '',
            cart_info: {},
            address_list: '',
            isCustomerPassword: 0,
            pageInitComplete: false,
            currency: '',
            order_remark: '',
            couponLabel:'Add Coupon',
            couponType:1, // 1 代表 add coupon 2 代表 cancel coupon
            coupon_code:'',
            correctmsg:'',
            displaySubmitOrder:'none',
            payment_method:'',
            shipping_method:'',
            token:'',
            fetchAjaxWait:'block',
            refer_url: '',
            PayerID:''
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
        submitOrder: function(){
            self = this;
            self.errormsg = '';
            
            if(!self.cart_address.first_name){
                self.errormsg = 'first_name can not empty';
                return;
            }
            if(!self.cart_address.last_name){
                self.errormsg = 'last_name can not empty';
                return;
            }
            if(!self.cart_address.email){
                self.errormsg = 'email can not empty';
                return;
            }
            if(!self.cart_address.telephone){
                self.errormsg = 'telephone can not empty';
                return;
            }
            if(!self.cart_address.street1){
                self.errormsg = 'street1 can not empty';
                return;
            }
            if(!self.country){
                self.errormsg = 'country can not empty';
                return;
            }
            if(!self.state){
                self.errormsg = 'state can not empty';
                return;
            }
            if(!self.cart_address.city){
                self.errormsg = 'city can not empty';
                return;
            }
            if(!self.cart_address.zip){
                self.errormsg = 'zip can not empty';
                return;
            }
            var token = self.$route.query.token;
            var PayerID = self.$route.query.PayerID;
            if(!token){
                self.errormsg = 'token can not empty';
                return;
            }
            if(!PayerID){
                self.errormsg = 'PayerID can not empty';
                return;
            }
            var cookies = self.getTraceAllCookie();
            var ajaxData = {
                billing:{
                    first_name: self.cart_address.first_name,
                    last_name: self.cart_address.last_name,
                    email: self.cart_address.email,
                    telephone: self.cart_address.telephone,
                    street1: self.cart_address.street1,
                    street2: self.cart_address.street2,
                    country: self.country, // self.cart_address.country,
                    state: self.state,  // self.cart_address.state,
                    city: self.cart_address.city,
                    zip: self.cart_address.zip
                },
                order_remark: self.order_remark,
                token:token,
                PayerID:PayerID,
                shipping_method: self.shipping_method,
                cookies: cookies
            };
            
            $.showIndicator();
            self.displaySubmitOrder = 'block';
            $.ajax({
                url: self.submitOrderUrl,
                async: true,
                timeout: 120000,
                type: 'post',
                headers: self.getRequestHeader(),
                data:ajaxData,
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 200){
                        self.saveReponseHeader(request); 
                        self.$router.push('/payment/success');
                    }else if(reponseData.code == 1500003){
                        self.errormsg = 'token is invaild';
                    }else if(reponseData.code == 1500017){
                        self.errormsg = 'order has bean paid';
                    }else if(reponseData.code == 1500013){
                        self.errormsg = 'payment by paypal express fail';
                    }else if(reponseData.code == 1500002){
                        self.errormsg = 'order generate fail';
                    }else if(reponseData.code == 1500020){
                        self.errormsg = reponseData.message;
                    }else if(reponseData.code == 1500004){
                        self.errormsg = 'generate order require param is invaild';
                    }
                    
                },
                error:function(){
                    $.toast('system error');
                    $.hideIndicator();
                    console.log('get address list page init error');
                }
            });
            
        },
        
        
        addCustomerPassword: function(){
            var self = this;
            if(self.isCustomerPassword){
                self.customerPasswordDisplay = 'block';
            }else{
                self.customerPasswordDisplay = 'none';
            }
            
        
        },
        changeCountry: function(){
            var self = this;
            if(self.pageInitComplete){
                
                var country = self.country;
                self.errormsg = '';
                self.correctmsg = '';
                $.showIndicator();
                $.ajax({
                    url: self.changeCountryUrl,
                    async: true,
                    timeout: 120000,
                    type: 'get',
                    headers: self.getRequestHeader(),
                    data:{ 
                        country:country
                    },
                    success:function(reponseData, textStatus,request){
                        $.hideIndicator();
                        if(reponseData.code == 200){
                            self.stateArr = reponseData.data.stateArr;
                            self.state = '';
                            self.saveReponseHeader(request); 
                            self.getShippingAndCartInfo();
                        }
                        
                    },
                    error:function(){
                        $.toast('system error');
                        $.hideIndicator();
                        console.log('get address list page init error');
                    }
                });
            }
        },
        
        changeState: function(){
            self = this;
            self.getShippingAndCartInfo();
        },
        changeShipping: function(){
            self = this;
            self.getShippingAndCartInfo();
        },
        getShippingAndCartInfo: function(){
            console.log("getShippingAndCartInfo");
            var self = this;
            var address_id = self.cart_address_id;
            var country = self.country;
            var state = self.state;
            var shipping_method = self.shipping_method;
            
            self.errormsg = '';
            self.correctmsg = '';
            $.showIndicator();
            $.ajax({
                url: self.getShippingAndCartInfoUrl,
                async: true,
                timeout: 120000,
                type: 'get',
                headers: self.getRequestHeader(),
                data:{ 
                    country:country,
                    address_id:address_id,
                    state:state,
                    shipping_method:shipping_method,
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    // 1500008
                    if(reponseData.code == 200){
                        self.shippings = reponseData.data.shippings;
                        self.cart_info = reponseData.data.cart_info;
                        
                    }else if(reponseData.code == 1500008){
                        //$.toast('cart product is empty');
                    }
                    //console.log('cart_products.length:'+ self.cart_products.length);
                    self.saveReponseHeader(request); 
                    
                    self.pageInitComplete = true;
                },
                error:function(){
                    $.hideIndicator();
                    $.toast('system error');
                    console.log('get address list page init error');
                }
            });
        
        },
        routerGo: function(){
            this.$router.go(-1);
        },
        
        pageInit: function(){
            
            var self = this;
            console.log('current url:'+ self.$route.path);
            self.errormsg = '';
            self.correctmsg = '';
            self.pageInitComplete = false;
            var path = self.$route.path;
            self.token = self.$route.query.token;
            self.PayerID = self.$route.query.PayerID;
            var currentPathUrl = path+'?token='+self.token+'&PayerID='+self.PayerID;
            if(self.token && self.PayerID){
                $.showIndicator();
                $.ajax({
                    url: self.pageInitUrl,
                    async: true,
                    timeout: 120000,
                    type: 'get',
                    headers: self.getRequestHeader(),
                    data:{ 
                        'token':self.token,
                        'PayerID':self.PayerID,
                    },
                    success:function(reponseData, textStatus,request){
                        $.hideIndicator();
                        if(reponseData.code == 200){
                            self.cart_address = reponseData.data.cart_address;
                            
                            self.isGuest = reponseData.data.isGuest;
                            self.countryArr = reponseData.data.countryArr;
                            self.country = reponseData.data.country;
                            self.address_list = reponseData.data.address_list;
                            self.shippings = reponseData.data.shippings;
                            self.currency_info = reponseData.data.currency_info;
                            self.payment_method = reponseData.data.current_payment_method;
                            self.shipping_method = reponseData.data.current_shipping_method;
                            //self.payments = reponseData.data.payments;
                            self.cart_info = reponseData.data.cart_info;
                            self.coupon_code = self.cart_info.coupon_code;
                            if(self.coupon_code){
                                self.couponType = 2;
                                self.couponLabel = 'Cancel Coupon';
                            }
                            console.log('get editAccount info success');
                            var traceData = {"refer_url": self.refer_url};
                            var routerQ = self.$route.query
                            for (var k in routerQ) {
                                traceData[k] = routerQ[k]
                            }
                            self.reloadTraceJs(traceData);
                            self.saveReponseHeader(request); 
                            
                        }else if(reponseData.code == 1500007){ 
                            self.$router.push('/checkout/cart');
                        }else if(reponseData.code == 1500016){
                            self.errormsg = 'get address info from paypal express api fail';
                        }
                        
                        self.pageInitComplete = true;
                        self.displayAddressDetails = 'block';
                        self.fetchAjaxWait = 'none';
                    },
                    error:function(){
                        $.toast('system error');
                        $.hideIndicator();
                        console.log('get address list page init error');
                    }
                });
            }
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
                        var path = self.$route.path;
                        self.token = self.$route.query.token;
                        self.PayerID = self.$route.query.PayerID;
                        var currentPathUrl = path+'?token='+self.token+'&PayerID='+self.PayerID;
                        self.setLoginSuccessRedirectUrl(currentPathUrl);
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