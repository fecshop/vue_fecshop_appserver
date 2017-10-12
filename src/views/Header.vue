<template>
  <header class="bar bar-nav">
	<a class="icon icon-menu pull-left open-panel" data-panel="#panel-left-menu"></a>
	<router-link to="/" >
      <h1 class='title header_logo'>
		<img class="lazy" src="//img.appfront.fancyecommerce.com/custom/logo.png"  />
      </h1>
    </router-link>
	<div class="pull-right">
	  <a  style="padding-right:0.4rem" class="icon icon-me open-panel"  data-panel="#panel-left-account"></a>
      <router-link style="padding-right:0.4rem" to="/checkout/cart"  class="icon icon-cart">
      
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
    
    }
  }
}
</script>
