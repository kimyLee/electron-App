<template>
  <div class="side" id="side">
    <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo">
      <el-menu-item-group title="销售管理">
        <el-menu-item index="1"><i class="el-icon-message"></i>下单</el-menu-item>
        <el-menu-item index="2"><i class="el-icon-message"></i>商品管理</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="客户">
        <el-menu-item index="3"><i class="el-icon-message"></i>导航三</el-menu-item>
        <el-menu-item index="4"><i class="el-icon-message"></i>导航四</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="费用">
        <el-menu-item index="5"><i class="el-icon-message"></i>导航三</el-menu-item>
        <el-menu-item index="6"><i class="el-icon-message"></i>导航四</el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .side{width: 122px;height: 100%}
  .side ul{height: 100%}
  #side .el-menu-item-group__title {padding-top: 0; font-weight: bold!important;color: #000!important;}
  #side .el-menu-item, .el-submenu__title {height: 22px;line-height: 22px}
</style>
