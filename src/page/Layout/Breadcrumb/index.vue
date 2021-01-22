<template>
  <div class="c-breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">{{item}}</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name:'breadcrumb',
  data(){
    return{
      breadcrumb:[]
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.getBreadcrumb()
      },
      immediate: true
    }
  },
  created(){
    this.getBreadcrumb()
  },

  methods:{
    getBreadcrumb() {
      let breadcrumb = []
      let routes = this.$route.matched
      routes.forEach(route => {
        if(route.path.length !== 0){
           const path =  route.path
           breadcrumb.push(route.meta.title?route.meta.title:'平台首页')
           
        }
      })
      this.breadcrumb = breadcrumb
      return  this.breadcrumb.unshift('主页')
    }, 
  }
}
</script>
<style lang="less" scoped>
.c-breadcrumb{
  padding:12px 24px;
  background: #fff;
}
</style>
