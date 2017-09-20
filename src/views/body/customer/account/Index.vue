<template>
    <div class="content">
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <h1 class='title'>My Account</h1>
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
                <a  @click="logoutAccount()"  href="javascript:void(0)" class="button button-fill button-bbb">Logout</a>
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
                success:function(data, textStatus,request){
                    self.saveReponseHeader(request); 
                    $.hideIndicator();
                    console.log('logout status'+data.code);
                    if(data.code == 200 || data.code == 400){
                        console.log('logout success ,and begin redirect login page');
                        self.$router.push('/customer/account/login');
                        return;
                    }
                },
                error:function(){
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
                success:function(data, textStatus,request){
                    console.log(data.code)
                    if((data.code == 400) || (data.code == 401)){
                        $.hideIndicator();
                        self.saveReponseHeader(request); 
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(data.code == 200){
                        self.menuList = data.menuList;
                    
                        self.saveReponseHeader(request); 
                    }   
                    $.hideIndicator();
                },
                error:function(){
                    $.hideIndicator();
                    console.log('get get Category info error');
                }
            });
            
        }
    }
}
</script>