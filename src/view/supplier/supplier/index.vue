<template>
  <el-row>
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

<script>
  import store from './storePanel'
  import api from '@/services/supplier'

  export default {
    data () {
      return {
        tableConfig: [
          {label: 'ID', prop: 'id'},
          {label: '名称', prop: 'name'},
          {label: '电话', prop: 'phone'}
        ],
        tableData: []
      }
    },
    components: {
      store
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getSupplier()
      })
    },
    methods: {
      getSupplier () {
        const self = this
        api.getSupplier().then(function (data) {
          if (data.ret === 0) {
            self.tableData = data.suppliers || []
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* .el-table::before {width: 0 ;  height: 0;} */
</style>
