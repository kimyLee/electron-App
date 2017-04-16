<template>
  <el-row class="customer">
    <!--数据展示-->
    <el-col :span="12">
      <el-table
        :data="tableData"
        height="700"
        stripe
        border
        :row-class-name="setClass"
        @row-click="selectItem"
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
  import api from '@/services/origin'
  import bus from '@/bus'
  export default {
    data () {
      return {
        index: -1,
        tableConfig: [
          {label: '单号', prop: 'id', width: '70'},
          {label: '日期', prop: 'date', width: '120'},
          {label: '类型', prop: 'type'},
          {label: '总价值', prop: 'totalValue'},
          {label: '车牌号', prop: 'carNum'},
          {label: '总件数', prop: 'totalCount'},
          {label: '总数量', prop: 'totalCountUnit'}
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
        bus.$on('getGoodDetail', this.getData)
      })
    },
    methods: {
      getStatus (label) {
        if (label === '日期') {
          return function (row) {
            return (new Date(row.date)).Format('yyyy-MM-dd')
          }
        }
        if (label === '类型') {
          return function (row) {
            return row.type === 2 ? '进货' : row.type === 1 ? '报损' : ''
          }
        }
        return null
      },
      getData (obj) {
        const today = (new Date()).Format('yyyy-MM-dd')
        api.getDetail({
          startDate: (obj && obj.begin) || today,
          endDate: (obj && obj.end) || today,
          type: (obj && obj.type) || '',
          supplier: ''
        })
          .then((data) => {
            if (data.ret === 0) {
              this.tableData = data.orders || []
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      selectItem (row) {
        this.index = this.index === row.id ? -1 : row.id
        bus.$emit('originDetailRender', Object.assign({}, row, {index: this.index}))
      },
      setClass (row) {
        return row.id === this.index ? 'active' : ''
      }
    }
  }
</script>
<style>
  .customer tr {
    cursor: pointer
  }
</style>
