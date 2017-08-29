<template>
    <!-- Left Panel with Reveal effect -->
    <div class="panel panel-left panel-reveal theme-dark" id='panel-left-menu'>
        <div class="content-block">
            <div class="searchbar row">
                <form @submit.prevent="searchSubmit" class="js_topSeachForm" >
                    <div class="search-input">
                      <label class="icon icon-search" for="search"></label>
                      <input v-model="searchText" type="search" id="search" placeholder="Products keyword" value="" />
                    </div>
                </form>
            </div>
            <div class="category_menu">
                <menu-item v-bind:menuList.sync="menuList"></menu-item> 
            </div>
        </div>
        <div class="list-block">
            <!-- .... -->
        </div>
    </div>
</template>


<script> 
import MenuItem from './MenuItem.vue'
var root = process.env.API_ROOT
export default {
    components:{
        'menu-item':MenuItem
    },
    ready () {
        $.init();
    },
    data () {
        return {
            menuList:{},  
            searchText:'',
            getMenuUrl: root + '/general/base/menu'    //存数据接口               
        }
    },
    created: function(){
        this.getMenu() ;
    },
    methods: { 
        searchSubmit: function(){
            $.closePanel("#panel-left-menu");
            this.$router.push('/search/'+this.searchText);
        },
        getMenu: function(){
            var self = this; 
            $.ajax({
                url: self.getMenuUrl,
                async: true,
                timeout: 120000,
                dataType: 'json', 
                type: 'get',
                headers: self.getRequestHeader(),
                data:{ 
                },
                success:function(data, textStatus,request){
                    self.menuList = data;
                    self.saveReponseHeader(request); 
                    
                },
                error:function(){
                    console.log('get get image error');
                }
            });
        }
    }
}

</script>