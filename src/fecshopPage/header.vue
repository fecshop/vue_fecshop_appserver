<template>
  <header class="bar bar-nav">
	<a class="icon icon-menu pull-left open-panel" data-panel="#panel-left-menu"></a>
	<router-link to="/" >
      <h1 class='title header_logo'>
		<img class="lazy" src="//img.appfront.fancyecommerce.com//custom/logo.png"  />
      </h1>
    </router-link>
	<div class="pull-right">
	  <a  style="padding-right:0.4rem" class="icon icon-me open-panel"  data-panel="#panel-left-account"></a>
      <a  style="padding-right:0.4rem" class="icon icon-cart" href="http://fecshop.apphtml5.fancyecommerce.com/checkout/cart" external></a>
	</div>
  </header>
</template>

<script>
export default {
  data: {}
}
</script>
