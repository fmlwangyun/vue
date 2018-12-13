<template>
  <div class="lc-main wrap">
    <div class="head">
      <x-header class="trans-bottom-none">
        <img class="icon" slot="overwrite-left" src="../../assets/images/register/icon1.png" alt="">
        <span class="title" slot="overwrite-left">个人中心</span>
      </x-header>

      <div class="personGroup">
        <div class="fl">
          <img :src=this.userInfo.HeadImgUrl class="personGroup_img">
        </div>

        <div class="personGroup_name">{{ this.userInfo.Name }}</div>
        <router-link to="/personal/edit" append>
          <div class="personGroup_modify">
            <img src="../../assets/images/register/brush.png" class="personGroup_modify_img">
            <span class="fontsize14 colorS000">修改信息</span>
            <img src="../../assets/images/register/more.png" class="personGroup_modify_img">
          </div>
        </router-link>
      </div>

      <div class="personRule fontsize14">
        <span class="personRule_L">我的豆子:
                    <span class="colorSfea06c fontsize16">&nbsp;{{this.userInfo.Integral}}</span> 点
        </span>
        <router-link to="/personal/exchangeindex" append>
          <span class="personRule_C">
                        <img src="../../assets/images/register/icon1.png" alt="" class="exchange_img">
                        <span class="colorS000">兑换商城</span>
          </span>
        </router-link>
        <router-link to="/personal/exchangerule" append>
          <span class="personRule_R colorS000">积分规则</span>
        </router-link>
      </div>
    </div>

    <x-header class="trans-bottom-none" is-link>
      <img class="icon" slot="overwrite-left" src="../../assets/images/register/favorite.png" alt="">
      <span class="title" slot="overwrite-left">我的收藏</span>
    </x-header>
    <article-list ref="articleList" :pull-down="false" :is-conllection="page.isConllection"></article-list>

    <!--<article-list class="upList" :isConllection="page.isConllection"></article-list>-->

  </div>
</template>

<script>
  import {XHeader,TransferDomDirective as TransferDom} from 'vux'
  import {mapState} from 'vuex'

  //基于vux自身的scroller组件，由于官方文档不建议继续使用，所以我们也不再使用
//  import articleList from '../../components/articleList.vue'

  //基于mescroll.js的滚动组件
  import articleList from '../../components/article/articleList.vue'

  export default {
    components: {
      XHeader,
      articleList,
    },
    data() {
      return {
        page: {
          // 控制列表组件显示的状态
          isConllection: true
        }
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    mounted() {},
    methods: {}
  }
</script>

<style scoped lang="less">
  .upList {
    position: absolute;
    width: 100%;
    top: 26px;
    bottom: 0;
    height: auto;
    z-index: 0;
  }
</style>
