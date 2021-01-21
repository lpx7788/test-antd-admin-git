<template>
    <a-button class="c-button" :type="type" :disabled="disabled" :loading="loading" @click="onClick">
        <slot/>
    </a-button>
</template>

<script>
import { debounce } from "@/util/common";

export default {
  props: {
    type: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    //   对点击事件进行防抖处理
    onClick: debounce(function() {
      this.$emit("click");
    })
  }
};
</script>
