<template>
    <!--操作-->
    <el-col :span="6">
      <div class="my-panel" style="padding: 0">
        <div class="my-panel-header">费用管理</div>
        <my-input text="费用名称" v-model="store1"></my-input>
        <my-input text="拼音码" v-model="store1"></my-input>
        <my-search text="供应商" v-model="store2" :method="searchId" :options="options"></my-search>
        <div class="btn-panel">
          <el-button type="primary">添加</el-button>
          <el-button>取消</el-button>
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
      store1 () {}
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
