<template>
  <div class="item canRead">
    <span class="text">{{text}}</span>
    <el-select v-model="val"
               :id="id"
               :filterable="!noSearch"
               :remote="!noSearch"
               placeholder="请选择"
               @change="callback"
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
    id: String,
    text: String,
    value: [Number, String],
    method: Function,
    callback: Function,
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
    val (val) {
      console.log(val)
      this.$emit('input', val)
    }
  }
}
</script>
