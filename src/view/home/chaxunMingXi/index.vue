<template>
  <el-row class="customer">
    <!--数据展示-->
    <el-col :span="12">
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
  import api from '@/services/home'
  import bus from '@/bus'
  export default {
    data () {
      return {
        index: -1,
        tableConfigAll: [
          {label: '单号', prop: 'name'},
          {label: '客户编号', prop: 'count'},
          {label: '客户名', prop: 'count'},
          {label: '单据类型', prop: 'count'},
          {label: '总金额', prop: 'countUnit'},
          {label: '实收', prop: 'price'},
          {label: '总欠', prop: 'unit'},
          {label: '前欠', prop: 'weight'},
          {label: '去尾数', prop: 'pack'},
          {label: '对象', prop: 'pack'},
          {label: '日期', prop: 'supplier'}
        ],
        // 三轮车和出场在详情
        tableConfigSale: [
          {label: '单号', prop: 'name'},
          {label: '客户编号', prop: 'count'},
          {label: '客户名', prop: 'count'},
          {label: '总金额', prop: 'countUnit'},
          {label: '实收', prop: 'price'},
          {label: '总欠', prop: 'unit'},
          {label: '前欠', prop: 'weight'},
          {label: '去尾数', prop: 'pack'},
          {label: '日期', prop: 'supplier'}
        ],
        tableConfigLent: [
          {label: '客户编号', prop: 'count'},
          {label: '客户名', prop: 'count'},
          {label: '金额', prop: 'count'},
          {label: '借款对象', prop: 'countUnit'},
          {label: '日期', prop: 'price'}
        ],
        tableConfigTrans: [
          {label: '转账对象', prop: 'count'},
          {label: '总数', prop: 'count'},
          {label: '备注', prop: 'count'},
          {label: '日期', prop: 'price'}
        ],
        tableConfig: [],
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
      this.tableConfig = this.tableConfigAll
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
