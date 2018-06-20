<template>
    <div >
        <div class="content category_list" ref="scrollContainer" style="top:2.2rem" >
            <div class="content-block">
                <div class="category_page">
                    <div class="category_img">
                        <a href="javascript:void(0)" >
                            <img  style="width:100%;"  />
                        </a>
                    </div> 
                    
                    <div class="sort_filter">
                        <a href="javascript:void(0)" @click="opensort" class="category-open open-sort">
                            {{ $t("message.sort") }} &nbsp;
                            <span class="icon icon-caret"></span>
                        </a>
                        <a href="javascript:void(0)" @click="openfilter"   class="category-open open-filter">
                            {{ $t("message.filter") }} &nbsp;
                            <span class="icon icon-caret"></span>
                        </a>
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
                                            <router-link :to="item.two.url" >
                                                <img width="100%"   class="lazy" v-bind:src="item.two.image"  />
                                            </router-link> 
                                            <p class="product_name" style="">
                                              <router-link :to="item.two.url" >
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
                                <div style="display:none"  class="infinite-scroll-preloader">
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
                
                
                <div v-if="refine_by_info.length > 0" class="filter_refine_by">
                    <div class="filter_attr_title">
                        {{ $t("message.refine_by") }}
                    </div>
                    <div class="filter_refine_by_content">
                        <div v-for="(refine_item, refine_index) in refine_by_info" >
                            <a  @click="clearFilterAttr(refine_item.attr,refine_item.val,$event)" href="javascript:void(0)">
                                <i class="closeBtn c_tagbg"></i>
                                <span>{{refine_item.val}}</span>
                            </a>
                        </div>
                        
                       
                    </div>
                </div>
            
                <div v-if="filter_category && categoryInfo.name" class="category_left_filter_category">
                    <div class="filter_attr_title">
                        {{categoryInfo.name}}
                    </div>
                    <div class="filter_category_content">
                        <ul v-if="filter_category">
                            <li v-for="(cate_item, cate_index) in filter_category" v-bind:class="{ current: cate_item.current }"   >
                                <router-link :to="'/' + cate_item.url" >
                                    {{cate_item.name}}        
                                </router-link> 
                                <ul v-if="cate_item.child">
                                    <li v-for="(cate_child_item, cate_child_index) in cate_item.child" v-bind:class="{ current: cate_child_item.current }"   >
                                        <router-link :to="'/' + cate_child_item.url" >
                                            {{cate_child_item.name}}        
                                        </router-link> 
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                
                
                
                <div class="category_left_filter" v-if="filter_info">
                    <div  class="filter_attr"  v-for="(filter_items, filter_index) in filter_info" >
                        <div class="filter_attr_title">
                            {{filter_items.label}}
                        </div>
                        <div class="filter_attr_info" v-if="filter_items.items">
                            <template  v-for="(filter_item, filter_item_index) in filter_items.items"  v-if="filter_item._id">
                                <a  @click="changeFilterAttr(filter_index,filter_item._id,filter_item.selected,$event)" href="javascript:void(0)" v-bind:class="{ checked: filter_item.selected}" >
                                    {{filter_item.label}}({{filter_item.count}})
                                </a>
                                <br/>
                            </template>
                        </div>
                    </div>    
                </div>
                    
                    
                    
                    
                    
                <div class="category_left_filter" v-if="filter_price">
                    <div class="filter_attr" v-for="(price_items, price_index) in filter_price">
                        <div class="filter_attr_title">
                            {{ $t("message.price") }}
                        </div>
                        <div class="filter_attr_info">
                            <template v-for="(price_item, price_item_index) in price_items">
                                <a href="javascript:void(0)" @click="changeFilterPrice(price_item.val,price_item.selected,$event)" v-bind:class="{ checked: price_item.selected}">
                                    {{price_item.label}}
                                </a>
                                <br/>
                            </template>
                            
                        </div>
                    </div>
                </div>
                
                
                
                
            </div>
        </div>

        <div class="popup popup-sort">
            <div class="content-block">
                <div class="close_popup">
                    <a href="javascript:void(0)" class="close-popup">×</a>
                </div>
                <div>
                    <div class="toolbar">
                        <div class="tb_le">
                            <div v-if="query_sort" class="category_left_filter">
                                <div class="filter_attr">
                                    <div class="filter_attr_title">
                                        <b>{{ $t("message.sort_by") }}:</b>
                                    </div>
                                    <div class="filter_attr_info">
                                        <template v-for="(sort_item, sort_index) in query_sort">
                                            <a  href="javascript:void(0)" @click="changeSort(sort_item.value,$event)" v-bind:class="{ checked: sort_item.selected}"  > 
                                                {{sort_item.label}}
                                            </a>
                                        <br>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
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
        getCategoryProductUrl: root + '/catalog/category/product' ,
        refine_by_info:[],
        filter_category:[],
        filter_info:[],
        filter_price:[],
        query_sort:[],
        sortColumn:'',
        filterAttrs:{},
        refer_url: '',
        filterPrice:''
    }
  },
  created: function(){
    // 如果存在参数，则使用参数进行初始化
    var vars = this.fecvars;
    console.log("###my vars:");
    console.log(vars);
    for (var k in vars) {
        var v = vars[k];
        if (k === 'numPerPage') {
            
        } else if (k === 'p') {
        
        } else if (k === 'sort') {
            this.sortColumn = v;
        } else if (k === 'dir') {
        
        } else if (k === 'price') {
            this.filterPrice = v;
        } else {
            this.filterAttrs[k] = v;
        }
    }
    this.fetchCategory();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'loadNewCategory',
    
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
  methods:{
    openfilter: function(){
        console.log('open filter begin');
        $.popup('.popup-filter');
        console.log('open filter complete');
    },
    opensort: function(){
        $.popup('.popup-sort');
    },
    loadNewCategory: function(){
        
        this.productList = [];
        this.count = 0;
        this.loading = false;
        this.isNoDisPlay = 0;
        this.filter_category = [];
        this.filter_info = [];
        this.filter_price = [];
        this.refine_by_info = [];
        this.query_sort = [];
        this.sortColumn = '';
        this.filterAttrs = {};
        this.filterPrice = '';
        this.fetchCategory();
        //$.closeModal(".popup");
        

    },
    clearFilterAttr: function(attr,val,$event){
        this.productList = [];
        this.count = 0;
        this.loading = false;
        this.isNoDisPlay = 0;
        if(attr == 'clearAll'){
            this.filterPrice = '';
            this.filterAttrs = {};
        }else if(attr == 'price'){
            this.filterPrice = '';
        }else{
            delete this.filterAttrs[attr];
            console.log("delete filter attr:"+ attr);
        }
        this.refine_by_info = [];
        $.closeModal(".popup-filter");
        this.fetchCategory();
    },
    changeFilterAttr: function(attr,val,selected,$event){
        $.closeModal(".popup-filter");
        this.productList = [];
        this.count = 0;
        this.loading = false;
        this.isNoDisPlay = 0;
        if(!selected){
            this.filterAttrs[attr] = val;
        }else{
            delete this.filterAttrs[attr];
        }
        this.refine_by_info = [];
        this.fetchCategory();
        
    },
    changeFilterPrice: function(priceColumn,selected,e){
        
        this.productList = [];
        this.count = 0;
        this.loading = false;
        this.isNoDisPlay = 0;
        if(!selected){
            this.filterPrice = priceColumn;
        }else{
            this.filterPrice = '';
        }
        this.refine_by_info = [];
        this.fetchCategory();
        $.closeModal(".popup-filter");
        console.log("priceColumn: " +priceColumn);
    },
    changeSort: function(sortColumn,e){
        //var currentElement = $(e.srcElement);
        //if (currentElement.hasClass("checked")) {
        //    currentElement.removeClass("checked");
        //} else {
        //    currentElement.addClass("checked");
        //}
        
        
        this.productList = [];
        this.count = 0;
        this.loading = false;
        this.isNoDisPlay = 0;
        this.sortColumn = sortColumn;
        //this.filterAttrs= {color:"red"};
        this.fetchCategory();
        $.closeModal(".popup-sort");
        console.log("sortColumn: " +sortColumn);
    },
    getCategoryInfo: function(){
        
    },
    fetchProduct() {
        if(this.count > 0){
            console.log("fetch product");
            this.loading = true;
            var self = this; 
            var category_id = this.$route.params.category_id;
            var filterAttrs = JSON.stringify(self.filterAttrs);
            $.showIndicator();
            $.ajax({
                url: self.getCategoryProductUrl,
                async: true,
                timeout: 120000,
                dataType: 'json', 
                type: 'get',
                headers: self.getRequestHeader(),
                //beforeSend: function(xhr){
                //    if(fecshop_uuid){
                //        xhr.setRequestHeader('fecshop_uuid', fecshop_uuid);
                //    }
                //},
                data:{ 
                    categoryId:category_id,
                    p: self.count + 1,
                    sortColumn: self.sortColumn,
                    filterAttrs: filterAttrs,
                    filterPrice: self.filterPrice
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 200){
                        console.log('fetch category product success');
                        var products = reponseData.data.products;
                        if(products.length > 0){
                            for(var x in products){
                                self.productList.push(products[x]);
                            }
                            self.loading = false;
                            $.init();
                            self.count++;
                        }else{
                            self.isNoDisPlay = 1;
                        }
                        
                        self.saveReponseHeader(request); 
                    }else{
                        self.isNoDisPlay = 1;
                    }
                    
                    
                    
                },
                error:function(){
                    $.hideIndicator();
                    self.isNoDisPlay = 1;
                    $.toast("system error");
                    console.log('get get Category info error');
                }
            });
        }
    },
    fetchCategory() {
        var self = this; 
        var category_id = this.$route.params.category_id;
        var filterAttrs = JSON.stringify(self.filterAttrs);
        $.showIndicator();
        $.ajax({
            url: self.getCategoryUrl,
            async: true,
            timeout: 120000,
            dataType: 'json', 
            type: 'get',
            headers: self.getRequestHeader(),
            data:{ 
                categoryId:category_id,
                sortColumn: self.sortColumn,
                filterAttrs: filterAttrs,
                filterPrice: self.filterPrice
            },
            success:function(reponseData, textStatus,request){
                $.hideIndicator();
                if(reponseData.code == 200){
                    console.log('fetch category success');
                    self.categoryInfo = reponseData.data;
                    if(reponseData.data.refine_by_info.length > 0){
                        self.refine_by_info = reponseData.data.refine_by_info;
                    }
                    if(reponseData.data.filter_category){
                        self.filter_category = reponseData.data.filter_category;
                    }
                    if(reponseData.data.filter_info){
                        self.filter_info = reponseData.data.filter_info;
                    }
                    if(reponseData.data.filter_price){
                        self.filter_price = reponseData.data.filter_price;
                    }
                    
                    if(reponseData.data.query_item){
                        self.query_sort = reponseData.data.query_item.frontSort;
                    }
                    var products = reponseData.data.products;
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
                    // category trace
                    
                    var traceData = {"category": self.categoryInfo.name_default_lang, "refer_url": self.refer_url};
                    var routerQ = self.$route.query
                    for (var k in routerQ) {
                        traceData[k] = routerQ[k]
                    }
                    self.reloadTraceJs(traceData); 
                    self.saveReponseHeader(request); 
                }else{
                    self.isNoDisPlay = 1;
                } 
                
            },
            error:function(){
                $.hideIndicator();
                $.toast("system error");
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