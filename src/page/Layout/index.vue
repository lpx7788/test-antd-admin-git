<template>
  <a-layout id="layout">
    <a-layout-sider width="256" v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img class="logo-img" src="../../assets/logo.png" alt="" />
        <span class="title" :class="collapsed ? 'collapsed' : 'fadein'">{{
          site.title
        }}</span>
      </div>
      <Menu :data="menuData" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);z-index: 9">
        <div class="header-wrap flex-between">
          <a-icon
            class="header-item trigger tal"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <header-avatar class="header-item header-avatar tar" />
        </div>
      </a-layout-header>
       <Breadcrumb></Breadcrumb>

      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
       
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapState } from 'vuex'
import Menu from "@/components/Menu";
import HeaderAvatar from "./Header/HeaderAvatar";
import Breadcrumb from "./Breadcrumb";

export default {
  components: {
    Menu,
    HeaderAvatar,
    Breadcrumb
  },
  data() {
    return {
      collapsed: false,
  
    };
  },
  computed: {
    ...mapState({
      // 动态主路由
      menuData: state => state.menu.addRouters[0].children,
    })
  },
  created(){
    // this.menuData = this.menuData[0].children
    console.log('menuData===layput',this.menuData)
  },
  methods: {
    menuClick({ item, key, keyPath }) {
      this.$router.push({ name: key });
    },
  },
};
</script>

<style lang="less" scoped>
#layout {
  .logo-img {
    width: 24px;
    height: 24px;
  }
  height: 100%;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    // padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .logo {
    height: 32px;
    line-height: 32px;
    margin: 16px 24px;
    font-size: 32px;
    color: #fff;
    .icon {
      color: #4d65fd;
      transform: rotateY(-180deg) rotate(55deg);
    }
    .title {
      margin-left: 10px;
      font-size: 18px;
    }
    span.collapsed {
      opacity: 0;
    }
  }
  .header-wrap {
    padding: 0 24px;
  }
    ::v-deep.ant-layout-sider{
     box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
     z-index: 10;
  }
}
</style>
