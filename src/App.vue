<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <template #renderEmpty>
        <a-empty />
      </template>
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/es/locale/zh_CN";
// import moment from "moment";
import "moment/locale/zh-cn";

export default {
  data() {
    return {
      locale: zhCN
    };
  }
};
</script>

<style lang="less">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  background-color: #f0f2f5;
}
</style>
