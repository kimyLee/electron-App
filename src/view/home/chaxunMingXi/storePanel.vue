<template>
  <!--操作-->
  <el-col :span='12'>
    <div class='my-panel' style='padding: 0'>
      <el-row>
        <el-col :span="12">
          <my-date text="开始日期" v-model="date1"></my-date>
          <my-date text="销售日期" v-model="date2"></my-date>
          <my-input text="商品名称" v-model="good_name" disable></my-input>
        </el-col>
        <el-col :span="12">
          <my-search text="供应商"
                     id="supplier_id"
                     v-model="supplier_id"
                     :method="searchSupplier"
                     :callback="supplierCallback"
                     :options="supplierOptions">
          </my-search>
          <my-search text='商品搜索'
                     id='good_id'
                     v-model='good_id'
                     :method='searchGood'
                     :callback='callback'
                     :options='options'>
          </my-search>
          <my-input text="拼音码" v-model="good_spell" disable></my-input>
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
      <div class="my-panel" style="margin-top: 2px">
        <el-row>
          <el-table
            :data="tableData"
            height="535"
            stripe
            border
            style="width: 100%;font-size: 12px">
            <el-table-column v-for="(item, $index) in tableConfig"
                             :key="$index"
                             :prop="item.prop"
                             :label="item.label"
                             :width="item.width">
            </el-table-column>
          </el-table>
          <p style="font-size: 16px;font-weight: bold">
            <span style="display: inline-block;width: 150px">件数：{{totalCount}}</span>
            <span style="display: inline-block;width: 150px">数量：{{totalCountUnit}}</span>
            <span style="display: inline-block;width: 150px">金额：{{totalMoney}}</span>
          </p>
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
  import apiSupplier from '@/services/supplier'
  import bus from '@/bus'

  export default {
    data () {
      return {
        date1: '',
        date2: '',
        good_id: '',
        good_name: '',
        good_spell: '',
        options: [],
        supplier: '',
        supplier_id: '',
        supplierOptions: [],
        selected: false,
        tableConfig: [
          {label: '单号', prop: 'id'},
          {label: '客户', prop: 'cName'},
          {label: '件数', prop: 'count'},
          {label: '数量', prop: 'countUnit'},
          {label: '单价', prop: 'price'},
          {label: '单位', prop: 'unit'},
          {label: '过磅费', prop: 'weight'},
          {label: '包装费', prop: 'pack'},
          {label: '合计', prop: 'money'}
        ],
        tableData: [],
        totalCount: 0,
        totalCountUnit: 0,
        totalMoney: 0
      }
    },
    components: {
      myInput,
      myDate,
      mySearch
    },
    watch: {
      tableData: 'countTotal',
      date1: 'fireRender',
      date2: 'fireRender',
      supplier_id: 'myFilter',
      good_id: 'myFilter'
    },
    mounted: function () {
      this.$nextTick(function () {
        bus.$off('getGoodDetail').$on('getGoodDetail', (row) => {
          this.selected = row.select >= 0
          if (this.selected) {
            this.getDetail(row.id)
          } else {
            this.tableData = []
          }
        })
      })
    },
    methods: {
      fireRender () {
        bus.$emit('getGoodRender', {
          begin: this.date1,
          end: this.date2
        })
      },
      myFilter () {
        // console.log(this.supplier_id, this.good_id)
        if (!this.good_id) {
          this.good_name = ''
          this.good_spell = ''
        }
        bus.$emit('renderFilter', {
          supplierId: this.supplier_id,
          goodId: this.good_id
        })
      },
      countTotal (arr) {
        this.totalCount = 0
        this.totalCountUnit = 0
        this.totalMoney = 0
        for (let i = arr.length; i--;) {
          this.totalCount += arr[i].count
          this.totalCountUnit += arr[i].countUnit
          this.totalMoney += arr[i].money
        }
        this.totalMoney = this.totalMoney.toFixed(2)
      },
      getDetail (id) {
        api.checkOrderById({
          startDate: this.date1,
          endDate: this.date2,
          id: id
        })
          .then((data) => {
            this.tableData = data || []
          })
          .catch((err) => {
            console.log(err)
          })
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
      // 供应商模块
      searchSupplier (key) {
        apiSupplier.getSupplier({key: key || ''})
          .then((res) => {
            if (res.ret === 0) {
              this.supplierOptions = apiSupplier.toSearch(res.suppliers)
            }
          })
          .catch((msg) => { alert(msg) })
      },
      // 供应商搜索回调
      supplierCallback (val) {
        let len = this.supplierOptions.length
        for (let i = 0; i < len; i++) {
          if (this.supplierOptions[i].value === val) {
            this.supplier = this.supplierOptions[i].label
            return true
          }
        }
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
<style scoped>
</style>
