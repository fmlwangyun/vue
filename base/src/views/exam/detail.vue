<template>
  <div class="container">
    <div class="detail-container" v-cloak>
      <div class="title-wrap">
        <h1 class="title">{{detail.Name}}</h1>
        <div class="date-wrap">
          <div v-if="detail.BeginTime && detail.EndTime" class="date">
            <span>{{detail.BeginTime | formatDate}} -- {{detail.EndTime | formatDate}}</span>
          </div>
          <div v-else-if="detail.BeginTime && !!detail.EndTime" class="date">
            <span>开始时间：{{detail.BeginTime | formatDate}}</span>
          </div>
          <div v-else-if="!!detail.BeginTime && detail.EndTime" class="date">
            <span>截止时间：{{detail.BeginTime | formatDate}}</span>
          </div>
        </div>
        <!-- 可以多次参与 -->
        <div class="resubmit-wrap" v-if="state==0&&joined&&detail.JoinNumber==0">
          <p>
            您上次提交的时间为：XXXXXX
          </p>
          <p>
            得分：10 分
          </p>
          <x-button type="primary" @click.native="reSubmit">重新参与{{detail.TypeStr}}</x-button>
        </div>
      </div>
      <!--倒计时-->
      <div class="count-down" v-if="!hideQuestion &&!detail.disabled && countDown>=1">
        <div class="count-num">
          <div class="wrapper right">
            <div id="rightcircle" class="circleProgress rightcircle"></div>
          </div>
          <div class="wrapper left">
            <div id="leftcircle" class="circleProgress leftcircle"></div>
          </div>
        </div>
        <div class="count-number">
          <span>{{ countDown }}</span>
        </div>
      </div>
      <!--问题列表-->
      <div class="question-wrap" v-if="!hideQuestion">
        <!--问题项-->
        <div class="question-item" v-for="(item, index) in detail.Questions" :key="index">
          <!--问题描述-->
          <div class="question-title">
            <div class="desc-text">
              <h3 class="title">{{(index + 1) + '. ' + item.Name}}
                <span class="type">
                  （{{Enums.GetDescription(Enums.QuestionType, item.InputType)}}）
                </span>
                <i v-if="item.IsRequired" class="required"> *</i></h3>
              <p class="desc" v-if="item.Memo.length>0">说明：{{item.Memo}}</p>
            </div>
            <div class="desc-img" v-if="!!item.ImageUrl">
              <img :src="JSON.parse(item.ImageUrl)[0].url" alt="">
            </div>
          </div>
          <!--选择题——问题选项-->
          <div class="question-option">
            <template v-if="item.InputType<2">
              <exam-checker :item="item" :disabled="detail.disabled" :isAnswer="detail.IsCanSeeTrue"></exam-checker>
            </template>
            <!--下拉选择题——选项-->
            <template v-if="item.InputType==2">
              <exam-selector :item="item" :index="index" :disabled="detail.disabled"></exam-selector>
            </template>
            <!--问答题——回答区域-->
            <template v-if="item.InputType==3||item.InputType==4">
              <exam-text :item="item" :index="index" :disabled="detail.disabled"></exam-text>
            </template>
            <!--上传-->
            <template v-if="item.InputType==5">
              <exam-upload :item="item" :index="index" :disabled="detail.disabled"></exam-upload>
            </template>
            <!--验证提示-->
            <div v-if="!detail.disabled&&item.IsNotAnswer&&item.IsRequired" class="error-tip">
              <!--<i class="error-icon"></i>-->
              <span v-if="item.InputType==0">* 必选，请至少选择1项</span>
              <span v-if="item.InputType==1">* 必选，请至少选择
                <span v-if="item.ChoiceNumMin">{{item.ChoiceNumMin}}</span>
                <span v-else>1</span>项
              </span>
              <span v-if="item.InputType==2">* 必选，请至少选择1项</span>
              <span v-if="item.InputType==3">请填写答案</span>
              <span v-if="item.InputType==4">请填写答案</span>
              <span v-if="item.InputType==5">请上传图片</span>
            </div>
          </div>

        </div>
        <!--提交-->
        <div class="submit-wrap" v-if="!detail.disabled">
          <x-button type="primary" @click.native="onSubmit(false)">提交</x-button>
        </div>
      </div>

      <!--不显示题目-->
      <div class="examTips" v-if="hideQuestion">
        <div v-if="state==1">
          <p>本次{{detail.TypeStr}}<span class="red">还未开始</span>，请稍后再来！</p>
        </div>
        <div v-if="state==2">
          <p><span class="red">已结束！</span></p>
          <p>本次{{detail.TypeStr}}的题目是从题库中随机抽取的，<br/>由于您未参与，所以无法为您展示题目！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XButton, Confirm} from "vux";
  import {mapState} from "vuex";
  import {Enums} from "../../common/config/enums";
  import examChecker from "../../components/exam/checker.vue";
  import examSelector from "../../components/exam/selector.vue";
  import examText from "../../components/exam/text.vue";
  import examUpload from "../../components/exam/upload.vue";

  export default {
    components: {
      examSelector,
      examChecker,
      examText,
      examUpload,
      XButton,
      Confirm
    },
    data() {
      return {
        Enums: Enums,
        /* 倒计时timer，页面destroyed时清空timer  */
        timer: '',
        /*倒计时（不能放在detail中，setInterval正常-1但无法正常显示）*/
        countDown: 0,
        /*未开始或者已结束（随机&未答题）隐藏题目*/
        hideQuestion: true,
        /*状态：0（正常），1（还未开始），2（已结束）*/
        state: 0,
        /*已经参与／提交*/
        joined: false,
        /*详情*/
        detail: {}
      };
    },
    beforeCreate: function () {
      //@@
      window.intervalObj = "";
    },
    mounted() {
      this.initDetailList(true);
    },
    destroyed(){
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    computed: {
      ...mapState(["register"])
    },
    methods: {
      reSubmit(){
        let self = this;
        clearInterval(this.timer);
        //由于涉及到提交后显示结果（不刷新页面），所以已定要将self.detail置空，否则会多次触发checker/selector的change事件。
        self.detail = {};
        self.countDown = 0;
        self.detail.disabled = true;
        self.initDetailList(false);
      },
      /*
       * 初始化详情列表
       * */
      initDetailList(getExamLog) {
        let self = this;

        //todo: 增加loading

        self.id = self.$route.params.id;
        self.$http("/mobile/exam/info", {id: self.id, getExamLog: getExamLog}, ret => {
          if (ret.status) {
            let examInfo = ret.data.exam;
            document.title = examInfo.TypeStr;//修改document.title

            self.detail = examInfo;
            self.joined = !!self.detail.ExamLog;
            self.state = ret.data.state;

            /*
             * 1. 未开始：不显示题目
             * 2. 已结束：
             *    2.1 已答题：显示
             *    2.2 未答题：（提示已结束，您未参与）
             *       2.2.1 随机：不显示题目
             *       2.2.2 不随机：显示题目
             * */
            //todo: 把下面hideQuestion和disabled的逻辑判断放在后台，如果不显示题目，则后台不需要返回题目和选项数据
            if (self.state == 1) {//还未开始
              self.hideQuestion = true;
              self.toast_warn(ret.data.errmsg, 60000);
              return;
            }
            else if (self.state == 2) {//已结束
              if (examInfo.IsRandom && !self.joined) { //随机 & 未答题
                self.hideQuestion = true;
                self.toast_warn(ret.data.errmsg, 60000);
                return;
              } else {
                self.hideQuestion = false;
              }
            } else { //开放答题
              self.hideQuestion = false;
            }

            //禁止修改：已参加 或者 已结束
            self.detail.disabled = self.joined || self.state == 2;

            //todo: 把下面的数据组装放在后台，前台组装数据太慢，给用户的体验不好
            if (self.joined) {
              if (self.detail.ExamLog.AnswerLogs) {
                self._.each(self.detail.Questions, function (q, i) {
                  let answerLogs = self._.where(self.detail.ExamLog.AnswerLogs, {
                    QuestionSn: q.Sn
                  });

                  //单选 和 多选
                  if (q.InputType == 0 || q.InputType == 1) {
                    q.Answer = [];
                    let selectedOpts = [];
                    self._.each(answerLogs, function (al) {
                      let opts = self._.each(q.Options, function (opt) {
                        if (opt.Sn == al.OptionSn) {
                          opt.OptionValue = al.OptionValue;
                          selectedOpts.push(opt);
                        }
                      });
                    });

                    if (q.InputType == 0) {
                        q.Answer = selectedOpts[0];
                    }
                    else {
                      q.Answer = selectedOpts;
                    }

                  } else if (q.InputType == 2 || q.InputType == 3 || q.InputType == 4 || q.InputType == 5) {
                    q.Answer = {OptionValue: '', IsCanInput: false};
                    if (answerLogs.length > 0) {
                      let al = answerLogs[0];
                      q.Answer = {
                        OptionSn: al.OptionSn,
                        OptionValue: al.OptionValue,
                        IsCanInput: true
                      }
                    }
                  }
                });

              } else {
                self.detail.ExamLog.AnswerLogs = [];
              }
            } else {
              self.detail.ExamLog = {};
              self._.each(self.detail.Questions, function (d, i) {
                if (d.InputType >= 2) {
                  d.Answer = {OptionSn: '', OptionValue: "", IsCanInput: false};
                }
              });
            }

            if (!self.detail.disabled) {
              //todo: 后台增加倒计时，倒计时只在disabled为false时（若考试未结束且用户未答题则根据后台的设置倒计时，若已经答题则不显示倒计时）
              if(examInfo.CountDown>0){
              self.countDown = examInfo.CountDown*60;
              self.updateCountDown();
              }
            }
          } else {
            self.toast_warn(ret.errmsg);
          }
        });
      },
      onSubmit(skipValid) {
        let self = this;
        let valid = true;

        //如果手动触发提交时，已经自动提交(倒计时结束），则不再重复提交。
        if (!skipValid && self.detail.disabled) {
          return;
        }

        self.detail.ExamLog.ExamSn = self.detail.Sn;
        self._.each(self.detail.Questions, function (d, i) {
          if (!self.detail.ExamLog.AnswerLogs)
            self.detail.ExamLog.AnswerLogs = [];
          d.IsNotAnswer = false;
          if (d.Answer) {
            //单选（0）
            if (d.InputType == 0) {
              if (d.Answer && d.Answer.ID > 0) {
                self.detail.ExamLog.AnswerLogs.push({
                  QuestionSn: d.Sn,
                  OptionSn: d.Answer.OptionSn,
                  OptionValue: d.Answer.OptionValue
                });
              } else {
                d.IsNotAnswer = true; //单选没选择
              }
            }
            //多选（1）
            else if (d.InputType == 1) {
              if (d.Answer.length == 0) {
                d.IsNotAnswer = true;//多选没选择
              } else {
                self._.each(d.Answer, function (a, i) {
                  if (a.Sn) {
                    self.detail.ExamLog.AnswerLogs.push({
                      QuestionSn: a.QuestionSn,
                      OptionSn: a.Sn,
                      OptionValue: a.OptionValue
                    });
                  }
                });
              }
            } else {
              //下拉选择题（2）
              if (d.InputType == 2 && !d.Answer.OptionSn) d.IsNotAnswer = true;
              //单行问答题（3），多行问答题（4），上传（5）
              if (d.InputType > 2 && !d.Answer.OptionValue) d.IsNotAnswer = true;

              if (!d.IsNotAnswer) {
                self.detail.ExamLog.AnswerLogs.push({
                  QuestionSn: d.Sn,
                  OptionSn: d.Answer.OptionSn,
                  OptionValue: d.Answer.OptionValue
                });
              }
            }
          } else {
            d.IsNotAnswer = true;
          }
          //如果是必填，且未选择／输入则
          if (d.IsRequired && d.IsNotAnswer) {
            valid = false;
          }
        });

        if (!skipValid && !valid) {
          self.detail.ExamLog.AnswerLogs = [];
          self.toast_warn("请填必填项！");
          return false;
        }

        //手动提交，验证通过后，将timer清除
        if (this.timer) {
          clearInterval(this.timer);
        }

        this.$http("/mobile/exam/save", self.detail.ExamLog, ret => {
          if (ret.status) {

            //由于涉及到提交后显示结果（不刷新页面），所以已定要将self.detail置空，否则会多次触发checker/selector的change事件。
            self.detail = {};
            self.countDown = 0;
            self.detail.disabled = true;

            self.initDetailList(true);
          } else {
            this.toast_warn(ret.errmsg);
          }
        });
      },
      updateCountDown(){
        let self = this;

        self.timer = setInterval(() => {
          if (self.countDown > 0) {
            self.countDown -= 1;
          } else {
            self.isToTheTime = true;
            clearInterval(self.timer);
            self.toast_warn('答题时间到');
            self.detail.disabled = true;
            self.onSubmit(true);
          }
        }, 1000);

        self.$nextTick(function () {

          let rightcircle = document.getElementById("rightcircle");
          let leftcircle = document.getElementById("leftcircle");
          rightcircle.style.animation = "circleProgressLoad_right " + self.countDown + "s linear 1s forwards";
          leftcircle.style.animation = "circleProgressLoad_left " + self.countDown + "s linear 1s forwards";

        })
      },
      /*
       * 预览图片
       * */
      wxpreview(value, valueList) {
        var self = this;
        self.$wx.previewImage1(value, valueList);
      }
    },
    filters: {
      /*
       * 过滤日期
       * @param {String} date 字符串时间戳
       * */
      formatDate(date) {
        return date.JsonFormat() + "   " + date.TimeJsonFormat();
      }
    }
  };
</script>

<style lang="less">
  @import '../../styles/custom/exam';

  *:not(div, input, textarea) {
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
    max-width: 100%;
  }

  .container {
    position: relative;
    .detail-container {
      min-height: 100%;
      padding-bottom: 53px;
      background-color: #ffffff;
      /*详情标题*/
      .title-wrap {
        padding: 10px;
        .title {
          font-size: 18px;
          text-align: center;
          overflow: hidden;
          /*white-space: nowrap;*/
          /*text-overflow: ellipsis;*/
        }
        .date-wrap {
          text-align: center;
          margin-top: 2px;
          .date {
          }
          font-size: 13px;
          color: #999;
        }
      }

      /*问题列表容器*/
      .question-wrap {
        padding: 0 15px;
        /*问题项*/
        .question-item {
          margin-bottom: 15px;
          box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
          /*问题标题、描述、类型、必填项*/
          .question-title {
            position: relative;
            display: box;
            box-align: center;
            align-items: center;
            .desc-text {
              min-width: 0;
              padding: 5px;
              .title {
                font-weight: 400;
                font-size: 16px;
                .type {
                  font-size: 12px;
                  font-weight: 400;
                  color: #999999;
                }
                .required {
                  position: relative;
                  top: 4px;
                  color: #ff4949;
                }
              }
              .desc {
                font-size: 12px;
                color: #999999;
              }
            }
          }

          /*问题选项*/
          .question-option {
            /*padding: 5px;*/
          }

        }
      }

      .submit-wrap {
        width: 40%;
        margin: 10px auto 30px auto;
      }
      .resubmit-wrap {
        width: 100%;
        margin: 10px auto;
        text-align: center;
        button {
          width: 40%;
          min-width: 140px;
        }
      }
      .examTips{
        text-align: center;
        padding: 10px;
        .red{
          color:red;
        }
      }
      //验证提示
      .error-tip {
        color: red;
        .error-icon {
          display: inline-block;
          color: red;
          font: normal normal normal 14px/1 "weui";
          &:before {
            position: relative;
            top: 2px;
            content: "\EA0B";
          }
        }
      }
    }
  }
</style>
