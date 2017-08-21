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
        </div>
      </div>
	  <div class="category_menu list-block">
          <ul>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  <router-link  to="/" class="nav_t">
                    Home
                  </router-link>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  <router-link  to="/customer/account/index" class="nav_t">
                    Account
                  </router-link>
                
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  <router-link  to="/checkout/cart" class="nav_t">
                    Shopping Cart
                  </router-link>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  <router-link  to="/customer/order" class="nav_t">
                    My Order
                  </router-link>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  <router-link  to="/customer/productfavorite" class="nav_t">
                    My Favorite
                  </router-link>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  <router-link  to="/about-us" class="nav_t">
                    About Us
                  </router-link>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  <router-link  to="/customer/contacts" class="nav_t">
                    Contact us
                  </router-link>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  <router-link  to="/privacy-policy" class="nav_t">
                    Privacy Policy
                  </router-link>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  <router-link  to="/return-policy" class="nav_t">
                    Return Policy
                  </router-link>
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
    searchSubmit: function(){
        $.closePanel("#panel-left-account");
        this.$router.push('/search/'+this.searchText);
    }
  },
  components: {
    
  }
}
</script>