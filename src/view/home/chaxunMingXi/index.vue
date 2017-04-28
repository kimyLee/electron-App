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

<script type="text/babel">
  import store from './storePanel'
  import api from '@/services/home'
  import bus from '@/bus'
  export default {
    data () {
      return {
        index: -1, // 选中的id
        selectType: '', // 选中的单据类型
        ticketType: 0, // 0 1 2 3 4 所有 销售 还款 借款 转账
        tableConfigAll: [
          {label: '单号', prop: 'id'},
          {label: '单据类型', prop: 'ticket'},
          {label: '客户编号', prop: 'cId'},
          {label: '客户名', prop: 'cName', width: 100},
          {label: '总金额', prop: 'money'},
          {label: '实收', prop: 'shishou'},
          {label: '总欠', prop: 'totalLoan'},
          {label: '前欠', prop: ''},
          {label: '去尾数', prop: 'tailMoney'},
          {label: '对象', prop: 'destination'},
          {label: '日期', prop: 'date', width: 120}
        ],
        // 三轮车和出场在详情
        tableConfigSale: [
          {label: '单号', prop: 'id'},
          {label: '单据类型', prop: 'ticket'},
          {label: '客户编号', prop: 'cId'},
          {label: '客户名', prop: 'cName', width: 100},
          {label: '总金额', prop: 'money'},
          {label: '实收', prop: 'shishou'},
          {label: '总欠', prop: 'totalLoan'},
          {label: '前欠', prop: ''},
          {label: '去尾数', prop: 'tailMoney'},
          {label: '日期', prop: 'date', width: 120}
        ],
        tableConfigLent: [
          {label: '单据类型', prop: 'ticket'},
          {label: '客户编号', prop: 'cId'},
          {label: '客户名', prop: 'cName', width: 100},
          {label: '金额', prop: 'money'},
          {label: '总欠', prop: 'totalLoan'},
          {label: '借款对象', prop: 'supplier'},
          {label: '日期', prop: 'date', width: 200}
        ],
        tableConfigTrans: [
          {label: '单据类型', prop: 'ticket'},
          {label: '转账对象', prop: 'destination'},
          {label: '总数', prop: 'amount'},
          {label: '备注', prop: 'remark'},
          {label: '日期', prop: 'date', width: 200}
        ],
        tableConfig: [], // 表格配置，用来赋值
        tableData: [], // 表格数据， 用来赋值显示
        saleData: [], // 销售单数据
        transData: [], // 转账单数据
        loanData: [] // 借还款数据
        // supplierId: '',
        // goodId: ''
      }
    },
    components: {
      store
    },
    mounted: function () {
      this.$nextTick(function () {
        bus.$off('ticketChange').$on('ticketChange', (type) => {
          this.ticketType = type
          this.FilterTable()
        })
        bus.$off('getGoodRender').$on('getGoodRender', (obj) => {
          this.getList(obj)
        })
        bus.$off('customerChange').$on('customerChange', (id) => {
          this.FilterTable('', id)
        })
      })
    },
    methods: {
      // 过滤单据数据
      FilterTable (isLoad, cid) {
        // 如果是请求
        if (isLoad) {
          this.saleData = this.saleData.map((e) => {
            e.ticket = '销售单'
            e.money = e.totalMoney
            e.date = (new Date(e.date)).Format('yyyy-MM-dd')
            return e
          })
          this.transData = this.transData.map((e) => {
            e.ticket = '转账单'
            e.money = e.amount
            e.cName = e.destination
            e.date = (new Date(e.date)).Format('yyyy-MM-dd')
            return e
          })
          this.loanData = this.loanData.map((e) => {
            e.id = e.loanId
            e.ticket = e.type ? '还款单' : '借款单'
            e.date = (new Date(e.date)).Format('yyyy-MM-dd')
            return e
          })
        }
        switch (this.ticketType) {
          case 0:
            this.tableConfig = [...this.tableConfigAll]
            this.tableData = this.saleData.concat(this.transData, this.loanData)
            break
          case 1:
            this.tableConfig = [...this.tableConfigSale]
            this.tableData = [...this.saleData]
            break
          case 2:
            this.tableConfig = [...this.tableConfigLent]
            this.tableData = this.loanData.filter((e) => {
              return e.type
            })
            break
          case 3:
            this.tableConfig = [...this.tableConfigLent]
            this.tableData = [...this.loanData]
            break
          case 4:
            this.tableConfig = [...this.tableConfigTrans]
            this.tableData = [...this.transData]
            break
          default:
            this.tableConfig = [...this.tableConfigAll]
            this.tableData = this.saleData.concat(this.transData, this.loanData)
        }
        if (cid) {
          this.tableData = this.tableData.filter((e) => {
            return e.cId === cid
          })
        }
      },
      // 获取单据数据
      getList (obj) {
        const today = (new Date()).Format('yyyy-MM-dd')
        // 可以传入 delete 参数
        api.checkAll({
          startDate: (obj && obj.begin) || today,
          endDate: (obj && obj.end) || today
        })
          .then((data) => {
            if (data.ret === 0) {
              this.saleData = data.sale || []
              this.transData = data.trans || []
              this.loanData = data.borrow || []
              this.FilterTable(true)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // 状态过滤函数
      getStatus (label) {
        if (label === '前欠') {
          return function (row) {
            if (row.ticket === '销售单') {
              return (row.totalLoan + row.tailMoney - row.money + row.shishou) || ''
            } else if (row.ticket === '借款单' || row.ticket === '还款单') {
              return row.totalLoan ? (row.totalLoan + (row.type ? 1 : -1) * row.money) : ''
            } else {
              return ''
            }
          }
        }
        return null
      },
      // 选择条目 type: 类型， 其他：数据
      selectItem (row) {
        if (this.index === row.id && this.selectType === row.ticket) {
          this.index = -1
          this.selectType = ''
        } else {
          this.index = row.id
          this.selectType = row.ticket
        }

        bus.$emit('getTicketDetail', Object.assign({}, row, {
          index: this.index,
          selectType: this.selectType
        }))
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
