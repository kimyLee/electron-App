<template>
  <div class="page">
    <div class="app_header">
        <span>Groups</span>
        <span class="fa fa-user-plus weui-tabbar__icon" style="float: right;margin-right: 30px;margin-top: 3px"></span>
    </div>
    <div class="page__bd" style="height: 100%;">
      <div class="weui-tab">
        <div class="weui-tab__panel pt30">
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                <img src="../../../static/img/test.jpg" style="width: 50px;display: block">
                <span class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;">8</span>
              </div>
              <div class="weui-cell__bd">
                <p>一个群</p>
                <p style="font-size: 13px;color: #888888;">摘要信息</p>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                <img src="../../../static/img/test.jpg" style="width: 50px;display: block">
                <span class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;">8</span>
              </div>
              <div class="weui-cell__bd">
                <p>林家仪</p>
                <p style="font-size: 13px;color: #888888;">摘要信息</p>
              </div>
            </div>
          </div>
        </div>
        <div class="weui-tabbar">
          <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on">
            <span style="display: inline-block;position: relative;">
              <span class="fa fa-wechat weui-tabbar__icon"></span>
              <!--消息红点-->
              <span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span>
            </span>
            <p class="weui-tabbar__label">讨论</p>
          </a>
          <a href="javascript:;" class="weui-tabbar__item">
            <span class="fa fa-wpforms weui-tabbar__icon"></span>
            <p class="weui-tabbar__label">笔记</p>
          </a>
          <router-link to="/todo" class="weui-tabbar__item">
                    <span style="display: inline-block;position: relative;">
                        <span class="fa fa-check-square-o weui-tabbar__icon"></span>
                        <span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>
                    </span>
            <p class="weui-tabbar__label">任务</p>
          </router-link>
          <a href="javascript:;" class="weui-tabbar__item">
            <span class="fa fa-mortar-board weui-tabbar__icon"></span>
            <p class="weui-tabbar__label">小组</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .app_header{
    position: fixed;
    top:0;
    left: 0;
    height: 30px;
    background: #0D0D0D;
    color: #fff;
    z-index: 100;
    width: 100%;
    line-height: 30px;
    padding: 0 15px;
  }
  .fa{font-size: 2.2rem}
</style>
