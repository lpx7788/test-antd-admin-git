<template>
  <div class="c-table">
    <!-- 搜索 -->
    <section class="table-search" v-if="search">
      <a-row :gutter="48">
        <a-col :md="4">
          <a-input-search @search="onSearch" class="search" :placeholder="'请输入关键字'" enter-button />
        </a-col>
        <slot name="header-search"></slot>
      </a-row>

    </section>
    <!-- 操作按钮 -->
    <section class="table-opertion flex-between mt20" v-if="rowSelection">
      <div class="header-opertion-l ">
        <a-button type="primary" class="mr10" icon="plus" @click="onAdd()">新建</a-button>
        <slot name="header-l-btn"></slot>
      </div>
       <div class="header-opertion-r">
          <slot name="header-r"></slot>
          <a-button shape="circle" icon="reload" @click="onReload" />
      </div>
    </section>
    <!-- 表格 -->
    <a-table
      :pagination="false"
      :loading="loading"
      :columns="columns"
      :row-selection="rowSelection?{type: 'checkbox', onChange: onSelectChange}:null"
      :data-source="datas"
      :ref="refs"
      size="middle"
      rowKey="id"
      class="mt20" >
      <template v-for="colCustom in columnsCustom" :slot="colCustom.customRender" slot-scope="item">
        <slot :name="colCustom.customRender" :tableRow="item"></slot>
      </template>
    </a-table>
    <!-- 分页 -->
    <c-pagination  v-if="showPagination" :datas="paginationDatas" @onShowNumChange="onShowNumChange"  @onShowSizeChange="onShowSizeChange"></c-pagination>
    
  </div>
</template>

<script>
export default {
  props: {
    datas: {
      type: Array,
      default: () => {
        return []
      }
    },
    paginationDatas: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showPagination: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    optionRow: {
      type: Array,
      default: () => {
        return []
      }
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    refs: {
      type: String,
      default: ''
    },
     columns: {
      type: Array,
      default: () => {
        return []
      }
    },
     rowSelection: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
    }
  },
  computed: {
    columnsCustom () {
      return this.columns
        .filter(item => {
          return item.scopedSlots
        })
        .map(item => item.scopedSlots)
    }
  },
  created () {
  },
  mounted () {
    // console.log('paginationDatas',this.paginationDatas)
  },
  methods: {
    onReload(){},
    onSelectChange (selectedRowKeys, selectedRows) {
      this.$emit('onSelectChange', selectedRowKeys, selectedRows)
    },
    onAdd (event) {
       this.$emit('onAdd')
    },
    onSearch (val) {
      this.$emit('onSearch', val)
    },
    onShowSizeChange (val) {
      this.$emit('onPageSizeChange', val)
    },
    onShowNumChange (val) {
      this.$emit('onShowNumChange', val)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
