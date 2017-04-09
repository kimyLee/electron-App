<template>
    <!--操作-->
    <el-col :span="6">
      <div class="my-panel" style="padding: 0">
        <div class="my-panel-header">商品管理</div>
        <my-input text="商品名称" v-model="name" id="name" next="code" ></my-input>
        <my-input text="拼音码" v-model="code" id="code" next="origin" pre="name"></my-input>
        <my-input text="库存" v-model="origin" id="origin" next="!supplier_id" pre="code"></my-input>
        <my-search text="供应商"
                   id="supplier_id"
                   v-model="supplierId"
                   :method="searchId"
                   :callback="supplierCallback"
                   :options="supplierOptions">
        </my-search>
        <my-input text="单位" v-model="unit" id="unit" next="weight" pre="!supplier_id"></my-input>
        <my-input text="过磅费" v-model="weight" id="weight" next="pack" pre="unit"></my-input>
        <my-input text="包装费" v-model="pack" id="pack" next="good_sure" pre="weight"></my-input>
        <div class="btn-panel">
          <div class="btnItem"
               @keyup.down="goTarget('cus_del')"
               @keyup.up="goTarget('cus_credit')">
            <el-button type="primary" id='good_sure'
                       @click.stop="addStore">{{selected ? '修改' : '添加'}}
            </el-button>
          </div>
          <div class="btnItem"
               @keyup.up="goTarget('good_sure')">
            <el-button type="danger" id='good_del'
                       @click.stop="delStore">{{selected ? '删除' : '取消'}}
            </el-button>
          </div>
        </div>
      </div>
    </el-col>
</template>

<script type="text/ecmascript-6">
  import myInput from '@/components/myInput'
  import myDate from '@/components/myDatePicker'
  import mySearch from '@/components/mySearchInput'
  import api from '@/services/home'
  import apiSupplier from '@/services/supplier'
  import bus from '@/bus'

  export default {
    data () {
      return {
        id: '',
        name: '',
        code: '',
        origin: 0,
        supplier: '',
        supplierId: '',
        unit: '',
        weight: 0,
        pack: 0,
        supplierOptions: [],
        selected: false
      }
    },
    components: {
      myInput,
      mySearch,
      myDate
    },
    mounted: function () {
      this.$nextTick(function () {
        bus.$on('storeRender', (row) => {
          this.selected = row.index >= 0
          if (this.selected) {
            this.id = row.id
            this.name = row.name
            this.code = row.spell
            this.origin = row.inventory
            this.supplier = row.supplier
            this.supplierId = row.supplierId
            this.weight = row.weighFee
            this.unit = row.unit
            this.pack = row.packFee
          } else {
            this.clearData()
          }
        })
      })
    },
    methods: {
      addStore () {
        if (!this.name) {
          alert('商品名称不能为空！')
          return false
        }
        if (!this.code) {
          alert('拼音码不能为空！')
          return false
        }
        if (this.origin === '') {
          alert('库存初始不能为空！')
          return false
        }
        if (!(this.supplier && this.supplierId)) {
          alert('供应商不能为空！请重新选择')
          return false
        }
        if (this.weight === '') {
          alert('过磅费不能为空！')
          return false
        }
        if (this.pack === '') {
          alert('包装费不能为空！')
          return false
        }
        if (!this.unit) {
          alert('单位不能为空！')
          return false
        }
        const callback = (res, msg) => {
          if (res.ret === 0) {
            alert(msg)
            bus.$emit('getStoreList')
            this.clearData()
            this.goTarget('name')
          }
        }
        if (this.selected) {
          if (confirm('确定修改该商品信息？')) {
            api.updateGood({
              id: this.id,
              spell: this.code,
              name: this.name,
              unit: this.unit,
              weighFee: this.weight - 0,
              packFee: this.pack - 0,
              supplier: this.supplier,
              supplierId: this.supplierId,
              inventory: this.origin - 0
            })
              .then((res) => { callback(res, '修改成功') })
              .catch((msg) => { alert(msg) })
          }
        } else {
          api.addGood({
            spell: this.code,
            name: this.name,
            unit: this.unit,
            weighFee: this.weight - 0,
            packFee: this.pack - 0,
            supplier: this.supplier,
            supplierId: this.supplierId,
            inventory: this.origin - 0
          })
            .then((res) => {
              callback(res, '添加成功')
            })
            .catch((msg) => {
              alert(msg)
            })
        }
      },
      delStore () {
        if (this.selected) {
          if (confirm('确定删除该商品信息？')) {
            api.delStore({id: this.id})
              .then((res) => {
                if (res.ret === 0) {
                  alert('删除成功')
                  bus.$emit('getStoreList')
                  this.clearData()
                }
              })
              .catch((msg) => { alert(msg) })
          }
        } else {
          if (confirm('确定清空当前操作？')) {
            this.clearData()
          }
        }
      },
      searchId (key) {
        apiSupplier.getSupplier({key: key || ''})
          .then((res) => {
            if (res.ret === 0) {
              this.supplierOptions = apiSupplier.toSearch(res.suppliers)
            }
          })
          .catch((msg) => { alert(msg) })
      },
      clearData () {
        this.id = ''
        this.name = ''
        this.code = ''
        this.origin = 0
        this.supplier = ''
        this.supplierId = ''
        this.weight = 0
        this.pack = 0
        this.unit = ''
      },
      goTarget (target) {
        document.getElementById(target).focus()
      },
      supplierCallback (val) {
        let len = this.supplierOptions.length
        for (let i = 0; i < len; i++) {
          if (this.supplierOptions[i].value === val) {
            this.supplier = this.supplierOptions[i].label
            this.supplierId = this.supplierOptions[i].value
            // 防止一次跳2个
            setTimeout(() => {
              document.getElementById('unit').focus()
            }, 100)
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
