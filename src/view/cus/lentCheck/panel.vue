<template>
    <!--操作-->
    <el-col :span="12">
      <div class="my-panel" style="padding: 0">
        <div class="my-panel-header">操作</div>
        <el-row>
          <el-col :span="12">
            <my-date text="开始时间" v-model="date2"></my-date>
            <my-date text="结束时间" v-model="date2"></my-date>
            <my-search text="客户编号" v-model="store2" :method="searchId" :options="options"></my-search>
            <my-search text="查询角色" v-model="store2" :options="options1" no-search></my-search>
          </el-col>
          <el-col :span="12">
            <my-search text="拼音码" v-model="store2" :method="searchId" :options="options"></my-search>
            <my-input text="客户名称" v-model="store1"></my-input>
            <my-input text="总欠金额" v-model="store1"></my-input>
          </el-col>
        </el-row>
        <div class="btn-panel">
          <el-button type="primary">查询</el-button>
          <el-button type="primary">打印</el-button>
        </div>
      </div>
      <div class="my-panel">
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%;font-size: 12px">
          <el-table-column v-for="(item, $index) in tableConfig"
                           :prop="item.prop"
                           :label="item.label"
                           :width="item.width">
          </el-table-column>
        </el-table>
      </div>
      <div class="my-panel">
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%;font-size: 12px">
          <el-table-column v-for="(item, $index) in tableConfig"
                           :prop="item.prop"
                           :label="item.label"
                           :width="item.width">
          </el-table-column>
        </el-table>
      </div>
    </el-col>
</template>

<script>
  import myInput from '@/components/myInput'
  import myDate from '@/components/myDatePicker'
  import mySearch from '@/components/mySearchInput'
  export default {
    props: {
      test: Boolean
    },
    data () {
      return {
        date: '',
        date2: '2017-12-01',
        store1: '11',
        store2: '22',
        value8: '11',
        options: [],
        options1: [
          {label: '名称', value: '1'},
          {label: '名称', value: '2'}
        ],
        pickerOptions0: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        tableConfig: [
          {label: '客户', prop: 'name'},
          {label: '借款人', prop: 'name'},
          {label: '前欠', prop: 'name'},
          {label: '日欠', prop: 'name'},
          {label: '日收', prop: 'name'},
          {label: '总欠', prop: 'name'}
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
          date: '2016-05-01',
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
      myInput,
      mySearch,
      myDate
    },
    watch: {
      store1 () {
        console.log(this.store1)
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        console.log(this.test, 233)
      })
    },
    methods: {
      searchId (key) {
        console.log(key)
        this.options = [{value: key, label: key}, {value: key + '1122', label: key + '11'}]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
