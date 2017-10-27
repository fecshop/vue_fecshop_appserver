<template>
  <!-- Left Panel with Reveal effect -->
  <div class="panel panel-left panel-reveal theme-dark" id='panel-left-account'>
	<div class="content-block">
      <div class="searchbar row">
        <form @submit.prevent="searchSubmit" class="js_topSeachForm" >
            <div class="search-input">
              <label class="icon icon-search" for="search"></label>
              <input v-model="searchText" type="search" id="search" placeholder="Products keyword" value="" />
            </div>
        </form>
      </div>
	  <div class="category_menu list-block">
          <ul>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                    <a href="javascript:void(0)" v-on:click="closePanelAndRedirect('/')"   class="nav_t">
                        Home
                    </a>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  
                    <a href="javascript:void(0)" v-on:click="closePanelAndRedirect('/customer/account/index')"   class="nav_t">
                        Account
                    </a>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  
                    <a href="javascript:void(0)" v-on:click="closePanelAndRedirect('/checkout/cart')"   class="nav_t">
                        Shopping Cart
                    </a>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                    <a href="javascript:void(0)" v-on:click="closePanelAndRedirect('/customer/order')"   class="nav_t">
                        My Order
                    </a>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  
                    <a href="javascript:void(0)" v-on:click="closePanelAndRedirect('/customer/productfavorite')"   class="nav_t">
                        My Favorite
                    </a>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  
                    <a href="javascript:void(0)" v-on:click="closePanelAndRedirect('/cms/page/about-us')"   class="nav_t">
                        About Us
                    </a>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                 
                    <a href="javascript:void(0)" v-on:click="closePanelAndRedirect('/customer/contacts')"   class="nav_t">
                        Contact us
                    </a>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                    <a href="javascript:void(0)" v-on:click="closePanelAndRedirect('/cms/page/privacy-policy')"   class="nav_t">
                        Privacy Policy
                    </a>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                    <a href="javascript:void(0)" v-on:click="closePanelAndRedirect('/cms/page/return-policy')"   class="nav_t">
                        Return Policy
                    </a>
                </div>
              </div>
            </li>
          </ul>
      </div>
    </div>
    <div class="list-block">
    <!-- .... -->
    </div>
  </div>	
</template>
<script>

export default {
  data () {
    return {
        searchText:'',
    }
  },
  methods: { 
    closePanelAndRedirect: function(url){
        $.closePanel("#panel-left-account");
        this.$router.push(url);
    },
    searchSubmit: function(){
        $.closePanel("#panel-left-account");
        this.$router.push('/search/'+this.searchText);
    }
  },
  components: {
    
  }
}
</script>