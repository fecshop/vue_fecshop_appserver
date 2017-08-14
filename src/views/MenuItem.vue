<template>
    <ul>
        <template v-for="(node,index) in menuList" v-if="node.name" >
            <span v-if="menuLevel > 1" class="icon icon-right"></span>
            <li class="item-content" >
                <div class="item-title">
                    <a href="javascript:void(0)" v-on:click="closePanelAndRedirect(node.url)"   class="nav_t">
                        {{node.name}}
                    </a>
                </div>
                <menu-item v-if="node.child" v-bind:menuLevel="node.level" v-bind:menuList=node.child></menu-item> 
            </li>
        </template>
    </ul>
</template>
 
<script>
var root = process.env.API_ROOT; 

export default {
    name: 'MenuItem',
    //props: ['menuList'],
    props: {
      menuList: {
        type: Object
      },
      menuLevel: {
        type: Number,
        default:1
      }
    },
    methods: { 
        closePanelAndRedirect: function(url){
            //console.log('closePanel begin');
            $.closePanel("#panel-left-menu");
            //console.log('closePanel end');
            this.$router.push(url);
        }
    }
    
    
}

</script>