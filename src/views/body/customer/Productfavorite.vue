<template>
    <div class="content" ref="scrollContainer">
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/account/index"  class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                </router-link>
                <h1 class='title'>{{ $t("message.product_favorite") }}</h1>
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
                <div class="std">
                    <div style="margin:4px 0 0">
                        <div style="width:100%;min-height:500px;">
                            <div style="width:100%;">
                                
                                <table v-if="pageInitComplete && productList.length > 0" class="product-Reviews"> 
                                    
                                    <tr v-for="(itemProduct,index) in productList">
                                        <td>
                                            <router-link :to="'/catalog/product/' + itemProduct.product_id"  >
                                                <p style="text-align:center;">
                                                    <img :src="itemProduct.imgUrl"  width="75" height="75"  />
                                                </p>
                                            </router-link>
                                        </td>
                                        <td>
                                            <span class="review_description_right_span">
                                                <b>
                                                <router-link :to="'/catalog/product/' + itemProduct.product_id"  >
                                                    {{itemProduct.name}}
                                                </router-link>
                                                </b>
                                            </span>
                                            
                                            <div class="review_description_centen">
                                                <div class="price_info" v-if="itemProduct.price_info && itemProduct.price_info.special_price">
                                                    <div class="special_price special_active">
                                                        {{itemProduct.price_info.special_price.symbol}}
                                                        {{itemProduct.price_info.special_price.value}}
                                                    </div>
                                                    <div  class="price special_active">
                                                        {{itemProduct.price_info.price.symbol}}
                                                        {{itemProduct.price_info.price.value}}
                                                    </div>
                                                    <div class="clear"></div>
                                                </div>
                                                
                                                <div class="price_info" v-else-if="itemProduct.price_info && itemProduct.price_info.price" >
                                                    <div class="price no-special">
                                                        {{itemProduct.price_info.price.symbol}}
                                                        {{itemProduct.price_info.price.value}}
                                                    </div>
                                                </div>
                                                
                                                <div class="clear"></div>
                                                <div style="font-weight:100">
                                                    Favorite Date:{{itemProduct.updated_at}}
                                                </div>
                                            </div>	
                                        </td>
                                        <td>
                                            <div class="favorite-Operation addressbook " style="display:inline-block;float:right; margin-top: 0px;">
                                                <a external href="javascript:void(0)" @click="removeFavorite(itemProduct.favorite_id)">
                                                    <span class="icon icon-remove"></span>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <!-- 加载提示符 -->
                                <mugen-scroll :handler="fetchProduct" :should-handle="!loading" scroll-container="scrollContainer">
                                    <div style="display:none;"  class="infinite-scroll-preloader">
                                        <div class="preloader"></div>
                                    </div>
                                </mugen-scroll>
                                <div v-if="pageInitComplete && productList.length <= 0" >
                                    You have no items in your favorite.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
import MugenScroll from 'vue-mugen-scroll'
var root = process.env.API_ROOT;
export default {
    data () {
        return {
            pageInitUrl: root + '/customer/productfavorite/index' ,
            removeFavoriteUrl: root + '/customer/productfavorite/remove' ,
            errormsg:'',
            productList:[],
            count:0,
            pageInitComplete:false,
            loading: false ,
            refer_url: '',
            correctmsg:''
        }
    },
    created: function(){
        this.pageInit();
    },
    components:{
        'mugen-scroll': MugenScroll
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
                    if(reponseData.code == 1100003){
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(reponseData.code == 200){
                        self.productList = reponseData.data.productList;
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
                    console.log('');
                }
            });
        },
        fetchProduct: function(){
            console.log('fetch product');
            var self = this;
            if(self.count >=1){
                self.loading = true;
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
                        console.log('111');
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
                        console.log('');
                    }
                });
            }
        
        },
        removeFavorite: function(favorite_id){
            var self        = this;
            self.errormsg   = '';
            self.correctmsg = '';
            $.showIndicator();
            $.ajax({
                url: self.removeFavoriteUrl,
                async: true,
                timeout: 120000,
                type: 'post',
                headers: self.getRequestHeader(),
                data:{ 
                    favorite_id:favorite_id
                },
                success:function(data, textStatus,request){
                    $.hideIndicator();
                    if(data.code == 400 && data.status == "access token error"){
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(data.code == 200){
                        
                        self.saveReponseHeader(request); 
                        location.reload() ;
                        self.correctmsg = 'remove Favorite success';
                    }
                    
                },
                error:function(){
                    $.hideIndicator();
                    console.log('');
                }
            });
        }
    }
}
</script>