<template>
    <div class="content">
        <div style="margin:80px 0 0 30px;">
            <div class="onestepcheckout-place-order-loading" style="display: block;"><img src="//img.fancyecommerce.com/images/opc-ajax-loader.gif">&nbsp;&nbsp;
                Please wait, processing your order...
            </div>
            <div class="fecshop_message" v-if="errormsg">
                <div class="error-msg">
                    <div>
                        {{errormsg}}
                    </div>
                </div>
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
            pageInitUrl: root + '/payment/paypal/standard/review' ,
            errormsg:'',
            token:'',
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
        pageInit: function(){
            var self = this;
            self.token = self.$route.query.token;
            self.PayerID = self.$route.query.PayerID;
            self.errormsg = '';
            self.correctmsg = '';
            $.showIndicator();
            if(self.token && self.PayerID){
                
                $.ajax({
                    url: self.pageInitUrl,
                    async: true,
                    timeout: 120000,
                    type: 'post',
                    headers: self.getRequestHeader(),
                    data:{ 
                        'token': self.token,
                        'PayerID': self.PayerID
                    },
                    success:function(reponseData, textStatus,request){
                        $.hideIndicator();
                        if(reponseData.code == 200){
                            var traceData = {"refer_url": self.refer_url};
                            var routerQ = self.$route.query
                            for (var k in routerQ) {
                                traceData[k] = routerQ[k]
                            }
                            self.reloadTraceJs(traceData);
                            
                            self.saveReponseHeader(request);
                            self.$router.push('/payment/success');
                        }else if(reponseData.code == 1500009){
                            self.errormsg = 'token is invaild';
                        }else if(reponseData.code == 1500010){
                            self.errormsg = 'payment by paypal api fail, '+ reponseData.data.error;
                        }else if(reponseData.code == 1500011){
                            self.errormsg = 'after paypal payment , update order info fail';
                        }else{
                            //self.$router.push('/checkout/onepage');
                            self.errormsg = 'payment error , plase contact us send your error content';
                        }
                        
                    },
                    error:function(){
                        $.toast('system error');
                        $.hideIndicator();
                        console.log('');
                    }
                });
            }
        }  
    }
    
}
</script>
