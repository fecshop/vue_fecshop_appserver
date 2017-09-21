<template>
    <div class="content">
        
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/account/index"  class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                </router-link>
                <h1 class='title'>Edit Account</h1>
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

        <div class="list-block customer-login  customer-register">
            <div  id="form-validate" autocomplete="off" >
                <ul>
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="email" type="text" placeholder="Email Address"  style="color:#ccc;" readonly="true" id="customer_email" name="editForm[email]"  title="Email"  class="input-text required-entry" />
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
                                    <input v-model="firstname"  placeholder="First name" id="firstname" name="editForm[firstname]"  title="First Name"  class="input-text required-entry" type="text"  />
                                    <div class="validation-advice" id="required_current_firstname" style="display:none;">This is a required field.</div>
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
                                    <input v-model="lastname"  type="text" placeholder="Last name" id="lastname" name="editForm[lastname]"  title="Last Name" maxlength="255" class="input-text required-entry" />
                                    <div class="validation-advice" id="required_current_lastname" style="display:none;"><?= Yii::$service->page->translate->__('This is a required field.');?></div>
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <li class="control">
                        <div class="change_password_label item-content">
                            <input name="editForm[change_password]" id="change_password" v-model="change_password_is_checked" @click="setPasswordForm()" title="Change Password" class="checkbox" type="checkbox">
                            <label for="change_password">Change Password</label>
                        </div>
                    </li>
                    
                    <li class="fieldset_pass" v-if="change_password">
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="current_password" placeholder="current password" title="Current Password" class="input-text required-entry" name="editForm[current_password]" id="current_password" type="password" />
                                    <div class="validation-advice" id="required_current_password" style="display:none;">This is a required field</div>    
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <li class="fieldset_pass" v-if="change_password">
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="new_password" placeholder="New password" title="New Password" class="input-text validate-password required-entry" name="editForm[password]" id="password" type="password" />
                                    <div class="validation-advice" id="required_new_password" style="display:none;"><?= Yii::$service->page->translate->__('This is a required field.');?></div>	
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <li class="fieldset_pass" v-if="change_password">
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon icon-form-name"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input v-model="confirm_new_password" placeholder="Confirm New Password"  title="Confirm New Password" class="input-text validate-cpassword required-entry" name="editForm[confirmation]" id="confirmation" type="password"  />
                                    <div class="validation-advice" id="required_confirm_password" style="display:none;">This is a required field.</div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="clear"></div>
                <div class="buttons-set">
                    <p>
                        <a @click="editAccountInfo()"  href="javascript:void(0)"  id="js_editBtn" class="button button-fill">
                            Edit Account
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
            pageInitUrl: root + '/customer/editaccount/index' ,
            editAccountUrl: root + '/customer/editaccount/update' ,
            change_password_is_checked:0,
            change_password:0,
            email:'',
            firstname:'',
            lastname:'',
            current_password:'',
            new_password:'',
            confirm_new_password:'',
            errormsg:'',
            correctmsg:'',
            minNameLength: 0,
            maxNameLength: 0,
            minPassLength: 0,
            maxPassLength: 0
        }
    },
    created: function(){
        this.pageInit();
    },
    methods: {
        setPasswordForm: function(){
            var self = this;
            console.log(self.change_password_is_checked);
            if(self.change_password_is_checked){
                console.log(111);
                self.change_password = 1;
            }else{
                console.log(222);
                self.change_password = 0;
            }
        },
        editAccountInfo: function(){
            var self = this;
            self.errormsg = '';
            self.correctmsg = '';
            if(self.firstname == ''){
                self.errormsg = 'firstname can not empty';
                return;
            }
            if(self.lastname == ''){
                self.errormsg = 'lastname can not empty';
                return;
            }
            if(self.firstname.length < self.minNameLength || self.firstname.length > self.maxNameLength){
                self.errormsg = 'The firstname must be greater than '+self.minNameLength + ', less than '+ self.maxNameLength;
                return;
            }
            if(self.lastname.length < self.minNameLength || self.lastname.length > self.maxNameLength){
                self.errormsg = 'The lastname must be greater than '+self.minNameLength + ', less than ' + self.maxNameLength;
                return;
            }
            if(self.change_password_is_checked){
                if(self.current_password == ''){
                    self.errormsg = 'current password can not empty';
                    return;
                }
                if(self.new_password == ''){
                    self.errormsg = 'New password can not empty';
                    return;
                }
                if(self.confirm_new_password == ''){
                    self.errormsg = 'confirm new password can not empty';
                    return;
                }
                if(self.new_password != self.confirm_new_password){
                    self.errormsg = 'Password and confirmation password must be consistent';
                    return;
                }
                if(self.new_password.length < self.minPassLength || self.new_password.length > self.maxPassLength){
                    self.errormsg = 'The New password must be greater than '+self.minPassLength + ', less than ' + self.maxPassLength;
                    return;
                }
            }
            // 开始提交更改信息
            $.showIndicator();
            
            var updateData = {
                firstname:self.firstname,
                lastname:self.lastname
            };
            if(self.change_password_is_checked){
                updateData.current_password     = self.current_password;
                updateData.new_password         = self.new_password;
                updateData.confirm_new_password = self.confirm_new_password;
            }
            
            $.ajax({
                url: self.editAccountUrl,
                async: true,
                timeout: 120000,
                type: 'post',
                headers: self.getRequestHeader(),
                data:updateData,
                success:function(data, textStatus,request){
                    if(data.code == 400 && data.status == "access token error"){
                        $.hideIndicator();
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(data.code == 200){
                        self.correctmsg = 'update account info success';
                    }else if(data.code == 401){
                        self.errormsg = data.content;
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
                success:function(data, textStatus,request){
                    if(data.code == 400 && data.status == "access token error"){
                        $.hideIndicator();
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(data.code == 200){
                        //如果用户登录，则跳转到账户中心页面
                        self.email      = data.email;
                        self.firstname  = data.firstname;
                        self.lastname   = data.lastname;
                        self.minNameLength = data.minNameLength;
                        self.maxNameLength = data.maxNameLength;
                        self.minPassLength = data.minPassLength;
                        self.maxPassLength = data.maxPassLength;
                        console.log('get editAccount info success');
                        self.saveReponseHeader(request); 
                        
                    }
                    $.hideIndicator();
                },
                error:function(){
                    $.hideIndicator();
                    console.log('get get Category info error');
                }
            });
            
        },
    }
}
</script>