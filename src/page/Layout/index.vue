<template>
    <a-layout id="layout">
        <a-layout-sider width="256" v-model="collapsed" :trigger="null" collapsible>
            <div class="logo">
                 <img class="logo-img" src="../../assets/logo.png"  alt="">
                <span class="title" :class="collapsed?'collapsed':'fadein'">{{site.title}}</span>
            </div>
            <Menu :data="menuData" />
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => (collapsed = !collapsed)" />
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import Menu from "@/components/Menu";

export default {
  components: {
    Menu
  },
  data() {
    return {
      collapsed: false,
      menuData: [
        {
          id: 1,
          path: "home",
          name: "home",
          meta: {
            title: "主页",
            icon: "home"
          }
        },
        {
          id: 2,
          path: "",
          name: "company",
          meta: {
            title: "企业管理",
            icon: "build"
          },
          children: [
            {
              id: 21,
              path: "companys",
              name: "companys",
              meta: {
                title: "企业列表",
                icon: "bank"
              },
              parentId: 2
            },
            {
              id: 22,
              path: "users",
              name: "users",
              meta: {
                title: "用户列表",
                icon: "team"
              },
              parentId: 2
            }
          ]
        },
        // {
        //   id: 3,
        //   path: "order",
        //   name: "order",
        //   meta: {
        //     title: "订单管理",
        //     icon: "pay-circle"
        //   }
        // },
        // {
        //   id: 4,
        //   path: "release",
        //   name: "release",
        //   meta: {
        //     title: "发布管理",
        //     icon: "money-collect"
        //   }
        // },
        // {
        //   id: 5,
        //   path: "info",
        //   name: "info",
        //   meta: {
        //     title: "资讯管理",
        //     icon: "profile"
        //   },
        //   children: [
        //     {
        //       id: 51,
        //       path: "allInfo",
        //       name: "allInfo",
        //       meta: {
        //         title: "全部资讯",
        //         icon: "project"
        //       },
        //       parentId: 5
        //     },
        //     {
        //       id: 52,
        //       path: "myInfo",
        //       name: "myInfo",
        //       meta: {
        //         title: "我的资讯",
        //         icon: "menu"
        //       },
        //       parentId: 5
        //     },
        //     {
        //       id: 53,
        //       path: "releaseInfo",
        //       name: "releaseInfo",
        //       meta: {
        //         title: "发布资讯",
        //         icon: "read"
        //       },
        //       parentId: 5
        //     }
        //   ]
        // },
        // {
        //   id: 6,
        //   path: "system",
        //   name: "system",
        //   meta: {
        //     title: "系统管理",
        //     icon: ""
        //   }
        // },
        {
          id: 7,
          path: "mallSystem",
          name: "mallSystem",
          meta: {
            title: "商城系统管理",
            icon: "shop"
          },
          children: [
            {
              id: 71,
              path: "role",
              name: "role",
              meta: {
                title: "商城角色管理",
                icon: "team"
              },
              parentId: 7
            },
            {
              id: 72,
              path: "defaultPermission",
              name: "defaultPermission",
              meta: {
                title: "商城默认权限",
                icon: "cluster"
              },
              parentId: 7
            },
            {
              id: 73,
              path: "permissionResource",
              name: "permissionResource",
              meta: {
                title: "商城权限资源",
                icon: "apartment"
              },
              parentId: 7
            },
          ]
        }
      ]
    };
  },
  methods: {
    menuClick({ item, key, keyPath }) {
      this.$router.push({ name: key });
    }
  }
};
</script>

<style lang="less" scoped>
#layout {
  .logo-img{
    width: 24px;
    height: 24px;
  }
  height: 100%;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .logo {
    height: 32px;
    line-height: 32px;
    margin: 16px 24px;
    font-size: 32px;
    color: #fff;
    .icon{
      color: #4d65fd;
      transform: rotateY(-180deg) rotate(55deg);
    }
    .title{
      margin-left: 10px;
      font-size: 18px;
    }
    span.collapsed{
      opacity: 0;
    }
  }
}
</style>
