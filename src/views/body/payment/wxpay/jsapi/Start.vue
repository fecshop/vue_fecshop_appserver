<template>
    <div class="content">
           
        <div >
            <br/>
            <font color="#9ACD32"><b>订单号:<span style="color:#777;font-size:15px">{{increment_id}}</span></b></font><br/><br/>
            <br/>
            <font color="#9ACD32"><b>订单支付金额：<span style="color:#f00;font-size:20px">{{total_amount}}</span></b></font><br/><br/>
            <div align="center">
                <button style="width:210px; height:50px; border-radius: 15px;background-color:#FE6714; border:0px #FE6714 solid; cursor: pointer;  color:white;  font-size:16px;" type="button" @click="callpay()" >立即支付</button>
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
            pageInitUrl: root + '/payment/wxpayjsapi/openidurl' ,
            pageOpenIdUrl: root + '/payment/wxpayjsapi/openidurl' ,
            pageStartUrl: root + '/payment/wxpayjsapi/start' ,
            errormsg:'',
            refer_url: '',
            total_amount: '',
            weixinCode: '',
            thisurl: '',
            jsApiParameters: {},
            editAddress: {},
            total_amount: '',
            increment_id: '',
            submitForm:''
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
            var referUrl = website_root + "/#" + fullPath;
            console.log(referUrl);
        } else {
            referUrl = ''
        }
        next( vm => {
            vm.refer_url = referUrl;
        });  
    },
    methods: {
        callpay:  function(){
            //alert(1);
            if (typeof WeixinJSBridge == "undefined"){
                //alert(2);
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', this.editAddressFunc, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', this.editAddressFunc); 
                    document.attachEvent('onWeixinJSBridgeReady', this.editAddressFunc);
                }
            }else{
                //alert(3);
                this.editAddressFunc();
            }
            //alert(4);
            if (typeof WeixinJSBridge == "undefined"){
                //alert(5);
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', this.jsApiCall); 
                    document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
                }
            }else{
                //alert(6);
                this.jsApiCall();
            }
            //alert(7);
        
        },
        editAddressFunc: function(){
            WeixinJSBridge.invoke(
                'editAddress',
                this.editAddress,
                function(res){
                    var value1 = res.proviceFirstStageName;
                    var value2 = res.addressCitySecondStageName;
                    var value3 = res.addressCountiesThirdStageName;
                    var value4 = res.addressDetailInfo;
                    var tel = res.telNumber;
                    //alert("editAddress:" + value1 + value2 + value3 + value4 + ":" + tel);
                }
            );
        },
        jsApiCall: function(){
            var self = this;
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                this.jsApiParameters,
                function(res){
                    WeixinJSBridge.log(res.err_msg);
                    //alert("WeixinJSBridge22:" + res.err_code+ "##"+res.err_desc+ "##"+res.err_msg);
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        //alert("success");
                        self.$router.push('/payment/success');
                        //window.location.href="<?= $success_url; ?>";
                    } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                        
                    } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                        
                    }
                }
            );
        },
        pageInit: function(){
            var self = this;
            // 获取code
            var code = self.$route.query.code;
            self.weixinCode = code;
            self.thisurl = window.location.href;
            if (!code) {
                if (self.thisurl && (self.thisurl.indexOf("code") != -1) && (self.thisurl.indexOf("state") != -1) ) {
                    var arr=self.thisurl.split("code=");
                    var urlparam = arr[1];
                    var arr2=urlparam.split("&");
                    code = arr2[0];
                }
            }
            if (!code) {
                self.errormsg = '';
                self.correctmsg = '';
                $.showIndicator();
                $.ajax({
                    url: self.pageOpenIdUrl,
                    async: true,
                    timeout: 120000,
                    type: 'post',
                    headers: self.getRequestHeader(),
                    data:{ 
                        url: window.location.href,
                    },
                    success:function(reponseData, textStatus,request){
                        $.hideIndicator();
                        if(reponseData.code == 200){
                            var openUrl = reponseData.data.openUrl;
                            console.log(openUrl);
                            window.location.href = openUrl;
                        }
                    },
                    error:function(){
                        $.hideIndicator();
                        console.log('');
                    }
                });
            } else {
                self.weixinCode = code;
            }
            $.showIndicator();
            // 得到openid
            $.ajax({
                url: self.pageStartUrl,
                async: true,
                timeout: 120000,
                type: 'post',
                headers: self.getRequestHeader(),
                data:{ 
                    code: code,
                },
                success:function(reponseData, textStatus,request){
                    if(reponseData.code == 200){
                        var jsApiParameters = reponseData.data.jsApiParameters;
                        var editAddress = reponseData.data.editAddress;
                        var total_amount = reponseData.data.total_amount;
                        var increment_id = reponseData.data.increment_id;
                        
                        self.jsApiParameters = jsApiParameters;
                        self.editAddress = editAddress;
                        self.total_amount = total_amount;
                        self.increment_id = increment_id;
                        
                        
                        //console.log(openUrl);
                        //window.location.href = openUrl;
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



</script>