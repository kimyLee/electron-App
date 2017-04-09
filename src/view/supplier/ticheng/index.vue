<template>
  <el-row>
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
                         :formatter="getStatus(item.label)"
                         :width="item.width">
        </el-table-column>
        <el-table-column
                         :prop="tableType.prop"
                         :label="tableType.label"
                         :width="tableType.width">
          <template v-if="item.label==='提成结算'" scope="scope">
            <p v-if="scope.row.type===1">件数提成：{{scope.row.unitFee}}</p>
            <div v-if="scope.row.type===2">
            </div>
          </template>
        </el-table-column>

      </el-table>
    </el-col>
    <!--操作-->
    <store></store>
  </el-row>
</template>

<script type="text/ecmascript-6">
  import store from './storePanel'
  import api from '@/services/supplier'
  import bus from '@/bus'

  export default {
    data () {
      return {
        index: -1,
        tableConfig: [
          {label: '名称', prop: 'name'},
          {label: '供应商', prop: 'supplier'},
          {label: '包装费', prop: 'packFee'},
          {label: '过磅费', prop: 'weighFee'},
          {label: '提成方式', prop: 'type'}
        ],
        tableType: {label: '提成结算', prop: ''},
        tableData: []
      }
    },
    components: {
      store
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getTicheng()
        bus.$on('getTichengList', this.getTicheng)
      })
    },
    methods: {
      getTicheng () {
        const self = this
        api.getTiCheng()
          .then((data) => {
            if (data.ret === 0) {
              self.tableData = data.settlements || []
            }
          })
      },
      // 状态过滤函数
      getStatus (label) {
        if (label === '提成方式') {
          return function (row) {
            return row.type === 1 ? '按件' : row.type === 2 ? '按百分比' : ''
          }
        }
        return null
      },
      selectItem (row) {
        this.index = this.index === row.id ? -1 : row.id
        bus.$emit('tichengRender', Object.assign({}, row, {index: this.index}))
      },
      setClass (row) {
        return row.id === this.index ? 'active' : ''
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
