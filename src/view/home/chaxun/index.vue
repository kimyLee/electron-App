<template>
  <el-row class="customer">
    <!--数据展示-->
    <el-col :span="12">
      <el-table
        :data="tableData"
        height="670"
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
      <p style="font-size: 16px;font-weight: bold">
        <span style="display: inline-block;width: 150px">件数：{{totalCount}}</span>
        <span style="display: inline-block;width: 150px">数量：{{totalCountUnit}}</span>
        <span style="display: inline-block;width: 150px">金额：{{totalMoney}}</span>
      </p>
    </el-col>
    <!--操作-->
    <store></store>
  </el-row>
</template>

<script type="text/ecmascript-6">
  import store from './storePanel'
  import api from '@/services/home'
  import bus from '@/bus'
  export default {
    data () {
      return {
        index: -1,
        tableConfig: [
          {label: '名称', prop: 'name'},
          {label: '件数', prop: 'count'},
          {label: '数量', prop: 'countUnit'},
          {label: '均价', prop: 'price'},
          {label: '单位', prop: 'unit'},
          {label: '过磅费', prop: 'weight'},
          {label: '包装费', prop: 'pack'},
          {label: '供应商', prop: 'supplier'},
          {label: '合计', prop: 'totalMoney'}
        ],
        tableData: [],
        originData: [],
        totalCount: 0,
        totalCountUnit: 0,
        totalMoney: 0,
        supplierId: '',
        goodId: ''
      }
    },
    components: {
      store
    },
    watch: {
      tableData: 'countTotal'
    },
    mounted: function () {
      this.$nextTick(function () {
        bus.$off('getGoodRender').$on('getGoodRender', (obj) => {
          this.getList(obj)
        })
        bus.$off('renderFilter').$on('renderFilter', (obj) => {
          this.supplierId = obj.supplierId
          this.goodId = obj.goodId
          this.FilterTable(this.originData)
        })
      })
    },
    methods: {
      countTotal (arr) {
        this.totalCount = 0
        this.totalCountUnit = 0
        this.totalMoney = 0
        for (let i = arr.length; i--;) {
          this.totalCount += arr[i].count
          this.totalCountUnit += arr[i].countUnit
          this.totalMoney += arr[i].totalMoney
        }
        this.totalMoney = this.totalMoney.toFixed(2)
      },
      FilterTable (arr) {
        this.tableData = arr.filter((e) => {
          return (e.id === this.goodId || !this.goodId) &&
            (e.supplierId === this.supplierId || !this.supplierId)
        })
      },
      getList (obj) {
        const today = (new Date()).Format('yyyy-MM-dd')
        // 可以传入 delete 参数
        api.checkOrder({
          startDate: (obj && obj.begin) || today,
          endDate: (obj && obj.end) || today
        })
          .then((data) => {
            if (data.ret === 0) {
              this.originData = data.list || []
              this.FilterTable(this.originData)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // 状态过滤函数
      getStatus (label) {
        if (label === '均价') {
          return function (row) {
            return ((row.totalMoney - row.weight - row.pack) / row.countUnit).toFixed(2)
          }
        }
        return null
      },
      selectItem (row) {
        this.index = this.index === row.id ? -1 : row.id
        bus.$emit('getGoodDetail', Object.assign({}, row, {select: this.index}))
      },
      setClass (row) {
        return (row.id === this.index ? 'active' : '')
      }
    }
  }
</script>
<style>
  .customer tr {
    cursor: pointer
  }
</style>
