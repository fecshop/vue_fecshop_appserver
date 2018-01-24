<template>
  <div>
    <div class="footer_bar">
      <div class="change-bar">
        <div class="c_left">
            {{ $t("message.language") }}
            :</div>
        <div class="c_right">
          <select v-model="currentLang" @change="changeLang" class="lang" rel="">
            <option v-for="lang in langList"   :value="lang.code">{{lang.languageName}}</option>
          </select>
        </div>
        <div class="clear"></div>
      </div>
      <div class="change-bar">
        <div class="c_left">
            {{ $t("message.currency") }}:
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
          {{ $t("message.copyright") }}&copy;2016:
          <a href="http://www.fecshop.com">FecShop</a>.com
          {{ $t("message.allright") }}:
        </div>
      </div>
    </div>			
  </div>
</template>

<script>
var root = process.env.API_ROOT; 
export default {
    ready () {
        $.init();
    },
    data () {
        return { 
            propsCurrency : 0,
            propsLang: 0
        }
    },
    props: {
        langList: {
            type: Array
        },
        currencyList: {
            type: Object
        },
        currentCurrency: {
            type: String
        },
        currentLang: {
            type: String
        }
        
    },
    methods: { 
        changeCurrency(){
            this.propsCurrency += 1;
            if(this.propsCurrency >= 1){
                window.localStorage.setItem("fecshop-currency",this.currentCurrency);
                console.log('##########:' +this.currentCurrency);
                location.reload() ;
            }
        },
        changeLang(){
            this.propsLang += 1;
            if(this.propsLang >= 1){
                window.localStorage.setItem("fecshop-lang",this.currentLang);
                this.$i18n.locale  = this.currentLang;
                console.log(this.currentLang);
                location.reload() ;
            }
        }
    }
}

</script>