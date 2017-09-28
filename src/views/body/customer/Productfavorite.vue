<template>
    <div class="content">
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/account/index"  class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                </router-link>
                <h1 class='title'>Product Favorite</h1>
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
                                
                                <table v-if="productList.length > 0" class="product-Reviews"> 
                                    
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
                                <div v-if="productList.length <= 0" >
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
var root = process.env.API_ROOT;
export default {
    data () {
        return {
            pageInitUrl: root + '/customer/productfavorite/index' ,
            removeFavoriteUrl: root + '/customer/productfavorite/remove' ,
            errormsg:'',
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
                        self.saveReponseHeader(request); 
                    }
                    $.hideIndicator();
                },
                error:function(){
                    $.hideIndicator();
                    console.log('');
                }
            });
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
                    if(data.code == 400 && data.status == "access token error"){
                        $.hideIndicator();
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(data.code == 200){
                        
                        self.saveReponseHeader(request); 
                        location.reload() ;
                        self.correctmsg = 'remove Favorite success';
                    }
                    $.hideIndicator();
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