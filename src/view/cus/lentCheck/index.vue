<template>
    <el-row>
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
                <el-table-column
                        v-for="(item, $index) in tableConfig"
                        :key="$index"
                        :prop="item.prop"
                        :label="item.label"
                        :width="item.width">
                </el-table-column>
            </el-table>
            <p style="font-size: 14px;font-weight: bold;font-family: 微软雅黑">
                前欠：{{beforeLoan}}&nbsp;&nbsp;&nbsp;日欠：{{todayLoan}}&nbsp;&nbsp;&nbsp;日收：{{todayGet}}&nbsp;&nbsp;&nbsp;
                去尾：{{tail}}&nbsp;&nbsp;&nbsp;总欠：{{totalLoan}}
            </p>
        </el-col>
        <filter-panel></filter-panel>
    </el-row>
</template>

<script type="text/babel">
  import filterPanel from './storePanel.vue'
  import api from '@/services/customer'
  import bus from '@/bus'

  export default {
    data () {
      return {
        index: -1,
        type: 1,
        tableConfig: [
          {label: '客户名称', prop: 'cName', width: '100'},
          {label: 'ID', prop: 'cId', width: '65'},
          {label: '前欠金额', prop: 'beforeMoney', width: '100'},
          {label: '日欠金额', prop: 'moneyloan', width: '100'},
          {label: '日收金额', prop: 'moneyGet', width: '100'},
          {label: '去尾数', prop: 'tail', width: '100'},
          {label: '总欠金额', prop: 'money', width: '100'}
        ],
        tableData: [],
        beforeLoan: 0,
        todayLoan: 0,
        todayGet: 0,
        tail: 0,
        totalLoan: 0
      }
    },
    components: {
      filterPanel
    },
    mounted: function () {
      this.$nextTick(function () {
        bus.$off('RenderLoanData').$on('RenderLoanData', this.getMoney)
        bus.$off('TypeChange').$on('TypeChange', (type) => {
          this.type = type
          this.getMoney()
        })
      })
    },
    methods: {
      countAll () {
        this.beforeLoan = 0
        this.todayLoan = 0
        this.todayGet = 0
        this.tail = 0
        this.totalLoan = 0
        for (let i = this.tableData.length; i--;) {
          this.beforeLoan += this.tableData[i].beforeLoan || 0
          this.todayLoan += this.tableData[i].moneyloan || 0
          this.todayGet += this.tableData[i].moneyGet || 0
          this.tail += this.tableData[i].tail || 0
          this.totalLoan += this.tableData[i].money || 0
        }
      },
      getMoney (obj) {
        const today = (new Date()).Format('yyyy-MM-dd')
        if (this.type === 1) {
          api.checkLoan({
            startDate: (obj && obj.begin) || today,
            endDate: (obj && obj.end) || today
          })
            .then((data) => {
              if (data.ret === 0) {
                this.tableData = this.transData(data)
                this.countAll()
                // console.log(this.tableData)
              }
            })
        } else {
          api.checkLoanSupplier({
            startDate: (obj && obj.begin) || today,
            endDate: (obj && obj.end) || today
          })
            .then((data) => {
              if (data.ret === 0) {
                this.tableData = this.transData(data, 'supplierId')
                this.countAll()
                // console.log(this.tableData)
              }
            })
        }
      },
      selectItem (row) {
        let key = this.type === 1 ? 'cId' : 'supplierId'
        console.log(row, key)
        this.index = this.index === row[key] ? -1 : row[key]
        bus.$emit('loanDetailRender', Object.assign({}, row, {select: this.index}))
      },
      setClass (row) {
        let key = this.type === 1 ? 'cId' : 'supplierId'
        return row[key] === this.index ? 'active' : ''
      },
      // 数据转换
      transData (data, text) {
        let total = data.total
        let tail = data.tail
        let debit = data.debit
        let debitSale = data.debitSale
        let special = ['moneyGet', 'moneyloan']
        const key = text || 'cId'
        // 数据合并
        let Join = (obj1, arr) => {
          let obj = {...obj1}
          for (let j = arr.length; j--;) {
            obj[arr[j][key]] = Object.assign(obj[arr[j][key]] || {}, arr[j])
          }
          return {...obj}
        }
        // 转数组
        let temp = Join(Join(Join({}, tail), total), debit)
        for (let k = debitSale.length; k--;) {
          let Index = debitSale[k][key]
          temp[Index] = temp[Index] || {}
          for (let s = special.length; s--;) {
            temp[Index][special[s]] = (temp[Index][special[s]] - 0 || 0) + (debitSale[k][special[s]] - 0 || 0)
          }
        }
        let Arr = []
        for (let i in temp) {
          Arr.push(temp[i])
        }
        return Arr
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
