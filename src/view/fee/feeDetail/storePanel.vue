<template>
    <!--操作-->
    <el-col :span="6">
        <div class="my-panel" style="padding: 0">
            <div class="my-panel-header">费用管理</div>
            <my-date text="开始日期" v-model="dateBegin" id="fee_date_begin" next="fee_name"></my-date>
            <my-date text="结束日期 " v-model="dateEnd" id="fee_date_end" next="fee_name"></my-date>
            <my-input text="费用编号" v-model="name" id="fee_name" next="fee_code" disable></my-input>
            <my-input text="费用名称" v-model="code" id="fee_code" next="!fee_supplier" pre="fee_name" disable></my-input>
            <my-search text="是否删除"
                       v-model="isDelete"
                       :options="delTypeList"
                       :callback="callback"
                       no-search></my-search>
            <div class="btn-panel">
                <div class="btnItem">
                    <el-button type="danger" id='fee_del'
                               v-show="selected"
                               @click.stop="delFeeType">删除
                    </el-button>
                </div>
            </div>
        </div>
    </el-col>
</template>

<script type="text/ecmascript-6">
  import myDate from '@/components/myDatePicker'
  import myInput from '@/components/myInput'
  import mySearch from '@/components/mySearchInput'
  import api from '@/services/fee'
  import bus from '@/bus'

  export default {
    data () {
      return {
        dateBegin: '',
        dateEnd: '',
        id: '',
        name: '',
        code: '',
        isDelete: '',
        options: [],
        delTypeList: [
          {label: '所有', value: ''},
          {label: '未删除', value: 0},
          {label: '已删除', value: 1}
        ],
        selected: false
      }
    },
    watch: {
      dateBegin () {
        bus.$emit('getFeeDetailList', {begin: this.dateBegin, end: this.dateEnd})
      },
      dateEnd () {
        bus.$emit('getFeeDetailList', {begin: this.dateBegin, end: this.dateEnd})
      }
    },
    components: {
      myInput,
      myDate,
      mySearch
    },
    mounted: function () {
      this.$nextTick(function () {
        bus.$on('feeDetailRender', (row) => {
          this.selected = row.index >= 0
          if (this.selected) {
            this.id = row.id
            this.name = row.name
            this.code = row.spell
          } else {
            this.clearData()
          }
        })
      })
    },
    methods: {
      // 搜索函数回调
      clearData () {
        this.id = ''
        this.name = ''
        this.code = ''
      },
      callback (val) {
        bus.$emit('getFeeDetailList', {
          begin: this.dateBegin,
          end: this.dateEnd,
          isDelete: val
        })
      },
      delFeeType () {
        if (confirm('确定删除该费用信息？系统将记录状态')) {
          api.delFee({id: this.id})
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

