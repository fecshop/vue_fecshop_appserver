<template>
    
</template>

<script>
import MugenScroll from 'vue-mugen-scroll'
var root = process.env.API_ROOT; 
export default {
    ready () {
        //this.getImg() ;
        //$.init();
    },
    data () {
        return {
            loading: false ,
            productList:[],
            count: 0,
            //styleObject: {},
            scrollContainerSize:0,
            getCategoryUrl: root + '/catalog/category/index'    //存数据接口               
        }
    },
    //props: {
    //  productList: {
    //    type: Array
    //  }
    //},
    created: function(){
        //this.getProduct() ;
        var height = $(window).height() - 77 -66;
        height = height + 'px';
        console.log(height);
        
    },
    methods: { 
        fetchData() {
            this.loading = true;
            console.log('111111111');
            var self = this; 
            
            var category_id = this.$route.params.category_id;
            
            $.ajax({
                url: self.getCategoryUrl,
                async: false,
                timeout: 8000,
                dataType: 'json', 
                type: 'get',
                headers: self.getRequestHeader(),
                //beforeSend: function(xhr){
                //    if(fecshop_uuid){
                //        xhr.setRequestHeader('fecshop_uuid', fecshop_uuid);
                //    }
                //},
                data:{ 
                    category_id:category_id
                },
                success:function(data, textStatus,request){
                    console.log('22222');
                    if(data.code == 200){
                        var products = data.content.products;
                        for(var x in products){
                            self.productList.push(products[x]);
                        }
                        //maxPage = data.content.page_count;
                        self.count++;
                        self.saveReponseHeader(request); 
                        console.log('3333');
                    } 
                },
                error:function(){
                    console.log('get get image error');
                }
            });
            
            this.loading = false
            $.init();
            console.log('4444');
        }
    },
    components: {MugenScroll}
}

</script>