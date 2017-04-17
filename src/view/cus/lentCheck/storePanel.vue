<template>
    <!--数据展示-->
    <el-col :span="12">
        <div class="my-panel">
            <el-row>
                <el-col :span="12">
                    <my-date text="开始日期" v-model="date1"></my-date>
                    <my-date text="结束日期" v-model="date2"></my-date>
                    <my-search text="客户编号"
                               v-show="type==1"
                               id="cus_id"
                               v-model="cus_id"
                               :method="searchCustomer"
                               :callback="callback"
                               :options="options">
                    </my-search>
                    <my-search text="供应商"
                               v-show="type==2"
                               id="supplier_id"
                               v-model="supplier_id"
                               :method="searchSupplier"
                               :callback="supplierCallback"
                               :options="supplierOptions">
                    </my-search>
                    <my-search text="查询角色" v-model="type" :options="roleType" :callback="changeRole" no-search></my-search>
                </el-col>
                <el-col :span="12">
                    <my-input text="拼音码" v-model="spell" disable></my-input>
                    <my-input text="名称" v-model="name" disable></my-input>
                    <div class="btn-panel">
                        <el-button type="primary">打印</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="my-panel" style="margin-top: 2px">
            <el-row>
                <el-table
                        :data="tableData"
                        height="555"
                        stripe
                        border
                        style="width: 100%;font-size: 12px">
                    <el-table-column v-for="(item, $index) in tableConfig"
                                     :key="$index"
                                     :prop="item.prop"
                                     :label="item.label"
                                     :width="item.width"
                    >
                    </el-table-column>
                </el-table>
                <p style="font-size: 14px;font-weight: bold;font-family: 微软雅黑">
                    前欠：{{beforeLoan}}&nbsp;&nbsp;&nbsp;日欠：{{todayLoan}}&nbsp;&nbsp;&nbsp;日收：{{todayGet}}&nbsp;&nbsp;&nbsp;
                    去尾：{{tail}}&nbsp;&nbsp;&nbsp;总欠：{{totalLoan}}
                </p>
            </el-row>
        </div>
    </el-col>
</template>

<script type="text/babel">
  import myInput from '@/components/myInput'
  import myDate from '@/components/myDatePicker'
  import mySearch from '@/components/mySearchInput'
  import api from '@/services/customer'
  import apiSupplier from '@/services/supplier'
  import bus from '@/bus'

  export default {
    data () {
      // 日期必须加上，否则默认今天
      return {
        date1: '',
        date2: '',
        type: 1,
        cus_id: '',
        supplier_id: '',
        spell: '',
        name: '',
        roleType: [
          {label: '客户', value: 1},
          {label: '供应商', value: 2}
        ],
        options: [],
        supplierOptions: [],
        tableConfig: [
          {label: '客户', prop: 'cName'},
          {label: '借款人', prop: 'supplier'},
          {label: '前欠', prop: 'beforeLoan'},
          {label: '日欠', prop: 'moneyloan'},
          {label: '日收', prop: 'moneyGet'},
          {label: '去尾数', prop: 'tail'},
          {label: '总欠', prop: 'money'}
        ],
        tableData: [],
        selected: false,
        beforeLoan: 0,
        todayLoan: 0,
        todayGet: 0,
        tail: 0,
        totalLoan: 0
      }
    },
    components: {
      myInput,
      mySearch,
      myDate
    },
    watch: {
      date1: 'renderData',
      date2: 'renderData'
    },
    mounted: function () {
      this.$nextTick(function () {
        bus.$off('loanDetailRender').$on('loanDetailRender', (row) => {
          this.selected = row.select >= 0
          if (this.selected) {
            this.getDetail(row.select)
          } else {
            this.tableData = []
          }
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
      changeRole () {
        bus.$emit('TypeChange', this.type)
      },
      getDetail (id) {
        api.checkLoanById({
          startDate: this.date1,
          endDate: this.date2,
          id: id
        })
          .then((data) => {
            if (data.ret === 0) {
              this.tableData = this.transData(data)
              this.countAll()
            }
          })
      },
      transData (data) {
        let total = data.total
        let debit = data.debit
        let debitSale = data.debitSale
        let special = ['moneyGet', 'moneyloan']
        const key = 'supplierId'
        // 数据合并
        let Join = (obj1, arr) => {
          let obj = {...obj1}
          for (let j = arr.length; j--;) {
            obj[arr[j][key]] = Object.assign(obj[arr[j][key]] || {}, arr[j])
          }
          return {...obj}
        }
        // 转数组
        let temp = Join(Join({}, total), debit)
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
      },
      renderData () {
        bus.$emit('RenderLoanData', {
          start: this.date1,
          end: this.date2
        })
      },
      // 客户搜索模块
      searchCustomer (key) {
        if (key === '') {
          this.spell = ''
          this.name = ''
        }
        api.searchCustomer({key: key || ''})
          .then((res) => {
            if (res.ret === 0) {
              this.options = api.toSearch(res.customers)
            }
          })
          .catch((msg) => {
            alert(msg)
          })
      },
      // 搜索函数回调
      callback (val) {
        let len = this.options.length
        for (let i = 0; i < len; i++) {
          if (this.options[i].value === val) {
            this.spell = this.options[i].spell
            this.name = this.options[i].name
            return true
          }
        }
      },
      searchSupplier (key) {
        if (key === '') {
          this.spell = ''
          this.name = ''
        }
        apiSupplier.getSupplier({key: key || ''})
          .then((res) => {
            if (res.ret === 0) {
              this.supplierOptions = apiSupplier.toSearch(res.suppliers)
            }
          })
          .catch((msg) => {
            alert(msg)
          })
      },
      // 供应商搜索回调
      supplierCallback (val) {
        let len = this.supplierOptions.length
        for (let i = 0; i < len; i++) {
          if (this.supplierOptions[i].value === val) {
            this.name = this.supplierOptions[i].label
            this.spell = ''
            return true
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
