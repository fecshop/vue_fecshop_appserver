<template>
    <div class="content">
        
        <div v-html="submitForm">
        
        </div>
    </div>
</template>




<script>

var root = process.env.API_ROOT;

var website_root = process.env.WEBSITE_ROOT;

export default {
    data () {
        return {
            pageInitUrl: root + '/payment/alipay/standard/start' ,
            errormsg:'',
            submitForm:''
            
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
                    'return_url': website_root + '/#/payment/alipay/standard/review'
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 200){
                        var traceData = {};
                        self.reloadTraceJs(traceData);
                        self.saveReponseHeader(request);
                        window.location.href = reponseData.data.redirectUrl;
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
</script>