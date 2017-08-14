<template>
  <div class="page-group">
    <div class="page main-page" ref="scrollContainer">
        <router-view name="header"></router-view>
        <router-view name="body"></router-view>
    </div>
    <div class="panel-overlay"></div>
    <router-view name="leftmenu"></router-view>
    <div class="panel-overlay"></div>
    <router-view name="leftaccount"></router-view>
  </div>
</template>

<script>
$(document).ready(function(){  
    //$.config.router = false; 
    $.init();
});
export default {
  components: {
    
  }
}
</script>

<style lang="css" src="./assets/css/sm.min.css"></style>
<style lang="css" src="./assets/css/sm-extend.min.css"></style>
<style lang="css" src="./assets/css/fec.css"></style>


