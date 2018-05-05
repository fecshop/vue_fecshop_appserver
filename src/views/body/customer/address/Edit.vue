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
                <input v-model="address._id" name="address[address_id]"  type="hidden">            
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
            changeCountryUrl: root + '/customer/address/changecountry',
            saveAddressUrl: root + '/customer/address/save',
            refer_url: '',
            pageInitUrl: root + '/customer/address/edit' 
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
        
        pageInit: function(){
            var self = this;
            var address_id = this.$route.params.address_id;
            var dataParam = {};
            if(address_id && address_id != 'new'){
                dataParam.address_id = address_id;
            }else{
                dataParam.address_id = '';
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
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 1100003){
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(reponseData.code == 200){
                        self.address = reponseData.data.address;
                        console.log('get address edit info success');
                        var traceData = {"refer_url": self.refer_url};
                        var routerQ = self.$route.query
                        for (var k in routerQ) {
                            traceData[k] = routerQ[k]
                        }
                        self.reloadTraceJs(traceData);
                        self.saveReponseHeader(request); 
                        self.addressCountry = self.address.country;
                        self.addressState = self.address.state;
                        self.isDefaultActive = (self.address.is_default == 1) ? 1 : 0;
                    }
                    console.log('hideIndicator');
                    
                },
                error:function(){
                    $.toast('system error');
                    $.hideIndicator();
                    console.log('get address list page init error');
                }
            });
            
        },
        isEmail: function(strEmail) {
            if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1){
                return true;
            }else{
                return false;
            }
            
        },
        submit_address: function(){
            var self = this;
            var address_id = this.$route.params.address_id;
            var first_name = self.address.first_name;
            var last_name = self.address.last_name;
            var email = self.address.email;
            var telephone = self.address.telephone;
            var addressCountry = self.addressCountry;
            var addressState = self.addressState;
            var city = self.address.city;
            var street1 = self.address.street1;
            var street2 = self.address.street2;
            var zip = self.address.zip;
            var isDefaultActive = self.isDefaultActive;
            
            if(!address_id){ 
                self.correctmsg = 'address id is empty'; 
                return; 
            }else{
                if('new' == address_id){
                    address_id = '';
                }
            }
            if(!first_name){ self.errormsg = 'first_name can not empty'; return;}
            if(!last_name){ self.errormsg = 'last_name can not empty'; return;}
            if(!email){ self.errormsg = 'email can not empty'; return;}
            if(!self.isEmail(email)){
                self.errormsg = 'email format is error';
                return;
            }

            if(!telephone){ self.errormsg = 'telephone can not empty'; return;}
            if(!addressCountry){ self.errormsg = 'addressCountry can not empty'; return;}
            if(!addressState){ self.errormsg = 'addressState can not empty'; return;}
            if(!city){ self.errormsg = 'city can not empty'; return;}
            if(!street1){ self.errormsg = 'street1 can not empty'; return;}
            if(!zip){ self.errormsg = 'zip can not empty'; return;}
            
            var dataParam = {
                address_id:address_id,
                first_name:first_name,
                last_name:last_name,
                email:email,
                telephone:telephone,
                addressCountry:addressCountry,
                addressState:addressState,
                city:city,
                street1:street1,
                street2:street2,
                isDefaultActive:isDefaultActive,
                zip:zip
            };
            
            $.showIndicator();
            $.ajax({
                url: self.saveAddressUrl,
                async: true,
                timeout: 120000,
                type: 'post',
                headers: self.getRequestHeader(),
                data:dataParam,
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 1100003 ){
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(reponseData.code == 200){
                        self.$router.push('/customer/address');
                    }else if(reponseData.code == 1100012){
                        self.errormsg = 'customer address is not exist';
                    }else if(reponseData.code == 1100013){
                        self.errormsg = reponseData.data.error;
                    }
                },
                error:function(){
                    $.toast('system error');
                    $.hideIndicator();
                    console.log('get address list page init error');
                }
            });
        },
        changeCountry: function(){
            var self = this;
			var ajaxurl = self.changeCountryUrl;
			var country = self.addressCountry;
            if(country){
                $.showIndicator();
                $.ajax({
                    async:false,
                    timeout: 8000,
                    dataType: 'json', 
                    type:'get',
                    headers: self.getRequestHeader(),
                    data: {
                        'country':country,
                    },
                    url:ajaxurl,
                    success:function(reponseData, textStatus,request){ 
                        $.hideIndicator();
                        if(reponseData.code == 200){
                            self.address.stateArr = reponseData.data.stateArr;
                            self.address.stateIsSelect = reponseData.data.stateIsSelect;
                            if(reponseData.data.stateIsSelect == 0){
                                self.addressState = '';
                            }
                        }
                        self.saveReponseHeader(request); 
                    },
                    error:function (XMLHttpRequest, textStatus, errorThrown){
                        $.toast('system error');
                        $.hideIndicator();    
                    }
                });
            }
			
		}
    }
}
</script>