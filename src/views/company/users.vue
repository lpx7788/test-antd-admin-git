<template>
  <div class="home">
    <a-card :bordered="false">
      <c-table :columns="tableColumns" 
      :datas="tableData" 
      :loading="loading" 
      showPagination  
      :paginationDatas="paginationDatas"
       @onPageSizeChange="onPageSizeChange"
       @onShowNumChange="onShowNumChange"
       @onSearch="onSearch"
      >
        <template slot="roleName" slot-scope="roleName">
           <a-tag>{{ roleName.tableRow }}</a-tag>
        </template>
        <template slot="companyStatus" slot-scope="companyStatus">
           <a-tag>{{ companyStatus.tableRow }}</a-tag>
        </template>
        <template slot="handle" slot-scope="row">
          <a @click="handleView(row.tableRow)">查看</a>
        </template>
      </c-table>
    </a-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getTemplateRoles } from '@/api/mallSystem/role'
export default {
  name: "users",
  components: {},
  data() {
    return {
      tableColumns: [
        {
          title: "用户编号",
          dataIndex: "userId",
          width: "100",
        },
        {
          title: "真实姓名",
          dataIndex: "userName",
          width: "100",
        },
        {
          title: "手机号码",
          dataIndex: "userPhone",
        },
        {
          title: "所属公司",
          dataIndex: "companyName",
        },
        {
          title: "用户身份",
          dataIndex: "roleName",
          scopedSlots: { customRender: "roleName" },
        },
        {
          title: "有效期",
          dataIndex: "validityDate",
        },
        {
          title: "账户状态",
          dataIndex: "companyStatus",
          scopedSlots: { customRender: "companyStatus" },
          // search: true,
          // searchSpan: 4,
          // searchslot: true,
        },
        {
          title: "上次登录时间",
          dataIndex: "lastLoginDate",
          width: "200",
        },
        {
          title: '操作',
          key: 'handle',
          width: '100px',
          scopedSlots: { customRender: 'handle' }
        }
      ],
      tableData:[],
      paginationDatas:{
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        pageSize: 10,
        pageNum: 1,
        total: 0,
      },
    };
  },
  computed: {
    ...mapState({
    }),
  },
  created() {
    this.onPageOnlod()
  },
  mounted() {},
  methods: {
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
        this.tableData = res.data.pageData
        this.paginationDatas.total = res.data.total
        this.loading = false
      })
      .finally(() => {
        this.loading = false
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
    onSearch(){},
    handleView(row){
      console.log(row)
    }
  },
};
</script>

<style lang="less" scoped>
</style>
