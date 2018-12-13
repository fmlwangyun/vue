<template>
  <div id="app">
    <router-view v-wechat-title="this.$route.meta.title"></router-view>
    <tabbar class="tab-list" v-if="showTab" v-model="this.selectedTab">
      <tabbar-item v-for="item in this.tabs" :link="item.link" :class="item.name" :key="item.name">
        <img slot="icon" :src="item.icon">
        <span slot="label">{{item.label}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
  import {
    Loading,
    Tabbar,
    TabbarItem
  } from 'vux'
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    name: 'app',
    data() {
      return {}
    },
    created() {
    },
    components: {
      Tabbar,
      TabbarItem
    },
    computed: {
      ...mapState([
        'tabs',
        'showTab',
        'selectedTab'
      ])
    },
    methods: {}
  }

</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  .tab-list {
    &.weui-tabbar {
      position: fixed;
    }
    .weui-bar__item_on {
      .weui-tabbar__label {
        span {
          color: #1296db;
        }
      }
    }
  }

</style>
