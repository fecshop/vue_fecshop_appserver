<template>
    <div class="content" >
      <v-top-advertise></v-top-advertise>
      <div style="clear:both;"></div>
      <v-product></v-product>	
      <v-bottom></v-bottom>	
    </div>
</template>
<script>
import product from './body/Product.vue'
import topAdvertise from './body/TopAdvertise.vue'
import bottom from './body/Bottom.vue'
export default {
  data () {
    return {
    
    }
  },

  components: {
    'v-top-advertise': topAdvertise,
    'v-product': product,
    'v-bottom': bottom
  }
}
</script>