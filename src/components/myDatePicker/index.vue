<template>
  <div class="item">
    <span class="text">{{text}}</span>
    <el-date-picker
      v-model="val"
      @change="output"
      type="date"
      placeholder="选择日期"
      :picker-options="config">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  props: ['text', 'value'],
  data () {
    return {
      val: '',
      config: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      if (this.value) {
        this.val = this.value
      } else {
        this.val = new Date()
      }
    })
  },
  methods: {
    output (val) {
      this.$emit('input', val)
    }
  }
}
</script>
