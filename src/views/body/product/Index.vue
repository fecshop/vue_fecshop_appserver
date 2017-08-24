<template>
    <div class="content">
        <div class="product_page">
            <div class="product_view">
                <input type="hidden" class="product_view_id" value="{{product_id}}">
                <input type="hidden" class="sku" value="{{product.sku}}" />
                <input type="hidden" class="product_csrf" name="" value="" />
                
                <div class="media_img">
                    <div class="media_img_content">
                        <div class="swiper-container" data-space-between='10'>
                            <div class="swiper-wrapper">
                                <div v-for="(item, index) in thumbnail_img" class="swiper-slide">
                                    <img class="lazy" :src="item" alt="" style='width: 100%'>
                                </div>	
                               
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>
                </div>
                
                <div class="product_info">
                    <h1>{{product.name}}</h1>
                    <div>
                        <div class="rbc_cold">
                            <span>
                                <span class="average_rating">Average rating:</span>
                                <span class="review_star review_star_{{product.reviw_rate_star_average}}" style="font-weight:bold;" itemprop="average"></span>  
                                
                                <a external rel="nofollow" href="<?= Yii::$service->url->getUrl('catalog/reviewproduct/lists',['spu'=>$spu,'_id'=>$_id]); ?>">
                                    (<span itemprop="count">{{product.review_count}} reviews</span>)
                                </a>
                            </span>
                        </div>
                        <div class="clear"></div>
                        <div class="item_code">
                            Item Code:
                            <span class="item_sku">{{product.sku}}</span>
                        </div>
                        <div class="clear"></div>
                    </div>
                    
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
                    
                    <div class="product_info_section" id="product_info_section">
                        <div class="product_options" v-if="product.options">
                            <div class="pg" v-for="(item, index) in product.options">
                                <div class="label size-label">{{item.label}}</div>
                                    <div class="chose_size rg">
                                        <ul v-if="item.value">
                                            <template v-for="(l_item ,l_index) in item.value">
                                                
                                                <li v-if="l_item.show_as_img"  class="show_as_img" :class="l_item.active">
                                                    <a :class="l_item.active" @click="goToOtherProduct(l_item.url)" href="javascript:void(0)" :rel="l_item.url">
                                                        <span>
                                                            <img :src="l_item.show_as_img" />
                                                        </span>
                                                    </a>
                                                    <b></b>
                                                </li>
                                                
                                                <li v-else :class="l_item.active">
                                                    <a :class="l_item.active" @click="goToOtherProduct(l_item.url)" href="javascript:void(0)" :rel="l_item.url"><span>{{l_item.attr_val}}</span></a>
                                                    <b></b>
                                                </li>
                                            </template>
                                        </ul>
                                        <div class="clear"></div>
                                    </div>
                                    <div class="clear"></div>
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
    components:{},
    data () {
        return {
            product_id: '',
            thumbnail_img:[],
            product: {},
            getProductUrl: root + '/catalog/product/index' 
        }
    },
    created: function(){
        this.fetchProduct();
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'loadNewProduct',
    
    },
    mounted: function(){
    
    },
    methods:{
        goToOtherProduct: function(url){
            if(url){
                console.log(url);
                this.$router.push(url);
            }
        },
        loadNewProduct() {
            this.fetchProduct();
        },
        fetchProduct() {
            self = this;
            var product_id = this.$route.params.product_id;
            this.product_id = product_id;
            $.showIndicator();
            $.ajax({
                url: self.getProductUrl,
                async: true,
                timeout: 8000,
                dataType: 'json', 
                type: 'get',
                headers: self.getRequestHeader(),
                
                data:{ 
                    product_id:product_id
                },
                success:function(data, textStatus,request){
                    if(data.code == 200){
                        console.log('fetch product success');
                        var product = data.content.product;
                        self.product = product;
                        self.thumbnail_img = product.thumbnail_img;
                        console.log(product.name);
                        self.saveReponseHeader(request); 
                        // 上面ajax获取值渲染产品图片的html代码，然后需要sui渲染一次
                        // 必须等待vue渲染完成，sui才能渲染，因此加了1.2秒的延迟。
                        setTimeout("$.init();",1200);
                    }
                    
                    $.hideIndicator();
                },
                error:function(){
                    $.hideIndicator();
                    console.log('get get Product info error');
                }
            });
        },
    }
}
$(document).ready(function(){
    $.init();
});
</script>