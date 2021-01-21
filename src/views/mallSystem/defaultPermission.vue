<template>
    <div class="defaultPermission">
      <a-card :bordered="false">
        <c-table 
        :columns="tableColumns" 
        :datas="tableData" 
        :loading="loading"
        showPagination  
        :paginationDatas="paginationDatas"
        @onPageSizeChange="onPageSizeChange"
        @onShowNumChange="onShowNumChange"
         >
          <template slot="companyDirection" slot-scope="companyDirection">
            <span>{{ companyDirection.tableRow==='1'?'采购':companyDirection.tableRow==='2'?'销售': companyDirection.tableRow==='3'?'采购与销售':'' }}</span>
          </template>
          <template slot="resources" slot-scope="resources">
            <span v-for="item in resources.tableRow" :key="item.id">
              {{ item.resourceName }}
            </span>
          </template>
          <template slot="handle" slot-scope="row">
            <a @click="handleEdit(row.tableRow)">编辑</a>
          </template>
        </c-table>
      </a-card>
      <a-modal
        title="编辑权限"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        :destroyOnClose="true"
      >
        <c-form-model :datas="formData" :rules="rules" v-model="form" ref="formModels" ></c-form-model>
      </a-modal>
    </div>
</template>
<script>
import { getdefaultpermissions, editdefaultpermissions } from '@/api/mallSystem/defaultPermission'
import { getBaseResourceList } from '@/api/mallSystem/role'
import { toTree } from '@/util/common'

export default {
  name: 'defaultPermission',
  components: {
  },
  data () {
    return {
      loading: false,
      tableData: [],
      tableColumns: [
        {
          title: '默认角色名称',
          dataIndex: 'roleName',
          key: 'roleName'
        },
        {
          title: '默认权限',
          dataIndex: 'resources',
          key: 'resources',
          scopedSlots: { customRender: 'resources' }
        },
        {
          title: '业务方向',
          dataIndex: 'companyDirection',
          key: 'companyDirection',
          scopedSlots: { customRender: 'companyDirection' }
        },
        // {
        //   title: "创建时间",
        //   dataIndex: "createtime",
        //   key: "createtime"
        // },
        {
          title: '操作',
          key: 'handle',
          width: '100px',
          scopedSlots: { customRender: 'handle' }
        }
      ],
      confirmLoading: false,
      rules: {
        roleName: [{ required: true, message: '请输入角色', trigger: 'blur' }],
        companyDirection: [{ required: true, message: '请输入业务方向', trigger: 'change' }]
      },
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
          label: '权限设置',
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
      form: {
        roleName: '',
        companyDirection: '',
        resourceIds: []
      },
      paginationDatas:{
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        pageSize: 10,
        pageNum: 1,
        total: 0,
      },
      visible: false
    }
  },
  created () {
    this.onPageOnlod()
    this.onResourceList()
  },
  methods: {
     toTree,
    onResourceList () {
      getBaseResourceList().then(res => {
        this.formData[2].typeData = toTree(res.data, 0)
      })
    },
    onPageOnlod () {
      this.loading = true
      getdefaultpermissions({
        ...{
            pageSize:this.paginationDatas.pageSize,
            pageNum:this.paginationDatas.pageNum
           }
      })
      .then(res => {
        this.tableData = res.data.pageData
        this.paginationDatas.total = res.data.total
        this.loading = false
      })
      .finally(() => {
        this.loading = false
      })
    },
    handleEdit (row) {
       for (const key in this.form) {
        if (row[key]) {
          this.form[key] = row[key]
          this.form.id = row.id
        }
        this.form.resourceIds = row.resources.map(i => i.resourceId)
      }
      this.visible = true
    },
    handleOk () {
      const that = this
      this.$refs.formModels.handleValidate()
      .then((data) => {
        that.confirmLoading = true
        editdefaultpermissions(data).then((res) => {
          that.$message.success(res.msg)
          that.onPageOnlod()
          that.confirmLoading = false
          that.visible = false
        }).catch(() => {
          this.confirmLoading = false
        })
      })
    },
    onShowNumChange(val){
      this.paginationDatas.pageNum = val
      this.onPageOnlod()
    },
    onPageSizeChange(val){
      this.paginationDatas.pageSize = val
      this.onPageOnlod()
    },
    handleCancel () {
      this.visible = false
      this.confirmLoading = false
    }
  }
}
</script>
