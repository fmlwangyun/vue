<template>
  <div class="container">
    <header class="header" ref="head" :class="{ 'isHead1':isFocus}">
      <div class="bg-color">
        <span class="title" slot="overwrite-left">{{item.Title}}</span>
      </div>
    </header>
    <section class="main-details">
      <div class="image-text">
        <div  id="details"  class="details">
          <p>{{item.Title}}</p>
          <p>{{ item.Summary }}</p>
          <h2>{{ item.Keywords }}</h2>
          <div v-html="item.Content" class="picture"></div>
        </div>

        <div class="score clearfix" :class="{ 'score-padding': !item.IsComment}" v-if="this.register===1">
          <cell title="文章评分" class="clearfix">
            <rater v-model="item.MyScore" active-color="#E64340" slot="value"
                   :disabled="(item.MyScore > 0&&item.HadScore)"></rater>
            <button class="score-btn" v-if="item.MyScore > 0&&!item.HadScore" @click="submitScore()">提交评分</button>
          </cell>

        </div>

        <div class="comment wrap" v-if="item.IsComment">
          <article-comment :articleID="this.$route.params.id"></article-comment>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {Rater, Group, Cell, Range, XHeader, Scroller, XSwitch} from 'vux'
  import ArticleComment from '../../components/comment'
  import {mapState} from 'vuex'
  export default {
    components: {
      Rater,
      Group,
      Cell,
      Range,
      XHeader,
      Scroller,
      XSwitch,
      ArticleComment
    },
    data() {
      return {
        isFocus : false,
        item: {},
      }
    },
    mounted() {
      this.initDetailList();
    },
    computed:{
      ...mapState(['register'])
    },
    methods: {
      wxpreview(value, valueList){
        var self = this;
        self.$wx.previewImage1(value, valueList)
      },
      //初始化详情列表
      initDetailList() {
        this.id = this.$route.params.id;
        this.$http('/mobile/article/detail', {articleID: this.id}, (ret) => {
          if (ret.status) {
            this.item = ret.data;
          } else {
            this.toast_warn(ret.errmsg);
          }
        })
      },

      // 提交评分
      submitScore() {
        let self = this;
        self.id = self.$route.params.id;
        self.score = self.item.MyScore;
        let params = {
          articleID: this.id,
          score: this.score,
        };
        self.$http('/mobile/article/score', params, (ret) => {
          if (ret.status) {
            self.item.HadScore = true;
          } else {
            self.toast_warn(ret.errmsg);
          }
        })
      },
    },
    //todo:这个是什么意思？
    updated(){
      let self = this;
      document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
      });
      if(document.getElementById('details')!=null)
      {
        let imgs = document.getElementById('details').getElementsByTagName('img');
        let imglist = [];
        self._.each(imgs, function (d, i) {
          imglist.push(d.src);
        })
        self._.each(imgs, function (d, i) {
          d.onclick=function(){self.wxpreview(d.src, imglist)};
        })
      }

    }
  }
</script>

<style scoped lang="less">
  *:not(div,input,textarea) {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -o-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  img {
    pointer-events: none;
  }
  .container {
    position:relative;
  }

</style>
