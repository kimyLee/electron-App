<template>
    <!--操作-->
    <el-col :span='6'>
        <div class='my-panel' style='padding: 0'>
            <div class='my-panel-header'>销售下单</div>
            <my-search text="客户编号"
                       id="cus_id"
                       v-model="cus_id"
                       :method="searchCustomer"
                       :callback="customerCallback"
                       :options="cusOptions">
            </my-search>
            <my-input text='拼音码' v-model='cus_spell' disable></my-input>
            <my-input text='客户名称' v-model='cus_name' disable></my-input>
            <hr/>
            <!--<my-date text='日期' v-model='date' id='fee_date' next='fee_name'></my-date>-->
            <my-search text='商品编号'
                       id='good_id'
                       v-model='good_id'
                       :method='searchGood'
                       :callback='callback'
                       :options='options'>
            </my-search>
            <my-input text='商品名' v-model='good_name' id='good_name' disable></my-input>
            <my-input text='拼音码' v-model='good_spell' id='good_spell' disable></my-input>
            <my-input text='库存' v-model='good_stock' id='good_stock' disable></my-input>
            <my-input text='单位' v-model='unit' id='unit' disable></my-input>
            <my-input text='件数' v-model='count' id='count' next='countUnit' pre='!good_id'></my-input>
            <my-input text='数量' v-model='countUnit' id='countUnit' next='price' pre="count"></my-input>
            <my-input text='单价' v-model='price' id='price' next='addGood' pre="!countUnit"></my-input>
            <my-input text='供应商' v-model='supplier' id='supplier' disable></my-input>
            <section class='btn-panel'>
                <div class='btnItem'
                     @keyup.down="goTarget('!good_id')"
                     @keyup.up="goTarget('price')">
                    <el-button type='primary' id='addGood'
                               @click.stop='addGood'>{{selected ? '修改' : '添加'}}
                    </el-button>
                </div>
                <div class='btnItem'
                     v-show="selected">
                    <el-button type='danger'
                               @click.stop='delGood'>删除
                    </el-button>
                </div>
            </section>
            <hr/>
            <my-input text='合计金额' v-model='total' disable></my-input>
            <my-input text='前欠金额' v-model='beforeLoan' disable></my-input>
            <my-input text='挂欠金额' v-model='nowLoan' disable></my-input>
            <my-input text='去尾数' v-model='tailMoney' id='tailMoney' next='appear'></my-input>
            <my-search text="去尾供应商"
                       id="tailSupplier_id"
                       v-model="tailSupplierId"
                       :method="searchSupplier"
                       :callback="supplierCallback"
                       :options="supplierOptions">
            </my-search>
            <my-input text='总欠金额' v-model='totalLoan' disable></my-input>
            <my-input text='出场费' v-model='appear' id='appear' next='traffic' pre="tailMoney"></my-input>
            <my-input text='三轮车费' v-model='traffic' id='traffic' next='factMoney' pre="appear"></my-input>
            <my-input text='实收金额' v-model='factMoney' id='factMoney' next='addMoney' pre="traffic"></my-input>
            <section class='btn-panel'>
                <div class='btnItem'
                     @keyup.up="goTarget('factMoney')">
                    <el-button type='primary' id='addMoney'
                               @click.stop='addIOMoney'>记账
                    </el-button>
                </div>
                <div class='btnItem'>
                    <el-button type='danger' id='fee_del'
                               @click.stop='cancelAll'>取消此单
                    </el-button>
                </div>
            </section>
        </div>
    </el-col>
</template>

