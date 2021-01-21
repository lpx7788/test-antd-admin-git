<template>

 <div class="c-pagination flex-center" v-if="datas.total>=datas.pageSize" >
  <div class="pagination-content">
    <a-pagination
    v-model="datas.pageNum"
    :page-size-options="datas.pageSizeOptions"
    :total="datas.total"
    show-size-changer
    show-quick-jumper
    :page-size="datas.pageSize"
    :show-total="total => `共 ${total} 条`"
    @showSizeChange="onShowSizeChange"
    @change="onChangePageNumber"
  >
    </a-pagination>
  </div>
 </div>
</template>
<script>
export default {
   props: {
    datas: {
      type: Object,
      default: () => {
        return {}
      }
    }
   },
  data() {
    return {
    };
  },
  methods: {
    onChangePageNumber(pageNum){
      this.datas.pageNum = pageNum;
      this.$emit('onShowNumChange', pageNum)
    },
    onShowSizeChange(current, pageSize) {
      this.datas.pageSize = pageSize;
      this.$emit('onShowSizeChange', pageSize)
    },
  },
};
</script>

<style lang="scss" scoped>
  .pagination-content{
    flex: 1;
    text-align: right;
    margin: 25px 0 20px 20px;
   
  }
  
</style>