<template>
  <!--操作-->
  <el-col :span='12'>
    <div class='my-panel' style='padding: 0'>
      <el-row>
        <el-col :span="12">
          <my-date text="开始日期" v-model="date1"></my-date>
          <my-date text="销售日期" v-model="date2"></my-date>
          <my-search text="单据类型"
                     v-model="ticket"
                     :options="ticketType"
                     :callback="ticketChange"
                     no-search></my-search>
        </el-col>
        <el-col :span="12">
          <my-search text="客户搜索"
                     id="cus_id"
                     v-model="cus_id"
                     :method="searchCustomer"
                     :callback="cuscallback"
                     :options="options">
          </my-search>
          <my-input text="客户名称" v-model="cus_name" disable></my-input>
          <my-input text="拼音码" v-model="cus_spell" disable></my-input>
        </el-col>
      </el-row>
      <section class='btn-panel'>
        <div class='btnItem'
             @keyup.up="goTarget('factMoney')">
          <el-button type='primary' id='addMoney'
                     @click.stop='addIOMoney'>查询
          </el-button>
        </div>
        <div class='btnItem'>
          <el-button  id='fee_del'
                     @click.stop='cancelAll'>打印
          </el-button>
        </div>
      </section>
      <div class="my-panel" style="margin-top: 2px;min-height: 560px">
        <el-row>
          <div  v-show="showType===2" class="printField">
            <p class="title">还款单</p>
            <hr style="margin-bottom: 20px;">
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">借款日期：</span>
              <span>{{returnData.date}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">借款单号:</span><span>{{returnData.id}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">客户名称:</span><span>{{returnData.cName}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">借款对象:</span><span>{{returnData.supplier}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">借款金额:</span><span>{{returnData.money}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">总欠金额：</span><span>{{returnData.totalLoan}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">前欠金额：</span><span>{{(returnData.totalLoan - returnData.money) || ''}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">备注：</span><span>{{returnData.remark}}</span></p>
          </div>
          <div  v-show="showType===3" class="printField">
            <p class="title">借款单</p>
            <hr style="margin-bottom: 20px;">
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">借款日期：</span>
              <span>{{loanData.date}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">借款单号:</span><span>{{loanData.id}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">客户名称:</span><span>{{loanData.cName}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">借款对象:</span><span>{{loanData.supplier}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">借款金额:</span><span>{{loanData.money}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">总欠金额：</span><span>{{loanData.totalLoan}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">前欠金额：</span><span>{{(loanData.totalLoan - loanData.money) || ''}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">备注：</span><span>{{loanData.remark}}</span></p>
          </div>
          <div  v-show="showType===4" class="printField">
            <p class="title">转账单</p>
            <hr style="margin-bottom: 20px;">
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">转账日期：</span>
              <span>{{transData.date}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">单号:</span><span>{{transData.id}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">客户名称:</span><span>{{transData.destination}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">转账金额：</span><span>{{transData.amount}}</span></p>
            <p><span style="width: 150px;font-weight: bold;font-size: 16px;margin-right: 20px">备注：</span><span>{{transData.remark}}</span></p>
          </div>
          <!--支持改单-->
          <div v-show="showType===1">
            <el-row>
              <el-col :span="12">
                <my-input text='下单客户' v-model='saleData.cName' disable></my-input>
                <my-input text='客户编码' v-model='saleData.cId' disable></my-input>
                <my-input text='拼音码' v-model='saleData.cSpell' disable></my-input>
              </el-col>
              <el-col :span="12">
                <my-input text='件数' v-model='good_count' id='count' next='countUnit' pre='!good_id'></my-input>
                <my-input text='数量' v-model='good_countUnit' id='countUnit' next='price' pre="count"></my-input>
                <my-input text='单价' v-model='good_price' id='price' next='addGood' pre="!countUnit"></my-input>
              </el-col>
            </el-row>
            <hr/>
            <el-row>
              <el-col :span="12">
                <my-input text='合计金额' v-model='totalMoney' disable></my-input>
                <!-- <my-input text='前欠金额' :value='beforeLoan' disable></my-input>-->
                <my-input text='挂欠金额' v-model='loanMoney' disable></my-input>
                <my-input text='去尾数' v-model='saleData.tailMoney' id='tailMoney' disable></my-input>
                <my-input text='出场费' v-model='saleData.appearanceFee' id='appear' disable></my-input>

              </el-col>
              <el-col :span="12">
                <my-input text='尾数供应商' v-model='saleData.supplier' disable></my-input>
                <my-input text='总欠金额' v-model='saleData.totalLoan' disable></my-input>
                <my-input text='三轮车费' v-model='saleData.carFee' id='traffic' next='factMoney' pre="appear"></my-input>
                <my-input text='实收金额' v-model='saleData.shishou' id='factMoney' next='addMoney' pre="traffic"></my-input>
              </el-col>
            </el-row>
            <hr/>
            <!--<my-date text='日期' v-model='date' id='fee_date' next='fee_name'></my-date>-->
            <section class='btn-panel'>
              <div class='btnItem'
                   @keyup.down="goTarget('!good_id')"
                   @keyup.up="goTarget('price')">
                <el-button type='primary' id='addGood'
                           @click.stop='addGood'>{{selected ? '修改' : '添加'}}
                </el-button>
              </div>
              <!--修改条目-->
              <div class='btnItem'
                   @keyup.down="goTarget('!good_id')"
                   @keyup.up="goTarget('price')">
                <el-button type='primary'
                           @click.stop='correctGood'>修改
                </el-button>
              </div>
              <div class='btnItem'
                   v-show="selected">
                <el-button type='danger'
                           @click.stop='delGood'>删除
                </el-button>
              </div>
            </section>
            <el-table
              :data="tableData"
              height="350"
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
          </div>
        </el-row>
      </div>
    </div>
  </el-col>
</template>

<script type='text/ecmascript-6'>
  import myDate from '@/components/myDatePicker'
  import myInput from '@/components/myInput'
  import mySearch from '@/components/mySearchInput'
  import api from '@/services/home'
  import apiCustomer from '@/services/customer'
  import bus from '@/bus'

  export default {
    data () {
      return {
        ticket: 0, // 单据类型
        ticketType: [
          {label: '所有', value: 0},
          {label: '销售单', value: 1},
          {label: '还款单', value: 2},
          {label: '借款单', value: 3},
          {label: '转账单', value: 4}
        ],
        cus_id: '', // 客户编码
        cus_name: '', // 客户名
        cus_spell: '', // 客户拼音
        date1: '', // 开始日期
        date2: '', // 结束日期
        showType: 0,  // 详情显示类型 1 销售 2 借款 3 还款 4 转账
        transData: {}, //  转账数据
        loanData: {}, //  借款数据
        returnData: {}, //  还款数据
        saleData: {}, //  销售数据
        saleDataDetail: {}, //  销售数据详情
        totalMoney: 0, // 改单合计金额
        tableConfig: [ // 表格配置
          {label: '名称', prop: 'name'},
          {label: '件数', prop: 'count'},
          {label: '数量', prop: 'countUnit'},
          {label: '单位', prop: 'unit'},
          {label: '单价', prop: 'price'},
          {label: '过磅费', prop: 'weighFee'},
          {label: '包装费', prop: 'packFee'},
          {label: '供应商', prop: 'supplier'},
          {label: '合计', prop: 'money'}
        ],
        tableData: [], // 表格数据
        index: -1, // 选中商品
        good_count: '', // 商品件数
        good_countUnit: '', // 商品数量
        good_price: '',  // 商品价格
        options: [],
        supplier: '',
        supplier_id: '',
        supplierOptions: [],
        selected: false,

        totalCount: 0,
        totalCountUnit: 0
      }
    },
    components: {
      myInput,
      myDate,
      mySearch
    },
    computed: {
      // 总欠金额
      totalMoney () {
        let temp = 0
        for (let i = this.tableData.length; i--;) {
          temp += this.tableData[i].money
        }
        temp = temp + (this.traffic - 0) + (this.appear - 0)
        // 如果是现金客户（这里不用考虑）
        if (this.cus_id === 1) {
          this.factMoney = Math.round(temp)
        }
        return Math.round(temp)
      },
      // 挂欠金额
      loanMoney () {
        if (this.saleData.money !== '' && this.saleData.shishou !== '') {
          return this.saleData.money - this.saleData.shishou
        } else {
          return ''
        }
      }
    },
    watch: {
      date1: 'fireRender',
      date2: 'fireRender',
      cus_id: 'myFilter'
      // good_id: 'myFilter'
    },
    mounted: function () {
      this.$nextTick(function () {
        bus.$off('getTicketDetail').$on('getTicketDetail', (row) => {
          this.transData = {}
          this.loanData = {}
          this.returnData = {}
          this.saleData = {}
          if (row.selectType === '转账单') {
            this.showType = 4
            this.transData = row
            return true
          }
          if (row.selectType === '借款单') {
            this.showType = 3
            this.loanData = row
            return true
          }
          if (row.selectType === '还款单') {
            this.showType = 2
            this.returnData = row
            return true
          }
          if (row.selectType === '销售单') {
            this.showType = 1
            this.saleData = row
            this.getDetail(row.id)
            return true
          }
        })
      })
    },
    methods: {
      // 获取销售单详情
      getDetail (id) {
        api.checkById({
          id: id
        })
          .then((data) => {
            this.tableData = data || []
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // 单据类型改变
      ticketChange () {
        bus.$emit('ticketChange', this.ticket)
      },
      // 客户搜索模块
      searchCustomer (key) {
        apiCustomer.searchCustomer({key: key || ''})
          .then((res) => {
            if (res.ret === 0) {
              this.options = apiCustomer.toSearch(res.customers)
            }
          })
          .catch((msg) => { alert(msg) })
      },
      // 搜索函数回调
      cuscallback (val) {
        let len = this.options.length
        for (let i = 0; i < len; i++) {
          if (this.options[i].value === val) {
            this.cus_spell = this.options[i].spell
            this.cus_name = this.options[i].name
            return true
          }
        }
      },
      // 时间改变
      fireRender () {
        bus.$emit('getGoodRender', {
          begin: this.date1,
          end: this.date2
        })
      },
      // 客户筛选
      myFilter () {
        if (!this.cus_id) {
          this.cus_spell = ''
          this.cus_name = ''
        }
        bus.$emit('customerChange', this.cus_id)
      },
      // 商品明细选择
      // 选择条目 type: 类型， 其他：数据
      selectItem (row) {
        if (this.index === row.gId) {
          this.index = -1
          this.good_count = ''
          this.good_countUnit = ''
          this.good_price = ''
        } else {
          this.index = row.gId
          this.good_count = row.count
          this.good_countUnit = row.countUnit
          this.good_price = row.price
        }
      },
      setClass (row) {
        return (row.gId === this.index ? 'active' : '')
      },
      // 修改单条商品记录
      correctGood () {
        for (let i = this.tableData.length; i--;) {
          if (this.tableData[i].gId === this.index) {
            this.tableData[i].count = this.good_count
            this.tableData[i].countUnit = this.good_countUnit
            this.tableData[i].good_price = this.good_count
            break
          }
        }
      },
      // 还没用
      searchGood (key) {
        api.getSearch({key: key || ''})
          .then((res) => {
            if (res.ret === 0) {
              this.options = api.toSearch(res.goods)
            }
          })
          .catch((msg) => {
            console.log(msg)
          })
      },
      // 搜索函数回调
      callback (val) {
        let len = this.options.length
        for (let i = 0; i < len; i++) {
          if (this.options[i].value === val) {
            this.good_id = val
            this.good_name = this.options[i].name
            this.good_spell = this.options[i].spell
            return true
          }
        }
      }
    }
  }
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
  .printField{
    font-size: 16px;
    font-family: 微软雅黑;
    padding: 0 10px;
  }
  .printField .title{
    margin: 0;
  }
</style>
