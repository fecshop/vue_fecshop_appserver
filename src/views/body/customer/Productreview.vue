<template>
    <div class="content">
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/account/index"  class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                </router-link>
                <h1 class='title'>Product Review</h1>
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
        
        <div class="account-container">
            <div class="col-main account_center">
                <div class="account_review_product">
                    <div style="margin:4px 0 0">
                        <div style="width:100%;min-height:500px;">
                            <div style="width:100%;">
                                <div v-if="productList.length > 0">
                                    <table class="product-Reviews"> 
                                        <tr v-for="(itemProduct,index) in productList">
                                            <td>
                                                <div class="review_description_left">
                                                    <router-link :to="'/catalog/product/' + itemProduct.product_id"  >
                                                        <img :src="itemProduct.imgUrl"  width="75" height="75"  />
                                                    </router-link>
                                                    <a external href="javascript:void(0)" :class="'review_star review_star_' + itemProduct.rate_star" ></a>
                                                </div>
                                            </td>
                                            <td>
                                                {{itemProduct.summary}}
                                                <br/><br/>
                                                <div class="review-content">
                                                    {{itemProduct.review_content}}
                                                </div>
                                                <div class="review_moderation" v-if="itemProduct.status == noActiveStatus">
                                                    Your Review is awaiting moderation...
                                                </div>
                                                
                                                <div class="review_refuse" v-if="itemProduct.status == refuseStatus">
                                                    Your Review is refused.
                                                </div>
                                                
                                                <div class="review_accept" v-if="itemProduct.status == activeStatus">
                                                    Your Review is accept.
                                                </div>
                                                
                                            </td>
                                            <td>
                                                <span class="review_date_time">{{itemProduct.review_date}}</span>
                                                
                                            </td>
                                        </tr>
                                    </table>
                                
                                </div>
                                <div v-if="productList.length <= 0">
                                    You have submitted no reviews.
                                </div>
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
            pageInitUrl: root + '/customer/productreview/index' ,
            errormsg:'',
            noActiveStatus:'',
            activeStatus:'',
            refuseStatus:'',
            productList:[],
            correctmsg:''
        }
    },
    created: function(){
        this.pageInit();
    },
    
    methods: {
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
                        self.productList = data.productList;
                        self.noActiveStatus = data.noActiveStatus;
                        self.activeStatus = data.activeStatus;
                        self.refuseStatus = data.refuseStatus;
                        console.log('');
                        self.saveReponseHeader(request); 
                    }
                    $.hideIndicator();
                },
                error:function(){
                    $.hideIndicator();
                    console.log('get customer order info error');
                }
            });
        }  
    }
}
</script>