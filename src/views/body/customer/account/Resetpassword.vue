<template>
    <div class="content">
        
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/account/index"  class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                </router-link>
                <h1 class='title'>{{ $t("message.reset_password") }}</h1>
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
            <div v-if="resetPasswordActive && loadSuccess" class="account-create">
                <div method="post" id="form-validate">
                    <ul>
                        <li>
                            <div class="item-content">
                                <div class="item-media">
                                    <i class="icon icon-form-name"></i>
                                </div>
                                <div class="item-inner">
                                    <div class="item-input">
                                        <input v-model="email" placeholder="Your Email Address" name="editForm[email]" id="email_address"  title="Email Address" class="input-text validate-email required-entry" type="text">
                                
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
                                        <input v-model="newPassword" placeholder="New password" name="editForm[password]" id="password" title="Password" class="input-text required-entry validate-password" type="password">
                                    
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
                                        <input v-model="confirmPassword" placeholder="Confirm Password" name="editForm[confirmation]" title="Confirm Password" id="confirmation" class="input-text required-entry validate-cpassword" type="password">
                                    
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="clear"></div>
                    <div class="buttons-set">
                        <p>
                            <a @click="submitResetPassword()" external href="javascript:void(0)"   id="js_resetPassBtn" class="button button-fill">
                                {{ $t("message.reset_password") }}
                            </a>
                        </p>
                    </div>
                    <div class="clear">
                    </div>
                </div>
            </div>
            
            <div v-if="!resetPasswordActive && loadSuccess" class="customer-forgot-success">
                Your Reset Password Token is Expired, 
                You can 
                <router-link to="/customer/account/forgotpassword">
                    click here
                </router-link>
                to retrieve it
            </div>
            
        </div>
    </div>
</template>
<script>
var root = process.env.API_ROOT;
export default {
    data () {
        return {
            pageInitUrl: root + '/customer/forgot/resetpassword' ,
            submitResetPasswordUrl: root + '/customer/forgot/submitresetpassword' ,
            resetPasswordActive:false,
            email: '',
            newPassword: '', 
            confirmPassword: '',
            errormsg:'',
            correctmsg:'',
            refer_url: '',
            loadSuccess:false
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
        submitResetPassword: function(){
            var self = this;
            var resetToken = this.$route.params.resetToken;
            var email = self.email;
            var newPassword = self.newPassword;
            var confirmPassword = self.confirmPassword;
            if(!email){
                self.errormsg = 'email can not empty';
                return;
            }
            if(!newPassword){
                self.errormsg = 'newPassword can not empty';
                return;
            }
            if(!confirmPassword){
                self.errormsg = 'confirmPassword can not empty';
                return;
            }
            if(newPassword != confirmPassword){
                self.errormsg = 'new password and confirmation password must be consistent';
                return;
            }
            $.showIndicator();
            $.ajax({
                url: self.submitResetPasswordUrl,
                async: true,
                timeout: 120000,
                type: 'post',
                headers: self.getRequestHeader(),
                data:{ 
                    resetToken:resetToken,
                    email:email,
                    newPassword:newPassword,
                    confirmPassword:confirmPassword
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 200){
                        //如果用户登录，则跳转到账户中心页面
                        self.$router.push('/customer/account/resetpasswordsuccess');
                        console.log('');
                        self.saveReponseHeader(request); 
                    }else if(reponseData.code == 1100009){
                        self.errormsg = 'reset password token is expired';
                        self.saveReponseHeader(request); 
                    }else if(reponseData.code == 1100010){
                        self.errormsg = 'reset password by token, request param is invalid';
                        self.saveReponseHeader(request); 
                    }else if(reponseData.code == 1100011){
                        self.errormsg = 'reset password by token fail';
                        self.saveReponseHeader(request);
                    }else{
                        self.errormsg = reponseData.data.content;
                        self.saveReponseHeader(request); 
                    }
                    self.loadSuccess = true;
                    
                },
                error:function(){
                    $.toast("system error");
                    $.hideIndicator();
                    console.log('get get Category info error');
                }
            });
        
        },
        pageInit: function(){
            var resetToken = this.$route.params.resetToken;
            var self = this;
            self.resetPasswordActive = false;
            $.showIndicator();
            $.ajax({
                url: self.pageInitUrl,
                async: true,
                timeout: 120000,
                type: 'get',
                headers: self.getRequestHeader(),
                data:{ 
                    resetToken:resetToken
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 200){
                        //如果用户登录，则跳转到账户中心页面
                        self.resetPasswordActive = reponseData.data.resetPasswordActive;
                        console.log('');
                        var traceData = {"refer_url": self.refer_url};
                        var routerQ = self.$route.query
                        for (var k in routerQ) {
                            traceData[k] = routerQ[k]
                        }
                        self.reloadTraceJs(traceData);
                        self.saveReponseHeader(request); 
                    }else{
                        self.errormsg = 'reset password token is expired';
                        self.saveReponseHeader(request); 
                    }
                    self.loadSuccess = true;
                    
                },
                error:function(){
                    $.toast("system error");
                    $.hideIndicator();
                    console.log('get get Category info error');
                }
            });
            
        },
    
    
    
    }
}
</script>