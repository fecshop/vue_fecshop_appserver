<template>
    <div class="content">
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <h1 class='title'>
                    {{ $t("message.my_account") }}
                </h1>
            </div>
            <div class="list-block" style="margin-top:80px;">
                <ul>
                    <template v-for="(menu_url, menu_name) in menuList">
                        <li class="item-content item-link">
                            <div class="item-media"><i class="icon icon-f7"></i></div>
                            <div class="item-inner">
                                <div class="item-title">
                                    <router-link :to="menu_url" >
                                        {{menu_name}}           
                                    </router-link> 
                                </div>
                            </div>
                        </li>
                    </template>    
                </ul>
            </div>

            <div class="account_footer">
                <a  @click="logoutAccount()"  href="javascript:void(0)" class="button button-fill button-bbb">
                    {{ $t("message.logout") }}
                </a>
            </div>
        </div>
    </div>
</template>
<script>

var root = process.env.API_ROOT;

export default {
    data () {
        return {
            menuList:[],
            getAccountUrl: root + '/customer/account/index' ,
            getLogoutAccountUrl: root + '/customer/account/logout' ,
            refer_url: ''
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
    methods:{
        logoutAccount: function(){
            var self = this;
            $.showIndicator();
            console.log('begin logout account');
            $.ajax({
                url: self.getLogoutAccountUrl,
                async: true,
                timeout: 120000,
                type: 'get',
                headers: self.getRequestHeader(),
                data:{ 
                },
                success:function(reponseData, textStatus,request){
                    self.saveReponseHeader(request); 
                    $.hideIndicator();
                    console.log('logout status'+reponseData.code);
                    if(reponseData.code == 200 || reponseData.code == 1100003){
                        console.log('logout success ,and begin redirect login page');
                        self.$router.push('/customer/account/login');
                        return;
                    }
                },
                error:function(){
                    $.toast("system error");
                    $.hideIndicator();
                    console.log('logout account fail');
                }
            });
        },
        pageInit: function(){
            var self = this;
            $.showIndicator();
            $.ajax({
                url: self.getAccountUrl,
                async: true,
                timeout: 120000,
                type: 'get',
                headers: self.getRequestHeader(),
                data:{ 
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    console.log(reponseData.code)
                    if(reponseData.code == 1100003){
                        self.saveReponseHeader(request); 
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(reponseData.code == 200){
                        // sku trace
                        var traceData = {"refer_url": self.refer_url};
                        var routerQ = self.$route.query
                        for (var k in routerQ) {
                            traceData[k] = routerQ[k]
                        }
                        self.reloadTraceJs(traceData); 
                        self.menuList = reponseData.data.menuList;
                        self.saveReponseHeader(request); 
                    }   
                    
                },
                error:function(){
                    $.toast("system error");
                    $.hideIndicator();
                    console.log('get get Category info error');
                }
            });
            
        }
    }
}
</script>