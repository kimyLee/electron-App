<template>
  <!--数据展示-->
  <el-col :span="12">
    <div class="my-panel">
      <el-row>
        <el-col :span="12">
          <my-date text="开始日期" v-model="date" id="fee_date" next="fee_name"></my-date>
          <my-date text="销售日期" v-model="date" id="fee_date" next="fee_name"></my-date>
          <my-input text="客户编号" v-model="code" id="fee_code" disable></my-input>
          <my-search text="查询角色" v-model="store2" :options="roleType" no-search></my-search>
        </el-col>
        <el-col :span="12">
          <my-search text="拼音码" v-model="store2" :method="searchId" :options="options"></my-search>
          <my-search text="客户名称" v-model="store2" :method="searchId" :options="options"></my-search>
          <my-search text="总欠金额" v-model="store2" :method="searchId" :options="options"></my-search>
          <div class="btn-panel">
            <el-button type="primary">打印</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="my-panel" style="margin-top: 2px">
      <el-row>
        <el-table
          :data="tableData"
          height="555"
          stripe
          border
          :row-class-name="choose"
          style="width: 100%;font-size: 12px">
          <el-table-column v-for="(item, $index) in tableConfig"
                           :prop="item.prop"
                           :label="item.label"
                           :width="item.width"
          >
          </el-table-column>
        </el-table>
      </el-row>
    </div>
  </el-col>
</template>

<script>
  import myInput from '@/components/myInput'
  import myDate from '@/components/myDatePicker'
  import mySearch from '@/components/mySearchInput'
  export default {
    data () {
      // 日期必须加上，否则默认今天
      return {
        store1: '',
        store2: '',
        date: '',
        date2: '',
        roleType: [
          {label: '客户', value: '1'},
          {label: '供应商', value: '2'}
        ],
        options: [],
        tableConfig: [
          {label: '客户', prop: 'name'},
          {label: '借款人', prop: 'name'},
          {label: '前欠', prop: 'name'},
          {label: '日欠', prop: 'name'},
          {label: '日收', prop: 'name'},
          {label: '去尾数', prop: 'name'},
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
    methods: {
      searchId (key) {
        console.log(key)
        this.options = [{value: key, label: key}, {value: key + '1122', label: key + '11'}]
      },
      choose (row, index) {
        console.log(row, index)
        if (index % 2 === 0) {
          return 'active'
        } else {
          return ''
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
