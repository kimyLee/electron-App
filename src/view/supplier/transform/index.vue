<template>
  <el-row class="customer">
    <!--数据展示-->
    <el-col :span="18">
      <div class="my-panel" style="padding: 10px">
        <el-row>
          <el-col :span="12"><my-date text="开始日期" v-model="dateBegin" id="fee_date" next="fee_name"></my-date></el-col>
          <el-col :span="12"> <my-date text="结束日期" v-model="dateEnd" id="fee_date" next="fee_name"></my-date></el-col>
        </el-row>
      </div>
      <el-table
              :data="tableData"
              height="680"
              stripe
              border
              style="width: 100%;font-size: 12px">
        <el-table-column v-for="(item, $index) in tableConfig"
                         :prop="item.prop"
                         :label="item.label"
                         :formatter="getStatus(item.label)"
                         :width="item.width">
        </el-table-column>
      </el-table>
    </el-col>
    <!--操作-->
    <store></store>
  </el-row>
</template>

<script type="text/ecmascript-6">
  import store from './storePanel'
  import myDate from '@/components/myDatePicker'
  import api from '@/services/supplier'
  import bus from '@/bus'
  export default {
    data () {
      return {
        index: -1,
        dateBegin: '',
        dateEnd: '',
        tableConfig: [
          {label: '日期', prop: 'date'},
          {label: '转账对象', prop: 'destination'},
          {label: '总数', prop: 'amount'},
          {label: '备注', prop: 'remark'}
        ],
        tableData: []
      }
    },
    components: {
      store,
      myDate
    },
    watch: {
      dateBegin () {
        this.getTransition()
      },
      dateEnd () {
        this.getTransition()
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getTransition()
        bus.$on('getTransitionList', this.getTransition)
      })
    },
    methods: {
      // 日期过滤函数
      getStatus (label) {
        if (label === '日期') {
          return function (row) {
            return (new Date(row.date)).Format('yyyy-MM-dd')
          }
        }
        return null
      },
      getTransition () {
        api.getTransition({
          startDate: this.dateBegin,
          endDate: this.dateEnd
        })
          .then((data) => {
            if (data.ret === 0) {
              this.tableData = data.transfers || []
            }
          })
      }
    }
  }
</script>
<style>
  .customer tr {  cursor: pointer }
</style>
