<template>
    <div class="role">
      <a-card :bordered="false">
        <c-table
          rowSelection
          @onSelectChange="onSelectChange"
          :columns="tableColumns"
          :datas="tableData"
          :loading="loading"
          @onAdd="handleAdd('','add')"
          @onSearch="onSearch()"
          showPagination  
          :paginationDatas="paginationDatas"
          @onPageSizeChange="onPageSizeChange"
          @onShowNumChange="onShowNumChange"
          search
          :refs="'multipleTable'"
        >
          <template slot="header-l-btn">
            <a-button icon="delete" v-if="selectedRowKeys.length > 0" type="danger" @click="handleDeleteAll">
              批量操作
            </a-button>
          </template>
          <template slot="companyDirection" slot-scope="companyDirection">
            <span>{{ companyDirection.tableRow==='1'?'采购':companyDirection.tableRow==='2'?'销售': companyDirection.tableRow==='3'?'采购与销售':'' }}</span>
          </template>
          <template slot="resources" slot-scope="resources">
            <span v-for="(item,index) in resources.tableRow" :key="item.id">
              <a-tag :color="tagColorList[index]" class="mr10" >{{ item.resourceName }}</a-tag>
            </span>
          </template>
          <template slot="action" slot-scope="record" >
            <a @click="handleEdit(record.tableRow,'edit')">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm :title="`是否确认删除 ${record.tableRow.roleName} 角色?`" ok-text="确定" cancel-text="取消" @confirm="(handleDel([record.tableRow.id]))">
              <a type="link">删除</a>
            </a-popconfirm>
          </template>

        </c-table>
        <a-modal
          :title="handleType=='add'?'新增角色':'编辑角色'"
          :visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          @cancel="handleCancel"
          :destroyOnClose="true"
        >
          <c-form-model :datas="formData" v-model="form" :rules="rules" ref="formModels" ></c-form-model>
        </a-modal>
      </a-card>
    </div>
</template>

<script>
import { getTemplateRoles, deleteTemplateRole, addRoleTemplate, getBaseResourceList, updateRoleTemplate } from '@/api/mallSystem/role'
import { toTree } from '@/util/common'

export default {
  name: 'Role',
  components: {
  },
  data () {
    return {
      handleType: 'add',
      deleteIdArr: [],
      selectedRowKeys: [],
      selectedRows: [],
      tableColumns: [
        {
          title: '角色名称',
          dataIndex: 'roleName'
        },
        {
          title: '角色权限',
          dataIndex: 'resources',
          scopedSlots: { customRender: 'resources' }
        },
        {
          title: '业务方向',
          dataIndex: 'companyDirection',
          scopedSlots: { customRender: 'companyDirection' }
        },
        // {
        //   title: '创建时间',
        //   dataIndex: 'updatedAt'
        // },
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }

      ],
      formData: [
        {
          label: '角色名称',
          prop: 'roleName'
        },
        {
          label: '业务方向',
          prop: 'companyDirection',
          type: 'select',
          typeData: [
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
          label: '角色权限',
          prop: 'resourceIds',
          type: 'tree',
          typeData: [],
          replaceFields: {
            children: 'children',
            title: 'resourceName',
            key: 'id'
          }
        }
      ],
      tableData: [],
      tagColorList: ['green', 'cyan', 'blue', 'purple', 'red', 'pink', 'orange'],
      loading: false,
      visible: false,
      confirmLoading: false,
      form: {
        roleName: '',
        companyDirection: '1',
        resourceIds: []
      },
      rules: {
        roleName: [{ required: true, message: '请输入角色', trigger: 'blur' }],
        companyDirection: [{ required: true, message: '请输入业务方向', trigger: 'change' }]
      }, 
      paginationDatas:{
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        pageSize: 20,
        pageNum: 1,
        total: 0,
      },
    }
  },
 computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  created () {
    this.onPageOnlod()
    this.onResourceList()
  },

  methods: {
    onSearch () {
      console.log('onSearch')
    },
    handleAdd () {
      this.form = {
        roleName: '',
        companyDirection: '1',
        resourceIds: []
      }
      this.handleType = 'add'
      this.visible = true
    },
    handleEdit (row) {
      for (const key in this.form) {
        if (row[key]) this.form[key] = row[key]
         this.form.id = row.id
      }
      this.handleType = 'edit'
      this.visible = true
      this.form.resourceIds = row.resources.map(i => i.resourceId)
    },
    toTree,
    onResourceList () {
      getBaseResourceList().then(res => {
        this.formData[2].typeData = toTree(res.data, 0)
      })
    },
    onPageOnlod () {
      this.loading = true
      getTemplateRoles({
        pageData: {
         ...{
            pageSize:this.paginationDatas.pageSize,
            pageNum:this.paginationDatas.pageNum
           }
        }
      })
      .then(res => {
        // res.data.pageData = res.data.pageData.filter((item) => {
        //   return item.id >= 30
        //  })
        this.tableData = res.data.pageData
        this.paginationDatas.total = res.data.total
        this.loading = false
      })
      .finally(() => {
        this.loading = false
      })
    },
    handleDel (idArr) {
       deleteTemplateRole(idArr).then((res) => {
        this.$message.success(res.msg)
        this.onPageOnlod()
      })
    },
    handleOk () {
      const that = this
      let onFun
      that.handleType === 'add' ? (onFun = addRoleTemplate) : (onFun = updateRoleTemplate)
      this.$refs.formModels.handleValidate()
      .then((data) => {
        that.confirmLoading = true
        onFun(data).then((res) => {
          that.$message.success(res.msg)
          that.deleteIdArr = []
          that.selectedRowKeys = []
          that.selectedRows = []
          that.onPageOnlod()
          that.confirmLoading = false
          that.visible = false
        }).catch(() => {
          this.confirmLoading = false
        })
      })
    },
    handleCancel () {
      this.visible = false
    },
    handleDeleteAll () {
      this.deleteIdArr = []
      this.selectedRows.map((item) => { return this.deleteIdArr.push(item.id) })
      this.handleDel([...new Set(this.deleteIdArr)])
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    onShowNumChange(val){
      this.paginationDatas.pageNum = val
      this.onPageOnlod()
    },
    onPageSizeChange(val){
      this.paginationDatas.pageSize = val
      this.onPageOnlod()
    },
  }
}
</script>
