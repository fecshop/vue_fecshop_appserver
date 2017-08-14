<template>
    <div class="content category_list" ref="scrollContainer" >
        <div >
            <div class="content-block">
                <div class="category_page">
                    <div class="category_img">
                        <a href="javascript:void(0)" >
                            <img  style="width:100%;"  />
                        </a>
                    </div> 
                    
                    <div class="sort_filter">
                        <a href="javascript:void(0)" @click="opensort" class="category-open open-sort">Sort &nbsp;<span class="icon icon-caret"></span></a>
                        <a href="javascript:void(0)" @click="openfilter"   class="category-open open-filter">Filter &nbsp;<span class="icon icon-caret"></span></a>
                        <div class="clear"></div>
                    </div>
                    <div > 
                        <!-- 添加 class infinite-scroll 和 data-distance  向下无限滚动可不加infinite-scroll-bottom类，这里加上是为了和下面的向上无限滚动区分-->
                        <div class=" infinite-scroll infinite-scroll-bottom" data-distance="10">
                            <div class="list-block wrap" > 
                              <div class="list-container">
                                <div style="padding:10px;">      
                                  <!-- 添加 class infinite-scroll 和 data-distance  向下无限滚动可不加infinite-scroll-bottom类，这里加上是为了和下面的向上无限滚动区分-->
                                  <div class=" infinite-scroll infinite-scroll-bottom" data-distance="100">
                                    <div class="list-block">
                                      <div class="list-container">
                                        <div class="row" v-for="(item, index) in productList">
                                          
                                          <div v-if="item.one" class="col-50 product_list">
                                            <router-link :to="item.one.url" >
                                                <img width="100%"   class="lazy" v-bind:src="item.one.image"  />
                                            </router-link> 
                                            <p class="product_name" style="">
                                              <router-link :to="item.one.url" >
                                                {{item.one.name}}           
                                              </router-link> 
                                            </p>
                                            <p style="color: #333;">
                                              <p class="proPrice">
                                                <span v-if="item.one.special_price" class="bizhong">{{item.one.special_price ? item.one.special_price.code : ''}}</span>
                                                <span v-if="item.one.special_price" v-bind:orgp="item.one.special_price"   class="my_shop_price f14">
                                                  <span class="icon">{{item.one.special_price ? item.one.special_price.symbol : ''}}</span>
                                                  {{item.one.special_price ? item.one.special_price.value : ''}}
                                                </span>
                                                
                                                <span v-if="!item.one.special_price" class="bizhong">{{item.one.price ? item.one.price.code : ''}}</span>
                                                <span v-if="!item.one.special_price" v-bind:orgp="item.one.price" class="my_shop_price f14">
                                                    <span class="icon">{{item.one.price ? item.one.price.symbol : ''}}</span>
                                                    {{item.one.price ? item.one.price.value : ''}}
                                                </span>
                                                 
                                                <span v-if="item.one.special_price" class="bizhong">{{item.one.price ? item.one.price.code : ''}}</span>
                                                <del  v-if="item.one.special_price" v-bind:orgp="item.one.price" class="my_shop_price">
                                                  <span class="icon">{{item.one.price ? item.one.price.symbol : ''}}</span>
                                                  {{item.one.price ? item.one.price.value : ''}}
                                                </del>
                                              </p>
                                            </p>
                                          </div>  
                                          
                                          
                                          <div v-if="item.two.name" class="col-50 product_list">
                                            <router-link :to="item.one.url" >
                                                <img width="100%"   class="lazy" v-bind:src="item.two.image"  />
                                            </router-link> 
                                            <p class="product_name" style="">
                                              <router-link :to="item.one.url" >
                                                {{item.two.name}}           
                                              </router-link>
                                            </p>
                                            <p style="color: #333;">
                                              <p class="proPrice">
                                                <span v-if="item.two.special_price" class="bizhong">{{item.two.special_price ? item.two.special_price.code : ''}}</span>
                                                <span v-if="item.two.special_price" v-bind:orgp="item.two.special_price"   class="my_shop_price f14">
                                                  <span class="icon">{{item.two.special_price ? item.two.special_price.symbol : ''}}</span>
                                                  {{item.two.special_price ? item.two.special_price.value : ''}}
                                                </span>
                                                
                                                <span v-if="!item.two.special_price" class="bizhong">{{item.two.price ? item.two.price.code : ''}}</span>
                                                <span v-if="!item.two.special_price" v-bind:orgp="item.two.price" class="my_shop_price f14">
                                                    <span class="icon">{{item.two.price ? item.two.price.symbol : ''}}</span>
                                                    {{item.two.price ? item.two.price.value : ''}}
                                                </span>
                                                 
                                                <span v-if="item.two.special_price" class="bizhong">{{item.two.price ? item.two.price.code : ''}}</span>
                                                <del  v-if="item.two.special_price" v-bind:orgp="item.two.price" class="my_shop_price">
                                                  <span class="icon">{{item.two.price ? item.two.price.symbol : ''}}</span>
                                                  {{item.two.price ? item.two.price.value : ''}}
                                                </del>
                                              </p>
                                            </p>
                                          </div>    
                                        </div>	
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- 加载提示符 -->
                              <mugen-scroll :handler="fetchProduct" :should-handle="!loading" scroll-container="scrollContainer">
                                <div v-bind:class="{ isNoDisPlay: isNoDisPlay}" class="infinite-scroll-preloader">
                                    <div class="preloader"></div>
                                </div>

                              </mugen-scroll>
                            </div>
                                
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

        <div class="popup popup-filter">
            <div class="content-block">
                <div class="close_popup">
                    <a href="javascript:void(0)" class="close-popup">×</a>
                </div>
                333333333333
            </div>
        </div>

        <div class="popup popup-sort">
            <div class="content-block">
                <div class="close_popup">
                    <a href="javascript:void(0)" class="close-popup">×</a>
                </div>
                <div>
                    44444
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import MugenScroll from 'vue-mugen-scroll'
//import Product from './index/Product.vue'
var root = process.env.API_ROOT;
var category_id = '';
var maxPage = 1;
var thisComponent = '';
export default {
  components:{
    //'product': Product,
    'mugen-scroll': MugenScroll
  },
  data () {
    return {
        categoryInfo:{},
        styleObject:{},
        isNoDisPlay:0,
        loading: false ,
        productList:[],
        count: 0,
        //styleObject: {},
        getCategoryUrl: root + '/catalog/category/index' ,
        getCategoryProductUrl: root + '/catalog/category/product' 
    }
  },
  created: function(){
    this.fetchCategory();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'loadNewCategory',
    
  },
  methods:{
    openfilter: function(){
      $.popup('.popup-filter');
    },
    opensort: function(){
      $.popup('.popup-sort');
    },
    loadNewCategory: function(){
        this.productList = [];
        this.count = 0;
        this.getCategoryInfo();
        this.fetchProduct();
        this.loading = false;
        this.isNoDisPlay = 0;
    },
    getCategoryInfo: function(){
        
    },
    fetchProduct() {
        this.loading = true;
        var self = this; 
        var category_id = this.$route.params.category_id;
        $.ajax({
            url: self.getCategoryProductUrl,
            async: false,
            timeout: 8000,
            dataType: 'json', 
            type: 'get',
            headers: self.getRequestHeader(),
            //beforeSend: function(xhr){
            //    if(fecshop_uuid){
            //        xhr.setRequestHeader('fecshop_uuid', fecshop_uuid);
            //    }
            //},
            data:{ 
                category_id:category_id,
                p: self.count + 1
            },
            success:function(data, textStatus,request){
                //console.log('22222');
                if(data.code == 200){
                    var products = data.content.products;
                    if(products.length > 0){
                        for(var x in products){
                            self.productList.push(products[x]);
                        }
                        self.count++;
                        self.loading = false;
                        if(self.count > 1){
                            $.init();
                        }
                    }else{
                        self.isNoDisPlay = 1;
                    }
                    self.saveReponseHeader(request); 
                }else{
                    self.isNoDisPlay = 1;
                }
            },
            error:function(){
                self.isNoDisPlay = 1;
                console.log('get get Category info error');
            }
        });
        
    },
    fetchCategory() {
        var self = this; 
        var category_id = this.$route.params.category_id;
        $.ajax({
            url: self.getCategoryUrl,
            async: false,
            timeout: 8000,
            dataType: 'json', 
            type: 'get',
            headers: self.getRequestHeader(),
            data:{ 
                category_id:category_id,
            },
            success:function(data, textStatus,request){
                if(data.code == 200){
                    self.categoryInfo = data.content;
                    self.saveReponseHeader(request); 
                } 
            },
            error:function(){
                console.log('get get Category info error');
            }
        });
        
    }
  }
}
$(document).ready(function(){
    $.init();
});
</script>

<style>
.isNoDisPlay{
    display:none;
}
</style>