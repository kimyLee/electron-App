<template>
    <!--操作-->
    <el-col :span="6">
        <div class="my-panel" style="padding: 0">
            <div class="my-panel-header">费用管理</div>
            <my-input text="费用名称" v-model="name" id="fee_name" next="fee_code"></my-input>
            <my-input text="拼音码" v-model="code" id="fee_code" next="!fee_supplier" pre="fee_name"></my-input>
            <my-search text="供货商"
                       id="fee_supplier"
                       v-model="supplier_id"
                       :method="searchId"
                       :callback="callback"
                       :options="options"></my-search>
            <div class="btn-panel">
                <div class="btnItem"
                     @keyup.down="goTarget('fee_del')"
                     @keyup.up="goTarget('!fee_supplier')">
                    <el-button type="primary" id='fee_sure'
                               @click.stop="addFeeType">{{selected ? '修改' : '添加'}}
                    </el-button>
                </div>
                <div class="btnItem"
                     @keyup.up="goTarget('fee_sure')">
                    <el-button type="danger" id='fee_del'
                               @click.stop="delFeeType">删除
                    </el-button>
                </div>
            </div>
        </div>
    </el-col>
</template>

<script type="text/ecmascript-6">
  import myInput from '@/components/myInput'
  import mySearch from '@/components/mySearchInput'
  import api from '@/services/fee'
  import apiSupplier from '@/services/supplier'
  import bus from '@/bus'

  export default {
    data () {
      return {
        id: -1,
        name: '',
        code: '',
        supplier: '公司',
        supplier_id: 1,
        options: [],
        selected: false
      }
    },
    components: {
      myInput,
      mySearch
    },
    mounted: function () {
      this.$nextTick(function () {
        bus.$on('feeTypeRender', (row) => {
          this.selected = row.index >= 0
          if (this.selected) {
            this.id = row.id
            this.name = row.name
            this.code = row.spell
            this.supplier = row.supplier
          } else {
            this.clearData()
          }
        })
      })
    },
    methods: {
      searchId (key) {
        apiSupplier.getSupplier({key: key || ''})
          .then((res) => {
            if (res.ret === 0) {
              this.options = apiSupplier.toSearch(res.suppliers)
            }
          })
          .catch((msg) => { alert(msg) })
      },
      // 搜索函数回调
      callback (val) {
        let len = this.options.length
        for (let i = 0; i < len; i++) {
          if (this.options[i].value === val) {
            this.supplier = this.options[i].label
            document.getElementById('fee_sure').focus()
            return true
          }
        }
      },
      clearData () {
        this.id = ''
        this.name = ''
        this.code = ''
        this.supplier = '公司'
        this.supplier_id = 1
      },
      delFeeType () {
        if (confirm('确定删除该费用信息？')) {
          api.delFeeType({id: this.id})
            .then((res) => {
              if (res.ret === 0) {
                alert('删除成功')
                bus.$emit('getFeeTypeList')
                this.clearData()
              }
            })
            .catch((msg) => { alert(msg) })
        }
      },
      goTarget (target) {
        if (target[0] === '!') {
          document.querySelector('#' + target.substring(1) + ' input').focus()
        } else {
          document.getElementById(target).focus()
        }
      },
      addFeeType () {
        if (!this.name) {
          alert('费用名不能为空！')
          return false
        }
        if (!this.code) {
          alert('拼音码不能为空！')
          return false
        }
        if (this.supplier === '') {
          alert('对应供应商不能为空！')
          return false
        }
        if (this.supplier_id === '') {
          alert('供应商id为空，请重新选择供应商')
          return false
        }
        console.log(this.supplier_id, this.supplier)
        const callback = (res, msg) => {
          if (res.ret === 0) {
            alert(msg)
            bus.$emit('getFeeTypeList')
            this.clearData()
            this.goTarget('fee_name')
          }
        }
        if (this.selected) {
          if (confirm('确定修改该费用信息？')) {
            api.updateFeeType({
              id: this.id,
              name: this.name,
              spell: this.code,
              supplier: this.supplier,
              supplier_id: this.supplier_id
            })
              .then((res) => { callback(res, '修改成功') })
              .catch((msg) => { alert(msg) })
          }
        } else {
          api.addFeeType(
            {
              name: this.name,
              spell: this.code,
              supplier: this.supplier,
              supplier_id: this.supplier_id
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
