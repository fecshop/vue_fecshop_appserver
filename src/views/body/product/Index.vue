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
                            {{productSpecialPrice}}
                        </div>
                        <div  class="price special_active">
                            {{product.price_info.price.symbol}}
                            {{productPrice}}
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
                        
                        <div class="product_custom_options">
                            <div class="product_options">
                                <input type="hidden" value="" class="product_custom_options"    />
                                <template v-for="(c_item ,attr) in custom_option_attr">
                                    <div class="pg">
                                        <div class="label">
                                            {{attr}}
                                        </div>
                                        
                                        <div :class="'chose_'+attr+' rg '+attr" >
                                            <ul  class="no_chosen_ul " :attr="attr">
                                                <template v-for="(o_item ,o_index) in c_item">
                                                    <li id="gal1" v-if="o_item.image" :class="o_item.status">
                                                        <a @click="selectCustomOption(attr,o_item.key)"  :attr="attr" :class="o_item.class + ' imgshow ' "  :value="o_item.key">
                                                            <img  class="lazy" :src="o_item.image" /></a>
                                                        <b></b>
                                                    </li>
                                                    
                                                    <li :class="o_item.status" v-else >
                                                        <a @click="selectCustomOption(attr,o_item.key)" :attr="attr" :class="o_item.class + ' noimgshow ' "  :value="o_item.key">
                                                            {{o_item.label}}
                                                        </a>
                                                        <b></b>
                                                    </li>
                                                </template>
                                            </ul>
                                        </div>	
                                        <div class="clear"></div>
                                    </div>
                                </template>
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
            
            custom_option:[],                   // 产品的custom_option属性，传递过来的custom option，img和price都已经处理。
            custom_option_attr:{},              // 处理后的 custom_option 数组，这个数组用于生成显示
            custom_option_show_as_img:'',       // 那个属性 当做图片显示
            custom_option_selected_attr:{},     // 选中的属性，以及对应的值
            custom_option_active_attr:{},       // active的属性，以及对应的值（active代表有相应的库存）
            custom_option_all_select:0,         // 当把所有的custom option选择完成后(譬如颜色尺码都选择完成)，这个值将会被设置成1。
            custom_option_add_price:0,          // 当把所有的custom option选择完成后，这个custom option 附加或减少的价格值，这个值用来计算这个custom option对应的最终价格
            custom_option_selected_sku:'',      // 当把所有的custom option选择完成后，这个将会设置当前选择的custom option sku。
            getProductUrl: root + '/catalog/product/index' 
        }
    },
    computed: {
        productSpecialPrice: function(){
            if(this.product.price_info && this.product.price_info.special_price){
                var specialPrice = this.product.price_info.special_price.value; 
                return specialPrice + this.custom_option_add_price;
            }
        },
        productPrice: function(){
            if(this.product.price_info && this.product.price_info.price){
                var price = this.product.price_info.price.value; 
                return price + this.custom_option_add_price;
            }
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
        isActiveSelectCustomOption(selectAttr,selectVal){
            var selected_attr = this.custom_option_selected_attr;
            selected_attr[selectAttr] = selectVal;
            if(this.custom_option){
                for(var x in this.custom_option){
                    if(x){
                        var active = 1;
                        var option = this.custom_option[x];
                        for(var attr in selected_attr){
                            var val = selected_attr[attr];
                            if(option[attr] != val){
                                active = 0;
                                break;
                            }
                        }
                        if(active == 1){
                            return true;
                        }
                    }
                }
            }
            return false;
        },
        selectCustomOption: function(selectAttr,selectVal){
            console.log('selectAttr:'+selectAttr);
            console.log('selectVal:'+selectVal);
            if(!this.isActiveSelectCustomOption(selectAttr,selectVal)){
                return;
            }
            this.custom_option_selected_attr[selectAttr] = selectVal;
            console.log(this.custom_option_selected_attr);
            var active_attr = {};
            var other_tj = {};
            var select_attr = [];
            for(var attr1 in this.custom_option_selected_attr){
                var tj = {};
                select_attr.push(attr1);
                var val1 = this.custom_option_selected_attr[attr1];
                other_tj[attr1] = val1;
                for(var attr2 in this.custom_option_selected_attr){
                    var val2 = this.custom_option_selected_attr[attr2];
                    if(val1 != val2){
                        tj[attr2] = val2;
                    }
                }
                // tj 就是除去本元素，其他选中的属性的 k v 对象。
                // 下面 得到本属性中active的值有哪些
                console.log("attr1:"+attr1);
                console.log(tj);
                active_attr[attr1] = this.getActiveCustomOption(tj,attr1);
            }
            for(var attr in this.custom_option_attr){
                console.log('***********');
                console.log(attr);
                console.log(other_tj);
                if(select_attr.indexOf(attr) == -1){
                    active_attr[attr] = this.getActiveCustomOption(other_tj,attr);
                }
            }
            this.custom_option_active_attr = active_attr;
            console.log('%%%%%%%%%%%%%%%');
            console.log(active_attr);
            this.reflushCustomOption();
        },
        getActiveCustomOption: function(tj,attr1){
            var activeArr = [];
            var custom_option = this.custom_option;
            // 判断tj 是否为空对象
            if(JSON.stringify(tj) != '{}'){
                console.log('tj is not empty');
                
                for(var x in custom_option){
                    if(x){
                        var option = custom_option[x];
                        var c = 1;
                        for(var tj_attr in tj){
                            var tj_val = tj[tj_attr];
                            if(option[tj_attr] != tj_val){
                                console.log('###### '+tj_attr);
                                c = 0;
                                break;
                            }
                        }
                        if(c){
                            console.log('###### if c');
                            if(activeArr.indexOf(option[attr1]) == -1){
                                activeArr.push(option[attr1]);
                            }
                        }
                    }
                }
            }else{
                console.log('tj is empty');
                for(var x in custom_option){
                    if(x){
                        var option = custom_option[x];
                       
                        if(activeArr.indexOf(option[attr1]) == -1){
                            activeArr.push(option[attr1]);
                        }
                    }
                }
            }
            return activeArr;
        },
        reflushCustomOption() {
            this.getCustomOptionAttr();
            
        
        },
        getCustomOptionAttr: function(){
            var noAttrArr = ['price','qty','sku','image'];
            var co_arr = {};
            var custom_option = this.custom_option;
            if(custom_option){
                for(var x in custom_option){
                    if(x){
                        var option = custom_option[x];
                        if(option){
                            for(var attr in option){
                                if(attr && (noAttrArr.indexOf(attr) <= -1)){
                                    var value = option[attr];
                                    var kv = {
                                        key:value,
                                        label:value
                                    };
                                    // 状态
                                    kv.status = "";  //no_active
                                    kv.class = "";
                                    if(this.custom_option_selected_attr[attr] == value ){
                                        kv.status = " current ";
                                        kv.class += " current ";
                                    }
                                    var co_active = this.custom_option_active_attr[attr];
                                    if(!co_active){
                                        kv.class += " active_v ";
                                    }else{
                                        if(co_active.indexOf(value) > -1  ){
                                            kv.class += " active_v ";
                                        }else{
                                            kv.class += " no_active ";
                                        }
                                    }
                                    //this.custom_option_selected_attr:{},       // 选中的属性，以及对应的值
                                    //this.custom_option_active_attr:{},   
                                    
                                    if(attr == this.custom_option_show_as_img){
                                        kv.image = option.image;
                                    }
                                    if(co_arr[attr]){
                                        var hasIt = 0;
                                        for(var y in co_arr[attr]){
                                            var one = co_arr[attr][y];
                                            var key = one.key;
                                            if(key == value){
                                                hasIt = 1;
                                                break;
                                            }
                                        }
                                        if(hasIt == 0){
                                            co_arr[attr].push(kv);
                                        }
                                    }else{
                                        co_arr[attr] = [kv];
                                    }
                                }
                            }
                        }
                    }
                }
                var all_select = 1;
                for(attr in co_arr){
                    if(!this.custom_option_selected_attr[attr]){
                        all_select = 0;
                        break;
                    }
                }
                this.custom_option_all_select = all_select;
                console.log('^^^^^^^^^^^^^^:'+all_select);
                this.custom_option_attr = co_arr;
                this.reflushPricce();
                console.log(this.custom_option_attr);
                console.log('66666666');
            }
            
        },
        reflushPricce: function(){
            var selected_attr = this.custom_option_selected_attr;
            var custom_option = this.custom_option;
            if(this.custom_option_all_select && selected_attr && custom_option){
                
                for(var x in custom_option){
                    if(x){
                        var option = custom_option[x];
                        var same = 1;
                        for(var attr in selected_attr){
                            var val = selected_attr[attr];
                            if(option[attr] != val){
                                same = 0;
                            }
                        }
                        if(same == 1){
                            this.custom_option_add_price = option['price'];
                            this.custom_option_selected_sku = option['sku'];
                            console.log('^^^^^^^^priceee:'+this.custom_option_add_price);
                            console.log('^^^^^^^^skuuuuu:'+this.custom_option_selected_sku);
                            return;
                        }
                    }
                }   
            }
        },
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
                        self.custom_option = product.custom_option;
                        self.thumbnail_img = product.thumbnail_img;
                        self.custom_option_show_as_img = product.custom_option_showImg_attr;
                        self.reflushCustomOption();
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