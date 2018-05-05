<template>
    
    <div class="main container one-column content">
        <div class="col-main">
            <div class="paypal_success">
                <div class="page-title">
                    
                </div>
                <h2 class="sub-title">
                    {{ $t("message.thank_you_for_purchase") }}
                    
                </h2>
                
                <p>
                    {{ $t("message.your_order_is") }}
                    : {{increment_id}}.</p>
                <p>
                    {{ $t("message.receive_an_confirm_email") }}
                    
                </p>

                <div class="buttons-set">
                    <button @click="redirectHome()" type="button" class="button" title="Continue Shopping" >
                        <span>
                            <span>
                                {{ $t("message.continue_shopping") }}
                                
                            </span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

var root = process.env.API_ROOT;

export default {
    data () {
        return {
            pageInitUrl: root + '/payment/success' ,
            errormsg:'',
            increment_id:'',
            refer_url: '',
            order:{}
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
                type: 'post',
                headers: self.getRequestHeader(),
                data:{ 
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 200){
                        self.increment_id = reponseData.data.increment_id;
                        self.order = reponseData.data.order;
                        var traceData = {"refer_url": self.refer_url};
                        var routerQ = self.$route.query
                        for (var k in routerQ) {
                            traceData[k] = routerQ[k]
                        }
                        self.reloadTraceJs(traceData);
                    }else{
                        self.$router.push("/");
                    }
                    
                },
                error:function(){
                    $.toast('system error');
                    $.hideIndicator();
                    console.log('');
                }
            });
        }  ,
        redirectHome: function(){
            self.$router.push("/");
        }
    }
    
}
</script>
