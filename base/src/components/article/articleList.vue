<template>
  <section>
    <transition name="fade">
      <div id="mescroll" class="mescroll">
        <div id="main-list" class="main-list">
          <div class="main-item" :key=item.ID v-for="(item, index) in list">
            <div class="index-board-item-inner clearfix">
              <router-link :to="'article/'+item.ID" append>
                <div class="sb-ban float-l">
                  <img v-bind:src="item.TitleImg === '' ? '' : JSON.parse(item.TitleImg)[0].url" height="68"
                       width="68"/>
                </div>
                <div class="detalis float-l">
                  <p>{{ item.Title }}</p>
                  <p class="small-font">{{ item.Speaker }}</p>
                  <p class="small-font">{{ item.PublishDate | formatDate }}</p>
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
        </div>
      </div>
    </transition>
    <loading1 v-show="this.loading"></loading1>
  </section>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import loading1 from '../loading/loading1'

  import '../../common/plugin/mescroll.m'

  export default {
    data() {
      return {
        //滚动实例
        mescroll:'',
        //是否锁定操作
        lock: false,
        //文章列表
        list: [],
        //文章加载loading
        loading: true
      }
    },
    props: {
      /*文章类型*/
      articleType:{
        type:Number
      },
      /*是否是我的收藏*/
      isConllection: {
        type: Boolean,
        default: false,
      },
      /*开启下拉刷新，true：是，false：否*/
      pullDown:{
        type: Boolean,
        default: false
      },
      /*开启上拉加载，true：是，false：否*/
      pullUp:{
        type: Boolean,
        default: true
      }
    },
    computed: {
      ...mapState([
        'register'
      ])
    },
    components: {
      loading1
    },
    mounted() {
      this.loading = true;
      let _self = this;
      _self.mescroll = new MeScroll('mescroll', { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
        down:{
          use:_self.pullDown
        },
        up: {
          use:_self.pullUp,
          callback: _self.upCallback, //上拉回调
          //以下参数可删除,不配置
          isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
          //page:{size:8}, //可配置每页8条数据,默认10
          offset:50,
          empty:{ //配置列表无任何数据的提示
            warpId:'main-list',
            icon: null//'/vue-mobile/empty.png'
          },
          //上拉加载中的布局及样式
//          htmlLoading:'',
          htmlNodata:'<p class="upwarp-nodata">-- 没有更多数据了 --</p>'
        }
      });
    },
    destroyed(){
      this.mescroll.setBounce(true)
    },

    methods: {
      /*
      * 上拉加载回调
      * @param {Object} page 页面对象
      * */
      upCallback(page) {
        //锁定上拉加载
        this.mescroll.lockUpScroll(true);
        //获取数据
        this.getData(page.num, page.size, (curPageData) => {
          //联网成功的回调,隐藏刷新和上拉加载的状态;
          if(page.num == 1){
            this.list = [];
          }
          this.list = this.list.concat(curPageData);
          //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
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
        let params = {
          isConllection: this.isConllection,
          type: this.articleType,
          pageIndex:pageIndex,
          pageSize:pageSize
        };

        if(pageIndex===1){
          this.mescroll.hideUpScroll();
        }

        //发送请求
        setTimeout( () => {
          this.$http('/mobile/article/list',params, (ret) => {
            if (ret.status) {
              callback(ret.data.PageList);
            } else {
              this.toast_warn(ret.errmsg);
              this.mescroll.endErr();
              this.mescroll.lockUpScroll(false);
            }
            this.loading = false;
          })
        },500)
      },

      /*刷新页面*/
      refreshGet(){
        //显示loading
        this.loading = true;
        this.mescroll.resetUpScroll();
      },

      /*
      * 点击改变收藏图标
      * @param {Number} index 列表下标
      * */
      collect(index) {
        let params = {
          articleID: this.list[index].ID,
          iscancel: this.list[index].HadCollection,
        };
        this.$http('/mobile/article/collection', params, (ret) => {
          if (ret.status) {
            this.list[index].HadCollection = !params.iscancel;
            if (this.isConllection && params.iscancel) {
              this.list.splice(index, 1);
            }
          } else {
            this.toast_warn(ret.errmsg);
          }
        })
      },
    },
    filters: {
      //格式化日期
      formatDate(date) {
        return date.JsonFormat();
      }
    }
  }

</script>
<style lang="less" scoped>
  .mescroll {
    position: absolute;
    height: auto;
    top: 215px;
    width: 100%;
    bottom: 53px;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
  }

  .lc-main{
    .mescroll{
      top:246px;
    }
  }
</style>
