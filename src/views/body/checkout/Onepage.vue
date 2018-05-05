<template>
    <div class="main container one-column content">
        <div class="col-main">
            
            <div class="account-ds">
                <div class="bar bar-nav account-top-m">
                    
                    <a @click="routerGo()"  href="javascript:void(0)" class="button button-link button-nav pull-left">
                        <span class="icon icon-left"></span>
                    </a>
                    
                    <h1 class='title'>{{ $t("message.checkout") }}</h1>
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
                        {{ $t("message.welcome_to_checkout") }}
                    </p>
                    <p v-if="isCustomerPassword && isGuest" class="onestepcheckout-login-link">
                        <router-link to="/customer/account/login" id="onestepcheckout-login-link" >
                            {{ $t("message.already_registered") }}
                        </router-link>
                    </p>
                    <div class="onestepcheckout-threecolumns checkoutcontainer onestepcheckout-skin-generic onestepcheckout-enterprise">
                        <div class="onestepcheckout-column-left">
                            <div class="guest_address">
                                
                                <div id="billing_address" >		
                                    <ul>
                                        <li>
                                            <p class="onestepcheckout-numbers onestepcheckout-numbers-1">
                                                {{ $t("message.shipping_address") }}

                                            </p>
                                        </li>
                                        <li>
                                            <div>
                                                <select @change="changeAddressList()" v-model="cart_address_id" name="address_id" class="address_list" v-if="address_list">
                                                    
                                                    
                                                    <option v-for="(address,address_id) in address_list" :value="address_id">
                                                        {{address.address}}
                                                    </option>
                                                    
                                                    <option value="">
                                                        {{ $t("message.new_address") }}
                                                    </option>
                                                </select>
                                                
                                                
                                                <ul :style="'display:' + displayAddressDetails" id="billing_address_list" class="billing_address_list_new" >			
                                                    <li class="clearfix">
                                                        <div class="input-box input-firstname">
                                                            <label for="billing:firstname">
                                                                {{ $t("message.first_name") }}
                                                                <span class="required">*</span>
                                                            </label>
                                                            <input v-model="cart_address.first_name" id="billing:firstname" name="billing[first_name]" class="required-entry input-text" type="text">
                                                        </div>
                                                        <div class="input-box input-lastname">
                                                            <label for="billing:lastname">
                                                                {{ $t("message.last_name") }}
                                                                <span class="required">*</span>
                                                            </label>
                                                            <input v-model="cart_address.last_name"  id="billing:lastname" name="billing[last_name]" class="required-entry input-text" type="text">
                                                        </div>
                                                        <div class="clear"></div>
                                                    </li>
                                                    <li class="clearfix">
                                                        <div  class="  input-box input-email">
                                                            <label for="billing:email">
                                                                {{ $t("message.email_address") }}
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
                                                                {{ $t("message.telephone") }} <span class="required">*</span>
                                                            </label>
                                                            <input v-model="cart_address.telephone"  id="billing:telephone" class="required-entry input-text" title="Telephone" name="billing[telephone]" type="text">
                                                        </div>
                                                    </li>
                                                    <li class="clearfix">
                                                        <div class="input-box input-address">
                                                            <label for="billing:street1">
                                                                {{ $t("message.street") }}<span class="required">*</span>
                                                            </label>
                                                            <input v-model="cart_address.street1"  class="required-entry input-text onestepcheckout-address-line" id="billing:street1" name="billing[street1]" title="Street Address 1" type="text">
                                                            
                                                            <input v-model="cart_address.street2"  class="input-text onestepcheckout-address-line" id="billing:street2" name="billing[street2]" title="Street Address 2" type="text">
                                                        </div>
                                                    </li>
                                                    <li class="clearfix">
                                                        <div class="input-box input-country">
                                                            <label for="billing:country">
                                                                {{ $t("message.country") }} 
                                                                <span class="required">*</span></label>
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
                                                                {{ $t("message.state") }}
                                                                <span class="required">*</span>
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
                                                                {{ $t("message.city") }} 
                                                                <span class="required">*</span>
                                                            </label>
                                                            <input v-model="cart_address.city"  id="billing:city" class="required-entry input-text" title="City" name="billing[city]" type="text">
                                                        </div>
                                                    </li>
                                                    <li class="clearfix">
                                                        <div class="input-box input-zip">
                                                            <label for="billing:zip">
                                                                {{ $t("message.zip_code") }} 
                                                                <span class="required">*</span>
                                                            </label>
                                                            <input v-model="cart_address.zip" class="validate-zip-international required-entry input-text" id="billing:zip" name="billing[zip]" title="Zip Code" type="text">
                                                        </div>
                                                    </li>
                                                    <template v-if="isGuest">
                                                        <li class="clearfix">
                                                            <div class="input-box">
                                                                <input v-model="isCustomerPassword" @click="addCustomerPassword()" name="create_account" id="id_create_account" type="checkbox">
                                                                <label style="display:inline" for="id_create_account">
                                                                    {{ $t("message.create_an_account") }}
                                                                    
                                                                </label>
                                                            </div>
                                                            <div class="label_create_account">
                                                            
                                                            </div>
                                                        </li>
                                                        <li :style="'display:'+ customerPasswordDisplay" id="onestepcheckout-li-password">
                                                            <div class="input-box input-password">
                                                                <label for="billing:customer_password">
                                                                    {{ $t("message.password") }}
                                                                    
                                                                </label>
                                                                <input v-model="customer_password" name="billing[customer_password]" id="billing:customer_password" title="Password" value="" class="validate-password input-text customer_password" type="password">
                                                            </div>
                                                            <div class="input-box input-password">
                                                                <label for="billing:confirm_password">
                                                                    {{ $t("message.confirm_password") }}
                                                                    
                                                                </label>
                                                                <input v-model="confirm_password" name="billing[confirm_password]" title="Confirm Password" id="billing:confirm_password" value="" class="validate-password input-text customer_confirm_password" type="password">
                                                            </div>
                                                        </li>
                                                    </template>
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
                                        {{ $t("message.shipping_method") }}
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
                        
                            
                            
                            
                            <div class="onestepcheckout-payment-method">
                                <p class="onestepcheckout-numbers onestepcheckout-numbers-3">
                                    {{ $t("message.payment_method") }}
                                </p>
                                <div class="payment_info">
                                    <div class="payment-methods">
                                        <dl v-if="payments" id="checkout-payment-method-load">
                                            <template v-for="(payment,payment_key) in payments">
                                                <dt>
                                                    <input v-model="payment_method"  style="display:inline" :id=" 'p_method_'+payment_key" :value="payment_key" name="payment_method"
                                                    :title="payment.label" class="radio validate-one-required-by-name"  type="radio">
                                                    <label :for="'p_method_'+payment_key">
                                                        {{payment.label}}
                                                    </label>
                                                </dt>
                                                <dd :id="'container_payment_method_'+payment_key" class="payment-method" style="">
                                                    <ul class="form-list" :id="'payment_form_'+payment_key" style="">
                                                        <li>
                                                            <img v-if="payment.imageUrl" style="margin:10px 0 8px 0" :src="payment.imageUrl">
                                                        
                                                        </li>
                                                    </ul>
                                                </dd>
                                            </template>   
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            
                            
                            
                                
                            <div class="onestepcheckout-coupons">
                                <div style="display: none;" id="coupon-notice"></div>
                                <div class="op_block_title">
                                    {{ $t("message.coupon_codes") }}
                                </div>
                                <label for="id_couponcode">
                                    {{ $t("message.enter_your_coupon_code") }}
                                    
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
                                    {{ $t("message.review_your_order") }}
                                </p>
                                <div class="onestepcheckout-summary">
                                    <table class="onestepcheckout-summary">
                                        <thead>
                                            <tr>
                                                <th class="image"></th>
                                                <th class="name">{{ $t("message.name") }}</th>
                                                <th class="qty">{{ $t("message.qty") }}</th>
                                                <th class="total">{{ $t("message.subtotal") }}</th>
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
                                                    {{ $t("message.subtotal") }}
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
                                                    {{ $t("message.shipping_cost") }}
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
                                                    {{ $t("message.discount") }}
                                                </td>
                                                <td class="value">
                                                    <span class="price">-{{currency_info.symbol}} {{cart_info.coupon_cost}}
                                                    </span> 
                                                </td>
                                            </tr>
                                            <tr class="grand-total">
                                                <td >
                                                    {{ $t("message.grand_total") }}
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
                                    {{ $t("message.place_order_now") }}
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
            pageInitUrl: root + '/checkout/onepage/index' ,
            changeCountryUrl: root + '/checkout/onepage/changecountry' ,
            addCouponUrl: root + '/checkout/cart/addcoupon' ,
            cancelCouponUrl: root + '/checkout/cart/cancelcoupon' , 
            submitOrderUrl: root + '/checkout/onepage/submitorder' ,
            getShippingAndCartInfoUrl: root + '/checkout/onepage/getshippingandcartinfo' ,
            errormsg:'',
            customerPasswordDisplay:'none',
            customer_password:'',
            confirm_password:'',
            cart_address:{},
            cart_address_id:'',
            isGuest:1,
            countryArr:{},
            country:'',
            stateArr:'',
            state:'',
            currency_info:{},
            shippings:'',
            payments:'',
            cart_info:{},
            displayAddressDetails:'none',
            address_list:'',
            isCustomerPassword:0,
            currency:'',
            couponLabel:'Add Coupon',
            couponType:1, // 1 代表 add coupon 2 代表 cancel coupon
            coupon_code:'',
            order_remark:'',
            correctmsg:'',
            displaySubmitOrder:'none',
            payment_method:'',
            refer_url: '',
            shipping_method:''
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
            if(!self.cart_address_id){
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
                var create_account = 0;
                if(self.isCustomerPassword){
                    var create_account = 1;
                    if(!self.customer_password){
                        self.errormsg = 'customer_password can not empty';
                        return;
                    }
                    if(self.confirm_password != self.customer_password){
                        self.errormsg = 'Password and confirmation password must be consistent';
                        return;
                    }
                    if(self.customer_password.length < 6){
                        self.errormsg = 'customer password must gte 6';
                        return;
                    }
                }
            }
            var cookies = self.getTraceAllCookie();
            var ajaxData = {
                address_id: self.cart_address_id,
                billing:{
                    first_name: self.cart_address.first_name,
                    last_name: self.cart_address.last_name,
                    email: self.cart_address.email,
                    telephone: self.cart_address.telephone,
                    street1: self.cart_address.street1,
                    street2: self.cart_address.street2,
                    country: self.country ,  //self.cart_address.country,
                    state: self.state,
                    city: self.cart_address.city,
                    zip: self.cart_address.zip
                },
                order_remark: self.order_remark,
                customer_password: self.customer_password,
                confirm_password: self.confirm_password,
                create_account: create_account,
                shipping_method: self.shipping_method,
                payment_method: self.payment_method,
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
                        var redirectUrl = reponseData.data.redirectUrl;
                        self.$router.push(redirectUrl);
                    }else{
                        var message = reponseData.message;
                        self.errormsg = message;
                        if(reponseData.code == 1500004){
                            $.toast('require param invaild');
                        }else if(reponseData.code == 1500005){
                            $.toast('create account fail');
                        }else if(reponseData.code == 1500006){
                            $.toast('save account address fail');    
                        }else if(reponseData.code == 1500002){
                            $.toast('generate order fail'); 
                            self.errormsg =  reponseData.data.error;                           
                        }
                        self.displaySubmitOrder = 'none';
                        
                    }
                    
                    self.saveReponseHeader(request); 
                    
                },
                error:function(){
                    $.toast('system error');
                    $.hideIndicator();
                    console.log('get address list page init error');
                }
            });
            
        },
        changeAddressList: function(){
            self = this;
            if(!self.cart_address_id){
                self.displayAddressDetails = 'block';
            }else{
                self.displayAddressDetails = 'none';
            }
            self.getShippingAndCartInfo();
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
                    
                },
                error:function(){
                    $.hideIndicator();
                    $.toast('system error');
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
                    $.hideIndicator();
                    $.toast('system error');
                    console.log('');
                }
            });
        },
        routerGo: function(){
            this.$router.go(-1);
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
                    if(reponseData.code == 1100003){
                        self.setLoginSuccessRedirectUrl('/checkout/onepage');
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(reponseData.code == 200){
                        self.cart_address = reponseData.data.cart_address;
                        self.cart_address_id = reponseData.data.cart_address_id;
                        self.isGuest = reponseData.data.isGuest;
                        self.countryArr = reponseData.data.countryArr;
                        self.country = reponseData.data.country;
                        self.address_list = reponseData.data.address_list;
                        self.shippings = reponseData.data.shippings;
                        self.currency_info = reponseData.data.currency_info;
                        self.payment_method = reponseData.data.current_payment_method;
                        self.shipping_method = reponseData.data.current_shipping_method;
                        
                        self.payments = reponseData.data.payments;
                        self.cart_info = reponseData.data.cart_info;
                        self.coupon_code = self.cart_info.coupon_code;
                        if(self.coupon_code){
                            self.couponType = 2;
                            self.couponLabel = 'Cancel Coupon';
                        }
                        if(self.address_list && self.cart_address_id){
                            self.displayAddressDetails = 'none';
                        }else{
                            self.displayAddressDetails = 'block';
                        }
                        console.log('get editAccount info success');
                        var traceData = {"refer_url": self.refer_url};
                        var routerQ = self.$route.query
                        for (var k in routerQ) {
                            traceData[k] = routerQ[k]
                        }
                        self.reloadTraceJs(traceData);
                        self.saveReponseHeader(request); 
                        self.changeCountry();
                    }else if(reponseData.code == 1500007){
                        $.toast('cart product is empty');
                        self.$router.push('/checkout/cart');
                        return;
                    }
                    //console.log('cart_products.length:'+ self.cart_products.length);
                    
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
                        self.setLoginSuccessRedirectUrl('/checkout/onepage');
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