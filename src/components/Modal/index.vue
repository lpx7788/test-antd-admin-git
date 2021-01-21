<template>
    <div class="c-modal" :class="center?'center':''" ref="modal">
        <a-modal v-model="status" :title="title" :getContainer="() => $refs.modal" :confirm-loading="okLoading" :destroyOnClose="destroyOnClose" @ok="handleOk" @cancel="handleCancel" :maskClosable="false" :keyboard="false">
            <slot/>
        </a-modal>
    </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: () => {
        return "温馨提示";
      }
    },
    center: {
      type: Boolean,
      default: true
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    okLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visibleStatus: false
    };
  },
  computed: {
    status: {
      get() {
        return this.visibleStatus;
      },
      set(n) {
        this.visibleStatus = n;
      }
    }
  },
  watch: {
    visible(n) {
      this.visibleStatus = n;
    }
  },
  methods: {
    handleOk() {
      this.$emit("handleOk");
    },
    handleCancel() {
      this.$emit("handleCancel");
    }
  }
};
</script>

<style lang="less" scoped>
.c-modal.center {
  ::v-deep .ant-modal-header,
  ::v-deep .ant-modal-footer {
    text-align: center;
  }
}
</style>
