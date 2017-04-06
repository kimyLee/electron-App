<template>
    <!--操作-->
    <el-col :span="6">
        <div class="my-panel" style="padding: 0">
            <div class="my-panel-header">添加费用</div>
            <my-date text="费用日期" v-model="date" id="fee_date" next="fee_name"></my-date>
            <my-search text="费用编号"
                       id="fee_id"
                       v-model="fee_id"
                       :method="searchFeeType"
                       :callback="callback"
                       :options="options">
            </my-search>
            <my-input text="拼音码" v-model="code" id="fee_code" disable></my-input>
            <my-input text="费用名称" v-model="name" id="fee_name" disable></my-input>
            <my-input text="供应商" v-model="supplier" id="fee_supplier" disable></my-input>
            <my-input text="费用金额" v-model="money" id="fee_money" next="fee_note" pre="!fee_id"></my-input>
            <my-input text="备注" v-model="note" id="fee_note" next="fee_sure" pre="fee_money"></my-input>
            <div class="btn-panel">
                <div class="btnItem"
                     @keyup.down="goTarget('fee_del')"
                     @keyup.up="goTarget('fee_note')">
                    <el-button type="primary" id='fee_sure'
                               @click.stop="addFee">添加
                    </el-button>
                </div>
                <div class="btnItem"
                     @keyup.up="goTarget('fee_sure')">
                    <el-button type="danger" id='fee_del'
                               @click.stop="delFee">取消
                    </el-button>
                </div>
            </div>
        </div>
    </el-col>
</template>

<script type="text/ecmascript-6">
  import myDate from '@/components/myDatePicker'
  import myInput from '@/components/myInput'
  import mySearch from '@/components/mySearchInput'
  import api from '@/services/fee'
  import bus from '@/bus'

  export default {
    data () {
      return {
        date: '',
        fee_id: '',
        code: '',
        name: '',
        money: '',
        note: '',
        supplier: '公司',
        options: []
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
    methods: {
      searchFeeType (key) {
        api.searchFeeType({key: key || ''})
          .then((res) => {
            if (res.ret === 0) {
              this.options = api.toSearch(res.costs)
            }
          })
          .catch((msg) => { alert(msg) })
      },
      // 搜索函数回调
      callback (val) {
        let len = this.options.length
        for (let i = 0; i < len; i++) {
          if (this.options[i].value === val) {
            this.fee_id = val
            this.code = this.options[i].code
            this.name = this.options[i].name
            this.supplier = this.options[i].supplier
            document.getElementById('fee_money').focus()
            return true
          }
        }
      },
      clearData () {
        this.fee_id = ''
        this.code = ''
        this.name = ''
        this.supplier = ''
        this.money = ''
        this.note = ''
      },
      goTarget (target) {
        if (target[0] === '!') {
          document.querySelector('#' + target.substring(1) + ' input').focus()
        } else {
          document.getElementById(target).focus()
        }
      },
      addFee () {
        if (!this.fee_id || !this.name) {
          alert('费用名不能为空！请重新选择')
          return false
        }
        if (this.money === '') {
          alert('费用金额不能为空')
          return false
        }
        const callback = (res, msg) => {
          if (res.ret === 0) {
            alert(msg)
            bus.$emit('getFeeList')
            this.clearData()
          }
        }
        api.addFee({
          name: this.name,
          spell: this.code,
          supplier: this.supplier,
          money: this.money,
          remark: this.note,
          date: this.date
        })
          .then((res) => { callback(res, '添加成功') })
          .catch((msg) => { alert(msg) })
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
