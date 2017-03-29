<template>
  <div class="page">
    <div class="app_header">
        <span>Groups</span>
        <span class="fa fa-user-plus weui-tabbar__icon" style="float: right;margin-right: 30px;margin-top: 3px"></span>
    </div>
    <div class="page__bd" style="height: 100%;">
      <div class="weui-tab">
        <div class="weui-tab__panel pt30">
          <!--列表项-->
          <div class="weui-cells weui-cells_checkbox">
            <label class="weui-cell weui-check__label" v-for="(item, $index) in list" >
              <div class="weui-cell__hd">
                <input type="checkbox" class="weui-check" name="checkbox1" v-model="item.checked">
                <i class="weui-icon-checked"></i>
              </div>
              <div class="weui-cell__bd">
                <p>{{item.val}}</p>
              </div>
            </label>
            <a href="javascript:void(0);" class="weui-cell weui-cell_link">
              <div class="weui-cell__bd">添加更多</div>
            </a>
          </div>
        </div>
        <div class="weui-tabbar">
          <router-link to="/" class="weui-tabbar__item weui-bar__item_on">
            <span style="display: inline-block;position: relative;">
              <span class="fa fa-wechat weui-tabbar__icon"></span>
              <!--消息红点-->
              <span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span>
            </span>
            <p class="weui-tabbar__label">讨论</p>
          </router-link>
          <a href="javascript:;" class="weui-tabbar__item">
            <span class="fa fa-wpforms weui-tabbar__icon"></span>
            <p class="weui-tabbar__label">笔记</p>
          </a>
          <a href="javascript:;" class="weui-tabbar__item ">
                    <span style="display: inline-block;position: relative;">
                        <span class="fa fa-check-square-o weui-tabbar__icon"></span>
                        <span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>
                    </span>
            <p class="weui-tabbar__label">任务</p>
          </a>
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
  import xhr from '@/services/testApi'
  import { mapState } from 'vuex'

  export default {
    computed: mapState({
      list (state) {
        return state.todo.list
      }
    }),
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted: function () {
      const self = this
      this.$nextTick(function () {
        xhr.getTodo().then(function (data) {
          self.$store.commit('initList', data)
        })
      })
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
