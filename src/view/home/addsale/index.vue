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
  // import api from '@/services/fee'
  import bus from '@/bus'
  export default {
    data () {
      return {
        index: -1,
        tableConfig: [
          {label: '名称', prop: 'gName'},
          {label: '件数', prop: 'count'},
          {label: '数量', prop: 'countUnit'},
          {label: '单位', prop: 'unit'},
          {label: '单价', prop: 'gPrice'},
          {label: '过磅费', prop: 'gWeighFee'},
          {label: '包装费', prop: 'gPackFee'},
          {label: '供应商', prop: 'gSupplier'},
          {label: '合计', prop: 'money'}
        ],
        tableData: []
      }
    },
    components: {
      store
    },
    mounted: function () {
      this.$nextTick(function () {
        bus.$off('addInGood').$on('addInGood', this.render)
      })
    },
    beforeRouteLeave  (to, from, next) {
      if (this.tableData.length && !confirm('离开后页面信息将丢失，确认离开？')) {
        next(false)
      } else {
        next()
      }
    },
    methods: {
      render (arr) {
        this.index = -1
        for (let i = arr.length; i--;) {
          arr[i].index = i
        }
        this.tableData = [...arr]
      },
      selectItem (row) {
        this.index = this.index === row.index ? -1 : row.index
        bus.$emit('selectGoodIn', Object.assign({}, row, {select: this.index}))
      },
      setClass (row) {
        return (row.index === this.index ? 'active' : '')
      }
    }
  }
</script>
<style>
  .customer tr {  cursor: pointer }
</style>
