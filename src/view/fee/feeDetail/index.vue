<template>
  <el-row class="customer">
    <!--数据展示-->
    <el-col :span="18">
      <el-table
              :data="tableData"
              height="700"
              stripe
              border
              :row-class-name="setClass"
              @row-click="selectItem"
              style="width: 100%;font-size: 12px">
        <el-table-column v-for="(item, $index) in tableConfig"
                         :key="$index"
                         :prop="item.prop"
                         :label="item.label"
                         :formatter="getStatus(item.label)"
                         :width="item.width">
        </el-table-column>
      </el-table>
    </el-col>
    <!--操作-->
    <store></store>
  </el-row>
</template>

<script type="text/ecmascript-6">
  import store from './storePanel'
  import api from '@/services/fee'
  import bus from '@/bus'
  export default {
    data () {
      return {
        index: -1,
        page: {size: 15, num: 1, total: 0},
        tableConfig: [
          {label: '日期', prop: 'date'},
          {label: '编号', prop: 'id'},
          {label: '拼音码', prop: 'spell'},
          {label: '费用名称', prop: 'name'},
          {label: '供应商', prop: 'supplier'},
          {label: '费用金额', prop: 'money'},
          {label: '备注', prop: 'remark'},
          {label: '状态', prop: 'isDelete'}
        ],
        tableData: []
      }
    },
    components: {
      store
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getFee()
        bus.$on('getFeeDetailList', this.getFee)
      })
    },
    methods: {
      getFee (obj) {
        const today = (new Date()).Format('yyyy-MM-dd')
        api.checkFee({
          startDate: (obj && obj.begin) || today,
          endDate: (obj && obj.end) || today,
          delete: (obj && obj.isDelete >= 0) ? obj.isDelete : ''
        })
          .then((data) => {
            if (data.ret === 0) {
              this.tableData = data.costOrders || []
            }
          })
      },
      // 状态过滤函数
      getStatus (label) {
        if (label === '状态') {
          return function (row) {
            return row.isDelete ? '已删除' : '未删除'
          }
        }
        return null
      },
      selectItem (row) {
        this.index = this.index === row.id ? -1 : row.id
        bus.$emit('feeDetailRender', Object.assign({}, row, {index: this.index}))
      },
      setClass (row) {
        return row.id === this.index ? 'active' : ''
      }
    }
  }
</script>
<style>
  .customer tr {  cursor: pointer }
</style>
