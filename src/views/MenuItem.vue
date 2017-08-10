<template>
    <ul>
        <template v-for="(node,index) in menuList" v-if="node.name" >
            <span v-if="menuLevel > 1" class="icon icon-right"></span>
            <li class="item-content" v-on:click="closePanel">
                <div class="item-title">
                    <router-link  :to="node.url" class="nav_t">
                        {{node.name}}
                    </router-link>
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
        closePanel: function(){
            //console.log('closePanel begin');
            $.closePanel("#panel-left-menu");
            //console.log('closePanel end');
        }
    }
    
    
}

</script>