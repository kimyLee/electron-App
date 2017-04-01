<template>
    <!--操作-->
    <el-col :span="6">
      <div class="my-panel" style="padding: 0">
        <div class="my-panel-header">供应商管理</div>
        <my-input text="名称" v-model="name"></my-input>
        <my-input text="电话" v-model="tel"></my-input>
        <div class="btn-panel">
          <el-button type="primary" @click.stop="addSupplier">添加</el-button>
        </div>
      </div>
    </el-col>
</template>

<script>
  import myInput from '@/components/myInput'
  import api from '@/services/supplier'
  export default {
    data () {
      return {
        name: '',
        tel: ''
      }
    },
    components: {
      myInput
    },
    methods: {
      addSupplier () {
        if (!this.tel) {
          alert('号码不能为空！')
          return false
        }
        if (!this.name) {
          alert('姓名不能为空！')
          return false
        }
        api.addSupplier({phone: this.tel, name: this.name})
          .then(function (res) {
            if (res.ret === 0) {
              alert('添加成功')
            }
          })
          .catch(function (msg) {
            alert(msg)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
