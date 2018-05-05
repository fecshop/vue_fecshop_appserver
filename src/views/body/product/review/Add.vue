<template>
    <div class="main container one-column content">
        <div class="fecshop_message" v-if="errormsg">
            <div class="error-msg">
                <div>
                    {{errormsg}}
                </div>
            </div>
		</div>
        <div class="col-main">
            <div class="std">
                <div class="review_add">
                    <div class="row">
                        <div class="col-20">
                            
                            <router-link :to="'/catalog/product/'+product.product_id"  >
                                <img :src="product.imgUrl">
                            </router-link>
                        </div>
                        <div class="col-80">
                            
                             <router-link :to="'/catalog/product/'+product.product_id"  class="product_name">
                                {{product.product_name}}
                            </router-link>
                            
                            <div class="product_info review_add_price">
                                <div class="price_info" v-if="product.price_info && product.price_info.special_price">
                                    <div class="special_price special_active">
                                        {{product.price_info.special_price.symbol}}
                                        {{product.price_info.special_price.value}}
                                    </div>
                                    <div  class="price special_active">
                                        {{product.price_info.price.symbol}}
                                        {{product.price_info.price.value}}
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                
                                <div class="price_info" v-else-if="product.price_info && product.price_info.price" >
                                    <div class="price no-special">
                                        {{product.price_info.price.symbol}}
                                        {{product.price_info.price.value}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="product-Reviews_bottom">
                    <div >
                           
                        <div class="list-block" >
                            <ul>			
                                <li>
                                    <div class="item-content">
                                        <div class="item-media">
                                            <i class="icon icon-form-name"></i>
                                        </div>
                                        <div class="item-inner">
                                            <div class="item-title label">
                                                {{ $t("message.name") }}<em class="product-description_em">*</em>
                                            </div>
                                            <input v-model="customer_name"  id="review_email_field" type="text" placeholder="Your name"  class="input-text  review-input-text required-entry" >
                                        </div>
                                    </div>
                                </li>
                                                
                                <li>
                                    <div class="item-content">
                                        <div class="item-media">
                                            <i class="icon icon-form-name"></i>
                                        </div>
                                        <div class="item-inner">
                                            <div class="item-title label">
                                                {{ $t("message.summary") }}<em class="product-description_em">*</em>
                                            </div>
                                            <input v-model="summary" placeholder=" Summary of Your Review*" name="editForm[summary]" id="review_title_field" class="input-text  review-input-text required-entry"  type="text">
                                        
                                        </div>
                                    </div>
                                </li>
                                
                                <li>
                                    <div class="item-content">
                                      <div class="item-media"><i class="icon icon-form-name"></i></div>
                                      <div class="item-inner">
                                        <div class="item-title label">
                                            {{ $t("message.rate") }}</strong><em class="product-description_em">*</em>
                                        </div>
                                        <div class="lh30_f">
                                            <input v-model="selectStar" name="editForm[rate_star]" id="review_price_field" type="hidden">
                                            <ul class="star_ul">
                                                
                                                <li v-for="(starNum,index) in reviewStar">
                                                    <a @click="changeStar(starNum)" :class="'star_'+starNum+' '+ ((starNum <= selectStar) ? 'full_star' : '' )  " :title="starNum+' stars'"  href="javascript:void(0)" ></a>
                                                </li>
                                                
                                            </ul>          
                                            <span class="review_span_error" id="review_price_span" style="display:inline;"></span>
                                        </div>
                                        
                                      </div>
                                    </div>
                                  </li> 
                                
                                <li class="align-top">
                                    <div class="item-content">
                                        <div class="item-media">
                                            <i class="icon icon-form-comment"></i>
                                        </div>
                                        <div class="item-inner">
                                            <div class="item-title label">
                                                {{ $t("message.review") }}
                                            </div>
                                            <textarea v-model="review_content" placeholder="Your review content" name="editForm[review_content]" id="review_review_field"></textarea>
                                        </div>
                                    </div>
                                </li>
                                
                                	
                                
                                <li v-if="reviewCaptchaActive">
                                    <div class="item-content">
                                        <div class="item-media">
                                            <i class="icon icon-form-name"></i>
                                        </div>
                                        <div class="item-inner">
                                            <div class="item-title label">
                                                {{ $t("message.captcha") }}<em class="product-description_em">*</em>
                                            </div>
                                            <div class="input-box login-captcha">
                                                <input v-model="captcha" placeholder="captcha" type="text" name="editForm[captcha]" value="" size=10 class="login-captcha-input">
                                                <img class="login-captcha-img"  title="click refresh" :src="captchaFile" align="absbottom" ></img>
                                                <span @click="reflushCaptcha()" class="icon icon-refresh"></span>
                                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="review_submit">
                                <button @click="submitReview()" title="Submit Review" class="button" id="m_top_10" ><span><span>{{ $t("message.submit") }}</span></span></button>
                            </div>
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
            pageInitUrl: root + '/catalog/reviewproduct/add' ,
            submitReviewUrl: root + '/catalog/reviewproduct/submitreview' ,
            errormsg:'',
            product:{},
            captcha:'',
            reviewStar:[1,2,3,4,5],
            selectStar:5,
            customer_name:'',
            captchaFile:'',
            refer_url: '',
            reviewCaptchaActive:false,  // 是否开启注册验证码
            correctmsg:''
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
        submitReview: function(){
            var self = this;
            var customer_name   = self.customer_name;
            var summary         = self.summary;
            var selectStar      = self.selectStar;
            var review_content  = self.review_content;
            var captcha         = self.captcha;
            var product_id = this.$route.params.product_id;
            if(!customer_name){
                self.errormsg = 'customer name can not empty';
                return;
            }
            if(!summary){
                self.errormsg = 'summary can not empty';
                return;
            }
            if(!product_id){
                self.errormsg = 'product id can not empty';
                return;
            }
            if(!captcha){
                self.errormsg = 'captcha can not empty';
                return;
            }
            if(!review_content){
                self.errormsg = 'review content can not empty';
                return;
            }
            if(!selectStar){
                selectStar = 1;
            }
            
            $.showIndicator();
            $.ajax({
                url: self.submitReviewUrl,
                async: true,
                timeout: 120000,
                type: 'post',
                headers: self.getRequestHeader(),
                data:{ 
                    product_id:product_id,
                    customer_name:customer_name,
                    summary:summary,
                    captcha:captcha,
                    review_content:review_content,
                    selectStar:selectStar
                    
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 1100003){
                        self.setLoginSuccessRedirectUrl('/product/review/add/'+product_id);
                        self.$router.push('/customer/account/login');
                    }else if(reponseData.code == 200){
                        self.$router.push('/product/review/lists/'+product_id);
                        
                        console.log('');
                        self.saveReponseHeader(request); 
                    }else{
                        self.errormsg = reponseData.message;
                        self.saveReponseHeader(request); 
                    }
                    
                },
                error:function(){
                    $.toast("system error");
                    $.hideIndicator();
                    console.log('');
                }
            });
            
            
            
        },
        changeStar(starNum){
            this.selectStar = starNum;
        },
        pageInit: function(){
            
            var product_id = this.$route.params.product_id;
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
                    product_id:product_id,
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 1100003){
                        self.setLoginSuccessRedirectUrl('/product/review/add/'+product_id);
                        self.$router.push('/customer/account/login');
                    }else if(reponseData.code == 200){
                        self.product = reponseData.data.product;
                        self.customer_name = reponseData.data.customer_name;
                        self.reviewCaptchaActive = reponseData.data.reviewCaptchaActive;
                        if(self.reviewCaptchaActive){
                            self.reflushCaptcha();
                        }
                        console.log('');
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
                    console.log('');
                }
            });
            
        },
        reflushCaptcha: function(){
            this.getReviewCaptcha();
        },
        redirectLoginPage: function(){
            this.$router.push('/customer/account/login');
        }, 
       
        getReviewCaptcha: function(){
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