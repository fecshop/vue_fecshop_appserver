<template>
    <div class="content">
        <div class="shopping-cart-img">
            Register
            <router-link to="/customer/account/login"  class="f-right">
                Login
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
                            Register Account
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
            errormsg:''
        }
    },
    created: function(){
        this.pageInit();
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
            if(msgArr.length > 0){
                self.errormsg = msgArr.join(",");
                return;
            }
            $.showIndicator();
            $.ajax({
                url: self.accountRegisterUrl,
                async: true,
                timeout: 120000,
                type: 'post',
                headers: self.getRequestHeader(),
                data:{ 
                    email:email,
                    password:password,
                    firstname:firstname,
                    lastname:lastname,
                    is_subscribed:is_subscribed,
                    captcha:captcha
                },
                success:function(data, textStatus,request){
                    var code = data.code;
                    if(code == 200){
                        console.log('account login success');
                        self.saveReponseHeader(request); 
                        $.hideIndicator();
                        self.$router.push('/customer/account/index');
                    }else if(code == 400){
                        console.log('account has login');
                        self.saveReponseHeader(request); 
                        $.hideIndicator();
                        self.$router.push('/customer/account/index');
                    }else if(code == 401){
                        msgArr.push('captcha is not right');
                    }else if(code == 402){
                        msgArr.push('email or password is not right');
                    }else{
                        msgArr.push('login error');
                    }
                    if(msgArr.length > 0){
                        self.errormsg = msgArr.join(",");
                    }
                    self.saveReponseHeader(request); 
                    $.hideIndicator();
                },
                error:function(){
                    $.hideIndicator();
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
                success:function(data, textStatus,request){
                    if(data.code == 400){
                        self.isLogin = data.isLogin;
                        $.hideIndicator();
                        self.$router.push('/customer/account/index');
                        return;
                    }else if(data.code == 200){
                        //如果用户登录，则跳转到账户中心页面
                        self.registerCaptchaActive = data.registerCaptchaActive;
                        self.minNameLength = data.minNameLength;
                        self.maxNameLength = data.maxNameLength;
                        self.minPassLength = data.minPassLength;
                        self.maxPassLength = data.maxPassLength;
                        console.log('get register info success');
                        self.saveReponseHeader(request); 
                        console.log(self.registerCaptchaActive);
                        if(self.registerCaptchaActive){
                            console.log('begin get register captcha');
                            self.getRegisterCaptcha();
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