<script type='text/ecmascript-6'>
  import myDate from '@/components/myDatePicker'
  import myInput from '@/components/myInput'
  import mySearch from '@/components/mySearchInput'
  import api from '@/services/home'
  import apiSupplier from '@/services/supplier'
  import apiCustomer from '@/services/customer'
  import bus from '@/bus'
  import common from '@/until'

  export default {
    data () {
      return {
        good_id: '',
        good_name: '',
        good_spell: '',
        good_stock: '',
        good_weight: '',
        good_pack: '',
        supplier: '',
        supplierId: '',
        unit: '',
        price: '',
        countUnit: '',
        count: '',
        carNum: '',
        GoodList: [],
        options: [],
        selectedIndex: -1,
        selected: false,
        // 客户
        cus_id: '',
        cus_credit: '',
        cus_name: '',
        cus_spell: '',
        cusOptions: [],
        beforeLoan: '',
        tailMoney: 0,
        appear: 0,
        traffic: 0,
        factMoney: '',
        // 尾数供应商
        tailSupplier: '',
        tailSupplierId: '',
        supplierOptions: []
      }
    },
    components: {
      myInput,
      myDate,
      mySearch
    },
    computed: {
      total () {
        let temp = 0
        for (let i = this.GoodList.length; i--;) {
          temp += this.GoodList[i].money
        }
        temp = temp + (this.traffic - 0) + (this.appear - 0)
        if (this.cus_id === 1) {
          this.factMoney = Math.round(temp)
        }
        return Math.round(temp)
      },
      nowLoan () {
        if (this.factMoney === '') {
          return ''
        }
        return this.total - this.factMoney
      },
      totalLoan () {
        if (this.beforeLoan !== '') {
          return this.beforeLoan + (this.nowLoan || 0) - this.tailMoney
        }
        return ''
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        bus.$off('selectGoodIn').$on('selectGoodIn', (row) => {
          this.selected = row.select >= 0
          this.selectedIndex = row.select
          if (this.selected) {
            this.good_id = row.gId
            this.good_name = row.gName
            this.good_spell = row.gSpell
            this.good_weight = row.gWeighFee
            this.good_pack = row.gPackFee
            this.good_stock = row.gStock
            this.supplier = row.gSupplier
            this.supplierId = row.gSupplierId
            this.price = row.gPrice
            this.unit = row.unit
            this.countUnit = row.countUnit
            this.count = row.count
          } else {
            this.clearData()
          }
        })
      })
    },
    methods: {
      // 供应商搜索模块
      searchSupplier (key) {
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
            this.tailSupplier = this.supplierOptions[i].label
            return true
          }
        }
      },
      // 客户模块
      searchCustomer (key) {
        apiCustomer.searchCustomer({key: key || ''})
          .then((res) => {
            if (res.ret === 0) {
              this.cusOptions = apiCustomer.toSearch(res.customers)
            }
          })
          .catch((msg) => {
            alert(msg)
          })
      },
      // 搜索函数回调
      customerCallback (val) {
        let len = this.cusOptions.length
        for (let i = 0; i < len; i++) {
          if (this.cusOptions[i].value === val) {
            this.cus_spell = this.cusOptions[i].spell
            this.cus_name = this.cusOptions[i].name
            this.cus_credit = this.cusOptions[i].credit
            this.beforeLoan = this.cusOptions[i].loan
            this.$nextTick(() => {
              this.goTarget('!good_id')
            })
            return true
          }
        }
      },
      counted (arr, target) {
        let temp = 0
        for (let i = arr.length; i--;) {
          temp += arr[i][target]
        }
        return temp
      },
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
            this.good_stock = this.options[i].inventory
            this.good_weight = this.options[i].weight
            this.good_pack = this.options[i].pack
            this.supplier = this.options[i].supplier
            this.supplierId = this.options[i].supplierId
            this.unit = this.options[i].unit
            setTimeout(() => {
              document.getElementById('count').focus()
            }, 200)
            return true
          }
        }
      },
      // 商品金额计算 单价 数量 件数 过磅 包装
      countMoney (price, countUnit, count, weight, pack) {
        price -= 0
        countUnit -= 0
        weight -= 0
        count -= 0
        pack -= 0
        return price * countUnit - 0 + count * pack - 0 + weight * countUnit - 0
      },
      addGood () {
        if (!this.good_id || !this.supplierId) {
          alert('商品信息不全，请重新选择')
          return false
        }
        if (this.price === '' || isNaN(this.price)) {
          alert('单价需为数值且不能为空')
          return false
        }
        if (!this.count || isNaN(this.count)) {
          alert('件数需为数值且不能为空')
          return false
        }
        if (!this.countUnit || isNaN(this.countUnit)) {
          alert('数量需为数值且不能为空')
          return false
        }
        this.price -= 0
        this.countUnit -= 0
        this.count -= 0
        this.price -= 0
        this.good_weight -= 0
        this.good_pack -= 0
        if (!this.selected) {
          this.GoodList.push({
            'gId': this.good_id,
            'gSpell': this.good_spell,
            'gName': this.good_name,
            'unit': this.unit,
            'gSupplier': this.supplier,
            'gSupplierId': this.supplierId,
            'gStock': this.good_stock,
            'gPrice': this.price,
            'countUnit': this.countUnit,
            'count': this.count,
            'gWeighFee': this.good_weight * this.countUnit,
            'gPackFee': this.good_pack * this.count,
            'money': this.countMoney(this.price, this.countUnit, this.count,
              this.good_weight, this.good_pack)
          })
        } else {
          this.GoodList[this.selectedIndex] = {
            'gId': this.good_id,
            'gSpell': this.good_spell,
            'gName': this.good_name,
            'unit': this.unit,
            'gSupplier': this.supplier,
            'gSupplierId': this.supplierId,
            'gStock': this.good_stock,
            'gPrice': this.price - 0,
            'countUnit': this.countUnit - 0,
            'count': this.count - 0,
            'gWeighFee': this.good_weight - 0,
            'gPackFee': this.good_pack - 0,
            'money': this.countMoney(this.price, this.countUnit, this.count,
              this.good_weight, this.good_pack)
          }
        }
        bus.$emit('addInGood', this.GoodList)
        this.clearData()
        document.getElementById('addGood').blur()
      },
      addIOMoney () {
        if (!this.GoodList.length) {
          alert('请先添加商品')
          return false
        }
        if (!this.cus_id || !this.cus_name) {
          alert('客户无效或不能为空，请重新选择')
          return false
        }
        if (this.appearanceFee === '') {
          alert('出场费不能为空')
          return false
        }
        if (this.carFee === '') {
          alert('三轮车费不能为空')
          return false
        }
        if (this.tailMoney === '') {
          alert('去尾数不能为空')
          return false
        }
        if (this.factMoney === '') {
          alert('实收金额不能为空')
          return false
        }
        if (this.cus_credit && this.totalLoan > this.cus_credit) {
          if (!confirm('交易后客户欠款高于信用额度，是否继续')) {
            return false
          }
        }
        this.factMoney -= 0
        if (this.factMoney !== this.total && this.cus_id === 1) {
          alert('现金客户实收金额须等于实际应付金额')
          return false
        }
        if (!(this.factMoney === 0 || this.factMoney === this.total)) {
          alert('实收金额须为0或实际总额')
          return false
        }
        api.makeOrder({
          'cId': this.cus_id,
          'cName': this.cus_name,
          'cSpell': this.cus_spell,
          'appearanceFee': this.appear - 0,
          'carFee': this.traffic - 0,
          'tailMoney': this.tailMoney - 0,
          'oweMoney': this.nowLoan || 0,
          'shishou': this.factMoney - 0,
          'totalLoan': this.totalLoan,
          'totalMoney': this.total - 0,
          'storeList': this.GoodList,
          'tailSupplier': this.tailSupplier,
          'tailSupplierId': this.tailSupplierId
        })
          .then((res) => {
            alert('添加成功')
            this.clearAllData()
          })
          .catch((msg) => {
            alert(msg)
          })
      },
      delGood () {
        if (confirm('确定删除此条目？')) {
          if (this.selectedIndex >= 0) {
            this.GoodList.splice(this.selectedIndex, 1)
          }
          this.clearData()
          bus.$emit('addInGood', this.GoodList)
        }
      },
      cancelAll () {
        if (confirm('确定取消此单？')) {
          this.clearAllData()
        }
      },
      clearAllData () {
        this.clearData()
        this.GoodList = []
        this.cus_id = ''
        this.cus_spell = ''
        this.cus_name = ''
        this.cus_credit = ''
        this.beforeLoan = ''
        this.traffic = 0
        this.tailMoney = 0
        this.appear = 0
        this.factMoney = ''
        this.tailSupplierId = ''
        this.tailSupplier = ''
        this.options = []
        this.cusOptions = []
        this.supplierOptions = []
        bus.$emit('addInGood', this.GoodList)
      },
      clearData () {
        this.selectedIndex = -1
        this.selected = false
        this.good_id = ''
        this.good_name = ''
        this.good_spell = ''
        this.supplier = ''
        this.supplierId = ''
        this.unit = ''
        this.price = ''
        this.countUnit = ''
        this.count = ''
        this.good_stock = ''
        this.good_weight = ''
        this.good_pack = ''
      },
      goTarget (target) {
        common.goTarget(target)
      }
    }
  }
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
