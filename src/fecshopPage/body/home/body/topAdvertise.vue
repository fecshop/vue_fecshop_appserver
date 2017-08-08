<template>
  <div>
    <div class="swiper-container" data-space-between='10'> 
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in bigImgList">
                
                <img v-bind:src="item.imgUrl"  alt="" style='width: 100%'>
            </div>
        </div>
         
        <div class="swiper-pagination"></div>
      </div>
      <div style="padding:10px;">
        <div class="row">
          <div class="col-50" v-for="(item, index) in smallImgList">
            <img class="lazy" v-bind:src="item.imgUrl" alt="" style='width: 100%'>
          </div>
          
        </div>
      </div>
  </div>
</template>

<script>

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
            getImgUrl: 'http://fecshop.appserver.fancyecommerce.com/cms/home/advertise'    //存数据接口               
        }
    },
    created: function(){
        this.getImg() ;
    },
    methods: { 
        getImg: function(){
            var self = this; 
            $.ajax({
                url:self.getImgUrl,
                async:false,
                timeout: 8000,
                dataType: 'json', 
                type:'get',
                data:{ 
                },
                success:function(data, textStatus){
                    self.bigImgList = data.bigImgList; 
                    self.smallImgList = data.smallImgList; 
                },
                error:function(){
                    console.log('get get image error');
                }
            });
        }
    }
  
  
}

</script>