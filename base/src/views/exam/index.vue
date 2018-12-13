<template>
  <div class="container">
    <header class="header">
      <x-header class="bg-red" >
        <img class="icon" slot="overwrite-left" src="../../assets/images/home/activity.jpeg" alt="">
        <span class="title" slot="overwrite-left">考试／调研</span>
      </x-header>
    </header>
    <section class="main">
      <div>
        <!--<tab :line-width=2 active-color='#E64340' v-model="tab.index">-->
          <!--<tab-item @on-item-click="tabClick" class="vux-center" v-for="(item, index) in tab.items" :key="index">{{item.text}}</tab-item>-->
        <!--</tab>-->

        <exam-list ref="examList"></exam-list>
      </div>
    </section>
  </div>
</template>

<script>
  import { Tab, TabItem,XHeader} from 'vux'
  //基于vux自身的scroller组件，由于官方文档不建议继续使用，所以我们也不再使用
  //  import articleList2 from '../../components/articleList2.vue'

  //基于mescroll.js的滚动组件
  import ExamList from './list.vue'
  export default {
    components: {
      Tab,
      TabItem,
      XHeader,
      ExamList
//      articleList2
    },
    data() {
      return {
        /*tab相关参数*/
        tab:{
          index:0,
          items:[
            {value:2,text:'最新上传'},
            {value:3,text:'最高评分'},
            {value:4,text:'最多使用'}
          ]
        }
      }
    },
    computed:{
      /*文章type*/
      articleType:function () {
        let type = this.tab.items[0].value;
        return type;
      }
    },
    methods:{
      /*
      * 当前 tabItem 被点击时触发
      * @param {Number} index 当前tabItem的下标
      * */
      tabClick(index){
        this.$refs['examList'].refreshGet();
      }
    }
  }
</script>

<style scoped>
  .vux-tab{
    background-color:#969696;
    height:40px;
    position: fixed;
    width: 100%;
    z-index: 100;
    margin-top:46px;
  }
  .vux-tab .vux-tab-item{
    color:#fff;
    background-color:#969696;
    line-height:40px;
  }
  .vux-tab .vux-tab-item:nth-child(2n) {
    border-right:1px solid #e3eff3!important;
    border-left:1px solid #e3eff3!important;
  }
  .vux-tab .vux-tab-item.vux-tab-selected{
    background-color:#e3eff3;
  }

</style>
