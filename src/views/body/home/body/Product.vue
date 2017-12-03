<template>
  <div>
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
</template>

<script>
var root = process.env.API_ROOT; 
export default {
    ready () {
        //this.getImg() ;
        $.init();
    },
    props: {
      productList: {
        type: Array
      }
    },
    data () {
        return {              
        }
    }
    
}

</script>