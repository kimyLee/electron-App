<template>
    <!--操作-->
    <el-col :span="6">
      <div class="my-panel" style="padding: 0">
        <div class="my-panel-header">商品管理</div>
        <my-search text="商品名称"
                   id="good_id"
                   v-model="id"
                   :method="searchGood"
                   :callback="goodCallback"
                   :options="goodOptions">
        </my-search>
        <my-search text="供应商"
                   id="supplier_id"
                   w
                   v-model="supplierId"
                   :method="searchId"
                   :callback="supplierCallback"
                   :options="supplierOptions">
        </my-search>
        <my-input text="包装费" v-model="pack" id="pack" next="code" disable></my-input>
        <my-input text="过磅费" v-model="weight" id="weight" next="code" disable></my-input>
        <my-search text="结算方式"
                   v-model="resultType"
                   :options="TypeList"
                   :callback="function(){}"
                   no-search></my-search>
        <my-input text="件数提成" v-model="unitFee" id="unitFee" next="code" :disable="resultType===2"></my-input>
        <div class="input-group" v-for="(item, $index) in 5">
          <div class="input-item">
            单价{{$index}}<br/>
            <input type="text" class="form-input" v-model="price['price' + $index]"
                   :readonly="resultType===1 || $index ===0"/>
          </div>
          <div class="input-item-right">
            百分比(%)<br/>
            <input type="text" class="form-input" v-model="percent['percent' + $index]" :readonly="resultType===1"/>
          </div>
        </div>
        <div class="btn-panel">
          <div class="btnItem"
               @keyup.down="goTarget('cus_del')"
               @keyup.up="goTarget('cus_credit')">
            <el-button type="primary" id='good_sure'
                       @click.stop="addTicheng">{{selected ? '修改' : '添加'}}
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
  import api from '@/services/supplier'
  import apiGood from '@/services/home'
  import bus from '@/bus'

  export default {
    data () {
      return {
        id: '',
        supplierId: '',
        supplier: '',
        name: '',
        weight: '',
        pack: '',
        goodOptions: [],
        supplierOptions: [],
        resultType: 1,
        TypeList: [
          {label: '按件', value: 1},
          {label: '按百分比', value: 2}
        ],
        price: {
          price0: 0,
          price1: '',
          price2: '',
          price3: '',
          price4: ''
        },
        percent: {
          percent0: '',
          percent1: '',
          percent2: '',
          percent3: '',
          percent4: ''
        },
        unitFee: '',
        notClearGood: false,
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
        bus.$on('tichengRender', (row) => {
          this.selected = row.index >= 0
          if (this.selected) {
            this.id = row.id
            this.name = row.name
            this.code = row.spell
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
      supplierCallback (val) {
        if (!this.notClearGood) {
          this.id = ''
          this.name = ''
          this.pack = ''
          this.weight = ''
        }
        let len = this.supplierOptions.length
        for (let i = 0; i < len; i++) {
          if (this.supplierOptions[i].value === val) {
            this.supplier = this.supplierOptions[i].label
            this.supplierId = this.supplierOptions[i].value
            setTimeout(() => {
              document.getElementById('good_id').focus()
            }, 100)
            return true
          }
        }
        this.notClearGood = false
      },
      // 搜索商品
      searchGood (key) {
        apiGood.getSearch({key: key || ''})
          .then((res) => {
            if (res.ret === 0) {
              this.goodOptions = apiGood.toSearch(res.goods, this.supplierId)
            }
          })
          .catch((msg) => { alert(msg) })
      },
      goodCallback (val) {
        let len = this.goodOptions.length
        for (let i = 0; i < len; i++) {
          if (this.goodOptions[i].value === val) {
            this.name = this.goodOptions[i].name
            this.id = this.goodOptions[i].value
            this.pack = this.goodOptions[i].pack
            this.weight = this.goodOptions[i].weight
            this.notClearGood = true
            this.supplierId = this.goodOptions[i].supplierId
            this.supplier = this.goodOptions[i].supplier
            // document.getElementById('unit').focus()
            return true
          }
        }
      },
      // 搜索供应商
      searchId (key) {
        api.getSupplier({key: key || ''})
          .then((res) => {
            if (res.ret === 0) {
              this.supplierOptions = api.toSearch(res.suppliers)
            }
          })
          .catch((msg) => { alert(msg) })
      },
      clearData () {
        this.id = ''
        this.name = ''
        this.code = ''
        this.supplier = ''
        this.supplierId = ''
        this.weight = ''
        this.pack = ''
      },
      goTarget (target) {
        document.getElementById(target).focus()
      },
      addTicheng () {
        if (!(this.name && this.id)) {
          alert('商品不能为空！请重新选择')
          return false
        }
        if (!(this.supplier && this.supplierId)) {
          alert('供应商不能为空！请重新选择')
          return false
        }
        if (!this.resultType) {
          alert('结算方式不能为空！')
          return false
        }
        if (this.resultType === 1 && (!this.unitFee)) {
          alert('件数提成不能为空或低于0！')
          return false
        }
        if (this.resultType === 2 && (!this.percent.percent0)) {
          console.log(this.percent0)
          alert('百分比不能为空！')
          return false
        }
        const callback = (res, msg) => {
          if (res.ret === 0) {
            alert(msg)
            bus.$emit('getTichengList')
            this.clearData()
            this.goTarget('name')
          }
        }
        api.addTiCheng({
          id: this.id,
          weighFee: this.weight - 0,
          packFee: this.pack - 0,
          type: this.resultType,
          unitFee: this.unitFee - 0,
          price1: this.price.price0 - 0,
          price2: this.price.price1 - 0,
          price3: this.price.price2 - 0,
          price4: this.price.price3 - 0,
          price5: this.price.price4 - 0,
          percentage1: this.percent.percent0 - 0,
          percentage2: this.percent.percent1 - 0,
          percentage3: this.percent.percent2 - 0,
          percentage4: this.percent.percent3 - 0,
          percentage5: this.percent.percent4 - 0
        })
          .then((res) => {
            callback(res, '添加成功')
          })
          .catch((msg) => {
            alert(msg)
          })
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .input-group {margin-top: 5px}
  .input-item{width: 120px;display: inline-block ;padding: 0 10px;font-size: 14px;font-weight: bold }
  .input-item input{width: 100% }
  .input-item-right{width: 70px;display: inline-block;font-size: 14px;font-weight: bold}
  .input-item-right input{width:100%}
</style>
