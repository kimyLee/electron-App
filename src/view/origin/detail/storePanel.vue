<template>
  <!--操作-->
  <el-col :span="12">
    <div class="my-panel" style="padding: 0">
      <div class="my-panel-header">进出查询</div>
      <my-date text="开始日期" v-model="dateBegin" ></my-date>
      <my-date text="结束日期 " v-model="dateEnd" ></my-date>
      <my-search text="单据类型"
                 v-model="type"
                 :options="delTypeList"
                 :callback="callback"
                 no-search>
      </my-search>
      <div class="btn-panel">
       <!-- <div class="btnItem">
          <el-button type="primary" id='fee_del'
                     @click.stop="delOrigin">查询
          </el-button>
        </div>-->
        <!--<div class="btnItem">
          <el-button type="danger" id='fee_del1'
                     v-show="selected"
                     @click.stop="delOrigin">删除
          </el-button>
        </div>-->
      </div>
      <div class="my-panel" style="margin-top: 2px">
        <el-row>
          <el-table
            :data="tableData"
            height="555"
            stripe
            border
            style="width: 100%;font-size: 12px">
            <el-table-column v-for="(item, $index) in tableConfig"
                             :key="$index"
                             :prop="item.prop"
                             :label="item.label"
                             :width="item.width"
            >
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </div>
  </el-col>
</template>

<script type="text/ecmascript-6">
  import myDate from '@/components/myDatePicker'
  import myInput from '@/components/myInput'
  import mySearch from '@/components/mySearchInput'
  import api from '@/services/origin'
  import bus from '@/bus'

  export default {
    data () {
      return {
        dateBegin: '',
        dateEnd: '',
        id: '',
        name: '',
        code: '',
        type: '',
        options: [],
        supplier_id: '',
        supplierOptions: [],
        delTypeList: [
          {label: '所有', value: ''},
          {label: '进货', value: 2},
          {label: '报损', value: 1}
        ],
        selected: false,
        tableConfig: [
          {label: '商品', prop: 'gName'},
          {label: '单位', prop: 'unit'},
          {label: '件数', prop: 'count'},
          {label: '数量', prop: 'countUnit'},
          {label: '价格', prop: 'price'},
          {label: '供应商', prop: 'gSupplier'}
        ],
        tableData: []
      }
    },
    watch: {
      dateBegin () {
        bus.$emit('getGoodDetail', {begin: this.dateBegin, end: this.dateEnd})
      },
      dateEnd () {
        bus.$emit('getGoodDetail', {begin: this.dateBegin, end: this.dateEnd})
      }
    },
    components: {
      myInput,
      myDate,
      mySearch
    },
    mounted: function () {
      this.$nextTick(function () {
        bus.$on('originDetailRender', (row) => {
          this.selected = row.index >= 0
          if (this.selected) {
            this.getDetailById(row.id)
          } else {
            this.tableData = []
          }
        })
      })
    },
    methods: {
      getDetailById (id) {
        api.getDetailById({id})
          .then((data) => {
            if (data.ret === 0) {
              this.tableData = data.goods || []
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // 搜索函数回调
      clearData () {
        this.id = ''
        this.name = ''
        this.code = ''
      },
      callback (val) {
        bus.$emit('getGoodDetail', {
          begin: this.dateBegin,
          end: this.dateEnd,
          type: val
        })
      },
      delOrigin () {
        if (confirm('确定删除该进出货信息？系统将记录状态')) {
          api.delIO({id: this.id})
            .then((res) => {
              if (res.ret === 0) {
                alert('删除成功')
                bus.$emit('getFeeDetailList')
                this.clearData()
              }
            })
            .catch((msg) => { alert(msg) })
        }
      }
    }
  }
</script>

