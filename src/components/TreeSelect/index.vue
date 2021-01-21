<template>
  <a-popover v-model="visible" trigger="click" placement="bottom" :getPopupContainer="trigger => {return trigger.parentNode}" @visibleChange="visibleChange">
    <a-input v-model="inputVal" @change="change" @focus="focus" ref="inputVal" />
    <div slot="content">
      <a-empty v-if="data.length===0"></a-empty>
      <a-tree :style="{width: treeWidth}" :tree-data="data" autoExpandParent :expandedKeys.sync="expandedKeys" :replaceFields="replaceFields" @select="onSelect" class="tree"></a-tree>
    </div>
  </a-popover>
</template>

<script>
import { debounce } from "@/util/common";

export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      expandedKeys: [],
      selectedId: "",
      inputVal: "",
      visible: false,
      replaceFields: {
        children: "children",
        title: "resourceName",
        key: "id"
      },
      generateList: [],
      treeWidth: 0
    };
  },
  watch: {
    value(n) {
      this.findTitle(n);
    },
    data(n) {
      this.invertTree(n);
    }
  },
  methods: {
    visibleChange() {
      // 必须选择一项，否则输入框失去焦点后清空输入框
      if (!this.selectedId) {
        this.inputVal = "";
        this.$emit("change", this.inputVal, this.selectedId);
      }
    },
    focus() {
      // 输入框聚焦后计算输入框的宽度，并赋值给下拉框
      this.treeWidth = this.$refs.inputVal.$refs.input.clientWidth - 32 + "px";
    },
    // 查找选中项的title
    findTitle(key) {
      let node = this.generateList.find(i => i.key == key);
      if (node) this.inputVal = node.title;
    },
    // 反转树
    invertTree(data) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node[this.replaceFields.key];
        const title = node[this.replaceFields.title];
        this.generateList.push({ key, title });
        if (node.children) {
          this.invertTree(node.children);
        }
      }
    },
    onSelect(selectedKeys, e) {
      this.selectedId = selectedKeys[0];
      this.$emit("change", this.inputVal, this.selectedId);
      this.visible = false;
    },
    change: debounce(function() {
      this.selectedId = "";
      const value = this.inputVal;
      // 对输入的内容进行匹配
      if (value) {
        let openKeys = this.generateList.filter(i => {
          return i.title.indexOf(value) > -1;
        });
        this.expandedKeys = openKeys.map(i => i.key);
      } else {
        this.expandedKeys = [];
      }
    })
  },
  created() {
    this.invertTree(this.data);
  },
  mounted() {
    if (this.value) this.findTitle(this.value);
  }
};
</script>
