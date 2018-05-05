<template>
    <div class="content">
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/account/index"  class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                </router-link>
                <h1 class='title'>{{ $t("message.forget_password") }}</h1>
            </div>
        </div>
        <div class="fecshop_message" v-if="errormsg">
            <div class="error-msg">
                <div>
                    {{errormsg}}
                </div>
            </div>
		</div>
        <div class="fecshop_message" v-if="correctmsg">
            <div class="correct-msg">
                <div>
                    {{correctmsg}}
                </div>
            </div>
		</div>	
        <div class="list-block customer-login ">
            <div class="account-form"  id="form-validate">
                <ul>
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="email" placeholder="Your Email Address" name="editForm[email]" id="email_address" value="" title="Email Address" class="input-text validate-email required-entry" type="text">
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <li v-if="forgotCaptchaActive">
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-password"></i></div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="captcha" placeholder="captcha" type="text" name="editForm[captcha]" value="" size=10 class="login-captcha-input">
                                    <img class="login-captcha-img"  title="click refresh" :src="captchaFile" align="absbottom" ></img>
                                    <span @click="reflushCaptcha()" class="icon icon-refresh"></span>
                                </div>
                            </div>
                        </div>
                    </li>	
                    
                </ul>
                <div class="clear"></div>
                <div class="buttons-set">
                    <p>
                        <a @click="sendCode()" href="javascript:void(0)" id="js_forgotBtn" class="button button-fill">
                            {{ $t("message.send_authorization_code") }}
                        </a>
                    </p>
                </div>
                
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>
<script>
var root = process.env.API_ROOT;
export default {
    data () {
        return {
            getCaptchaUrl: root + '/customer/site/captcha' ,
            pageInitUrl: root + '/customer/forgot/password' ,
            sendCodeUrl: root + '/customer/forgot/sendcode' ,
            email:'', 
            forgotCaptchaActive:false,
            captcha:'',
            errormsg:'',
            refer_url: '',
            captchaFile:''
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
        sendCode: function(){
            var self = this;
            var domain = 'http://' + window.location.host;  
            $.showIndicator();
            $.ajax({
                url: self.sendCodeUrl,
                async: true,
                timeout: 120000,
                type: 'post',
                headers: self.getRequestHeader(),
                data:{ 
                    domain: domain,
                    email: self.email,
                    captcha: self.captcha
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 1100006){
                        //如果用户登录，则跳转到账户中心页面、
                        self.$router.push('/customer/account/index');
                    }else if(reponseData.code == 200){
                        self.saveReponseHeader(request); 
                        self.$router.push('/customer/account/forgotpasswordsubmit');
                    }else if(reponseData.code == 1100008){
                        self.errormsg = 'email address is not exist';
                    }else if(reponseData.code == 1000007){
                        self.errormsg = 'captcha is not correct';
                    }else{
                        self.errormsg = 'send code fail';
                    }
                    self.saveReponseHeader(request); 
                    
                },
                error:function(){
                    $.toast("system error");
                    $.hideIndicator();
                    console.log('get get Category info error');
                }
            });
        },
        pageInit: function(){
            var self = this;
            $.showIndicator();
            $.ajax({
                url: self.pageInitUrl,
                async: true,
                timeout: 120000,
                type: 'get',
                headers: self.getRequestHeader(),
                data:{ 
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 1100006){
                        //如果用户登录，则跳转到账户中心页面
                        self.$router.push('/customer/account/index');
                    }else if(reponseData.code == 200){
                        self.forgotCaptchaActive = reponseData.data.forgotCaptchaActive;
                        console.log('get forgot info success');
                        var traceData = {"refer_url": self.refer_url};
                        var routerQ = self.$route.query
                        for (var k in routerQ) {
                            traceData[k] = routerQ[k]
                        }
                        self.reloadTraceJs(traceData);
                        self.saveReponseHeader(request); 
                        if(self.forgotCaptchaActive){
                            console.log('begin get forgot captcha');
                            self.getForgotCaptcha();
                        }
                    }
                    
                },
                error:function(){
                    $.toast("system error");
                    $.hideIndicator();
                    console.log('get get Category info error');
                }
            });
        },
        reflushCaptcha: function(){
            this.getForgotCaptcha();
        },
        getForgotCaptcha: function(){
            var self = this;
            $.showIndicator();
            $.ajax({
                url: self.getCaptchaUrl,
                async: true,
                timeout: 120000,
                type: 'get',
                headers: self.getRequestHeader(),
                data:{ 
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 200){
                        self.captchaFile = "data:image/gif;base64," + reponseData.data.image;
                        self.saveReponseHeader(request); 
                    }
                    
                },
                error:function(){
                    $.hideIndicator();
                    $.toast("system error");
                    console.log('get get Category info error');
                }
            });
        
        }
    
    }
    
}
</script>