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
            order:{}
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
                },
                success:function(reponseData, textStatus,request){
                    if(reponseData.code == 200){
                        self.increment_id = reponseData.data.increment_id;
                        self.order = reponseData.data.order;
                    }else{
                        self.$router.push("/");
                    }
                    $.hideIndicator();
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
