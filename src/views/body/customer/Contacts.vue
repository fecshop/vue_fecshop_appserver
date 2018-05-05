<template>
    <div class="content">
        <div class="shopping-cart-img">
            {{ $t("message.contacts") }}
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
            <div class="col-main account_center">
                <div id="form-validate" class="account-form" >
                    <ul>
                        <li>
                            <div class="item-content">
                                <div class="item-media">
                                    <i class="icon icon-form-name"></i>
                                </div>
                                <div class="item-inner">
                                    <div class="item-input">
                                        <input v-model="customer_name" placeholder="Your Name" id="contacts_name" name="editForm[name]"  title="First Name" maxlength="255" class="input-text required-entry" type="text">
                                        
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
                                        <input v-model="email" placeholder="Your Email Address" id="contacts_email" name="editForm[email]" title="email" maxlength="255" class="input-text required-entry" type="text">
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
                                        <input v-model="telephone"  placeholder="Your telephone" name="editForm[telephone]" id="contacts_telephone"  title="telephone" class="input-text required-entry " type="text">
                                    
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
                                        <textarea v-model="comment" placeholder="Your Comment" name="editForm[comment]" id="contacts_comment"></textarea>
                                    
                                    </div>
                                </div>
                            </div>
                        </li>
                        
                        	
                        <li v-if="contactsCaptchaActive">
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
                            <a @click="submitContacts()"  href="javascript:void(0)"  id="js_contactBtn" class="button button-fill">
                                {{ $t("message.contact_us") }}
                            </a>
                        </p>
                    </div>	
                </div>
            </div>
            
            <div class="clear"></div>
            <div class="mailtous">
                <span>
                    {{ $t("message.our_email_address") }}
                </span>: 
                <a :href="'mailto:'+contacts_email">{{contacts_email}}</a>
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
            pageInitUrl: root + '/customer/contact/index' ,
            submitContactUrl: root + '/customer/contact/submit' ,
            comment:'',
            telephone:'',
            email:'',
            customer_name:'',
            contacts_email:'',
            errormsg:'',
            correctmsg:'',
            captcha:'',
            captchaFile:'',
            refer_url: '',
            contactsCaptchaActive:false,  // 是否开启注册验证码
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
        submitContacts: function(){
            var self = this;
            var customer_name   = self.customer_name;
            var email           = self.email;
            var telephone       = self.telephone;
            var comment         = self.comment;
            var captcha         = self.captcha;
            if(!customer_name){
                self.errormsg = 'customer name can not empty';
                return;
            }
            if(!email){
                self.errormsg = 'email can not empty';
                return;
            }
            if(!telephone){
                self.errormsg = 'telephone can not empty';
                return;
            }
            if(!comment){
                self.errormsg = 'comment can not empty';
                return;
            }
            
            self.errormsg = '';
            self.correctmsg = '';
            
            $.showIndicator();
            $.ajax({
                url: self.submitContactUrl,
                async: true,
                timeout: 120000,
                type: 'post',
                headers: self.getRequestHeader(),
                data:{ 
                    captcha:captcha,
                    customer_name:customer_name,
                    email:email,
                    telephone:telephone,
                    comment:comment,
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 200){
                        self.correctmsg = 'submit contacts info success';
                    }else{
                        self.errormsg = 'submit contacts info fail';
                    }
                    console.log('');
                    self.saveReponseHeader(request); 
                    self.reflushCaptcha();
                    
                },
                error:function(){
                    $.toast("system error");
                    $.hideIndicator();
                    console.log('get address list page init error');
                }
            });
        },
        pageInit: function(){
            var self = this;
            self.errormsg = '';
            self.correctmsg = '';
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
                    if(reponseData.code == 200){
                        self.contactsCaptchaActive  = reponseData.data.contactsCaptchaActive;
                        self.customer_name          = reponseData.data.customer_name;
                        self.email                  = reponseData.data.customer_email;
                        self.contacts_email         = reponseData.data.contactsEmail;
                        self.getContactsCaptcha();
                        console.log('get editAccount info success');
                        var traceData = {"refer_url": self.refer_url};
                        var routerQ = self.$route.query
                        for (var k in routerQ) {
                            traceData[k] = routerQ[k]
                        }
                        self.reloadTraceJs(traceData);
                        self.saveReponseHeader(request); 
                    }
                },
                error:function(){
                    $.toast("system error");
                    $.hideIndicator();
                    console.log('get address list page init error');
                }
            });
            
        },
        reflushCaptcha: function(){
            this.getContactsCaptcha();
        },
        getContactsCaptcha: function(){
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
                    $.toast("system error");
                    $.hideIndicator();
                    console.log('get get Category info error');
                }
            });
        }
    
    }
    
    
    
}
</script>