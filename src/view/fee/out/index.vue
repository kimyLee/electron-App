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
                         :key="$index"
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
  import api from '@/services/fee'
  import bus from '@/bus'

  export default {
    data () {
      return {
        tableConfig: [
          {label: '日期', prop: 'date'},
          {label: '备注', prop: 'remark'},
          {label: '金额', prop: 'money'}
        ],
        tableData: []
      }
    },
    components: {
      store
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getData()
        bus.$on('getOutList', this.getData)
      })
    },
    methods: {
      getStatus (label) {
        if (label === '日期') {
          return function (row) {
            return (new Date(row.date)).Format('yyyy-MM-dd')
          }
        }
        return null
      },
      getData () {
        api.getOut()
          .then((data) => {
            if (data.ret === 0) {
              this.tableData = data.data || []
            }
          })
          .catch((err) => {
            alert(err)
          })
      }
    }
  }
</script>

