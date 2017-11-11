<template>
    <div class="content">
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/account/index"  class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                </router-link>
                <h1 class='title'>Facebook Login</h1>
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
            <img src="//img.fancyecommerce.com/images/opc-ajax-loader.gif">
            Please wait, get login info from facebook...
            <div class="clear"></div>
        </div>   
    </div>
</template>
<script>

var root = process.env.API_ROOT;

export default {
    data () {
        return {
            pageInitUrl: root + '/customer/facebook/loginv' ,
            errormsg:'',
            correctmsg:''
        }
    },
    created: function(){
        this.pageInit();
    },
    
    methods: {
        pageInit: function(){
            var self = this;
            self.errormsg = '';
            self.correctmsg = '';
            var requestParams = this.$route.query;
            var ajaxData = {};
            for(var x in requestParams){
                ajaxData[x] = requestParams[x];
            }
            $.showIndicator();
            $.ajax({
                url: self.pageInitUrl,
                async: true,
                timeout: 120000,
                type: 'get',
                headers: self.getRequestHeader(),
                data:ajaxData,
                success:function(reponseData, textStatus,request){
                    if(reponseData.code == 200){
                        
                        self.reloadPage();
                        self.saveReponseHeader(request); 
                    }
                    $.hideIndicator();
                },
                error:function(){
                    $.toast('system error');
                    $.hideIndicator();
                    console.log('get address list page init error');
                }
            });
        },
        reloadPage: function(){
            window.close();
			window.opener.location.reload();
        }
    }
}
</script>