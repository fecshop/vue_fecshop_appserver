<template>
    <div class="content" >
      <v-top-advertise :bigImgList="advertiseImg.bigImgList" :smallImgList="advertiseImg.smallImgList"></v-top-advertise>
      <div style="clear:both;"></div>
      <v-product :productList="productList"></v-product>	
      <v-bottom   :currencyList = "currency.currencyList"  :langList = "language.langList"  :currentCurrency = "currency.currentCurrency"  :currentLang = "language.currentLang"></v-bottom>
    </div>
</template>
<script>
import product from './body/Product.vue'
import topAdvertise from './body/TopAdvertise.vue'
import bottom from './body/Bottom.vue'
var root = process.env.API_ROOT;
export default {
  data () {
    return {
      productList:[],  
      advertiseImg:{
        bigImgList:[],
        smallImgList:[],
      },
      language:{
        currentLang:'',
        langList:[]
      },
      currency:{
        currentCurrency:'',
        currencyList:{}
      },
      getHomeContentUrl: root + '/cms/home/index'    //存数据接口      
    }
  },

  components: {
    'v-top-advertise': topAdvertise,
    'v-product': product,
    'v-bottom': bottom
  },
  created: function(){
    this.getHomeContent() ;
  },
  methods: { 
        getHomeContent: function(){
            var self = this; 
            $.showIndicator();
            $.ajax({
                url: self.getHomeContentUrl,
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
                
                },
                success:function(data, textStatus,request){
                    if(data.code == 200){
                        var content         = data.content;
                        self.productList    = content.productList;
                        self.advertiseImg   = content.advertiseImg;
                        self.language       = content.language;
                        self.currency       = content.currency;
                    }
                    //self.productList = data;
                    self.saveReponseHeader(request); 
                    $.hideIndicator();
                },
                error:function(){
                    $.hideIndicator();
                    console.log('get home content error');
                }
            });
            
            //self.$http.get(self.getProductUrl)
            //    .then((response) => {
            //        self.productList = response.data 
            //        //console.log(JSON.stringify(response.data))
            //    })
            //    .catch(function(response) {
            //        console.log(response)
            //    });
        }
    }
}
</script>