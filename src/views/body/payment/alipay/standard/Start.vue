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
                success:function(data, textStatus,request){
                    if(data.code == 200){
                        self.saveReponseHeader(request);
                        window.location.href = data.content;
                        //setTimeout(function () { document.forms['alipaysubmit'].submit();}, 500);
                        //onsubmit="setTimeout(function () { window.location.reload(); }, 10)"

                        //var redirectUrl = data.content;
                        //console.log(redirectUrl);
                        
                        //window.location.href = redirectUrl;
                        //;
                        //setTimeout(function () { document.forms['alipaysubmit'].submit();}, 500);

                    }
                    //$.hideIndicator();
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