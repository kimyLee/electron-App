<template>
  <div class="page" style="height: 100%">
    <side></side>
  </div>
</template>

<script>
  import side from '@/components/side'

  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      side
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
