<template>
    <div class="content">
        
    </div>
</template>


<script>

var root = process.env.API_ROOT;

var website_root = process.env.WEBSITE_ROOT;

export default {
    data () {
        return {
            pageInitUrl: root + '/payment/paypal/standard/start' ,
            errormsg:''
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
            $.showIndicator();
            $.ajax({
                url: self.pageInitUrl,
                async: true,
                timeout: 120000,
                type: 'post',
                headers: self.getRequestHeader(),
                data:{ 
                    'return_url': website_root + '/#/payment/paypal/standard/review',
                    'cancel_url': website_root + '/#/checkout/onepage',
                },
                success:function(reponseData, textStatus,request){
                    if(reponseData.code == 200){
                        self.saveReponseHeader(request);
                        var redirectUrl = reponseData.data.redirectUrl;
                        console.log(redirectUrl);
                        window.location.href = redirectUrl;
                    }else{
                        self.saveReponseHeader(request);
                        $.toast(reponseData.data.error);
                    }
                    //$.hideIndicator();
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
</script>