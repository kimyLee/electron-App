<template>
  <el-row>
    <!--数据展示-->
    <el-col :span="18">
      <el-table
        :data="tableData"
        height="700"
        stripe
        border
        style="width: 100%;font-size: 12px">
        <el-table-column v-for="(item, $index) in tableConfig"
          :prop="item.prop"
          :label="item.label"
          :width="item.width">
        </el-table-column>
      </el-table>
      <div style="text-align: right">
        <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </el-col>
    <!--操作-->
    <store></store>
  </el-row>
</template>

<script>
  import store from './storePanel'
  export default {
    data () {
      return {
        tableConfig: [
          {label: 'ID', prop: 'name'},
          {label: '客户名', prop: 'name'},
          {label: '拼音码', prop: 'name'},
          {label: '总欠', prop: 'name'},
          {label: '手机号', prop: 'name'},
          {label: '欠费额度', prop: 'name'}
        ],
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    components: {
      store
    },
    mounted: function () {
      this.$nextTick(function () {
        console.log(this.$route)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-table::before {width: 0 ;  height: 0;}
</style>
