<template>
    <div class="content">
        <div class="product_page">
            <div class="product_view">
                <input type="hidden" class="product_view_id"  :value="product_id">
                <input type="hidden" class="sku" :value="product.sku" />
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
                                <span class="average_rating">{{ $t("message.average_rating") }}:</span>
                                <span :class="'review_star review_star_'+ Math.round(product.reviw_rate_star_average)" style="font-weight:bold;" itemprop="average"></span>  
                                
                                <a external rel="nofollow" href="<?= Yii::$service->url->getUrl('catalog/reviewproduct/lists',['spu'=>$spu,'_id'=>$_id]); ?>">
                                    (<span itemprop="count">{{product.review_count}} {{ $t("message.reviews") }}</span>)
                                </a>
                            </span>
                        </div>
                        <div class="clear"></div>
                        <div class="item_code">
                            {{ $t("message.item_code") }}:
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
                        
                        <div class="product_qty pg">
                            <div class="label">{{ $t("message.qty") }}:</div>
                            <div class="rg">
                                <select v-model="product_select_qty" name="qty" class="qty">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                </select>
                                  
                                <span v-if="product.package_number">
                                    X {{product.package_number}} items
                                </span>
                            </div>
                            <div class="clear"></div>
                        </div>
                        
                        <div class="fecshop_message" v-if="errormsg">
                            <div class="error-msg">
                                <div>
                                    {{errormsg}}
                                </div>
                            </div>
                        </div>
                        
                        <div v-if="tier_price.length" class="tier_price_info">
                            
                            <div class="label">{{ $t("message.wholesale_prices") }}</div>
                            <table>
                                <template v-for="(t_item ,t_index) in tier_price">
                                    <tr>
                                        <td v-for="(t_item_one ,t_index_one) in t_item">
                                            {{t_item_one}}
                                        </td>
                                    </tr>
                                </template>
                            </table>
                        </div>
                        <div class="addtocart">
                            <a @click="addProductToCart()" external href="javascript:void(0)" id="js_registBtn" class="button button-fill button-success redBtn addProductToCart">
                                <em>
                                    <span>
                                        <i></i>
                                        {{ $t("message.add_to_cart") }}
                                    </span>
                                </em>
                            </a>
                            
                            <a @click="addProductFavorite()"   external href="javascript:void(0)" id="js_registBtn" class="button button-fill button-success redBtn addProductToFavo">
                                <em>
                                    <span>
                                        <i></i>
                                        {{ $t("message.add_to_favorites") }}
                                    </span>
                                </em>
                            </a>
                            
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="clear"></div>
            <div class="product_description_info">
                <div class="buttons-tab">
                    <a href="#tab1" class="tab-link active button">{{ $t("message.description") }}</a>
                    <a href="#tab2" class="tab-link button">{{ $t("message.reviews") }}</a>
                    <a href="#tab3" class="tab-link button">{{ $t("message.shipping_payment") }}</a>
                </div>
                <div class="content-block">
                    <div class="tabs">
                      <div id="tab1" class="tab active">
                        <div class="content-block">
                            <div class="text-description" style="">
                                <table>
                                    <tr v-for="(t_item ,t_index) in product.groupAttrArr">
                                        <td>{{t_index}}</td>
                                        <td>{{t_item}}</td>
                                    </tr>
                                </table>
                                <br/>
                                <div v-html="product.description" >
                                </div>
                                
                                <div v-if="image_detail.length" class="img-section">
                                    <template v-for="(t_item ,t_index) in image_detail">
                                        <br/>
                                        <img class="lazy" :src="t_item" />
                                    </template>   
                                </div>
                            </div>  
                        </div>
                      </div>
                      <div id="tab2" class="tab">
                        <div class="content-block">
                            <div class="text-reviews" id="text-reviews" style="">
                                <div class="product-Reviews">
                                    <div id="pic_list_2" class="scroll_horizontal">
                                        <div class="clear"></div>
                                        <div class="box pro_commit">
                                            
                                            
                                            <div class="averageWarp">
                                                <span class="lineBlock fon14">{{ $t("message.average_rating") }}: </span>
                                                <a  lehref="#" :class="'review_star review_star_'+ Math.round(product.reviw_rate_star_average)" onclick="javascript:return false;"></a>
                                                <b class="lineBlock fon18">{{product.reviw_rate_star_average}}</b>
                                            </div>
                                            <div class="clear"></div>
                                            <div class="lbBox writeRiviewTitle">
                                                <ul class="lineBlock proportionStars">
                                                    <li class="lbBox">
                                                        <span class="lineBlock fz_blue">{{ $t("message.stars_5") }}</span>
                                                        <div class="lineBlock proportionBox">
                                                            <div :style="'width: '+ reviw_rate_star_info.star_5 + '%'"> </div>
                                                        </div>
                                                        <span class="lineBlock">{{reviw_rate_star_info.star_5}}%</span>
                                                    </li>
                                                    <li class="lbBox">
                                                        <span class="lineBlock fz_blue">{{ $t("message.stars_4") }}</span>
                                                        <div class="lineBlock proportionBox">
                                                            <div :style="'width: '+ reviw_rate_star_info.star_4 + '%'"> </div>
                                                        </div>
                                                        <span class="lineBlock">{{reviw_rate_star_info.star_4}}%</span>
                                                    </li>
                                                    <li class="lbBox">
                                                        <span class="lineBlock fz_blue">{{ $t("message.stars_3") }}</span>
                                                        <div class="lineBlock proportionBox">
                                                            <div :style="'width: '+ reviw_rate_star_info.star_3 + '%'"> </div>
                                                        </div>
                                                        <span class="lineBlock">{{reviw_rate_star_info.star_3}}%</span>				
                                                    </li>
                                                    <li class="lbBox">
                                                        <span class="lineBlock fz_blue">{{ $t("message.stars_2") }}</span>
                                                        <div class="lineBlock proportionBox">
                                                            <div :style="'width: '+ reviw_rate_star_info.star_2 + '%'"> </div>
                                                        </div>
                                                        <span class="lineBlock">{{reviw_rate_star_info.star_2}}%</span>
                                                    </li>
                                                    <li class="lbBox">
                                                        <span class="lineBlock fz_blue">{{ $t("message.stars_1") }}</span>
                                                        <div class="lineBlock proportionBox">
                                                            <div :style="'width: '+ reviw_rate_star_info.star_1 + '%'"> </div>
                                                        </div>
                                                        <span class="lineBlock">{{reviw_rate_star_info.star_1}}%</span>
                                                    </li>
                                                </ul>
                                                <p class="buttons-row">
                                                    <router-link :to="'/product/review/add/' + product_id"  class="button button-round">
                                                        {{ $t("message.add_review") }}
                                                    </router-link>
                                                    
                                                    <router-link :to="'/product/review/lists/' + product_id"  class="button button-round">
                                                        {{ $t("message.view_all_review") }}({{product.review_count}}) 
                                                    </router-link>
                                                </p>
                                            </div>
                                            
                                            
                                        
                                            <div v-if="productReview && productReview.coll" class="product-Reviews_top">
                                                <template  v-for="(item_one ,t_index) in productReview.coll">     
                                                    <div class="card">
                                                        <div class="fec-card-header">
                                                            {{item_one.summary}}
                                                        </div>
                                                        <div class="fec-card-content">
                                                            <div class="fec-card-content-inner">
                                                                <div class="review-content">
                                                                    {{item_one.review_content}}
                                                                </div>
                                                                <div class="moderation">
                                                                    
                                                                    <div v-if="item_one.status == 10 ">
                                                                        Your Review is awaiting moderation...
                                                                    </div>
                                                                    
                                                                    <div v-if="item_one.status == 2 ">
                                                                        Your Review is refused...
                                                                    </div>
                                                                </div>
                                                                <div class="review_list_remark">
                                                                    <p>By{{item_one.name}}</p>
                                                                    <span>{{item_one.review_date}}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="fec-card-footer">
                                                            <a href="#" :class=" 'review_star review_star_'+ item_one.rate_star" onclick="javascript:return false;"></a>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                            <div class="clear"></div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                      </div>
                      <div id="tab3" class="tab">
                        <div class="content-block">
                            <div class="text-questions" style="">
                                <div class="scroll_left">
                                    <a href="">Payment Methods:</a>
                                </div>
                                <p>FECSHOP.com accepts PayPal, Credit Card, Western Union and Wire Transfer as secure payment methods:</p>

                                <p>Global:</p>

                                <p>1. PayPal</p>

                                <p><img alt="" height="96" src="//img.appfront.fancyecommerce.com/images/paypal48.jpg" width="300"></p>

                                <p>1) Login To Your Account or use Credit Card Express.'); ?><br>
                                2) Enter your Card Details, the order will be shipped to your PayPal address. And click "Submit".'); ?><br>
                                3) Your Payment will be processed and a receipt will be sent to your email inbox.</p>

                                <p>2. Credit Card</p>

                                <p><img alt="" height="40" src="//img.appfront.fancyecommerce.com/images/creditcard48.jpg" width="554"></p>

                                <p>	1) Choose your shipping address OR create a new one.'); ?><br>
                                    2) Enter your Card Details and click "Submit".'); ?><br>
                                    3) Your Payment will be processed and a receipt will be sent to your email inbox.
                                </p>
                            </div>  
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            <div class="buy_also_buy_cer">
                <div class="buy_also_buy" v-if="buy_also_buy" >
                    <div class="scroll_left">
                        <a href="">{{ $t("message.customer_who_also_bought") }}</a>
                    </div>
                    <div class="scrollBox">	
                        <div class="viewport" style="overflow: hidden; position: relative;">
                            <div id="owl-buy-also-buy" class="owl-carousel">	
                                <v-product :productList="buy_also_buy"></v-product>	
                                
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import showProduct from '../home/body/Product.vue'
var root = process.env.API_ROOT;

