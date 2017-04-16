<template>
  <el-row>
    <!--数据展示-->
    <el-col :span="12">
      <el-table
        :data="tableData"
        height="700"
        stripe
        border
        style="width: 100%;font-size: 12px">
        <el-table-column
          v-for="(item, $index) in tableConfig"
          :key="$index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width">
        </el-table-column>
      </el-table>
    </el-col>
    <filter-panel></filter-panel>
  </el-row>
</template>

<script type="text/ecmascript-6">
  import filterPanel from './storePanel.vue'
  import api from '@/services/customer'
  // import bus from '@/bus'

  export default {
    data () {
      return {
        tableConfig: [
          {label: '客户名称', prop: 'cName', width: '100'},
          {label: 'ID', prop: 'cId', width: '65'},
          {label: '前欠金额', prop: 'name', width: '100'},
          {label: '日欠金额', prop: 'money', width: '100'},
          {label: '日收金额', prop: 'name', width: '100'},
          {label: '去尾数', prop: 'name', width: '100'},
          {label: '总欠金额', prop: 'money', width: '100'}
        ],
        tableData: []
      }
    },
    components: {
      filterPanel
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getMoney()
      })
    },
    methods: {
      getMoney () {
        api.checkLoan()
          .then((data) => {
            if (data.ret === 0) {
              this.tableData = data.total || []
            }
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
