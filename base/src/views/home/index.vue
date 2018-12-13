<template>
  <div class="home-container">
    <header class="header">
      <router-link v-if="!register" to="/register">
        <div class="sign-in">注册</div>
      </router-link>
      <swiper :list="swiperList" auto height="12.5em" :loop="true" :show-desc-mask="false" :show-dots="false"></swiper>
    </header>
    <div class="main">
      <section class="title">
        <router-link to="/exam">
          <div>
            <span class="e">有奖调研</span>
            <span>点击这里赶紧来参加</span>
          </div>
        </router-link>
      </section>
      <section class="category">
        <flexbox class="category-flexbox" justify="center" align="center">
          <flexbox-item>
            <router-link class="item" to="/personal">
              <img src="../../assets/images/home/profile.jpeg" alt="">
              <span>个人中心</span>
            </router-link>
          </flexbox-item>
          <flexbox-item>
            <router-link class="item" to="/activity">
              <img src="../../assets/images/home/activity.jpeg" alt="">
              <span>最新活动</span>
            </router-link>
          </flexbox-item>
        </flexbox>
        <flexbox class="category-flexbox">
          <flexbox-item>
            <router-link class="item" to="/academic">
              <img src="../../assets/images/home/academic.svg" alt="">
              <span>学术资讯</span>
            </router-link>
          </flexbox-item>
          <flexbox-item>
            <router-link class="item" to="/rostrum">
              <img src="../../assets/images/home/rostrum.svg" alt="">
              <span>专家讲坛</span>
            </router-link>
          </flexbox-item>
        </flexbox>
      </section>
    </div>
    <!--todo: 改为插件形式调用-->
    <confirm class="confirm-container" v-if="!this.checkin" v-model="confirmShow"
             :title="confirmInfo.title" :confirm-text="confirmInfo.confirmText"
             :cancel-text="confirmInfo.cancelText" @on-cancel="confirmCancel" @on-confirm="confirmDo">
      <p style="font-size: .75em;">{{confirmInfo.content}}</p>
    </confirm>
  </div>
</template>

<script>
  import {
    Swiper,
    Confirm,
    Alert,
    Flexbox,
    FlexboxItem
  } from 'vux'
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    data() {
      return {
        //轮播图内容
        swiperList: [],

        //签到成功提示消息
        checkinSuccess: false

      }
    },
    computed: {
      ...mapState([
        'homeconfirm',
        'register',
        'checkin'
      ]),
      //弹窗是否显示
      confirmShow: {
        get: function () {
          let status = true
          if (!!this.register && this.checkin) {
            status = false
          } else if (!this.homeconfirm) {
            status = false
          }
          return status
        },
        set: function (newValue) {
        }
      },
      //弹窗信息
      confirmInfo: {
        get: function () {
          let info = {}
          //未注册
          if (!this.register) {
            info = {
              type: 0,
              title: '提示',
              confirmText: '去注册',
              cancelText: '残忍拒绝',
              content: '亲爱的医生，由于您还未注册edoctor，您将无法观看视频直播等精彩学术内容及参与积分兑换等活动，请问您是否需要立刻注册？',
            }
          } else if (!this.checkin) {//未签到
            //处理时间
            var now = new Date();
            info = {
              type: 1,
              title: now.Format('yyyy-MM-dd') + ' ' + now.DateWeekFormat(),
              confirmText: '点击签到',
              cancelText: '残忍拒绝',
              content: '',
            }
          }
          return info
        },
        set: function (newValue) {
        }
      }
    },
    components: {
      Swiper,
      Confirm,
      Alert,
      Flexbox,
      FlexboxItem
    },
    created() {
    },
    mounted() {
      this.initPage()
    },
    methods: {
      ...mapMutations([
        'updateConfirmShow'
      ]),
      /*
       * 更新布局
       * */
      updateLayout() {
        let containerElement = document.getElementsByClassName('home-container')[0];
        //判断事件类型：是方向变换还是窗口变化
        let event = 'orientationchange' in window ? 'orientationchange' : 'resize';
        //更新home-container元素的font-size的值
        let updateFontSize = function () {
          //获取根元素home-container的宽度
          let clientWidth = containerElement.clientWidth;
          if (!clientWidth) {
            return;
          }
          containerElement.style.fontSize = 16 * (clientWidth / 320) + 'px';

        };
        if (!document.addEventListener) {
          return;
        }
        updateFontSize();
        window.addEventListener(event, updateFontSize, false);
      },
      /*
       * 初始化首页
       * */
      initPage() {
        this.updateLayout();
        //获取轮播图片
        this.$http('/mobile/api/bannerlist', {}, (ret) => {
          if (ret.status) {
            let result = ret.data
            let list = []
            if (result.length > 0) {
              result.forEach(function (value) {
                let obj = {}
                obj['url'] = value.Url
                obj['img'] = value.Img
                list.push(obj)
              })
              this.swiperList = list
            } else {
              this.swiperList = []
            }
          } else {
            this.toast_warn(ret.errmsg);
          }
        });
      },
      /*
       * 残忍拒绝
       * */
      confirmCancel() {
        this.updateConfirmShow({
          homeconfirm: false
        })
      },
      /*
       * 确认签到&注册
       * */
      confirmDo() {
        this.updateConfirmShow({
          homeconfirm: false
        })
        if (this.confirmInfo.type) {
          //签到
          this.$http('/mobile/api/sign', {}, (ret) => {
            console.log(ret)
            if (ret.status) {
              this.alert.show2('恭喜您', '签到成功！');
            } else {
              this.toast_warn(ret.errmsg);
            }
          });
        } else {//注册
          this.$router.push({
            path: '/register'
          })
        }
      }
    }
  }

</script>

<style scoped lang="less">
  .home-container {
    position: relative;
    height: 100%;
    font-size: 16px;
    .header {
      position: relative;
      background-color: #ffffff;
      .sign-in {
        top: .3125em;
        right: .3125em;
        position: absolute;
        width: 3.125em;
        height: 3.125em;
        background: url("../../assets/images/home/sign-in.svg") no-repeat center;
        background-size: cover;
        font-size: .75em;
        text-align: center;
        line-height: 3.125em;
        color: #ffffff;
        z-index: 100;
      }
    }
    .main {
      .title {
        margin-top: .625em;
        margin-bottom: .625em;
        background-color: #ffffff;
        div {
          height: 3.75em;
          width: 16.25em;
          margin: 0 auto;
          line-height: 3.75em;
          img {
            display: table-cell;
            vertical-align: middle;
            width: 6.25em;
          }
          span {
            margin-left: .625em;
            &.e {
              color: #1296db;
              font-size: 1.125em;
            }
          }
        }
      }
      .category {
        position: absolute;
        top: 17.5em;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ffffff;
        .category-flexbox {
          /*min-height: 45%;*/
          padding-top: 5%;
          background-color: #ffffff;
        }
        .item {
          color: #525252;
          text-align: center;
          img {
            display: block;
            margin: 0 auto;
            width: 3.75em;
            height: 3.75em;
          }
          span {
            display: block;
            margin-top: 0.625em;
            width: 100%;
          }
        }
      }
    }
  }

</style>
