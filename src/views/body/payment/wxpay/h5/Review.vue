<template>
    <div class="content">
        <div style="margin:80px 0 0 30px;">
            <div v-if="!errors" class="onestepcheckout-place-order-loading" style="display: block;"><img src="//img.fancyecommerce.com/images/opc-ajax-loader.gif">&nbsp;&nbsp;
                Please wait, processing your order...
            </div>
            <div style="padding:1.6rem" v-if="errors">
                <div align="center">
                    错误： {{errors}}
                </div>
                <div align="center" style="margin-top:3.6rem">
                    <button style="width:210px; height:30px; border-radius: 15px;background-color:#FE6714; border:0px #FE6714 solid; cursor: pointer;  color:white;  font-size:16px;" type="button" @click="callpay()" >重新支付</button>
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
            pageInitUrl: root + '/payment/wxpayh5/review' ,
            refer_url: '',
            errors: '',
            errormsg:''
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
                data:{},
                success:function(data, textStatus,request){
                    $.hideIndicator();
                    if(data.code == 200){
                        var traceData = {"refer_url": self.refer_url};
                        var routerQ = self.$route.query
                        for (var k in routerQ) {
                            traceData[k] = routerQ[k]
                        }
                        self.reloadTraceJs(traceData);
                        self.saveReponseHeader(request);
                        self.$router.push('/payment/success');
                    }else{
                        self.errors = data.data.errors;
                    }
                },
                error:function(){
                    $.hideIndicator();
                    console.log('');
                }
            });
        },
        callpay: function(){
            var self = this;
            self.$router.push('/payment/wxpayh5/start');
        }
    }
    
}
</script>