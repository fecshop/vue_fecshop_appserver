<template>
  <div>
    <div style="padding:10px;">      
      <!-- 添加 class infinite-scroll 和 data-distance  向下无限滚动可不加infinite-scroll-bottom类，这里加上是为了和下面的向上无限滚动区分-->
      <div class=" infinite-scroll infinite-scroll-bottom" data-distance="100">
        <div class="list-block">
          <div class="list-container">
            <div class="row" v-for="(item, index) in productList">
              
              <div class="col-50 product_list">
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
                    <span class="bizhong">USD</span>
                    <span v-bind:orgp="item.one.special_price"   class="my_shop_price f14">
                      <span class="icon">$</span>
                      {{item.one.special_price}}
                    </span>
                    <span class="bizhong">USD</span>
                    <del v-bind:orgp="item.one.price" class="my_shop_price">
                      <span class="icon">$</span>
                      {{item.one.price}}
                    </del>
                  </p>
                </p>
              </div>  
              
              
              <div class="col-50 product_list">
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
                    <span class="bizhong">USD</span>
                    <span v-bind:orgp="item.two.special_price"   class="my_shop_price f14">
                      <span class="icon">$</span>
                      {{item.two.special_price}}
                    </span>
                    <span class="bizhong">USD</span>
                    <del v-bind:orgp="item.two.price" class="my_shop_price">
                      <span class="icon">$</span>
                      {{item.one.price}}
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
</template>

<script>
var root = process.env.API_ROOT; 
export default {
    ready () {
        //this.getImg() ;
        $.init();
    },
    data () {
        return {
            productList:[],     
            getProductUrl: root + '/cms/home/product'    //存数据接口               
        }
    },
    created: function(){
        this.getProduct() ;
    },
    methods: { 
        getProduct: function(){
            var self = this; 
            //$.ajax({
            //    url:self.getProductUrl,
            //    async:false,
            //    timeout: 8000,
            //    dataType: 'json', 
            //    type:'get',
            //    data:{ 
            //    },
            //    success:function(data, textStatus){
            //        self.productList = data;  
            //    },
            //    error:function(){
            //        console.log('get get image error');
            //    }
            //});
            
            self.$http.get(self.getProductUrl)
                .then((response) => {
                    self.productList = response.data 
                    //console.log(JSON.stringify(response.data))
                })
                .catch(function(response) {
                    console.log(response)
                });
        }
    }
}

</script>