<template>
  <el-row class="customer">
    <!--数据展示-->
    <el-col :span="18">
      <el-table
              :data="tableData"
              height="700"
              stripe
              border
              :row-class-name="setClass"
              @row-click="selectItem"
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
                :current-page="page.num"
                :total="page.total"
                :page-size="page.size"
                @current-change="pageChange"
        >
        </el-pagination>
      </div>
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
        index: -1,
        page: {size: 15, num: 1, total: 0},
        tableConfig: [
          {label: '编号', prop: 'id'},
          {label: '名称', prop: 'name'},
          {label: '拼音码', prop: 'spell'},
          {label: '供货商', prop: 'supplier'}
        ],
        tableData: []
      }
    },
    components: {
      store
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getFee()
        bus.$on('getFeeTypeList', this.getFee)
      })
    },
    methods: {
      getFee () {
        const self = this
        api.getFeeType({pageNum: this.page.num, pageSize: this.page.size})
          .then((data) => {
            if (data.ret === 0) {
              self.tableData = data.Costs || []
              self.page.total = data.total || 0
            }
          })
      },
      pageChange (page) {
        this.page.num = page
        this.getFee()
      },
      selectItem (row) {
        this.index = this.index === row.id ? -1 : row.id
        bus.$emit('feeTypeRender', Object.assign({}, row, {index: this.index}))
      },
      setClass (row) {
        return row.id === this.index ? 'active' : ''
      }
    }
  }
</script>
<style>
  .customer tr {  cursor: pointer }
</style>
