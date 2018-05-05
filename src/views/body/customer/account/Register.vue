<template>
    <div class="content">
        <div class="shopping-cart-img">
            {{ $t("message.register") }}
            <router-link to="/customer/account/login"  class="f-right">
                {{ $t("message.login") }}
            </router-link>
        </div>
        <div class="fecshop_message" v-if="errormsg">
            <div class="error-msg">
                <div>
                    {{errormsg}}
                </div>
            </div>
		</div>
        <div class="list-block customer-login  customer-register">
            <div  id="register-form" class="account-form">
                <ul>
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input">
                                <input v-model="firstname" class="required-entry" type="text" placeholder="First name"  id="firstname" name="editForm[firstname]"  title="First Name">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input">
                                <input v-model="lastname" class="required-entry" type="text" placeholder="Last name" id="lastname" name="editForm[lastname]"  title="Last Name">
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-email"></i></div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="email" class="required-entry  validate-email"  type="email" placeholder="E-mail"  name="editForm[email]" id="email_address"  title="Email Address">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-password"></i></div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="password"  type="password" placeholder="Password"  name="editForm[password]" class="input-text required-entry validate-password" id="password" title="Password" >
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-password"></i></div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="confirmationPassword" type="password" placeholder="Confirm password"  name="editForm[confirmation]" title="Confirm Password" id="confirmation" >
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <li v-if="registerCaptchaActive">
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
                    	
                    <li class="control">
                        <div class="newsletter">
                            <input v-model="is_subscribed" name="editForm[is_subscribed]" title="Sign Up for Newsletter" value="1" id="is_subscribed" class="checkbox" type="checkbox" checked="checked">
                            <label for="is_subscribed">Sign Up for Newsletter</label>
                        </div>
                    </li>
                </ul>
                <div class="clear"></div>
                <div class="buttons-set">
                    <p>
                        <a @click="registerAccount()" href="javascript:void(0)" id="js_registBtn" class="button button-fill">
                            {{ $t("message.register_account") }}
                        </a>
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
            getCaptchaUrl: root + '/customer/site/captcha' ,
            pageInitUrl: root + '/customer/register/index' ,
            accountRegisterUrl: root + '/customer/register/account' ,
            firstname:'',
            lastname:'',
            email:'',
            password:'',
            is_subscribed:true,
            confirmationPassword:'',
            captcha:'',
            captchaFile:'',
            registerCaptchaActive:false,  // 是否开启注册验证码
            minNameLength: 0,
            maxNameLength: 0,
            minPassLength: 0,
            maxPassLength: 0,
            refer_url: '',
            errormsg:''
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
        registerAccount: function(){
            var self = this;
            var firstname = self.firstname;
            var lastname = self.lastname;
            var email = self.email;
            var password = self.password;
            var is_subscribed = self.is_subscribed;
            var confirmationPassword = self.confirmationPassword;
            var msgArr = [];
            self.errormsg = '';
            var captcha = self.captcha;
            if(self.registerCaptchaActive){
                if(!captcha){
                    msgArr.push('captcha cannot be blank');
                }
            }
            if(!email){
                msgArr.push('email cannot be blank');
            }
            if(!password){
                msgArr.push('password cannot be blank');
            }
            if(!firstname){
                msgArr.push('firstname cannot be blank');
            }
            if(!lastname){
                msgArr.push('lastname cannot be blank');
            }
            if(confirmationPassword != password){
                msgArr.push('The password and confirmation password must be equal');
            }
            if(password.length < self.minPassLength || password.length > self.maxPassLength){
                msgArr.push('The password must be greater than '+self.minPassLength + ', less than ' + self.maxPassLength);
            }
            if(firstname.length < self.minNameLength || firstname.length > self.maxNameLength){
                msgArr.push('The firstname must be greater than '+self.minNameLength + ', less than '+ self.maxNameLength);
            }
            if(lastname.length < self.minNameLength || lastname.length > self.maxNameLength){
                msgArr.push('The lastname must be greater than '+self.minNameLength + ', less than ' + self.maxNameLength);
            }
            if(msgArr.length > 0){
                self.errormsg = msgArr.join(",");
                return;
            }
            var cookies = self.getTraceAllCookie();
            $.showIndicator();
            $.ajax({
                url: self.accountRegisterUrl,
                async: true,
                timeout: 120000,
                type: 'post',
                headers: self.getRequestHeader(),
                data:{ 
                    email:email,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    is_subscribed: is_subscribed,
                    captcha: captcha,
                    cookies: cookies
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    var code = reponseData.code;
                    if(code == 200){
                        console.log('account login success');
                        self.saveReponseHeader(request); 
                        self.$router.push('/customer/account/login');
                    }else if(code == 1100006){
                        console.log('account has login');
                        self.errormsg = 'account has logined';
                        self.saveReponseHeader(request); 
                        //self.$router.push('/customer/account/index');
                    }else if(code == 1100007){
                        var content = reponseData.data.error;
                        self.errormsg = content;
                    }else{
                        self.errormsg = 'register account error';
                    }
                    self.saveReponseHeader(request); 
                    
                },
                error:function(){
                    $.hideIndicator();
                    $.toast("system error");
                    console.log('login account error');
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
                    if(reponseData.code == 400){
                        self.isLogin = reponseData.data.isLogin;
                        self.$router.push('/customer/account/index');
                        return;
                    }else if(reponseData.code == 200){
                        //如果用户登录，则跳转到账户中心页面
                        self.registerCaptchaActive = reponseData.data.registerCaptchaActive;
                        self.minNameLength = reponseData.data.minNameLength;
                        self.maxNameLength = reponseData.data.maxNameLength;
                        self.minPassLength = reponseData.data.minPassLength;
                        self.maxPassLength = reponseData.data.maxPassLength;
                        console.log('get register info success');
                        var traceData = {"refer_url": self.refer_url};
                        var routerQ = self.$route.query
                        for (var k in routerQ) {
                            traceData[k] = routerQ[k]
                        }
                        self.reloadTraceJs(traceData);
                        self.saveReponseHeader(request); 
                        console.log(self.registerCaptchaActive);
                        if(self.registerCaptchaActive){
                            console.log('begin get register captcha');
                            self.getRegisterCaptcha();
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
            this.getRegisterCaptcha();
        },
        redirectLoginPage: function(){
            this.$router.push('/customer/account/login');
        }, 
       
        getRegisterCaptcha: function(){
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
                    console.log('get get Category info error');
                }
            });
        
        }
    
    }
}
</script>