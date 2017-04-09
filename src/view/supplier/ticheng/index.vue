<template>
  <el-row>
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
    </el-col>
    <!--操作-->
    <store></store>
  </el-row>
</template>

<script>
  import store from './storePanel'
  import api from '@/services/home'
  import bus from '@/bus'

  export default {
    data () {
      return {
        index: -1,
        tableConfig: [
          {label: '名称', prop: 'name'},
          {label: '供应商', prop: 'supplier'},
          {label: '包装费', prop: 'packFee'},
          {label: '过磅费', prop: 'weighFee'},
          {label: '提成方式', prop: 'type'},
          {label: '提成结算', prop: ''}
        ],
        tableData: []
      }
    },
    components: {
      store
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getStore()
        bus.$on('getStoreList', this.getStore)
      })
    },
    methods: {
      getStore () {
        const self = this
        api.getStore({pageNum: this.page.num, pageSize: this.page.size})
          .then((data) => {
            if (data.ret === 0) {
              self.tableData = data.customers || []
              self.page.total = data.total || 0
            }
          })
      },
      pageChange (page) {
        this.page.num = page
        this.getStore()
      },
      selectItem (row) {
        this.index = this.index === row.id ? -1 : row.id
        bus.$emit('storeRender', Object.assign({}, row, {index: this.index}))
      },
      setClass (row) {
        console.log(row, this.index)
        return row.id === this.index ? 'active' : ''
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
