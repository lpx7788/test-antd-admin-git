<template>
  <i :class="classes" :style="styles"></i>
</template>
<script>
const fontFamily = "iconfont";
const prefixCls = "icon-";
export default {
  name: "icon",
  componentName: "icon",
  props: {
    type: String,
    size: [Number, String],
    color: String,
    fontStyle: {
      default: "normal",
      type: String
    }
  },
  computed: {
    classes() {
      return `${fontFamily} ${prefixCls + this.type}`;
    },
    styles() {
      let style = {};
      style["font-style"] = `normal`;
      style["margin-right"] = "10px";
      if (this.size) {
        style["font-size"] = `${this.size}px`;
      }
      if (this.fontStyle) {
        style["font-style"] = this.fontStyle;
      }
      if (this.color) {
        style.color = this.color;
      }
      return style;
    }
  }
};
</script>
