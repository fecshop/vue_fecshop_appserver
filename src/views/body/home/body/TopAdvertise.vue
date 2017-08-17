<template>
  <div>
    <div class="swiper-container" data-space-between='10'> 
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in bigImgList">
              <router-link to="/" >
                <img v-bind:src="item.imgUrl"  alt="" style='width: 100%'>
              </router-link>
            </div>
        </div>
         
        <div class="swiper-pagination"></div>
      </div>
      <div style="padding:10px;">
        <div class="row">
          <div class="col-50" v-for="(item, index) in smallImgList">
            <router-link to="/" >
              <img class="lazy" v-bind:src="item.imgUrl" alt="" style='width: 100%'>
            </router-link>
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
    
    props: {
        bigImgList: {
            type: Array
        },
        smallImgList: {
            type: Array
        },
    }
    
}

</script>