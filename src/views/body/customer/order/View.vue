<template>
    <div class="content">
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/order"  class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                </router-link>
                <h1 class='title'>
                    {{ $t("message.customer_order") }}
                </h1>
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
                    <div style="margin:2px 0 0">
                        <div class="my_account_order">
                            <table class="page-title title-buttons">
                                <tbody>
                                    <tr><td>{{ $t("message.order_increment_id") }} :</td><td>{{order.increment_id}}</td></tr>		
                                    <tr><td>{{ $t("message.order_status") }}:</td><td>{{order.order_status}}</td></tr>		
                                    <tr><td>{{ $t("message.order_date") }}:</td><td>{{order.created_at}}</td></tr>								
                                </tbody>
                            </table>
                            <div class="col2-set order-info-box">
                                <div class="col-1">
                                    <div class="box">
                                        <div class="box-title">
                                            <h5>
                                                {{ $t("message.shipping_address") }}:
                                            </h5>
                                        </div>
                                        <div class="box-content">
                                            <table>
                                                <tbody>
                                                    <tr><td>{{order.customer_firstname}} {{order.customer_lastname}}</td></tr>	
                                                    <tr><td>{{order.customer_address_street1}}<br>{{order.customer_address_street2}}</td></tr>	
                                                    <tr><td>{{order.customer_address_city}},{{order.customer_address_state_name}},{{order.customer_address_country_name}}</td></tr>	
                                                    <tr><td>T:{{order.customer_telephone}}</td></tr>	

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="box">
                                        <div class="box-title">
                                            <h5>
                                                {{ $t("message.shipping_method") }}:
                                            </h5>
                                        </div>
                                        <div class="box-content">
                                            <table>
                                                <tbody>
                                                    <tr><td>{{order.shipping_method}}</td></tr>  
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>				
                                </div>
                                
                                <div class="col-2">
                                    <div class="box">
                                        <div class="box-title">
                                            <h5>
                                                {{ $t("message.tracking_number") }}:
                                            </h5>
                                        </div>
                                        <div class="box-content">
                                            <table>
                                                <tbody>
                                                    <tr><td>{{order.tracking_number ? order.tracking_number : 'null'}}</td></tr>  
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>				
                                </div>
                                
                                <div class="col-2">
                                    <div class="box box-payment">
                                        <div class="box-title">
                                            <h5>
                                                {{ $t("message.payment_method") }}:
                                            </h5>
                                        </div>
                                        <div class="box-content">
                                            <table>
                                                <tbody>
                                                    <tr><td>{{order.payment_method}}</td></tr>  
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>			
                                </div>
                            </div>
                            
                            <div class="order-items order-details box-title">
                                <h5 class="table-caption">
                                    {{ $t("message.items_ordered") }}:
                                </h5>

                                <table summary="Items Ordered" id="my-orders-table" class="data-table">
                                    <colgroup>
                                        <col width="1">
                                        <col width="1">
                                        <col width="1">
                                        <col width="1">
                                        <col width="1">
                                    </colgroup>
                                    <thead>
                                        <tr class="first last">
                                            <th>{{ $t("message.product_image") }}</th>
                                            <th>{{ $t("message.product_info") }}</th>
                                            <th class="a-center">{{ $t("message.qty") }}</th>
                                            <th class="a-center">{{ $t("message.review") }}</th>
                                            <th class="a-right">{{ $t("message.subtotal") }}</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr class="subtotal first">
                                            <td class="a-right" colspan="4">{{ $t("message.subtotal") }}</td>
                                            <td class="last a-right">
                                                <span class="price">
                                                {{order.currency_symbol}}
                                                {{order.subtotal}}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr class="shipping">
                                            <td class="a-right" colspan="4">
                                                {{ $t("message.shipping_cost") }}
                                            </td>
                                            <td class="last a-right">
                                                <span class="price">
                                                    {{order.currency_symbol}}
                                                    {{order.shipping_total}}
                                                    
                                                </span>    
                                            </td>
                                        </tr>
                                        <tr class="discount">
                                            <td class="a-right" colspan="4">
                                                {{ $t("message.discount") }}
                                            </td>
                                            <td class="last a-right">
                                                <span class="price">
                                                    {{order.currency_symbol}}
                                                    -{{order.subtotal_with_discount ? order.subtotal_with_discount : 0}}
                                                    
                                                </span>    
                                            </td>
                                        </tr>
                                        <tr class="grand_total last">
                                            <td class="a-right" colspan="4">
                                                <strong>
                                                    {{ $t("message.grand_total") }}
                                                </strong>
                                            </td>
                                            <td class="last a-right">
                                                <strong>
                                                    <span class="price">
                                                        {{order.currency_symbol}}
                                                        {{order.grand_total}}
                                                    
                                                    </span>
                                                </strong>
                                            </td>
                                        </tr>
                                    </tfoot>
                                    <tbody class="odd">
                                    
                                        <tr v-for="(itemProduct,index) in orderProducts" id="order-item-row" class="border first">	
                                            <td>
                                                <router-link :to="'/catalog/product/' + itemProduct.product_id"  >
                                                    <img :src="itemProduct.imgUrl" :alt="itemProduct.name"  width="75" height="75"  />
                                                </router-link>
                                            </td>
                                            <td>
                                                <div>sku:{{itemProduct.sku}}</div>
                                                <div v-if="itemProduct.custom_option_info.length > 0">
                                                    <div v-for="(val,label) in itemProduct.custom_option_info">
                                                        {{label}}:{{val}}
                                                    
                                                    </div>
                                                </div>
                                                
                                                <dl class="item-options">
                                                </dl>
                                            </td>
                                            
                                            <td class="a-right">
                                                <span class="nobr" ><strong>{{itemProduct.qty}}</strong><br>
                                                </span>
                                            </td>
                                            <td class="a-center">
                                                <router-link :to="'/product/review/add/' + itemProduct.product_id"  >
                                                    <span style="font-size:1em">
                                                        Review 
                                                        <br>
                                                    </span>
                                                </router-link>
                                            </td>
                                            <td class="a-right last">
                                                <span class="price-excl-tax">
                                                    <span class="cart-price">
                                                        <span class="price">{{order.currency_symbol}}{{itemProduct.row_total}}</span>                    
                                                    </span>
                                                </span>
                                                <br>
                                            </td>
                                        </tr>
                                    </tbody>								   
                                </table>
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
            pageInitUrl: root + '/customer/order/view' ,
            errormsg:'',
            order:[],
            orderProducts:[],
            refer_url: '',
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
        pageInit: function(){
            var self = this;
            var order_id = this.$route.params.order_id;
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
                    order_id:order_id
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 1100003){
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(reponseData.code == 200){
                        self.order = reponseData.data.order;
                        if(self.order.products.length > 0){
                            self.orderProducts = self.order.products;
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
                    $.hideIndicator();
                    $.toast('system error');
                    console.log('get customer order info error');
                }
            });
        }  
    }
}
</script>