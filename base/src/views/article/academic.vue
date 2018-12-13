<template>
  <div class="container">
    <header class="header">
      <x-header class="bg-red">
        <img class="icon" slot="overwrite-left" src="/vue-mobile/img/home/t-academic.svg" alt="">
        <span class="title" slot="overwrite-left">学术资讯</span>
      </x-header>
      <div class="banner">
        <img src="../../assets/images/activity/muwu.jpg" alt="">
      </div>
    </header>
    <section class="main">
      <div style="height:100%;">
        <tab :line-width=2 active-color='#E64340' v-model="tab.index">
          <tab-item @on-item-click="tabClick" class="vux-center" v-for="(item, index) in tab.items" :key="index" :active-class="'active'">{{item.text}}</tab-item>
        </tab>
        <article-list ref="articleList" :pull-down="false" :article-type="articleType"></article-list>
      </div>
    </section>
  </div>
</template>

<script>
  import { Tab, TabItem, Group, Radio, XHeader, Divider } from 'vux'
  //基于vux自身的scroller组件，由于官方文档不建议继续使用，所以我们也不再使用
  //  import articleList from '../../components/articleList.vue'

  //基于mescroll.js的滚动组件
  import articleList from '../../components/article/articleList.vue'

  export default {
    components: {
      Tab,
      TabItem,
      Group,
      Radio,
      XHeader,
      Divider,
      articleList,
    },
    data() {
      return {
        /*tab相关参数*/
        tab:{
          index:0,
          items:[
            {value:2,text:'行业资讯'},
            {value:3,text:'专家资讯'},
            {value:4,text:'心课堂'}
          ]
        }
      }
    },
    computed:{
      /*文章type*/
      articleType:function () {
        let type = this.tab.items[this.tab.index].value
        return type;
      }
    },
    methods:{
      /*
      * 当前 tabItem 被点击时触发
      * @param {Number} index 当前tabItem的下标
      * */
      tabClick(index){
        //刷新页面
        this.$refs['articleList'].refreshGet();
      }
    }
  }
</script>

<style scoped>
  .banner{
    height:126px;
    overflow:hidden;
  }
  .banner>img{
    height:100%;
    width:100%;
    display:block;
  }
  .vux-tab{
    position:fixed;
    z-index:100;
    width:100%;
    margin-top:171px;
  }
  .padding{
    padding-top:215px;
  }

</style>
