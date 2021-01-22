<template>
 <div class="home">
      <a-card :bordered="false">
      首页内容
    </a-card>
 </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'companys',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      nickname: (state) => state.user.nickname,
      welcome: (state) => state.user.welcome
    }),
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>

</style>
