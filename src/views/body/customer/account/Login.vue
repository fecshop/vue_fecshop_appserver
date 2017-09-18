<template>
    <div class="content">
        <div class="shopping-cart-img">
            Login
            <router-link to="/customer/account/register"  class="f-right">
                Register
            </router-link>
        </div>
        
        <div class="list-block customer-login">
            <div  id="login-form" class="account-form">
                <ul>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-email"></i></div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input name="editForm[email]" value="" id="email" type="email" placeholder="E-mail">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-password"></i></div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input type="password" placeholder="Password"  name="editForm[password]" class="input-text required-entry validate-password" id="pass" title="Password" >
                                </div>
                            </div>
                        </div>
                    </li>
                    <li v-if="loginCaptchaActive">
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-password"></i></div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input placeholder="captcha" type="text" name="editForm[captcha]" value="" size=10 class="login-captcha-input">
                                    <img class="login-captcha-img"  title="click refresh" :src="captchaFile" align="absbottom" onclick="this.src='<?= Yii::$service->url->getUrl('site/helper/captcha'); ?>?'+Math.random();"></img>
                                    <span @click="reflushCaptcha()" class="icon icon-refresh"></span>
                                </div>
                            </div>
                        </div>
                    </li>
                    
                </ul>
                
                <div class="clear"></div>
                <div class="buttons-set">
                    <p><a external href="#"  id="js_registBtn" class="button button-fill">Sign In</a></p>
                    <a external href="<?= Yii::$service->url->getUrl('customer/account/forgotpassword');  ?>" class="f-left">Forgot Your Password?</a>
                    
                </div>
                <div class="clear"></div>
                <div class="third_login">
                    <div class="fago_login">
                        <img onclick="facebooklogin()" src="//img.fancyecommerce.com/images/facebook.jpg" /><br/>
                        <img onclick="googlelogin()"src="//img.fancyecommerce.com/images/google.jpg" /><br/>
                    </div>
                    <div class="col2-set">
                        <div class="col-1 new-users">
                            <div class="buttons-set">
                                
                            </div>
                        </div>
                        <div class="col-2 registered-users">
                            
                        </div>
                    </div>
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
            getCaptchaUrl: root + '/customer/site/captcha' ,
            pageInitUrl: root + '/customer/login/index' ,
            googleLoginUrl:'',
            facebookLoginUrl:'',
            captchaFile:'',
            loginCaptchaActive:false  // 是否开启登录验证码
        }
    },
    created: function(){
        this.pageInit();
    },
    methods:{
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
                success:function(data, textStatus,request){
                    if(data.code == 200){
                        self.loginCaptchaActive = data.loginCaptchaActive;
                        self.googleLoginUrl = data.googleLoginUrl;
                        self.facebookLoginUrl = data.facebookLoginUrl;
                        self.saveReponseHeader(request); 
                        console.log(self.loginCaptchaActive);
                        if(self.loginCaptchaActive){
                            console.log('begin get login captcha');
                            self.getLoginCaptcha();
                        }
                    }
                    $.hideIndicator();
                },
                error:function(){
                    $.hideIndicator();
                    console.log('get get Category info error');
                }
            });
            
        },
        reflushCaptcha: function(){
            this.getLoginCaptcha();
        },
        redirectRegisterPage: function(){
            this.$router.push('/customer/account/register');
        }, 
        
        getLoginCaptcha: function(){
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
                success:function(data, textStatus,request){
                    if(data.code == 200){
                        self.captchaFile = "data:image/gif;base64," + data.image;
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
