<template>
    <!--操作-->
    <el-col :span="6">
      <div class="my-panel" style="padding: 0">
        <div class="my-panel-header">供应商管理</div>
        <my-input text="名称" v-model="name" id="supplier_name" next="supplier_tel" :disable="id===1"></my-input>
        <my-input text="电话" v-model="tel" id="supplier_tel" pre="supplier_name"></my-input>
        <div class="btn-panel">
            <div class="btnItem"
                 @keyup.down="goTarget('supplier_del')"
                 @keyup.up="goTarget('supplier_tel')">
                <el-button type="primary" id='supplier_sure'
                           @click.stop="addSupplier">{{selected ? '修改' : '添加'}}
                </el-button>
            </div>
            <div class="btnItem"
                 @keyup.up="goTarget('supplier_sure')">
                <el-button type="danger" id='supplier_del'
                           @click.stop="delSupplier">删除
                </el-button>
            </div>
        </div>
      </div>
    </el-col>
</template>

<script type="text/ecmascript-6">
  import myInput from '@/components/myInput'
  import api from '@/services/supplier'
  import bus from '@/bus'

  export default {
    data () {
      return {
        id: '',
        name: '',
        tel: '',
        selected: false
      }
    },
    components: {
      myInput
    },
    mounted: function () {
      this.$nextTick(function () {
        bus.$on('supplierRender', (row) => {
          this.selected = row.index >= 0
          if (this.selected) {
            this.id = row.id
            this.name = row.name
            this.tel = row.phone
          }
        })
      })
    },
    methods: {
      clearData () {
        this.id = ''
        this.name = ''
        this.tel = ''
      },
      goTarget (target) {
        document.getElementById(target).focus()
      },
      delSupplier () {
        if (confirm('确定删除该供应商信息？')) {
          api.delSupplier({id: this.id})
            .then((res) => {
              if (res.ret === 0) {
                alert('删除成功')
                bus.$emit('getSupplierList')
                this.clearData()
              }
            })
            .catch((msg) => { alert(msg) })
        }
      },
      addSupplier () {
        if (!this.tel) {
          alert('号码不能为空！')
          return false
        }
        if (!this.name) {
          alert('姓名不能为空！')
          return false
        }
        const callback = (res, msg) => {
          if (res.ret === 0) {
            alert(msg)
            bus.$emit('getSupplierList')
            this.clearData()
            this.goTarget('supplier_name')
          }
        }
        if (this.selected) {
          if (confirm('确定修改该供应商信息？')) {
            api.updateSupplier({id: this.id, phone: this.tel, name: this.name})
              .then((res) => { callback(res, '修改成功') })
              .catch((msg) => { alert(msg) })
          }
        } else {
          api.addSupplier({phone: this.tel, name: this.name})
            .then((res) => { callback(res, '添加成功') })
            .catch((msg) => { alert(msg) })
        }
      }
    }
  }
</script>
