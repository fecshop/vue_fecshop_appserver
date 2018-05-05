<template>
    <div class="content">
        <div style="margin:80px 0 0 30px;">
            <div class="onestepcheckout-place-order-loading" style="display: block;"><img src="//img.fancyecommerce.com/images/opc-ajax-loader.gif">&nbsp;&nbsp;
                Please wait, processing your order...
            </div>
        </div>
    </div>
</template>



<script>

var root = process.env.API_ROOT;

var website_root = process.env.WEBSITE_ROOT;

//http://demo.fancyecommerce.com/#/payment/alipay/standard/review?
//total_amount=962.50&
//timestamp=2017-10-18%2017%3A37%3A39&
//sign=mbxj8FZFvAKcB1%2FkGUMsbzMG%2FHfarRzh1m4ewJk%2FTdz%2BiwV7i3l9N9liedT0DMX8Xi1Tr%2F1XivObBBJAAdNGqk8TJxV%2Bim%2B3tEb7EmNIpfyBXAht6VOXAXNqI3drpZ328B6FNZeqifL2gzIbwB5OxNHR4Cn3y5tSkQirOneyWBFnDvULGhOtBOigKyVF2ok4eU1E6wJIUtMj0u5293LnxwhjXByUWPdAqxzT%2FZJUryT8163BZYHB1kt9Ym9ODMbi3y3MkXLTmSpHTj58TICWFSoPEVmiu%2FbuAWCPs7m21ZzB%2BQlL7BteniIGwiVLyEgx10cSLSut5ysXAi5OalbXDg%3D%3D
//&trade_no=2017101821001004590200333989
//&sign_type=RSA2
//&auth_app_id=2016080500172713
//&charset=UTF-8
//&seller_id=2088102170055546
//&method=alipay.trade.wap.pay.return
//&app_id=2016080500172713
//&out_trade_no=1100000850
//&version=1.0

export default {
    data () {
        return {
            pageInitUrl: root + '/payment/alipay/standard/review' ,
            refer_url: '',
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
            //self.token = self.$route.query.token;
            //self.PayerID = self.$route.query.PayerID;
            
            var total_amount = self.$route.query.total_amount;
            var timestamp = self.$route.query.timestamp;
            var sign = self.$route.query.sign;
            var trade_no = self.$route.query.trade_no;
            var sign_type = self.$route.query.sign_type;
            var auth_app_id = self.$route.query.auth_app_id;
            var charset = self.$route.query.charset;
            var seller_id = self.$route.query.seller_id;
            var method = self.$route.query.method;
            var app_id = self.$route.query.app_id;
            var out_trade_no = self.$route.query.out_trade_no;
            var version = self.$route.query.version;
            
            
            self.errormsg = '';
            self.correctmsg = '';
            
            if(app_id && seller_id && sign && total_amount && trade_no && auth_app_id){
                $.showIndicator();
                $.ajax({
                    url: self.pageInitUrl,
                    async: true,
                    timeout: 120000,
                    type: 'get',
                    headers: self.getRequestHeader(),
                    data:{ 
                        'total_amount': total_amount,
                        'timestamp': timestamp,
                        'sign': sign,
                        'trade_no': trade_no,
                        'sign_type': sign_type,
                        'auth_app_id': auth_app_id,
                        'charset': charset,
                        'seller_id': seller_id,
                        'method': method,
                        'app_id': app_id,
                        'out_trade_no': out_trade_no,
                        'version': version
                    },
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
                            alert('order pay by alipay fail');
                            self.$router.push('/checkout/onepage');
                        }
                        
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