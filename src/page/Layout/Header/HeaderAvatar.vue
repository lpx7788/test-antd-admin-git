<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
     <a-avatar class="avatar" size="small" shape="circle" src="https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png"/>
      <span class="name">Serati Ma</span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
      <a-menu-item>
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item @click="logout">
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import {mapGetters} from 'vuex'
// import {logout} from '@/services/user'

export default {
  name: 'HeaderAvatar',
  computed: {
    // ...mapGetters('account', ['user']),
  },
  methods: {
    logout() {
      // logout()
       localStorage.setItem('omp-token','')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
  .header-avatar{
    display: inline-flex;
    .avatar, .name{
      align-self: center;
    }
    .avatar{
      margin-right: 8px;
    }
    .name{
      font-weight: 500;
    }
  }
  .avatar-menu{
    width: 150px;
  }

</style>
