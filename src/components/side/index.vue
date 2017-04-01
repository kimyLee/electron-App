<template>
  <div class="side" id="side">
    <el-menu mode="vertical" router :default-active="$route.path" class="el-menu-vertical-demo">
      <el-menu-item-group title="销售管理" >
        <i class="el-icon-menu title-icon" ></i>
        <el-menu-item index="/">下单</el-menu-item>
        <el-menu-item index="/chaxun">销售查询</el-menu-item>
        <el-menu-item index="/mingxi">销售明细</el-menu-item>
        <el-menu-item index="/store">商品管理</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="客户">
        <i class="el-icon-menu title-icon" ></i>
        <el-menu-item index="/borrow">借款</el-menu-item>
        <el-menu-item index="/back">还款</el-menu-item>
        <el-menu-item index="/lentCheck">欠款查询</el-menu-item>
        <el-menu-item index="/customer">客户管理</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="费用" >
        <i class="el-icon-menu title-icon" ></i>
        <el-menu-item index="/addFee">添加费用</el-menu-item>
        <el-menu-item index="/feeDetail">费用明细</el-menu-item>
        <el-menu-item index="/feeOption">费用管理</el-menu-item>
        <el-menu-item index="/feeIn">添加收入</el-menu-item>
        <el-menu-item index="/feeOut">添加支出</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="仓库" >
        <i class="el-icon-menu title-icon" ></i>
        <el-menu-item index="/inGood">进货</el-menu-item>
        <el-menu-item index="/lossGood">报损</el-menu-item>
        <el-menu-item index="/detailGood">进出明细</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="报表" >
        <i class="el-icon-menu title-icon" ></i>
        <el-menu-item index="/report">查看报表</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="供应商管理" >
        <i class="el-icon-menu title-icon" ></i>
        <el-menu-item index="/ticheng">提成结算</el-menu-item>
        <el-menu-item index="/giveMoney">转账</el-menu-item>
        <el-menu-item index="/supplier">供应商管理</el-menu-item>
      </el-menu-item-group>
    </el-menu>
    <div style="bottom: 5px;width: 100%;background-color: #f0f0f0">
      <img src="./logo.png" style="width: 100px">
    </div>
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
  .side{width: 122px;height:100%;position: absolute;min-height: 650px;background-color: #f0f0f0;left: 0}
  .side ul{height: 650px;padding-top: 5px}
  #side .el-menu-item-group{margin-bottom: 10px;position: relative;color: #444;padding-top: 0}
  #side .el-menu {background-color: #f0f0f0}
  #side .el-menu-item-group__title {padding-top: 0;color: #000}
  #side .el-menu-item,#side .el-submenu__title {height: 25px;line-height: 25px;color: #444;font-weight: bold;font-size: 13px}
  #side .el-menu-item.is-active{color: #fff;background-color: #447740}
  .title-icon{position: absolute;top: 2px;  left: 5px;}
</style>
