<template>
    <div class="role">
      <a-card :bordered="false">
        <c-table
          :columns="columns"
          @onAdd="handleAdd('', 'add')"
          :datas="tableData"
          @onSelectChange="onSelectChange"
          @onSearch="onSearch"
          :loading="loading"
          rowSelection
          search
        >
          <template slot="header-l-btn">
            <a-button icon="delete" v-if="selectedRowKeys.length > 0" type="danger" @click="handleDeleteAll"> 批量操作 </a-button>
          </template>
          <template slot="type" slot-scope="type">
            <a-tag color="blue">{{
              type.tableRow === 0 ? '菜单' : type.tableRow === 1 ? '按钮' : type.tableRow === 2 ? '下拉框列表' : ''
            }}</a-tag>
          </template>

          <template slot="handle" slot-scope="row">
            <a @click="handleEdit(row.tableRow)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm
              :title="`是否确认删除该权限资源管理?`"
              ok-text="确定"
              cancel-text="取消"
              @confirm="handleDel([row.tableRow.key])"
            >
              <a>删除</a>
            </a-popconfirm>
            <!-- <a-divider type="vertical" /> -->
            <!-- <a @click="handleAddChildMenu(row.tableRow)">新增子菜单</a> -->
          </template>
        </c-table>
        <a-modal
          width="800px"
          :title="handleType == 'add' ? '新增角色' : '编辑角色'"
          :visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          @cancel="handleCancel"
          :destroyOnClose="true"
        >
          <c-form-model
            :datas="formData"
            @onTreeSelect="onTreeSelect"
            v-model="form"
            :rules="rules"
            ref="formModels"
          ></c-form-model>
        </a-modal>
      </a-card>
    </div>
</template>
<script>
import {
  getResourceList,
  deleteResourceList,
  addResourceList,
  updateResourceList
} from '@/api/mallSystem/permissionResource'
import { refactoringArr } from '@/util/common'

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'resourceName',
    key: 'resourceName'
  },
  {
    title: '路由地址',
    dataIndex: 'url',
    key: 'url'
  },
  {
    title: '菜单编号',
    dataIndex: 'flag',
    key: 'flag'
  },
  {
    title: '菜单排序',
    dataIndex: 'orderNum',
    key: 'orderNum'
  },
  {
    title: '菜单类型',
    dataIndex: 'type',
    key: 'type',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '操作',
    key: 'handle',
    width: '100px',
    scopedSlots: { customRender: 'handle' }
  }
]
const formData = [
  {
    label: '上级菜单',
    prop: 'parentId',
    type: 'tree-select',
    typeData: []
  },
  {
    label: '权限名称',
    prop: 'resourceName'
  },
  {
    label: '方向标识',
    prop: 'resourceDirection',
    type: 'select',
    typeData: [
      {
        label: '公共',
        value: '0'
      },
      {
        label: '采购',
        value: '1'
      },
      {
        label: '销售',
        value: '2'
      },
      {
        label: '采购与销售',
        value: '3'
      }
    ]
  },
  {
    label: '前端标识',
    prop: 'flag'
  },
  {
    label: '资源URL',
    prop: 'url'
  },
  {
    label: '排序',
    prop: 'orderNum',
    type: 'number'
  },
  {
    label: '类型',
    prop: 'type',
    type: 'radio',
    typeData: [
      {
        label: '菜单',
        value: '0'
      },
      {
        label: '按钮',
        value: '1'
      },
      {
        label: '下拉框列表',
        value: '2'
      }
    ]
  },
  {
    label: '备注',
    prop: 'remark',
    type: 'textarea'
  }
]
const rules = {
  resourceName: [{ required: true, message: '请输入前权限名称', trigger: 'change' }],
  flag: [{ required: true, message: '请输入前端标识', trigger: 'change' }],
  url: [{ required: true, message: '请输入资源URL', trigger: 'change' }],
  orderNum: [{ required: true, message: '请输入排序', trigger: 'change' }],
  type: [{ required: true, message: '请输入类型', trigger: 'blur' }]
}
export default {
   name: 'permissionResource',
  data () {
    return {
      columns,
      formData,
      rules,
      handleType: 'add',
      loading: false,
      tableData: [],
      deleteIdArr: [],
      selectedRowKeys: [],
      selectedRows: [],
      visible: false,
      confirmLoading: false,
      form: {
        resourceDirection: '0',
        parentId: '',
        flag: '',
        key: '',
        orderNum: '',
        resourceName: '',
        type: '0',
        url: ''
      },
      searchKey: ''
    }
  },
  created () {
    this.onPageOnlod()
  },
  methods: {
    refactoringArr,
    onTreeSelect (val) {
    },
    onSearch (val) {
      this.searchKey = val
      this.onPageOnlod()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    onPageOnlod () {
      this.loading = true
      getResourceList({ type: this.searchKey }).then((res) => {
        this.loading = false
        this.tableData = refactoringArr(res.data, (item) => {
          return {
            id:item.id,
            key: item.id,
            resourceName: item.resourceName,
            url: item.url,
            orderNum: item.orderNum,
            flag: item.flag,
            type: item.type,
            parentId: item.parentId
          }
        })
        this.formData[0].typeData = refactoringArr(res.data, (item) => {
          return {
            id:item.id,
            key: item.id,
            parentId: item.parentId,
            value: item.id,
            title: item.resourceName
          }
        })
      })
    },
    handleAdd () {
      this.form = {
        resourceDirection: '0',
        parentId: '',
        flag: '',
        key: '',
        orderNum: '',
        resourceName: '',
        type: '0',
        url: ''
      }
      this.handleType = 'add'
      this.visible = true
    },
    handleOk () {
      const that = this
      let onFun

      that.handleType === 'add' ? (onFun = addResourceList) : (onFun = updateResourceList)
      this.$refs.formModels.handleValidate().then((data) => {
        that.confirmLoading = true
        if (!data.parentId) data.parentId = '0'
        onFun(data)
          .then((res) => {
            that.$message.success(res.msg)
            that.onPageOnlod()
            this.selectedRowKeys = []
            this.selectedRows = []
            that.confirmLoading = false
            that.visible = false
          })
          .catch(() => {
            this.confirmLoading = false
          })
      })
    },
    handleCancel () {
      this.visible = false
    },
    handleDel (idArr) {
      deleteResourceList(idArr).then((res) => {
        this.$message.success(res.msg)
        this.onPageOnlod()
      })
    },
    handleEdit (row) {
      for (const item in this.form) {
        if (row[item]) {
          this.form[item] = row[item]
          this.form['id'] = row.key
          this.form['type'] = row.type + ''
          row.parentId === 0 ? this.form['parentId'] = '' : this.form['parentId'] = row.parentId
        }
      }
      this.handleType = 'edit'
      this.visible = true
    },
    handleDeleteAll () {
      this.deleteIdArr = []
      this.selectedRows.map((item) => { return this.deleteIdArr.push(item.key) })
      // console.log(this.deleteIdArr)
      this.handleDel([...new Set(this.deleteIdArr)])
    },
    handleAddChildMenu () {
      // console.log('新增子菜单')
    }
  }
}
</script>
