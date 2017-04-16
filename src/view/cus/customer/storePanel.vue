<template>
    <!--操作-->
    <el-col :span="6">
      <div class="my-panel" style="padding: 0">
        <div class="my-panel-header">客户管理</div>
        <my-input text="客户名" v-model="name" id="cus_name" next="cus_code"></my-input>
        <my-input text="拼音码" v-model="code" id="cus_code" next="cus_loan" pre="cus_name"></my-input>
        <my-input text="总欠金额" v-model="loan" id="cus_loan" next="cus_phone" pre="cus_code"></my-input>
        <my-input text="手机号" v-model="phone" id="cus_phone" next="cus_credit" pre="cus_loan"></my-input>
        <my-input text="信用额度" v-model="credit" id="cus_credit" next="cus_sure" pre="cus_phone"></my-input>
        <div class="btn-panel">
            <div class="btnItem"
                  @keyup.down="goTarget('cus_del')"
                  @keyup.up="goTarget('cus_credit')">
                <el-button type="primary" id='cus_sure'
                           @click.stop="addCustomer">{{selected ? '修改' : '添加'}}
                </el-button>
            </div>
            <div class="btnItem"
                 @keyup.up="goTarget('cus_sure')">
                <el-button type="danger" id='cus_del'
                        @click.stop="delCustomer">删除
                </el-button>
            </div>
        </div>
      </div>
    </el-col>
</template>

<script type="text/ecmascript-6">
  import myInput from '@/components/myInput'
  import api from '@/services/customer'
  import bus from '@/bus'

  export default {
    data () {
      return {
        id: -1,
        name: '',
        code: '',
        loan: 0,
        phone: '',
        credit: 0,
        selected: false
      }
    },
    components: {
      myInput
    },
    mounted: function () {
      this.$nextTick(function () {
        bus.$on('customerRender', (row) => {
          this.selected = row.index >= 0
          if (this.selected) {
            this.id = row.id
            this.name = row.name
            this.code = row.spell
            this.loan = row.loan
            this.phone = row.phone
            this.credit = row.credit
          } else {
            this.clearData()
          }
        })
      })
    },
    methods: {
      clearData () {
        this.id = ''
        this.name = ''
        this.code = ''
        this.loan = ''
        this.phone = ''
        this.credit = ''
      },
      delCustomer () {
        if (confirm('确定删除该客户信息？')) {
          if (this.id === 1) {
            alert('默认第一个为现金客户，不能删除')
            return false
          }
          api.delCustomer({id: this.id})
            .then((res) => {
              if (res.ret === 0) {
                alert('删除成功')
                bus.$emit('getCustomerList')
                this.clearData()
              }
            })
            .catch((msg) => { alert(msg) })
        }
      },
      goTarget (target) {
        document.getElementById(target).focus()
      },
      addCustomer () {
        if (!this.phone) {
          alert('号码不能为空！')
          return false
        }
        if (!this.name) {
          alert('姓名不能为空！')
          return false
        }
        if (!this.code) {
          alert('拼音码不能为空！')
          return false
        }
        if (this.loan === '') {
          alert('总欠初始不能为空！')
          return false
        }
        if (this.credit === '') {
          alert('信用额度初始不能为空！')
          return false
        }
        const callback = (res, msg) => {
          if (res.ret === 0) {
            alert(msg)
            bus.$emit('getCustomerList')
            this.clearData()
            this.goTarget('cus_name')
          }
        }
        if (this.selected) {
          if (confirm('确定修改该客户信息？')) {
            api.updateCustomer({
              id: this.id,
              phone: this.phone,
              name: this.name,
              spell: this.code,
              credit: this.credit,
              loan: this.loan
            })
              .then((res) => { callback(res, '修改成功') })
              .catch((msg) => { alert(msg) })
          }
        } else {
          api.addCustomer(
            {
              phone: this.phone,
              name: this.name,
              spell: this.code,
              credit: this.credit,
              loan: this.loan
            })
            .then((res) => { callback(res, '添加成功') })
            .catch((msg) => { alert(msg) })
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
