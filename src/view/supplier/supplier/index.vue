<template>
  <el-row class="supplier">
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
  import bus from '@/bus'

  export default {
    data () {
      return {
        index: -1,
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
        bus.$on('getSupplierList', this.getSupplier)
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
      },
      selectItem (row) {
        this.index = this.index === row.id ? -1 : row.id
        bus.$emit('supplierRender', Object.assign({}, row, {index: this.index}))
      },
      setClass (row) {
        return row.id === this.index ? 'active' : ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .supplier tr {  cursor: pointer }
  /* .el-table::before {width: 0 ;  height: 0;} */
</style>
