<template>
  <section>
    <transition name="fade">
      <div id="mescroll" class="mescroll">
        <div class="list-container">
          <ul class="list">
            <li class="item" v-for="(item, index) in list" :key="index">
              <router-link :to="'detail/'+item.ID" append>
                <h1 class="title">{{item.Name}}</h1>
                <div class="date-wrap">
                  <div v-if="!!item.BeginTime" class="start">
                    开始时间：<span>{{item.BeginTime | formatDate}}</span>
                  </div>
                  <div v-if="!!item.EndTime" class="end">
                    结束时间：<span>{{item.EndTime | formatDate}}</span>
                  </div>
                </div>
                <i class="icon-arrow">
                  <x-icon type="ios-arrow-right" size="24"></x-icon>
                </i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  import '../../common/plugin/mescroll.m'

  export default {
    data() {
      return {
        //滚动实例
        mescroll: '',
        //是否锁定操作
        lock: false,
        //列表
        list: [],
        //文章加载loading
        loading: false
      }
    },
    props: {
      /*文章类型*/
      articleType: {
        type: Number,
        default: 0
      },
      /*开启下拉刷新，true：是，false：否*/
      pullDown: {
        type: Boolean,
        default: true
      },
      /*开启上拉加载，true：是，false：否*/
      pullUp: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      ...mapState([
        'register'
      ])
    },
    components: {},
    mounted() {
      this.loading = true;
      let _self = this;
      _self.mescroll = new MeScroll('mescroll', { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
        down: {
          use: _self.pullDown,
          auto: false,
//          callback:_self.downCallback
        },
        up: {
          use: _self.pullUp,
          callback: _self.upCallback, //上拉回调
          //以下参数可删除,不配置
          isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
          //page:{size:8}, //可配置每页8条数据,默认10
          offset: 50,
          empty: { //配置列表无任何数据的提示
            warpId: 'swiper-list',
            icon: null//'/vue-mobile/empty.png'
          },
          //上拉加载中的布局及样式
//          htmlLoading:'',
          htmlNodata: '<p class="upwarp-nodata">-- 没有更多数据了 --</p>'
        }
      });
    },
    destroyed() {
      this.mescroll.setBounce(true)
    },

    methods: {
      /*
       * 上拉加载回调
       * @param {Object} page 页面对象
       * */
      upCallback(page) {
        //获取数据
        this.getData(page.num, page.size, (curPageData) => {
          //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          if (page.num == 1) {
            this.list = [];
          }

          if (curPageData.length > 0) {
//            let arr = this._.filter(curPageData, (value, key, list) => {
//
//              let currentTime = new Date().getTime();
//
//              let BeginTime = value.BeginTime.ToDateTime2().getTime();
//
//              let EndTime = value.EndTime.ToDateTime2().getTime();
//
//              return currentTime > BeginTime && currentTime < EndTime
//            });
            this.list = this.list.concat(curPageData);
          }

          //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
          console.log("page.num=" + page.num + ", page.size=" + page.size + ", curPageData.length=" + curPageData.length);
          this.mescroll.endSuccess(curPageData.length);
          this.mescroll.lockUpScroll(false);
        })
      },


      /*
       * 获取数据
       * @param {Number} pageIndex 页码
       * @param {Number} pageSize 每页数量
       * @param {Function} callback 回调
       * */
      getData(pageIndex, pageSize, callback) {
        //锁定上拉加载
        this.mescroll.lockUpScroll(true);
        let params = {
          type: this.articleType,
          pageIndex: pageIndex,
          pageSize: pageSize
        };
        console.log(params)

        if (pageIndex === 1) {
          //隐藏上拉加载：正在加载
          this.mescroll.hideUpScroll();
        }

        //发送请求
        this.$http('/mobile/exam/list', {}, (ret) => {
          if (ret.status) {
            callback(ret.data);
          } else {
            this.toast_warn(ret.errmsg);
            this.mescroll.endErr();
            this.mescroll.lockUpScroll(false);
          }
          this.loading = false;
        })

      },

      /*刷新页面*/
      refreshGet() {
        this.loading = true;
        this.mescroll.resetUpScroll();
      },

      /*
       * 点击改变收藏图标
       * @param {Number} index 列表下标
       * */
      collection(index) {
        let params = {
          articleID: this.list[index].ID,
          iscancel: this.list[index].HadCollection,
        };
        this.$http('/mobile/article/collection', params, (ret) => {
          if (ret.status) {
            this.list[index].HadCollection = !this.list[index].HadCollection;
            if (this.list[index].HadCollection) {
              this.list[index].CommentCount += 1;
            } else {
              this.list[index].CommentCount -= 1;
            }
          } else {
            this.toast_warn(ret.errmsg);
          }
        })
      },
    },
    filters: {
      //过滤日期
      formatDate(date) {
        let str = date + '';
        return str.JsonFormat();
      },
    }
  }

</script>
<style lang="less" scoped>
  .mescroll {
    position: absolute;
    height: auto;
    top: 46px;
    width: 100%;
    bottom: 53px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background-color: #ffffff;
  }

  .list {
    padding: 10px;
    .item {
      position: relative;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-right: 20px;
      .title {
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .date-wrap {
        margin-top: 2px;
        height: 20px;
        .start, .end {
          display: inline-block;
        }
        font-size: 12px;
        color: #CECECE;
      }

      .icon-arrow {
        position: absolute;
        top: 15px;
        right: 0;
      }

      &:after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #E5E5E5;
        color: #E5E5E5;
        transform-origin: 0 0;
        transform: scaleY(0.5);
      }

    }
  }

  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    float: inherit;
    margin-top: 0;
    margin-right: 0;
  }
</style>
