<template>
  <div class="item">
    <span class="text">{{text}}</span>
    <el-select v-model="val"
               :filterable="!noSearch"
               :remote="!noSearch"
               placeholder="请选择"
               :remote-method="method">
      <el-option v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    value: String,
    method: Function,
    options: Array,
    noSearch: Boolean
  },
  data () {
    return {
      val: ''
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      if (this.value) {
        this.val = this.value
      }
    })
  },
  watch: {
    val () {
      this.$emit('input', this.val)
    }
  }
}
</script>
