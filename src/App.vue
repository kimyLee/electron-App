<template>
  <div id="app" class="container">
    <side></side>
    <div style="background-color:#f1f1f1;position: absolute;top: 0;bottom: 0;left: 122px;right: 0">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import side from '@/components/side'
  import api from '@/services/supplier'

  export default {
    name: 'app',
    components: {
      side
    },
    mounted: function () {
      api.updateSupplier({id: 1, name: '公司'})
        .catch((msg) => { alert(msg) })
    }
  }
</script>

<style>
  html{font-size: 62.5%}
  html, body{margin: 0;padding: 0}
  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000;
    overflow: hidden;
  }
  .container{
    height: 100%;
    min-width: 1000px;
    width: 100%;
    padding-left: 122px;
  }
</style>
