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
                    <p class="onestepcheckout-login-link">
                        <router-link to="/customer/account/login" id="onestepcheckout-login-link" >
                            Already registered? Click here to login
                        </router-link>
                    </p>
                    <div class="onestepcheckout-threecolumns checkoutcontainer onestepcheckout-skin-generic onestepcheckout-enterprise">
                        <div class="onestepcheckout-column-left">
                            <div class="guest_address">
                                
                                <div id="billing_address" v-if="!cart_address_id">		
                                    <ul>
                                        <li>
                                            <p class="onestepcheckout-numbers onestepcheckout-numbers-1">
                                                Shipping Address
                                            </p>
                                        </li>
                                        <li>
                                            <div>
                                                <ul id="billing_address_list" class="billing_address_list_new" style="">			
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
                                                                <select v-model="country" title="Country" class="billing_country validate-select" id="billing:country" name="billing[country]">
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
                                                                <input v-if="!stateArr" v-model="state" id="state" name="billing[state]"  title="State" class="address_state input-text" style="" type="text">
                                                                <select v-if="stateArr" v-model="state" id="address:state" class="address_state validate-select" title="State" name="billing[state]">
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
                                                    <template v-if="isGuest">
                                                        <li class="clearfix">
                                                            <div class="input-box">
                                                                <input value="1" name="create_account" id="id_create_account" type="checkbox">
                                                                <label style="display:inline" for="id_create_account">
                                                                    Create an account for later use
                                                                </label>
                                                            </div>
                                                            <div class="label_create_account">
                                                            
                                                            </div>
                                                        </li>
                                                        <li style="display: none;" id="onestepcheckout-li-password">
                                                            <div class="input-box input-password">
                                                                <label for="billing:customer_password">
                                                                    Password
                                                                </label>
                                                                <input name="billing[customer_password]" id="billing:customer_password" title="Password" value="" class="validate-password input-text customer_password" type="password">
                                                            </div>
                                                            <div class="input-box input-password">
                                                                <label for="billing:confirm_password">
                                                                    Confirm Password
                                                                </label>
                                                                <input name="billing[confirm_password]" title="Confirm Password" id="billing:confirm_password" value="" class="validate-password input-text customer_confirm_password" type="password">
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
                                ///shipping
                            </div>
                    
                    
                            ///payment
                                
                            <div class="onestepcheckout-coupons">
                                <div style="display: none;" id="coupon-notice"></div>
                                <div class="op_block_title">
                                    Coupon codes (optional)
                                </div>
                                <label for="id_couponcode">
                                    Enter your coupon code if you have one.
                                </label>
                                
                                <input style="color:#777;" class="input-text" id="id_couponcode" name="coupon_code" >
                                <br>
                                <button style="" type="button" class="submitbutton add_coupon_submit" id="onestepcheckout-coupon-add">
                                    {{couponLabel}}
                                </button>
                                <div class="clear"></div>
                                <div class="coupon_add_log"></div>
                            </div>
                        </div>

                        <div class="onestepcheckout-column-right">
                            <div class="review_order_view">
                                ///review order
                            </div>
                            <div class="onestepcheckout-place-order">
                                <a class="large orange onestepcheckout-button" href="javascript:void(0)" id="onestepcheckout-place-order">
                                    Place order now
                                </a>
                                <div class="onestepcheckout-place-order-loading">
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
            addCouponUrl: root + '/checkout/cart/addcoupon' ,
            cancelCouponUrl: root + '/checkout/cart/cancelcoupon' ,
           
            errormsg:'',
            
            cart_address:{},
            cart_address_id:'',
            isGuest:1,
            countryArr:{},
            country:'',
            stateArr:'',
            state:'',
            
            
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
                success:function(data, textStatus,request){
                    if(data.code == 400 && data.status == "access token error"){
                        $.hideIndicator();
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(data.code == 200){
                        self.cart_address = data.cart_address;
                        self.cart_address_id = data.cart_address_id;
                        self.isGuest = data.isGuest;
                        self.countryArr = data.countryArr;
                        self.country = data.country;
                        if(data.stateArr){
                            self.stateArr = data.stateArr;
                        }
                        self.state = data.state;
                        console.log('get editAccount info success');
                        self.saveReponseHeader(request); 
                    }
                    //console.log('cart_products.length:'+ self.cart_products.length);
                    self.pageInitComplete = true;
                    $.hideIndicator();
                },
                error:function(){
                    $.hideIndicator();
                    console.log('get address list page init error');
                }
            });
            
        },
        
    }
    
    
    
}
</script>