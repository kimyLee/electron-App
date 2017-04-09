<template>
    <!--操作-->
    <el-col :span="6">
        <div class="my-panel" style="padding: 0">
            <div class="my-panel-header">添加转账</div>
            <!--<my-date text="转账日期" v-model="date" id="trans_date" next="trans_target"></my-date>-->
            <my-input text="转账对象" v-model="target" id="trans_target" next="trans_money"></my-input>
            <my-input text="转账金额" v-model="money" id="trans_money" next="trans_note" pre="trans_target"></my-input>
            <my-input text="备注" v-model="note" id="trans_note" next="trans_sure" pre="trans_money"></my-input>
            <my-input text="前存金额" v-model="before_money"  disable></my-input>
            <my-input text="转后金额" v-model="after_money" disable></my-input>
            <div class="btn-panel">
                <div class="btnItem"
                     @keyup.down="goTarget('trans_cancel')"
                     @keyup.up="goTarget('trans_note')">
                    <el-button type="primary" id='trans_sure'
                               @click.stop="addMoney">添加
                    </el-button>
                </div>
                <div class="btnItem"
                     @keyup.up="goTarget('trans_sure')">
                    <el-button type="danger" id='trans_cancel'
                               @click.stop="delFee">取消
                    </el-button>
                </div>
            </div>
        </div>
      <div class="my-panel" style="padding: 0">
        <div class="my-panel-header">修改现存</div>
        <my-input text="现存金额" v-model="nowMoney" id="trans_target"></my-input>
        <div class="btn-panel">
          <div class="btnItem"
               @keyup.down="goTarget('cancel')"
               @keyup.up="goTarget('trans_target')">
            <el-button type="primary" id='sure'
                       @click.stop="changeMoney">修改
            </el-button>
          </div>
          <div class="btnItem"
               @keyup.up="goTarget('sure')">
            <el-button type="danger" id='cancel'
                       @click.stop="cancelChangeMoney">取消
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
  import api from '@/services/supplier'
  import bus from '@/bus'
  import common from '@/until'

  export default {
    data () {
      return {
        date: '',
        target: '',
        money: '',
        note: '',
        nowMoney: '',
        before_money: ''
      }
    },
    components: {
      myInput,
      myDate,
      mySearch
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getNowMoney()
      })
    },
    computed: {
      after_money () {
        return this.money ? this.before_money - this.money : ''
      }
    },
    methods: {
      addMoney () {
        if (!this.target) {
          alert('转账对象不能为空')
          return false
        }
        if (this.money === '') {
          alert('转账金额不能为空')
          return false
        }
        let today = (new Date()).Format('yyyy-MM-dd')
        const callback = (res, msg) => {
          if (res.ret === 0) {
            alert(msg)
            bus.$emit('getTransitionList')
            this.getNowMoney()
            this.clearData()
            this.goTarget('trans_target')
          }
        }
        api.addTransition({
          date: today,
          destination: this.target,
          amount: this.money - 0,
          remark: this.note
        })
          .then((res) => { callback(res, '添加成功') })
          .catch((msg) => { alert(msg) })
      },
      clearData () {
        this.target = ''
        this.money = ''
        this.note = ''
      },
      goTarget (target) {
        common.goTarget(target)
      },
      // 现有金额获取
      getNowMoney () {
        api.getNowMoney()
          .then((res) => {
            this.nowMoney = res.amount
            this.before_money = this.nowMoney
          })
      },
      // 修改现存
      changeMoney () {
        api.putNowMoney({amount: this.nowMoney - 0})
          .then((res) => {
            if (res.ret === 0) {
              alert('修改成功')
              this.before_money = this.nowMoney
              this.goTarget('trans_target')
            }
          })
          .catch((msg) => { alert(msg) })
      },
      cancelChangeMoney () {
        this.nowMoney = this.before_money
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
