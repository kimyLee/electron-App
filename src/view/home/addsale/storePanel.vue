<template>
    <!--操作-->
    <el-col :span="6">
      <div class="my-panel">
        <my-date text="销售日期" v-model="date2"></my-date>
        <my-search text="客户编码" v-model="store2" :method="searchId" :options="options"></my-search>
        <my-search text="拼音码" v-model="store2" :method="searchId" :options="options"></my-search>
        <my-input text="客户名称" v-model="store1"></my-input>
        <hr>
        <my-input text="商品名称" v-model="store1"></my-input>
        <my-search text="商品编号" v-model="store2" :method="searchId" :options="options"></my-search>
        <my-input text="拼音码" v-model="store1"></my-input>
        <my-input text="库存" v-model="store1"></my-input>
        <my-input text="单位" v-model="store1"></my-input>
        <my-input text="件数" v-model="store1"></my-input>
        <my-input text="数量" v-model="store1"></my-input>
        <my-input text="单价" v-model="store1"></my-input>
        <my-search text="供货商" v-model="store2" :method="searchId" :options="options"></my-search>
        <div class="btn-panel">
          <el-button type="primary">添加</el-button>
          <el-button>删除</el-button>
        </div>
      </div>
      <div class="my-panel" style="margin-top: 2px">
        <my-input text="合计金额" v-model="store1"></my-input>
        <my-input text="前欠金额" v-model="store1"></my-input>
        <my-input text="去尾数" v-model="store1"></my-input>
        <my-input text="挂欠金额" v-model="store1"></my-input>
        <my-input text="总欠金额" v-model="store1"></my-input>
        <hr>
        <my-input text="出场费" v-model="store1"></my-input>
        <my-input text="三轮车费" v-model="store1"></my-input>
        <div class="btn-panel">
          <el-button type="primary">记账</el-button>
        </div>
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
        date: '',
        date2: '2017-12-01',
        store1: '11',
        store2: '22',
        value8: '11',
        options: [],
        pickerOptions0: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        }
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
