<template>
  <!--操作-->
  <el-col :span="6">
    <div class="my-panel" style="padding: 0">
      <div class="my-panel-header">收入管理</div>
      <my-input text="收入备注" v-model="remark" id="in_remark" next="in_money"></my-input>
      <my-input text="收入金额" v-model="money" id="in_money" next="btn" pre="in_remark"></my-input>
      <div class="btn-panel">
        <div class="btnItem"
             @keyup.down="goTarget('cancel')"
             @keyup.up="goTarget('in_money')">
          <el-button type="primary" @click="addMoney" id="btn">添加</el-button>
        </div>
        <div class="btnItem"
             @keyup.up="goTarget('btn')">
          <el-button @click="cancel" id="cancel">取消</el-button>
        </div>
      </div>
    </div>
  </el-col>
</template>

<script type="text/ecmascript-6">
  import myInput from '@/components/myInput'
  import api from '@/services/fee'
  import bus from '@/bus'
  import common from '@/until'

  export default {
    data () {
      return {
        remark: '',
        money: ''
      }
    },
    components: {
      myInput
    },
    watch: {
      store1 () {
      }
    },
    methods: {
      addMoney () {
        if (!this.remark) {
          alert('收入备注不能为空')
          return false
        }
        if (!this.money || isNaN(this.money)) {
          alert('金额需为数字')
          return false
        }
        api.addIn({
          remark: this.remark,
          money: this.money - 0
        })
          .then(() => {
            alert('添加收入成功')
            this.cancel()
            document.getElementById('btn').blur()
            bus.$emit('getInList')
          })
          .catch((err) => {
            alert(err)
          })
      },
      goTarget (target) {
        common.goTarget(target)
      },
      cancel () {
        this.remark = ''
        this.money = ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
