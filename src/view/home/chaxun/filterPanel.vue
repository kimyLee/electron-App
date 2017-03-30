<template>
    <!--数据展示-->
    <el-col :span="12">
      <div class="my-panel">
        <el-row>
          <el-col :span="12">
            <my-date text="开始日期" v-model="date2"></my-date>
            <my-date text="销售日期" v-model="date2"></my-date>
            <my-input text="商品名称" v-model="store1"></my-input>
          </el-col>
          <el-col :span="12">
            <my-search text="供应商" v-model="store2" :method="searchId" :options="options"></my-search>
            <my-search text="商品编号" v-model="store2" :method="searchId" :options="options"></my-search>
            <my-search text="拼音码" v-model="store2" :method="searchId" :options="options"></my-search>
          </el-col>
        </el-row>
        <div class="btn-panel">
          <el-button type="primary">查询</el-button>
          <el-button type="primary">打印</el-button>
        </div>
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
          <p style="font-size: 16px;font-weight: bold">
            <span style="display: inline-block;width: 150px">件数：30</span>
            <span style="display: inline-block;width: 150px">数量：30</span>
            <span style="display: inline-block;width: 150px">件数：30</span>
          </p>
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
      return {
        store1: '',
        store2: '',
        date2: '',
        options: [],
        tableConfig: [
          {label: '商品', prop: 'name'},
          {label: '件数', prop: 'name'},
          {label: '数量', prop: 'name'},
          {label: '单位', prop: 'name'},
          {label: '单价', prop: 'name'},
          {label: '包装费', prop: 'name'},
          {label: '过磅费', prop: 'name'},
          {label: '供应商', prop: 'name'},
          {label: '合计', prop: 'name'}
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
