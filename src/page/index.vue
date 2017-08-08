<template>
  <div>
    
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
    
    <h1 class="logo">cnodejs Api Test</h1>
    <ul class="list">
      <li v-for="item in lists" v-text="item.title"></li>
    </ul>
    
  </div>
</template>
<script>
export default {
  data () {
    return {
      lists: []
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.get_data()
  },
  methods: {
    get_data (params) {
      if (!params) params = {}
      this.$api.get('topics', params, r => {
        this.lists = r.data
      })
    }
  }
}
</script>
