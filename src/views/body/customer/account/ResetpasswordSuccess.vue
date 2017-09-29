<template>
    <div class="content">
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/account/index"  class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                </router-link>
                <h1 class='title'>Reset Password Success</h1>
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
        
       
        <div class="customer-forgot-success">
            
            Reset you account success, you can  
            <router-link to="/customer/account/login" >
                click here
            </router-link>
            to login .

        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
    
        }
    }
}
</script>