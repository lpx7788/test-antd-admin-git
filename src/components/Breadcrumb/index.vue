<template>
  <div class="c-breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item>{{name}}</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  data(){
    return{
      name
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.name = route.meta.title
      },
      immediate: true
    }
  },
}
</script>
