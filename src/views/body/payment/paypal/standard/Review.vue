<template>
    <div class="content">
        <div style="margin:80px 0 0 30px;">
            <div class="onestepcheckout-place-order-loading" style="display: block;"><img src="//img.fancyecommerce.com/images/opc-ajax-loader.gif">&nbsp;&nbsp;
                Please wait, processing your order...
            </div>
        </div>
    </div>
</template>


this.$route.query.uid

<script>

var root = process.env.API_ROOT;

var website_root = process.env.WEBSITE_ROOT;

export default {
    data () {
        return {
            pageInitUrl: root + '/payment/paypal/standard/review' ,
            errormsg:'',
            token:'',
            PayerID:''
            
        }
    },
    created: function(){
        this.pageInit();
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
                    success:function(data, textStatus,request){
                        if(data.code == 200){
                            self.saveReponseHeader(request);
                            self.$router.push('/payment/success');
                        }else{
                            self.$router.push('/checkout/onepage');
                        }
                        $.hideIndicator();
                    },
                    error:function(){
                        $.hideIndicator();
                        console.log('');
                    }
                });
            }
        }  
    }
    
}
</script>