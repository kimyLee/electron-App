<template>
  <!--操作-->
  <el-col :span='6'>
    <div class='my-panel' style='padding: 0'>
      <div class='my-panel-header'>进货单</div>
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
      <my-input text='供应商' v-model='supplier' id='supplier' disable></my-input>
      <my-input text='单位' v-model='unit' id='unit' disable></my-input>

      <my-input text='单价' v-model='price' id='price' next='countUnit' pre="!good_id"></my-input>
      <my-input text='数量' v-model='countUnit' id='countUnit' next='count' pre="price"></my-input>
      <my-input text='件数' v-model='count' id='count' next='addGood' pre='countUnit'></my-input>
      <section class='btn-panel'>
        <div class='btnItem'
             @keyup.down="goTarget('!good_id')"
             @keyup.up="goTarget('count')">
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
      <my-input text='总件数' v-model='total' id='unit' disable></my-input>
      <my-input text='车牌号' v-model='carNum' id='carNum' next='addMoney' pre='addGood'></my-input>
      <my-input text='总数量' v-model='totalNum' id='fee_supplier' disable></my-input>
      <my-input text='全车价值' v-model='money' id='fee_money' disable></my-input>
      <section class='btn-panel'>
        <div class='btnItem'
             @keyup.up="goTarget('carNum')">
          <el-button type='primary' id='addMoney'
                     @click.stop='addIOMoney'>添加
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
  import api from '@/services/origin'
  import apiGood from '@/services/home'
  import bus from '@/bus'
  import common from '@/until'

  export default {
    data () {
      return {
        good_id: '',
        good_name: '',
        good_spell: '',
        supplier: '',
        unit: '',
        price: '',
        countUnit: '',
        count: '',
        carNum: '',
        GoodList: [],
        options: [],
        selectedIndex: -1,
        selected: false
      }
    },
    components: {
      myInput,
      myDate,
      mySearch
    },
    computed: {
      total () {
        return this.counted(this.GoodList, 'count')
      },
      totalNum () {
        return this.counted(this.GoodList, 'countUnit')
      },
      money () {
        let temp = 0
        for (let i = this.GoodList.length; i--;) {
          temp += this.GoodList[i].price * this.GoodList[i].countUnit
        }
        return temp
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        bus.$on('selectGoodIn', (row) => {
          this.selected = row.select >= 0
          this.selectedIndex = row.select
          if (this.selected) {
            this.good_id = row.gId
            this.good_name = row.gName
            this.good_spell = row.gSpell
            this.supplier = row.gSupplier
            this.price = row.price
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
      counted (arr, target) {
        let temp = 0
        for (let i = arr.length; i--;) {
          temp += arr[i][target]
        }
        return temp
      },
      searchGood (key) {
        apiGood.getSearch({key: key || ''})
          .then((res) => {
            if (res.ret === 0) {
              this.options = apiGood.toSearch(res.goods)
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
            this.supplier = this.options[i].supplier
            this.unit = this.options[i].unit
            setTimeout(() => {
              document.getElementById('price').focus()
            }, 200)
            return true
          }
        }
      },
      addGood () {
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
        if (!this.selected) {
          this.GoodList.push({
            'gId': this.good_id,
            'gSpell': this.good_spell,
            'gName': this.good_name,
            'unit': this.unit,
            'gSupplier': this.supplier,
            'price': this.price - 0,
            'countUnit': this.countUnit - 0,
            'count': this.count - 0
          })
        } else {
          this.GoodList[this.selectedIndex] = {
            'gId': this.good_id,
            'gSpell': this.good_spell,
            'gName': this.good_name,
            'unit': this.unit,
            'gSupplier': this.supplier,
            'price': this.price - 0,
            'countUnit': this.countUnit - 0,
            'count': this.count - 0
          }
        }
        bus.$emit('addInGood', this.GoodList)
        this.clearData()
        document.getElementById('addGood').blur()
      },
      addIOMoney () {
        if (!this.GoodList.length) {
          alert('请先选择货物')
          return false
        }
        api.setInGood({
          type: 2,
          totalCountUnit: this.totalNum,
          totalCount: this.total,
          carNum: this.carNum,
          totalValue: this.money,
          goods: this.GoodList
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
        if (this.selectedIndex >= 0) {
          this.GoodList.splice(this.selectedIndex, 1)
        }
        this.clearData()
        bus.$emit('addInGood', this.GoodList)
      },
      cancelAll () {
        if (confirm('确定取消此单？')) {
          this.clearAllData()
        }
      },
      clearAllData () {
        this.clearData()
        this.GoodList = []
        this.carNum = ''
        bus.$emit('addInGood', this.GoodList)
      },
      clearData () {
        this.selectedIndex = -1
        this.selected = false
        this.good_id = ''
        this.good_name = ''
        this.good_spell = ''
        this.supplier = ''
        this.unit = ''
        this.price = ''
        this.countUnit = ''
        this.count = ''
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
