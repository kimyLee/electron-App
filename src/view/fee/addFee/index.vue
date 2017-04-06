<template>
  <el-row class="customer">
    <!--数据展示-->
    <el-col :span="18">
      <el-table
              :data="tableData"
              height="700"
              stripe
              border
              style="width: 100%;font-size: 12px">
        <el-table-column v-for="(item, $index) in tableConfig"
                         :prop="item.prop"
                         :label="item.label"
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
        tableConfig: [
          {label: '日期', prop: 'date'},
          {label: '编号', prop: 'id'},
          {label: '拼音码', prop: 'spell'},
          {label: '费用名称', prop: 'name'},
          {label: '供应商', prop: 'supplier'},
          {label: '费用金额', prop: 'money'},
          {label: '备注', prop: 'remark'}
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
        bus.$on('getFeeList', this.getFee)
      })
    },
    methods: {
      getFee () {
        const today = (new Date()).Format('yyyy-MM-dd')
        api.checkFee({
          startDate: today,
          endDate: today,
          delete: ''
        })
          .then((data) => {
            if (data.ret === 0) {
              this.tableData = data.costOrders || []
            }
          })
      }
    }
  }
</script>
<style>
  .customer tr {  cursor: pointer }
</style>
