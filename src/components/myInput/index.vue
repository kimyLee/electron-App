<template>
    <div class="item">
        <span class="text">{{text}}</span>
        <input class="form-input" :id="id" :value="value" :readonly="disable?'readonly':false"
               @input="updateValue($event.target.value)"
               @keyup.up.stop="go('pre')"
               @keyup.down.stop="go('next')"
               @keyup.enter.stop="go('next')"
        >
    </div>
</template>

<script>
    /* 字符串首带!的作用是标识判定是否是否向下查找input 节点，可能直接id无法获取 */
    export default {
      props: {
        text: String,
        value: [Number, String],
        id: String,
        next: String,
        pre: String,
        disable: Boolean
      },
      methods: {
        updateValue (value) {
          this.$emit('input', value)
        },
        go (dir) {
          console.log(this.id, this.next)
          if (dir === 'pre') {
            this.pre && this.pre[0] === '!' && document.querySelector('#' + this.pre.substring(1) + ' input').focus()
            this.pre && this.pre[0] !== '!' && document.getElementById(this.pre).focus()
          } else {
            this.next && this.next[0] === '!' && document.querySelector('#' + this.next.substring(1) + ' input').focus()
            this.next && this.next[0] !== '!' && document.getElementById(this.next).focus()
          }
        }
      }
    }
</script>
