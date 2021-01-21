<template>
    <div class="c-menu">
        <a-menu :default-selected-keys="selectedKeys" :default-open-keys="openKeys" mode="inline" theme="dark" @click="menuItemClick">
            <template v-for="item in data">
                <template v-if="!item.hidden">
                    <sub-menu v-if="item.children && showChildMenu(item.children)" :key="item.name" :menu-info="item" :showChildMenu="showChildMenu" :collapsed="collapsed" />
                    <a-menu-item v-else :key="item.name">
                        <a-icon :type="item.meta.icon" />
                        <span class="title">{{ item.meta.title }}</span>
                    </a-menu-item>
                </template>
            </template>
        </a-menu>
    </div>
</template>

<script>
import { getParent } from "@/util/common";
// 这里用的是官网的递归渲染菜单，详情请前往官网 https://www.antdv.com/components/menu-cn/#components-menu-demo-single-file-recursive-menu
import { Menu } from "ant-design-vue";

const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon :type="menuInfo.meta.icon" /><span class="title">{{ menuInfo.meta.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <sub-menu v-if="item.children&&showChildMenu(item.children)" :key="item.name" :menu-info="item" />
          <a-menu-item v-else-if="!item.hidden" :key="item.name">
            <a-icon :type="item.meta.icon" />
            <span class="title">{{ item.meta.title }}</span>
          </a-menu-item>
        </template>
      </a-sub-menu>
    `,
  name: "SubMenu",
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    // 要渲染的菜单信息
    menuInfo: {
      type: Object,
      default: () => ({})
    },
    // 是否展示子菜单
    showChildMenu: {
      type: Function,
      default: () => {}
    }
  }
};

export default {
  name: "subMenu",
  components: {
    "sub-menu": SubMenu
  },
  props: {
    // 渲染菜单的数据
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 是否缩起菜单
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedKeys: [],
      openKeys: [],
    };
  },
  watch: {
    data() {
      // 监听菜单是否变化
      this.getDefaultkey(this.data);
    },
    collapsed(newVal) {
      // 解决展开菜单时对应的子菜单没有展开
      if (!newVal) {
        this.getDefaultOpenkeys(this.$route.name);
      }
    }
  },
  methods: {
    // 是否需要展示子菜单
    showChildMenu(children) {
      /*
       *  @children 要查询的路由
       */
      let hidden = children.filter(i => i.hidden);
      if (hidden.length === children.length) {
        return false;
      } else {
        return true;
      }
    },
    menuItemClick(e) {
      this.$router.push({ name: e.key });
    },
    // 查找初始选中的菜单项
    getDefaultkey() {
      this.selectedKeys = [this.$route.name];
      this.getDefaultOpenkeys(this.data, this.$route.name);
    },
    // 查找初始打开的菜单
    getDefaultOpenkeys(list,name) {
      let arr = []
      // 反转树
      let findChildName = (data) => {
        data.forEach(item => {
          if(item.children){
            findChildName(item.children)
            delete item.children
            arr.push(item)
          }else{
            arr.push(item)
          }
        });
      }
      findChildName(JSON.parse(JSON.stringify(list)))
      let child = arr.find(i => {return i.name === name})
      let parId = getParent(list,child.id)
      this.openKeys = [parId[0].name]
    }
  },
  created() {
    this.getDefaultkey(this.data);
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.ant-menu-inline-collapsed {
  ::v-deep .title {
    opacity: 0;
  }
}
</style>
