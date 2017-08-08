<template>
  <div class="page-group">
    <div class="page">
		<router-view name="header"></router-view>				
		<router-view name="body"></router-view>		
	</div>
    <div class="panel-overlay"></div>
    <router-view name="leftmenu"></router-view>
    <div class="panel-overlay"></div>
  </div>
</template>

<script>
$(document).ready(function(){  
    $.init();
});
export default {
  components: {
    
  }
}
</script>

<style lang="css" src="./css/sm.min.css"></style>
<style lang="css" src="./css/sm-extend.min.css"></style>
<style lang="css" src="./css/fec.css"></style>
<style lang="scss">
  @import "./style/style";
</style>

