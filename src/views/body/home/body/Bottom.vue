<template>
  <div>
    <div class="footer_bar">
      <div class="change-bar">
        <div class="c_left">Language:</div>
        <div class="c_right">
          <select v-model="currentLang" @change="changeLang" class="lang" rel="">
            <option v-for="lang in langList"   :value="lang.code">{{lang.languageName}}</option>
          </select>
        </div>
        <div class="clear"></div>
      </div>
      <div class="change-bar">
        <div class="c_left">
          Currency:
        </div>
        <div class="c_right">
          <select v-model="currentCurrency" @change="changeCurrency" class="currency">
            
            <option v-for="currency in currencyList"   :value="currency.code"><label>{{currency.symbol}}</label>{{currency.code}}</option>
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
          Copyright Notice &copy;2016 
          <a href="http://www.fecshop.com">FecShop</a>
          .com All rights reserved.
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
        //$.init();
    },
    data () {
        return {
            //currentCurrency:'', 
            currencyList:[],  
            //currentLang:'',
            langList:[], 
            getLangListUrl: root + '/general/base/lang',    //存数据接口               
            getCurrencyListUrl: root + '/general/base/currency' 
        }
    },
    created: function(){
        this.getLangList() ;
        this.getCurrencyList() ;
    },
    methods: { 
        getLangList: function(){
            var self = this; 
            $.ajax({
                url:self.getLangListUrl,
                async:false,
                timeout: 8000,
                dataType: 'json', 
                type:'get',
                headers: self.getRequestHeader(),
                data:{ 
                },
                success:function(data, textStatus,request){
                    self.langList = data.langList;
                    self.currentLang = data.currentLang;
                    self.saveReponseHeader(request); 
                },
                error:function(){
                    console.log('get language list error');
                }
            });
        },
        getCurrencyList: function(){
            var self = this; 
            $.ajax({
                url:self.getCurrencyListUrl,
                async:false,
                timeout: 8000,
                dataType: 'json', 
                type:'get',
                headers: self.getRequestHeader(),
                data:{ 
                },
                success:function(data, textStatus,request){
                    self.currencyList = data.currencyList; 
                    self.currentCurrency = data.currentCurrency;
                    self.saveReponseHeader(request);
                    //console.log('%%%%%%%%%' + self.currentCurrency);
                },
                error:function(){
                    console.log('get currency list error');
                }
            });
        },
        changeCurrency(){
            window.localStorage.setItem("fecshop-currency",this.currentCurrency);
            console.log(this.currentCurrency);
            location.reload() ;
        },
        changeLang(){
            window.localStorage.setItem("fecshop-lang",this.currentLang);
            console.log(this.currentLang);
            location.reload() ;
        }
    }
}

</script>