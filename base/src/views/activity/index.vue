<template>
  <div class="calendar-container wrap">
    <!--header-->
    <x-header class="bg-white">
      <img class="icon" slot="overwrite-left" src="../../assets/images/home/activity.png" alt="">
      <span class="title" slot="overwrite-left">最新活动</span>
    </x-header>
    <!--日历-->
    <inline-calendar :weeks-list="calendar.weeksList" v-model="calendar.currentDate" :render-on-value-change="false"
                     :render-function="render"
                     :disable-past="false" @on-change="onChange" @on-view-change="onViewChang">

    </inline-calendar>
    <!--信息列表-->
    <div class="list-container">
      <group :title="'签到信息'">
        <cell style="text-align: center;" v-if="login">
          <span v-if="this.checkinShow" style="width: 100%;" slot="child">{{checkinMsg}}</span>
          <div slot="child" v-if="!this.checkinShow" style="width: 100%">
            <x-button type="primary" text="点击签到" mini @click.native="doCheckin"></x-button>
          </div>
        </cell>
      </group>
      <div v-for="(item,index) in activityList" :key="index">
        <panel :header="item[0].typeHeader" :list="item" v-if="item.length>0"
               :type="'1'"></panel>
      </div>
      <load-more v-if="this.loadMore" :show-loading="false" :tip="'今日无活动'" background-color="#fbf9fe"></load-more>
    </div>
    <!--todo: 改为插件形式调用-->
    <confirm class="confirm-container" v-model="confirmShow" :title="'提示'" :confirm-text="'去注册'" :cancel-text="'残忍拒绝'"
             @on-cancel="confirmCancel"
             @on-confirm="confirmDo">
      <p style="font-size: .75em;">你还未注册，不能签到！</p>
    </confirm>
  </div>
</template>

