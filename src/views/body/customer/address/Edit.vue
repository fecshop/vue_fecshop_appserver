<template>
    <div class="content">
    
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/address"  class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                </router-link>
                <h1 class='title'>Edit Address</h1>
            </div>
        </div>
        <div class="fecshop_message" v-if="errormsg">
            <div class="error-msg">
                <div>
                    {{errormsg}}
                </div>
            </div>
		</div>
        <div class="fecshop_message" v-if="correctmsg">
            <div class="correct-msg">
                <div>
                    {{correctmsg}}
                </div>
            </div>
		</div>
        <div class="list-block customer-login  customer-register">
            <div class="addressedit" id="form-validate" >
                <input name="address[address_id]" value="<?= $address_id; ?>" type="hidden">            
                <ul>
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="address.email" class="input-text required-entry" maxlength="255" placeholder="Email"  name="address[email]" id="customer_email"   type="text">
                                </div>
                            </div>
                        </div>
                    </li>				
                    
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="address.first_name" class="input-text required-entry" maxlength="255" placeholder="First Name" title="First Name"  name="address[first_name]" id="firstname" type="text">
                                </div>
                            </div>
                        </div>
                    </li>	
                    
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="address.last_name" class="input-text required-entry" maxlength="255" placeholder="Last Name"  title="Last Name"  name="address[last_name]" id="lastname" type="text">
                                </div>
                            </div>
                        </div>
                    </li>	
                    
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="address.telephone" class="input-text required-entry" maxlength="255" placeholder="Telephone"  title="telephone"  name="address[telephone]" id="lastname" type="text">
                                </div>
                            </div>
                        </div>
                    </li>	
                    
                        
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <select @change="changeCountry()" v-model="addressCountry"  id="address:country" class="address_country validate-select" title="Country" name="address[country]">
                                        <option  value="">-- select country --</option>
                                        <option  v-for="(countryName,countryCode) in address.countryArr" :value="countryCode">{{countryName}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </li>	
                    
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input state_html">
                                    <select v-if="address.stateIsSelect" v-model="addressState">
                                        <option  value="">-- select State --</option>
                                        <option  v-for="(stateName,stateCode) in address.stateArr" :value="stateCode">{{stateName}}</option>   
                                    </select>
                                    <input v-if="!address.stateIsSelect" v-model="addressState"  id="state" name="address[state]"  title="State" class="input-text" style="" type="text">
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </li>	
                    
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="address.city" class="input-text required-entry" maxlength="255" placeholder="City" title="City" value="" name="address[city]" id="city" type="text" />
                                </div>
                            </div>
                        </div>
                    </li>	
                    
                    
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="address.street1" class="input-text required-entry" maxlength="255" placeholder="street1" value="" name="address[street1]" id="street1" type="text" />
                                </div>
                            </div>
                        </div>
                    </li>	
                    
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="address.street2" class="input-text required-entry" maxlength="255" placeholder="street2" value="" name="address[street2]" id="street2" type="text" />
                                </div>
                            </div>
                        </div>
                    </li>		
                    
                    
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="address.zip" class="input-text required-entry" maxlength="255" placeholder="zip" value="" name="address[zip]" id="zip" type="text">
                                </div>
                            </div>
                        </div>
                    </li>	
                    
                    
                    <li class="control">
                        <div class="change_password_label item-content">
                            <input v-model="isDefaultActive" name="address[is_default]" value="1" title="Save in address book" id="address:is_default" class="address_is_default checkbox" type="checkbox">
                            <label for="address:is_default" style="display:inline;">Is Default</label>
                                
                        </div>
                    </li>
                </ul>	
                <div class="clear"></div>
                <div class="buttons-set">
                    <p>
                        <a external href="javascript:void(0)" @click="submit_address()"   id="js_registBtn" class="button button-fill">
                            Save Address
                        </a>
                    </p>
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
            errormsg:'',
            correctmsg:'',
            address:{},
            addressCountry:'',
            addressState:'',
            isDefaultActive:'',
            pageInitUrl: root + '/customer/address/edit' 
        }
    },
    created: function(){
        this.pageInit();
    },
    methods: {
        changeCountry: function(){
            var country = self.addressCountry;
            // 更改国家后，进行state的改变
        },
        pageInit: function(){
            var self = this;
            var address_id = this.$route.params.address_id;
            var dataParam = {};
            if(address_id && address_id != 'new'){
                dataParam.address_id = address_id;
            }
            self.errormsg = '';
            self.correctmsg = '';
            $.showIndicator();
            $.ajax({
                url: self.pageInitUrl,
                async: true,
                timeout: 120000,
                type: 'get',
                headers: self.getRequestHeader(),
                data:dataParam,
                success:function(data, textStatus,request){
                    if(data.code == 400 && data.status == "access token error"){
                        $.hideIndicator();
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(data.code == 200){
                        self.address = data.address;
                        console.log('get address edit info success');
                        self.saveReponseHeader(request); 
                        self.addressCountry = self.address.country;
                        self.addressState = self.address.state;
                        self.isDefaultActive = (self.address.is_default == 1) ? 1 : 0;
                    }
                    $.hideIndicator();
                },
                error:function(){
                    $.hideIndicator();
                    console.log('get address list page init error');
                }
            });
            
        },
        submit_address: function(){
            
        },
        changeAddressCountry: function(){
			
		}
    }
}
</script>