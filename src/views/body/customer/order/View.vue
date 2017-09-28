<template>
    <div class="content">
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/order"  class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                </router-link>
                <h1 class='title'>View Order</h1>
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
                                    <tr><td>Order# :</td><td>{{order.increment_id}}</td></tr>		
                                    <tr><td>Order Status:</td><td>{{order.order_status}}</td></tr>		
                                    <tr><td>Order Date:</td><td>{{order.created_at}}</td></tr>								
                                </tbody>
                            </table>
                            <div class="col2-set order-info-box">
                                <div class="col-1">
                                    <div class="box">
                                        <div class="box-title">
                                            <h5>Shipping Address:</h5>
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
                                            <h5>Shipping Method:</h5>
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
                                    <div class="box box-payment">
                                        <div class="box-title">
                                            <h5>Payment Method:</h5>
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
                                    Items Ordered:
                                </h5>

                                <table summary="Items Ordered" id="my-orders-table" class="data-table">
                                    <colgroup>
                                    <col width="1">
                                    <col width="1">
                                    <col width="1">
                                    <col width="1">
                                    </colgroup>
                                    <thead>
                                        <tr class="first last">
                                            <th>Product Image</th>
                                            <th>Product Info</th>
                                            <th class="a-center">Qty</th>
                                            <th class="a-right">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr class="subtotal first">
                                            <td class="a-right" colspan="3">Subtotal</td>
                                            <td class="last a-right">
                                                <span class="price">
                                                {{order.currency_symbol}}
                                                {{order.subtotal}}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr class="shipping">
                                            <td class="a-right" colspan="3">
                                                Shipping Cost
                                            </td>
                                            <td class="last a-right">
                                                <span class="price">
                                                    {{order.currency_symbol}}
                                                    {{order.shipping_total}}
                                                    
                                                </span>    
                                            </td>
                                        </tr>
                                        <tr class="discount">
                                            <td class="a-right" colspan="3">
                                                Discount</td>
                                            <td class="last a-right">
                                                <span class="price">
                                                    {{order.currency_symbol}}
                                                    -{{order.subtotal_with_discount ? order.subtotal_with_discount : 0}}
                                                    
                                                </span>    
                                            </td>
                                        </tr>
                                        <tr class="grand_total last">
                                            <td class="a-right" colspan="3">
                                                <strong>
                                                    Grand Total
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
            correctmsg:''
        }
    },
    created: function(){
        this.pageInit();
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
                success:function(data, textStatus,request){
                    if(data.code == 400 && data.status == "access token error"){
                        $.hideIndicator();
                        self.$router.push('/customer/account/login');
                        return;
                    }else if(data.code == 200){
                        self.order = data.order;
                        if(self.order.products.length > 0){
                            self.orderProducts = self.order.products;
                        }
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