<script>
  import {
    XHeader,
    Group,
    Cell,
    InlineCalendar,
    XButton,
    Panel,
    Toast,
    LoadMore,
    Confirm
  } from 'vux'
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    data() {
      return {
        //提示框是否显示
        confirmShow: false,
        //loadMore是否显示
        loadMore: false,
        //签到信息
        checkinMsg: '',
        //显示点击签到
        checkinShow: false,
        //日历参数
        calendar: {
          currentDate: 'TODAY',
          weeksList: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        },

        //当前页面的所有日期
        allDates: {},

        //活动信息
        activityList: []

      }
    },
    computed: {
      ...mapState([
        'login',
        'checkin',
        'userInfo'
      ])
    },
    components: {
      XHeader,
      Group,
      Cell,
      InlineCalendar,
      XButton,
      Panel,
      Toast,
      LoadMore,
      Confirm
    },
    mounted() {
    },
    methods: {
      ...mapMutations([
        'updateCheckin'
      ]),

      /*
       * @synopsis 为特定日期添加额外样式
       * @param {Object} 日期行
       * @param {Object} 日期列
       * @param {Object} 日期对象
       * */
      render(row, column, date) {
        let currentDate = date.formatedDate;
        let str = ''
        //判断是否存在活动类型
        if (this.allDates[currentDate] && this.allDates[currentDate].length > 0) {
          str = '<div class="calendar-custom-dot-wrapper">'
          let typeArr = this.allDates[currentDate]

          this._.each(typeArr, function (i, j) {
            if (i == 1 || i == 2 || i == 3) {
              str += ('<span class="calendar-custom-dot dot' + i + '"></span>');
            }
            if (i == 4) {
              str += ('<span class="label"></span>');
            }
          });
          str += "</div>"
        }

        return str;
      },
      /*
       * @synopsis 日历日期选中改变
       * @param {Object} date 当前选择的日期信息
       * */
      onChange(date) {

        //处理时间
        let timestamp = new Date().getTime()
        let time = new Date(timestamp)
        let month = '',
          day = '';
        if (time.getMonth() >= 9) {
          month = time.getMonth() + 1 + '';
        } else {
          month = '0' + (time.getMonth() + 1)
        }

        if (time.getDate() >= 9) {
          day = time.getDate() + '';
        } else {
          day = '0' + time.getDate();
        }
        let currentDate = time.getFullYear() + '-' + month + '-' + day;

        //当前的实时时间戳
        let currentTimestamp = new Date(currentDate).getTime()

        //所查看的日期的时间戳
        let viewTimestamp = new Date(date).getTime();

        //获取当前日期活动信息
        this.$http('/mobile/api/getActivity', {
          activityDate: date
        }, (ret) => {
          if (ret.status) {
            let activityData = ret.data.ActivityList;
            let signRecord = ret.data.SignRecord;
            if (this.userInfo.Status) {
              //判断签到状态
              if (viewTimestamp > currentTimestamp) {//查看的日期是未来的日期
                this.checkinShow = true
                this.checkinMsg = '还不能签到'
              } else {
                if (signRecord.ID > 0) {//已签到
                  this.checkinShow = true
                  this.checkinMsg = '已签到'
                } else {//未签到
                  if (viewTimestamp < currentTimestamp) {//不是当天
                    this.checkinShow = true
                    this.checkinMsg = '未签到'
                  }else {
                    this.checkinShow = false
                  }
                }
              }
            } else {
              this.checkinShow = false
            }

            //如果存在列表数据
            if (activityData.length > 0) {
              this.loadMore = false
              //过滤类型
              let types = {};
              for (let i = 0; i < activityData.length; i++) {
                if (types[activityData[i].Type] === undefined) {
                  types[activityData[i].Type] = activityData[i].Type;
                }
              }

              //过滤活动
              let filterActivityData = [];
              for (let i in types) {
                let list = this._.where(activityData, {
                  Type: types[i]
                });

                let filterList = this._.map(list, (value, key, list) => {
                  let obj = {};
                  obj['typeHeader'] = value.TypeStr;
                  obj['src'] = value.Img;
                  obj['title'] = value.Name;
                  obj['desc'] = value.Description;
                  if (value.Url == '') {
                    obj['url'] = '/activity/detail/' + value.ID;
                  } else {
                    obj['url'] = value.Url;
                  }
                  return obj
                })
                filterActivityData.push(filterList);
              }

              this.activityList = filterActivityData;
            } else {
              this.activityList = []
              this.loadMore = true
            }
          } else {
            this.toast_warn(ret.errmsg);
          }
        })
      },

      /*
       * @synopsis 渲染月份变化时触发
       * @param {Object} date 当前页所有日期信息
       * @param {Number} code 是否是第一次触发
       * */
      onViewChang(date, code) {
        //获取日历活动状态
        this.$http('/mobile/api/ActivityList', {
          start: date.firstDate,
          end: date.lastDate
        }, (ret) => {
          if (ret.status) {
            let result = ret.data;
            let obj = {};
            result.forEach(function (ele) {
              let dateValue = ele['ActivityDate'].JsonFormat()
              obj[dateValue] = ele['ActivityType'];
            });
            this.allDates = obj;
          } else {
            this.toast_warn(ret.errmsg);
          }
        })
      },

      /*
       * 签到
       * */
      doCheckin() {
        //未注册的话，提示注册
        if (!this.userInfo.Status) {
          this.confirmShow = true
        } else {
          this.$http('/mobile/api/sign', {}, (ret) => {
            if (ret.status) {
              this.checkinShow = true
              this.checkinMsg = '已签到'
              this.updateCheckin({
                checkin: true
              })

              this.toast_success('签到成功');
            } else {
              this.toast_warn(ret.errmsg);
            }
          });
        }
      },

      /*
       * 残忍拒绝
       * */
      confirmCancel() {
      },

      /*
       * 确认签到&注册
       * */
      confirmDo() {
        this.$router.push({
          path: '/register'
        })
      }
    }
  }

</script>

<style scoped="scoped" lang="less">
  .calendar-container {
    min-height: 100%;
    background-color: #ffffff;

    .weui-panel:after {
      border-bottom: none;
    }
  }

</style>
