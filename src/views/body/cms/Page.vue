<template>
    <div class="content">
        <div class="shopping-cart-img">
            {{title}}
        </div>
        <div class="fecshop_message" v-if="errormsg">
            <div class="error-msg">
                <div>
                    {{errormsg}}
                </div>
            </div>
		</div>
        <div class="mobile-container">
            <div class="col-main">
                <div v-html="content">
                </div>
            </div>
        </div>

    </div>
</template>
<script>
var root = process.env.API_ROOT;

export default {
    data () {
        return {
            pageInitUrl: root + '/cms/article/index' ,
            errormsg: "",
            title: "",
            refer_url: '',
            content: ""
        }
    },
    created: function(){
        this.pageInit();
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'pageInit',
    },
    beforeRouteEnter (to, from, next) {
        var website_root = process.env.WEBSITE_ROOT
        var fullPath = from.fullPath
        var name = from.name
        console.log(fullPath);
        console.log(from);  
        if (fullPath !== '/' || typeof(name) === 'undefined' ) {
            var referUrl = website_root + "/#" + fullPath
            console.log(referUrl)
            
        } else {
            referUrl = ''
        }
        next( vm => {
            vm.refer_url = referUrl;
        });  
    },
    methods:{
    
        pageInit() {
            console.log("fetch cms page");
            this.loading = true;
            var self = this; 
            var page_key = this.$route.params.page_key;
            var filterAttrs = JSON.stringify(self.filterAttrs);
            $.showIndicator();
            $.ajax({
                url: self.pageInitUrl,
                async: true,
                timeout: 120000,
                dataType: 'json', 
                type: 'get',
                headers: self.getRequestHeader(),
                data:{ 
                    url_key:page_key
                },
                success:function(reponseData, textStatus,request){
                    $.hideIndicator();
                    if(reponseData.code == 200){
                        self.title = reponseData.data.title;
                        self.content = reponseData.data.content;
                        var traceData = {"refer_url": self.refer_url};
                        var routerQ = self.$route.query
                        for (var k in routerQ) {
                            traceData[k] = routerQ[k]
                        }
                        self.reloadTraceJs(traceData);
                        self.saveReponseHeader(request); 
                    }
                },
                error:function(){
                    $.hideIndicator();
                    $.toast("system error");
                    console.log('get get Category info error');
                }
            });
            
        }
    
    }
}
$(document).ready(function(){
    $.init();
});
</script>
