<template>
    <div class="content" >
      <v-top-advertise :bigImgList="advertiseImg.bigImgList" :smallImgList="advertiseImg.smallImgList"></v-top-advertise>
      <div style="clear:both;"></div>
      <v-product :productList="productList"></v-product>	
      
        <div class="footer_bar">
          <div class="change-bar">
            <div class="c_left">
                {{ $t("message.language") }}
                :</div>
            <div class="c_right">
              <select v-model="language.currentLang" @change="changeLang" class="lang" rel="">
                <option v-for="lang in language.langList"   :value="lang.code">{{lang.languageName}}</option>
              </select>
            </div>
            <div class="clear"></div>
          </div>
          <div class="change-bar">
            <div class="c_left">
                {{ $t("message.currency") }}:
            </div>
            <div class="c_right">
              <select v-model="currency.currentCurrency" @change="changeCurrency" class="currency">
                <option v-for="curry in currency.currencyList"   :value="curry.code"><label>{{curry.symbol}}</label>{{curry.code}}</option>
              </select>
            </div>
            <div class="clear"></div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="container">
            <img class="lazy" src="//img.appfront.fancyecommerce.com/images/pp.png" alt="" />
          </div>
          <div class="container">
            <div id="copy">
              {{ $t("message.copyright") }}&copy;2016:
              <a href="http://www.fecshop.com">FecShop</a>.com
              {{ $t("message.allright") }}:
            </div>
          </div>
        </div>	
    </div>
</template>
<script>
import product from './body/Product.vue'
import topAdvertise from './body/TopAdvertise.vue'
//import bottom from './body/Bottom.vue'
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
        propsCurrency : 0,
        propsLang: 0,
        refer_url: '',
        getHomeContentUrl: root + '/cms/home/index'    //存数据接口      
    }
  },
  components: {
    'v-top-advertise': topAdvertise,
    //'v-bottom': bottom,
    'v-product': product
    
  },
  created: function(){
    this.getHomeContent() ;
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
            success:function(reponseData, textStatus,request){
                $.hideIndicator();
                console.log('get home cms index success');
                if(reponseData.code == 200){
                    var serverData      = reponseData.data;
                    var serverMessage   = reponseData.message;
                    self.productList    = serverData.productList;
                    self.advertiseImg   = serverData.advertiseImg;
                    self.language       = serverData.language;
                    self.currency       = serverData.currency;
                }
                var traceData = {"refer_url": self.refer_url};
                var routerQ = self.$route.query
                for (var k in routerQ) {
                    traceData[k] = routerQ[k]
                }
                self.reloadTraceJs(traceData);
                
                self.saveReponseHeader(request); 
                
            },
            error:function(){
                $.hideIndicator();
                $.toast("system error");
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
    },
    
    changeCurrency(){
        this.propsCurrency += 1;
        if(this.propsCurrency > 1){
            window.localStorage.setItem("fecshop-currency",this.currency.currentCurrency);
            console.log('##########:' +this.currency.currentCurrency);
            location.reload() ;
        }
    },
    changeLang(){
        this.propsLang += 1;
        if(this.propsLang > 1){
            window.localStorage.setItem("fecshop-lang",this.language.currentLang);
            this.$i18n.locale  = this.language.currentLang;
            console.log(this.language.currentLang);
            location.reload() ;
        }
    }
  }
}
</script>