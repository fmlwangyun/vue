<template>
  <section>
    <div class="tab-swiper vux-center">
      <transition name="slide-fade">
        <scroller lock-x scrollbar-y use-pulldown :pulldown-config="pulldownConfig" @on-pulldown-loading="pullDown" v-model="pulldownStatus" :pageSize="pageSize" :pageIndex="pageIndex" height="auto" v-if="!loading" class="wrap upScroll" ref="pull">
          <div class="swiper-list clearfix">
            <div class="swiper-item float-l" v-for="(item, index) in swiperList">
              <div class="index-board-item-inner" >
                <router-link :to="'article/'+item.ID" append>
                  <div class="sb-ban">
                    <img v-bind:src="item.TitleImg === '' ? '' : JSON.parse(item.TitleImg)[0].url"/>
                  </div>
                  <p class="over-title">{{ item.Title }}</p>
                </router-link>
                <div class="detalis">
                  <span class="fa fa-eye"></span><span class="small-font">{{ item.ReadCount}}</span>
                  <span class="fa fa-star" @click="collection(index)" v-if="item.HadCollection"></span>
                  <span class="fa fa-star-o" @click="collection(index)" v-else></span>
                  <span class="small-font">{{ item.CommentCount }}</span>
                </div>
              </div>
            </div>
          </div>
          <p v-show="this.swiperList.length === 0" class="no_data">暂无数据</p>
        </scroller>
      </transition>
      <div class="loading_3" v-show="loading">
        <div class="spin"></div>
        <div class="spin"></div>
        <div class="spin"></div>
        <div class="spin"></div>
        <div class="spin"></div>
      </div>
    </div>
  </section>
</template>

<script>
  import {Scroller} from 'vux'
  export default {
    props: {
      articleType: {
        type: Number,
        default: 63
      },
    },
    components: {
      Scroller
    },
    data() {
      return {
        //下拉状态
        pulldownStatus: {
          pulldownStatus: 'default',
        },
        pulldownConfig: {
          content:'下拉刷新',
          downContent:'下拉刷新',
          upContent:'释放刷新',
          loadingContent:'加载中'
        },
        swiperList: [],
        pageSize:5,
        pageIndex:1,
        loading:true,
      }
    },
    mounted() {
      this.initActicleList()
    },
    methods: {
      //初始化文章列表
      initActicleList() {
        let params = {
          type:this.articleType,
          pageSize:this.pageSize,
          pageIndex:this.pageIndex,
        }
        this.$http('/mobile/article/list', params, (ret) => {
          console.log('ajax success');
          this.loading = false;
          if (ret.status) {
            this.swiperList = ret.data.PageList;
          } else {
            this.toast_warn(ret.errmsg);
          }
        })
      },

      //下拉刷新
      pullDown(){
        console.log('pullDown');
        setTimeout(() => {
          let params = {
            type:this.articleType,
            pageSize:this.pageSize+=5,
            pageIndex:this.pageIndex,
          };
          this.$http('/mobile/article/list', params, (ret) => {
            this.loading = false;
            if (ret.status) {
              this.swiperList = ret.data.PageList;
              if (this.swiperList.length == ret.data.TotalItemCount) {
                this.toast_show('没有更多数据了');
              }
            } else {
              this.toast_warn(ret.errmsg);
            }
          })
          setTimeout(() => {
            this.pulldownStatus.pulldownStatus = 'default'
          }, 100)
        }, 1000)
      },
      //收藏和取消收藏
      collection(index) {
        let params = {
          articleID:this.swiperList[index].ID,
          iscancel:this.swiperList[index].HadCollection,
        };
        this.$http('/mobile/article/collection', params, (ret) => {
          if (ret.status) {
            this.swiperList[index].HadCollection = !this.swiperList[index].HadCollection;
            if(this.swiperList[index].HadCollection) {
              this.swiperList[index].CommentCount +=1;
            } else {
              this.swiperList[index].CommentCount -=1;
            }
          } else {
            this.toast_warn(ret.errmsg);
          }
        })
      },
    }
  }
</script>
<style scoped lang="less">
  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    float: inherit;
    margin-top:0;
    margin-right:0;
  }
</style>
