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
                         :key="$index"
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
  import api from '@/services/customer'
  import bus from '@/bus'
  export default {
    data () {
      return {
        index: -1,
        tableConfig: [
          {label: '借款对象', prop: 'supplier'},
          {label: '总欠金额', prop: 'money'}
        ],
        tableData: []
      }
    },
    components: {
      store
    },
    mounted: function () {
      this.$nextTick(function () {
        bus.$on('getBorrowMoney', this.getMoney)
      })
    },
    methods: {
      getMoney (id) {
        if (id) {
          api.getBorrowMoney({id})
            .then((data) => {
              if (data.ret === 0) {
                this.tableData = data.details || []
              }
            })
        }
      }
    }
  }
</script>
<style>
  .customer tr {  cursor: pointer }
</style>
