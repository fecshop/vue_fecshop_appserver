<template>
    <div class="content">
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/account/index"  class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                </router-link>
                <h1 class='title'>{{ $t("message.forget_password_send_success") }}</h1>
            </div>
        </div>
        
        
        <div class="customer-forgot-success ">
            <div >
                <div>
                    {{ $t("message.we_send_message_to_your_email") }}
                    
                    {{ $t("message.follow_the_instructions_provided") }}
                    
                </div>
                <div>
                    <p>
                        {{ $t("message.donot_receive_email") }}
                        <router-link to="/customer/account/forgotpassword"  class="">
                            {{ $t("message.click_here_to_retry") }}
                        </router-link>
                    </p>
                    <p>
                        {{ $t("message.check_your_bulk_junk_email_folder") }}
                        
                    </p>
                    
                    <p>
                        {{ $t("message.confirm_your_identity_to_reset") }} ,
                        {{ $t("message.click") }}
                         
                        <router-link to="/customer/contacts" >
                            {{ $t("message.support_center") }} 
                        </router-link>
                        {{ $t("message.for_help") }}
                    </p>
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
            refer_url: ''
        }
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
    created: function(){
        this.initThisPage();
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'initThisPage'
    },
    methods:{
        initThisPage() {
            var self = this
            var traceData = {"refer_url": self.refer_url};
            var routerQ = self.$route.query
            for (var k in routerQ) {
                traceData[k] = routerQ[k]
            }
            self.reloadTraceJs(traceData); 
        }
    }
}
</script>