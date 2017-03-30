<template>
  <div class="item">
    <span class="text">{{text}}</span>
    <input class="form-input" :value="value" @input="updateValue($event.target.value)">
  </div>
</template>

<script>
export default {
  props: ['text', 'value'],
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    }
  }
}
</script>
