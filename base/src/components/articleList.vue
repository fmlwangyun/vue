<template>
  <section>
    <transition name="fade">
      <scroller v-if="!loading" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig" @on-pullup-loading="pullUp"
                class="scroll"
                ref="pull" :pageSize="pageSize" :pageIndex="pageIndex" height="auto">
        <div class="main-list">
          <div class="main-item" v-for="(item, index) in boardList">
            <div class="index-board-item-inner clearfix">
              <router-link :to="'article/'+item.ID" append>
                <div class="sb-ban float-l">
                  <img v-bind:src="item.TitleImg === '' ? '' : JSON.parse(item.TitleImg)[0].url" height="68"
                       width="68"/>
                </div>
                <div class="detalis float-l">
                  <p>{{ item.Title }}</p>
                  <p class="small-font">{{ item.Speaker }}</p>
                  <p class="small-font">{{ item.PublishDate }}</p>
                </div>
                <svg type="ios-arrow-right" size="20" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                     viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-arrow-right">
                  <path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
                </svg>
              </router-link>
              <div v-if="register===1">
                <div v-if="item.HadCollection" @click="collect(index)">
                  <svg type="ios-star" size="24" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                       viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-star">
                    <path
                      d="M480 207H308.6L256 47.9 203.4 207H32l140.2 97.9L117.6 464 256 365.4 394.4 464l-54.7-159.1L480 207z"></path>
                  </svg>
                </div>
                <div v-else @click="collect(index)">
                  <svg type="ios-star-outline" size="24" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                       viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-star-outline">
                    <path
                      d="M480 207H308.6L256 47.9 203.4 207H32l140.2 97.9L117.6 464 256 365.4 394.4 464l-54.7-159.1L480 207zM362.6 421.2l-106.6-76-106.6 76L192 298.7 84 224h131l41-123.3L297 224h131l-108 74.6 42.6 122.6z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <p class="no_more" v-if="!pullupDisable">没有更多数据了</p>
        </div>
      </scroller>
    </transition>
    <loading1 v-show="this.loading"></loading1>
  </section>
</template>

<script>
  import {Scroller} from 'vux'
  import loading1 from './loading/loading1'
  import {mapState} from 'vuex'
  export default {
    props: {
      articleType: {
        type: Number,
      },
      isConllection: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      Scroller,
      loading1
    },
    computed: {
      ...mapState(['register'])
    },
    data() {
      return {
        boardList: [],
        pageIndex: 1,
        pageSize: 5,
        loading: true,
        pullupDisable: true,
        pullupConfig: {
          content: '上拉加载更多',
          downContent: '松开进行加载',
          upContent: '上拉加载更多',
          loadingContent: '加载中...',
        },
      }
    },
    mounted() {
      this.initActicleList();
    },
    methods: {
      //初始化文章列表
      initActicleList() {
        let params = {
          isConllection: this.isConllection,
          type: this.articleType,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
        };

        this.$http('/mobile/article/list', params, (ret) => {
          this.loading = false;
          if (ret.status) {
            this.boardList = ret.data.PageList;
            if (this.boardList.length === 0) {
              this.pullupConfig.content = '暂无数据';
            }
            for (var i = 0; i < this.boardList.length; i++) {
              this.boardList[i].PublishDate = this.boardList[i].PublishDate.JsonFormat();
            }
            if (this.boardList.length === ret.data.TotalItemCount) {
              setTimeout(() => {
                this.$refs.pull.disablePullup();
                this.pullupDisable = false;
              }, 100)
            }
          } else {
            this.toast_warn(ret.errmsg);
          }
        })
      },

      //点击改变收藏图标
      collect(index) {
        let self = this;
        let params = {
          articleID: self.boardList[index].ID,
          iscancel: self.boardList[index].HadCollection,
        };
        self.$http('/mobile/article/collection', params, (ret) => {
          if (ret.status) {
            self.boardList[index].HadCollection = !params.iscancel;
            if (self.isConllection && params.iscancel) {
              self.boardList.splice(index, 1);
            }
          } else {
            self.toast_warn(ret.errmsg);
          }
        })
      },

      //上拉加载
      pullUp() {
        setTimeout(() => {
          this.initActicleList({
            pageSize: this.pageSize += 5
          });
          setTimeout(() => {
            this.$refs.pull.donePullup()
          }, 100)
        }, 1000)
      },

    }
  }

</script>
<style>

</style>
