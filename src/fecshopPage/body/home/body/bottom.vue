<template>
  <div>
    <div class="footer_bar">
      <div class="change-bar">
        <div class="c_left">Language:</div>
        <div class="c_right">
          <select class="lang" rel="">
            <option selected = "selected" value="//fecshop.apphtml5.fancyecommerce.com">English</option>
            <option  value="//fecshop.apphtml5.fancyecommerce.com/fr">Fran?ais</option>
            <option  value="//fecshop.apphtml5.es.fancyecommerce.com">Espa?ol</option>
            <option  value="//fecshop.apphtml5.fancyecommerce.com/cn">中文</option>
          </select>
        </div>
        <div class="clear"></div>
      </div>
      <div class="change-bar">
        <div class="c_left">
          Currency:
        </div>
        <div class="c_right">
          <select class="currency">
            <option selected = "selected" value="USD"><label>$</label>USD</option>
            <option  value="EUR"><label>€</label>EUR</option>
            <option  value="GBP"><label>￡</label>GBP</option>
            <option  value="CNY"><label>￥</label>CNY</option>
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
export default {
  data: {}
}
</script>