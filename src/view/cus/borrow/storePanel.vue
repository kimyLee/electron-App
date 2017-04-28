<template>
    <!--操作-->
    <el-col :span="6">
        <div class="my-panel" style="padding: 0">
            <div class="my-panel-header">借款操作</div>
            <my-search text="客户编号"
                       id="cus_id"
                       v-model="cus_id"
                       :method="searchCustomer"
                       :callback="callback"
                       :options="options">
            </my-search>
            <my-input text="拼音码" v-model="code" id="cus_code" disable></my-input>
            <my-input text="客户名称" v-model="name" id="cus_name" disable></my-input>
            <my-input text="总欠金额" v-model="total" id="cus_total"  disable></my-input>
            <my-input text="借款金额" v-model="money" id="cus_money" next="cus_note" pre="!cus_id"></my-input>
            <my-input text="备注" v-model="note" id="cus_note" next="!supplier_id" pre="cus_money"></my-input>
            <my-search text="供应商"
                       id="supplier_id"
                       v-model="supplier_id"
                       :method="searchSupplier"
                       :callback="supplierCallback"
                       :options="supplierOptions">
            </my-search>
            <div class="btn-panel">
                <div class="btnItem"
                     @keyup.down="goTarget('cus_cancel')"
                     @keyup.up="goTarget('!supplier_id')">
                    <el-button type="primary" id='cus_sure'
                               @click.stop="addMoney">添加
                    </el-button>
                </div>
                <div class="btnItem"
                     @keyup.up="goTarget('cus_sure')">
                    <el-button type="danger" id='cus_cancel'
                               @click.stop="clearData">取消
                    </el-button>
                </div>
            </div>
        </div>
    </el-col>
</template>

<script type="text/babel">
  import myDate from '@/components/myDatePicker'
  import myInput from '@/components/myInput'
  import mySearch from '@/components/mySearchInput'
  import api from '@/services/customer'
  import apiSupplier from '@/services/supplier'
  import bus from '@/bus'
  import common from '@/until'

  export default {
    data () {
      return {
        date: '',
        cus_id: '',
        code: '',
        name: '',
        money: '',
        credit: '',
        note: '',
        total: '',
        supplier: '公司',
        supplier_id: 1,
        options: [],
        supplierOptions: []
      }
    },
    components: {
      myInput,
      myDate,
      mySearch
    },
    mounted: function () {
      this.$nextTick(function () {
      })
    },
    watch: {
      cus_id (val) {
        bus.$emit('getBorrowMoney', val)
      }
    },
    methods: {
      searchCustomer (key) {
        api.searchCustomer({key: key || ''})
          .then((res) => {
            if (res.ret === 0) {
              this.options = api.toSearch(res.customers)
            }
          })
          .catch((msg) => { alert(msg) })
      },
      // 搜索函数回调
      callback (val) {
        let len = this.options.length
        for (let i = 0; i < len; i++) {
          if (this.options[i].value === val) {
            this.code = this.options[i].spell
            this.name = this.options[i].name
            this.credit = this.options[i].credit
            this.total = this.options[i].loan
            document.getElementById('cus_money').focus()
            return true
          }
        }
      },
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
            document.getElementById('cus_sure').focus()
            return true
          }
        }
      },
      clearData () {
        this.supplier = '公司'
        this.supplier_id = 1
        this.money = ''
        this.note = ''
      },
      goTarget (target) {
        common.goTarget(target)
      },
      addMoney () {
        if (!this.cus_id || !this.name) {
          alert('客户名不能为空！请重新选择')
          return false
        }
        if (!this.money) {
          alert('借款金额不能为空')
          return false
        }
        if (this.supplier_id === '' || !this.supplier) {
          alert('借款对象不能为空')
          return false
        }
        const callback = (res, msg) => {
          if (res.ret === 0) {
            alert(msg)
            bus.$emit('getBorrowMoney', this.cus_id)
            this.clearData()
          }
        }
        if (this.credit && this.total > this.credit) {
          if (!confirm('借款后总欠费已超过信用额度，确定继续？')) {
            return false
          }
        }
        api.borrowMoney({
          cId: this.cus_id,
          cSpell: this.code,
          cName: this.name,
          money: this.money - 0,
          supplier: this.supplier,
          supplierId: this.supplier_id,
          total_loan: this.total + (this.type ? -1 : 1) * this.money,
          type: 0,
          remark: this.note
        })
          .then((res) => { callback(res, '记账成功') })
          .catch((msg) => { alert(msg) })
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
