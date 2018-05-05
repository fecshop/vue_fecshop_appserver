<template>
    <div class="content" ref="scrollContainer">
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/account/index"  class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                </router-link>
                <h1 class='title'>{{ $t("message.product_review") }}</h1>
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
                                <div v-if="pageInitComplete && productList.length > 0">
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
                                    <!-- 加载提示符 -->
                                    <mugen-scroll :handler="fetchProduct" :should-handle="!loading" scroll-container="scrollContainer">
                                        <div style="display:none;"  class="infinite-scroll-preloader">
                                            <div class="preloader"></div>
                                        </div>
                                    </mugen-scroll>
                                </div>
                                <div v-if="pageInitComplete && productList.length <= 0">
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
import MugenScroll from 'vue-mugen-scroll'
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
            count:0,
            pageInitComplete:false,
            loading: false ,
            refer_url: '',
            correctmsg:''
        }
    },
    components:{
        'mugen-scroll': MugenScroll
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
        pageInit: function(){
            var self = this;
            this.loading = false;
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
                    console.log('page init success1');
                    if(reponseData.code == 1100003){
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(reponseData.code == 200){
                        self.productList    = reponseData.data.productList;
                        self.noActiveStatus = reponseData.data.noActiveStatus;
                        self.activeStatus   = reponseData.data.activeStatus;
                        self.refuseStatus   = reponseData.data.refuseStatus;
                        console.log('page init success2');
                        var traceData = {"refer_url": self.refer_url};
                        var routerQ = self.$route.query
                        for (var k in routerQ) {
                            traceData[k] = routerQ[k]
                        }
                        self.reloadTraceJs(traceData);
                        self.saveReponseHeader(request); 
                        self.count = 1;
                    }
                    self.pageInitComplete = true;
                    
                },
                error:function(){
                    $.toast('system error');
                    $.hideIndicator();
                    console.log('get customer order info error');
                }
            });
        } ,
        fetchProduct: function(){
            console.log('fetch product');
            var self = this;
            if(self.count >=1){
                self.loading  = true;
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
                        p: self.count+1
                    },
                    success:function(reponseData, textStatus,request){
                        $.hideIndicator();
                        if(reponseData.code == 1100003){
                            self.$router.push('/customer/account/login');
                            return;
                        }else if(reponseData.code == 200){
                            console.log('fetch product 200');
                            var products = reponseData.data.productList;
                            if(products.length > 0){
                                for(var x in products){
                                    self.productList.push(products[x]);
                                }
                                self.loading = false;
                                console.log('fetch product loading false');
                                $.init();
                                self.count++;
                            }
                            self.saveReponseHeader(request); 
                        }
                        
                    },
                    error:function(){
                        $.toast('system error');
                        $.hideIndicator();
                        console.log('get customer order info error');
                    }
                }); 
            }
        
        }
    }
}
</script>