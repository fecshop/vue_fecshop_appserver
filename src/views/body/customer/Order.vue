<template>
    <div class="content" ref="scrollContainer">
        <div class="account-ds">
            <div class="bar bar-nav account-top-m">
                <router-link to="/customer/account/index"  class="button button-link button-nav pull-left">
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
        <div class="order_list">
            <div class="col-main account_center">
                <div class="std">
                    <div style="margin:4px 0 0">
                        <table id="my-orders-table" class="edit_order">
                            <thead>
                                <tr class="first last">
                                    <th>{{ $t("message.order_increment_id") }}</th>
                                    <th>{{ $t("message.date") }}</th>
                                    <th>{{ $t("message.operate") }}</th>
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
                                        <span class="nobr"><a @click="viewOrder(item.order_id)"  href="javascript:void(0)">{{ $t("message.view_order") }}</a>
                                        <span class="separator">|</span> <a @click="reorder(item.order_id)" class="link-reorder" href="javascript:void(0)" >{{ $t("message.reorder") }}</a>
                                        </span>
                                    </td>
                                </tr>
                            
                            </tbody>
                        </table>
                        <!-- 加载提示符 -->
                        <mugen-scroll :handler="fetchOrder" :should-handle="!loading" scroll-container="scrollContainer">
                            <div style="display:none;"  class="infinite-scroll-preloader">
                                <div class="preloader"></div>
                            </div>
                        </mugen-scroll>
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
            pageInitUrl: root + '/customer/order/index' ,
            reorderUrl: root + '/customer/order/reorder' ,
            errormsg:'',
            orderList:[],
            count:0,
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
                        self.orderList = reponseData.data.orderList;
                        console.log('get customer order info success');
                        var traceData = {"refer_url": self.refer_url};
                        var routerQ = self.$route.query
                        for (var k in routerQ) {
                            traceData[k] = routerQ[k]
                        }
                        self.reloadTraceJs(traceData);
                        self.saveReponseHeader(request); 
                        self.count = 1;
                    }
                    
                },
                error:function(){
                    $.toast('system error');
                    $.hideIndicator();
                    console.log('get customer order info error');
                }
            });
        },
        fetchOrder: function(){
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
                        if(reponseData.code == 1100003){
                            self.$router.push('/customer/account/login');
                            return;
                        }else if(reponseData.code == 200){
                            console.log('fetch product 200');
                            var orders = reponseData.data.orderList;
                            if(orders.length > 0){
                                for(var x in orders){
                                    self.orderList.push(orders[x]);
                                }
                                self.loading = false;
                                console.log('fetch order loading false');
                                $.init();
                                self.count++;
                            }
                            self.saveReponseHeader(request);
                        }
                        
                    },
                    error:function(){
                        $.toast('system error');
                        $.hideIndicator();
                        console.log('get customer order info error');
                    }
                });
            }
        },
        viewOrder :function(order_id){
            var self = this;
            self.$router.push('/customer/order/view/'+order_id);
        },
        reorder :function(order_id){
            var self = this;
            self.loading = true;
            self.errormsg = '';
            self.correctmsg = '';
            $.showIndicator();
            $.ajax({
                url: self.reorderUrl,
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
                        self.saveReponseHeader(request);
                        self.$router.push('/customer/account/login');
                    }else if(reponseData.code == 200){
                        self.saveReponseHeader(request);
                        self.$router.push('/checkout/cart');
                    }else if(reponseData.code == 1100014){
                        $.toast('order id is invalid');
                    }else{
                        $.toast('reorder fail');
                    }
                    
                },
                error:function(){
                    $.toast('system error');
                    $.hideIndicator();
                    console.log('get customer order info error');
                }
            });
        }
        
    }
    
    
    
}
</script>