export default {
    components: {
        'v-product': showProduct
    },
    data () {
        return {
            product_select_qty:1,
            product_id: '',
            thumbnail_img:[],
            product: {},
            reviw_rate_star_info:{},
            errormsg:'',
            productReview:[],
            tier_price:[],
            buy_also_buy:[],
            image_detail:[],
            custom_option:[],                   // 产品的custom_option属性，传递过来的custom option，img和price都已经处理。
            custom_option_attr:{},              // 处理后的 custom_option 数组，这个数组用于生成显示
            custom_option_show_as_img:'',       // 那个属性 当做图片显示
            custom_option_selected_attr:{},     // 选中的属性，以及对应的值
            custom_option_active_attr:{},       // active的属性，以及对应的值（active代表有相应的库存）
            custom_option_all_select:0,         // 当把所有的custom option选择完成后(譬如颜色尺码都选择完成)，这个值将会被设置成1。
            custom_option_add_price:0,          // 当把所有的custom option选择完成后，这个custom option 附加或减少的价格值，这个值用来计算这个custom option对应的最终价格
            custom_option_selected_sku:'',      // 当把所有的custom option选择完成后，这个将会设置当前选择的custom option sku。
            getProductUrl: root + '/catalog/product/index' ,
            addProductToCartUrl: root + '/checkout/cart/add',
            addProductFavoriteUrl: root + '/catalog/product/favorite',
            refer_url: ''
            
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
        isActiveSelectCustomOption(selectAttr,selectVal){
            // var selected_attr = this.custom_option_selected_attr;
            // selected_attr[selectAttr] = selectVal;
            var selected_attr = Object.assign({}, this.custom_option_selected_attr)
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
            if(!this.isActiveSelectCustomOption(selectAttr,selectVal)){
                return;
            }
            console.log(this.custom_option_selected_attr);
            if (this.custom_option_selected_attr[selectAttr] == selectVal) {
                delete this.custom_option_selected_attr[selectAttr];
            } else {
                this.custom_option_selected_attr[selectAttr] = selectVal;
            }
            console.log('selectAttr:'+selectAttr);
            console.log('selectVal:'+selectVal);
            // this.custom_option_selected_attr[selectAttr] = selectVal;
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
        addProductFavorite: function(){
            console.log('favorite product');
            self = this;
            var product_id = self.product._id;
            $.showIndicator();
            $.ajax({
                async:true,
                timeout: 120000,
                dataType: 'json', 
                type:'get',
                data: { 
                    product_id:product_id
                },
                headers: self.getRequestHeader(),
                url:self.addProductFavoriteUrl,
                success:function(reponseData, textStatus,request){ 
                    $.hideIndicator();
                    console.log('favorite product success');
                    //var content = reponseData.content;
                    if(reponseData.code == 200){
                        $.toast("Favorite Success");
                    }else if(reponseData.code == 1100003){
                        // $.toast("You must login your account before favorite product");
                        // 用户登录成功后，从这里取出来，进行跳转
                        self.setLoginSuccessRedirectUrl('/catalog/product/'+product_id);
                        self.$router.push('/customer/account/login');
                    }else{
                        $.toast("Favorite Fail");
                    }
                    self.saveReponseHeader(request); 
                    
                },
                error:function (XMLHttpRequest, textStatus, errorThrown){
                    $.hideIndicator();
                    console.log('Favorite Fail');
                    $.toast("system error");
                }
            });
            
        },
        addProductToCart: function(){
            self = this;
            self.errormsg = '';
            console.log('addProductToCart');
            var selected_attr = self.custom_option_selected_attr;
            var custom_option = self.custom_option;
            if(custom_option){
                if(!self.custom_option_all_select){
                    console.log('you must chose your custom option');
                    for(var attr in self.custom_option_attr){
                        console.log(selected_attr[attr]);
                        if(!selected_attr[attr]){
                            alert('you must chosen '+attr);
                            return;
                        }
                
                    }
                }
            }
            // selected_attr
            var sku = self.product.sku;
            var qty = self.product_select_qty;
            console.log('sku:' + sku);
            console.log('qty:' + qty);
            console.log(selected_attr);
            console.log(self.product._id);
            var custom_option_json = JSON.stringify(selected_attr);
            var sendData = {};
            sendData['custom_option'] 	= custom_option_json;
            sendData['product_id'] 	= self.product._id;
            sendData['qty'] 			= qty;
            $.showIndicator();
            var cookies = self.getTraceAllCookie();
            sendData['cookies'] =  cookies
            $.ajax({
                async:true,
                timeout: 120000,
                dataType: 'json', 
                type:'post',
                data: sendData,
                headers: self.getRequestHeader(),
                url:self.addProductToCartUrl,
                success:function(reponseData, textStatus,request){ 
                    $.hideIndicator();
                    var data = reponseData.data;
                    if(reponseData.code == 200){
                        console.log('add to cart success');
                        self.$router.push('/checkout/cart');
                    }else if(reponseData.code == 1400001){
                        $.toast("Add product to cart fail");
                        ////////reponseData.data
                        self.errormsg = reponseData.data;
                        console.log('Add product to cart fail');
                    }else if(reponseData.code == 1400002){
                        $.toast("Add product to cart fail");
                        console.log(reponseData.message);
                    }else{
                        $.toast("Add product to cart fail");
                    }
                    self.saveReponseHeader(request); 
                    
                },
                error:function (XMLHttpRequest, textStatus, errorThrown){
                    $.toast("system error");
                    console.log('add to cart error');
                    $.hideIndicator();
                }
            });
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
                timeout: 120000,
                dataType: 'json', 
                type: 'get',
                headers: self.getRequestHeader(),
                
                data:{ 
                    product_id:product_id
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 200){
                        console.log('fetch product success');
                        var product = reponseData.data.product;
                        self.product = product;
                        self.reviw_rate_star_info = self.product.reviw_rate_star_info;
                        self.tier_price = product.tier_price;
                        self.buy_also_buy = product.buy_also_buy;
                        
                        self.image_detail = product.image_detail;
                        self.productReview = product.productReview;
                        
                        self.custom_option = product.custom_option;
                        self.thumbnail_img = product.thumbnail_img;
                        self.custom_option_show_as_img = product.custom_option_showImg_attr;
                        self.reflushCustomOption();
                        console.log(product.name);
                        self.saveReponseHeader(request); 
                        // sku trace
                        var traceData = {"sku": product.sku, "refer_url": self.refer_url};
                        var routerQ = self.$route.query
                        for (var k in routerQ) {
                            traceData[k] = routerQ[k]
                        }
                        self.reloadTraceJs(traceData); 
                        // 上面ajax获取值渲染产品图片的html代码，然后需要sui渲染一次
                        // 必须等待vue渲染完成，sui才能渲染，因此加了0.8秒的延迟。
                        setTimeout("$.init();",800);
                    }else if (reponseData.code == 1300001){
                        $.toast("Product is off the shelf");
                    }else{
                        $.toast("Get product info error");
                    }
                    
                },
                error:function(){
                    $.toast("system error");
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