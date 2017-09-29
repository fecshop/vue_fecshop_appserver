<template>
    <div class="content">
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/account/index"  class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                </router-link>
                <h1 class='title'>Forget Password Send Success</h1>
            </div>
        </div>
        
        
        <div class="customer-forgot-success ">
            <div >
                <div>
                    We've sent a message to your email address
                    Please follow the instructions provided in the message to reset your password.
                </div>
                <div>
                    <p>
                        Didn't receive the mail from us?
                        <router-link to="/customer/account/forgotpassword"  class="">
                            click here to retry
                        </router-link>
                    </p>
                    <p>
                        Check your bulk or junk email folder.
                    </p>
                    
                    <p>
                        Confirm your identity to reset password ,If you still can't find it, 
                        click 
                        <router-link to="/customer/contacts" >
                            support center 
                        </router-link>
                        for help
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
            
        }
    }
}
</script>