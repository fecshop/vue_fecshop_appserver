<template>
    <div class="content">
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/account/index"  class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                </router-link>
                <h1 class='title'>
                    {{ $t("message.customer_address") }}
                </h1>
            </div>
        </div>
        <div class="fecshop_message" v-if="errormsg">
            <div class="error-msg">
                <div>
                    {{errormsg}}
                </div>
            </div>
		</div>
        <div class="main container two-columns-left">
            <div class="col-main account_center">
                <div class="std">
                    <div style="margin:4px 0 0">
                        
                        <table class="addressbook" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <thead>
                                <tr class="ress_tit">
                                    <th width="76" valign="middle" align="center" height="31">{{ $t("message.name") }}</th>                                                                                        
                                    <th width="67" valign="middle" align="center">{{ $t("message.address") }}</th>
                                    <th class="th3" width="71" valign="middle" align="center">{{ $t("message.operation") }}</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                <tr v-for="(address_item,index) in addressList">
                                    <td valign="top" align="center"> {{address_item.first_name}} {{address_item.last_name}}</td>
                                    <td valign="top" align="center">
                                        {{address_item.street1}} {{address_item.street2}}<br>
                                        {{address_item.city}}
                                        {{address_item.stateName}}
                                        {{address_item.countryName}}
                                        <br/>
                                        <span v-if="address_item.is_default == 1" style=" color:#cc0000">{{ $t("message.default_address") }}</span> 
                                        	
                                    </td>
                                    <td class="ltp" valign="top ltp" align="center">
                                        
                                        <router-link :to="'/customer/address/edit/'+address_item.address_id"  >
                                            <span class="icon icon-edit"></span>
                                        </router-link>
                                        
                                        <a @click="deleteAddress(address_item.address_id)" href="javascript:void(0)">
                                            <span class="icon icon-remove"></span>
                                        </a>                         
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="add_new_address">
                            <router-link to="/customer/address/edit/new"  class="button  button-light">
                                {{ $t("message.add_new_address") }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </div>   
    </div>
</template>
<script>

var root = process.env.API_ROOT;

export default {
    data () {
        return {
            pageInitUrl: root + '/customer/address/index' ,
            removeAddressUrl: root + '/customer/address/remove' ,
            errormsg:'',
            addressList:[],
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
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(reponseData.code == 200){
                        self.addressList = reponseData.data.addressList;
                        console.log('get editAccount info success');
                        var traceData = {"refer_url": self.refer_url};
                        var routerQ = self.$route.query
                        for (var k in routerQ) {
                            traceData[k] = routerQ[k]
                        }
                        self.reloadTraceJs(traceData);
                        self.saveReponseHeader(request); 
                    }
                    
                },
                error:function(){
                    $.toast('system error');
                    $.hideIndicator();
                    console.log('get address list page init error');
                }
            });
            
        },
        deleteAddress: function(address_id){
            var r=confirm('do you readly want delete this address?'); 
			if (r==true){ 
                var self = this;
                self.errormsg = '';
                self.correctmsg = '';
                $.showIndicator();
                $.ajax({
                    url: self.removeAddressUrl,
                    async: true,
                    timeout: 120000,
                    type: 'post',
                    headers: self.getRequestHeader(),
                    data:{ 
                        address_id:address_id
                    },
                    success:function(reponseData, textStatus,request){
                        $.hideIndicator();
                        if(reponseData.code == 1100003){
                            self.$router.push('/customer/account/login');
                            return;
                        }else if(reponseData.code == 200){
                            console.log('remove address success');
                            self.saveReponseHeader(request);
                            location.reload() ;                        
                        }else if(reponseData.code == 1100012){
                            $.toast('address id not exist');
                            self.saveReponseHeader(request);
                            location.reload() ; 
                        }else{
                        
                        }
                        
                    },
                    error:function(){
                        $.toast('system error');
                        $.hideIndicator();
                        console.log('remove address error');
                    }
                });
            }
        }
    
    
    }
    
    
    
}
</script>