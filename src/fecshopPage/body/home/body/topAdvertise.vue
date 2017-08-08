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
        //this.getImg() ;
        $.init();
    },
    data () {
        return {
            bigImgList:[
                //{"imgUrl":"//img.apphtml5.fancyecommerce.com/custom/home_img_1.jpg"},
                //{"imgUrl":"//img.apphtml5.fancyecommerce.com/custom/home_img_2.jpg"},
                //{"imgUrl":"//img.apphtml5.fancyecommerce.com/custom/home_img_3.jpg"}
            ], 
            smallImgList:[],
            getImgUrl: root + '/cms/home/advertise'    //存数据接口               
        }
    },
    created: function(){
        this.getImg() ;
    },
    methods: { 
        getImg: function(){
            var self = this; 
            self.$http.get(self.getImgUrl)
                .then((response) => {
                    self.bigImgList = response.data.bigImgList; 
                    self.smallImgList = response.data.smallImgList; 
                    //console.log(JSON.stringify(response.data))
                })
                .catch(function(response) {
                    console.log(response)
                });
        }
    }
}

</script>