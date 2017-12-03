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
        }
    },
    created: function(){
        this.pageInit();
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
                    console.log(reponseData.code)
                    if(reponseData.code == 1100003){
                        $.hideIndicator();
                        self.saveReponseHeader(request); 
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(reponseData.code == 200){
                        self.menuList = reponseData.data.menuList;
                        self.saveReponseHeader(request); 
                    }   
                    $.hideIndicator();
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