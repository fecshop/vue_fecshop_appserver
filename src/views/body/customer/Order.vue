<template>
    <div class="content">
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/account/index"  class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                </router-link>
                <h1 class='title'>Customer Order</h1>
            </div>
        </div>
        <div class="fecshop_message" v-if="errormsg">
            <div class="error-msg">
                <div>
                    {{errormsg}}
                </div>
            </div>
		</div>
        
        <div class="order_list">
            <div class="col-main account_center">
                <div class="std">
                    <div style="margin:4px 0 0">
                        
                        <table id="my-orders-table" class="edit_order">
                            <thead>
                                <tr class="first last">
                                    <th>Order #</th>
                                    <th>Date</th>
                                    <th>operate</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr  v-for="(item,index) in orderList"  class="first odd">
                                    <td>
                                        <b>{{item.increment_id}}</b><br/>
                                        <span :class="'order-status '+ item.order_status">{{item.order_status}}</span>
                                    </td>
                                    <td>
                                        <span class="nobr">{{item.created_at}}</span>
                                    </td>
                                    <td class="a-center last">
                                        <span class="nobr"><a @click="viewOrder(item.order_id)"  href="javascript:void(0)">View Order</a>
                                        <span class="separator">|</span> <a @click="reorder(item.order_id)" class="link-reorder" href="javascript:void(0)" >Reorder</a>
                                        </span>
                                    </td>
                                </tr>
                            
                            </tbody>
                        </table>
                       
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
            pageInitUrl: root + '/customer/order/index' ,
            errormsg:'',
            orderList:[],
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
                        self.orderList = data.orderList;
                        console.log('get customer order info success');
                        self.saveReponseHeader(request); 
                    }
                    $.hideIndicator();
                },
                error:function(){
                    $.hideIndicator();
                    console.log('get customer order info error');
                }
            });
        },
        viewOrder :function(order_id){
            var self = this;
            self.$router.push('/customer/order/view/'+order_id);
        },
        reorder :function(order_id){
            var self = this;
        }
        
    }
    
    
    
}
</script>