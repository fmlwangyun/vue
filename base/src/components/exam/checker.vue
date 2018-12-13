<template>
  <section>
    <checker v-model="item.Answer"
             :type="item.InputType==1?'checkbox':'radio'"
             default-item-class="default-checker"
             selected-item-class="selected-checker"
             :class="item.InputType==1?'checkboxStyle':'radioStyle'"
             @on-change="radioChange">
      <div v-for="(option,Oindex) in item.Options" :key="Oindex">
        <checker-item :value="option" :disabled="disabled"
                      @on-item-click="showInput">
          <!--选项描述-->
          <div class="option-desc-wrap">
            <div class="weui-cell__hd" style="position: absolute;top: 0;">
              <i class="weui-icon-checked vux-checklist-icon-checked" style="vertical-align: top"></i>
            </div>
            <div :class="disabled&&option.IsAnswer&&isAnswer?'is-answer desc-text':'desc-text'">
              <h4 class="title">{{option.Name}}</h4>
              <p class="desc">{{option.Memo}}</p>
            </div>
          </div>
          <div class="desc-img" v-if="!!option.ImageUrl">
            <img :src="JSON.parse(option.ImageUrl)[0].url" alt="">
          </div>
        </checker-item>
        <div class="other-wrap" :class="disabled ?'disabled':''" v-if="option.IsCanInput&&option.IsAllowInput">
          <group>
            <x-input :disabled="disabled"
                     label-width="38px" title="" v-model="option.OptionValue"
                     :placeholder="disabled&&!option.OptionValue?'无':''"
                     :name="'OptionValue'+Oindex" v-validate="'required'" show-clear></x-input>
          </group>
        </div>
        <div style="color: #4343d8" v-if="option.IsCanSeeResult&&disabled">统计结果：{{ option.ResultString}}</div>
      </div>
    </checker>
  </section>
</template>
<script>
  import {Group, Checker, CheckerItem, XInput, XTextarea, Confirm} from "vux";
  export default {
    components: {
      Group,
      Checker,
      CheckerItem,
      XInput,
      XTextarea,
      Confirm
    },
    props: {
      item: {default: {}, type: Object},
      disabled: {default: false, type: Boolean},
      isAnswer: {default: false, type: Boolean}
    },
    data() {
      return {
        AnswerOptionSnList: Object
      };
    },
    created() {
      this.radioChange(this.item.Answer);
    },
    destoryed(){
      if (this.item.InputType == 0) {
        this.item.Answer = {};
      } else {
        this.item.Answer = []
      }
    },
    methods: {
      radioChange(val, item) {
        var self = this;
        //单选
        if (self.item.InputType == 0) {
          if (self.item.Answer && self._.isArray(self.item.Answer)) {
            if (self.item.Answer.length > 0) {
              self.item.Answer = self.item.Answer[0];
            }
          }

          if (!!val) {
            self._.each(self.item.Options, function (d, i) {
              d.IsCanInput = true;
              if (d.Sn != val.OptionSn) {
                d.IsCanInput = false;
              }
            });
            self.item.IsNotAnswer = !(!!val && val.ID > 0);
          } else {
            //选择A，然后取消选择A，val=''
            //如果是初始化，未选择任何一项，val=undefinded
            if (val == '') {
              self.item.IsNotAnswer = true;
            }
          }
        }
        //多选
        else {
          self._.each(self.item.Options, function (d, i) {
            let selected = self._.findIndex(val, function (n) {
                return n.OptionSn == d.Sn;
              }) > -1;

            if (selected) {
              d.IsCanInput = true;
            } else {
              d.IsCanInput = false;
            }
          });

          if (!!val) {
            self.item.IsNotAnswer = val.length == 0;
          }
        }
      },
      showInput(o) {
        if (!this.disabled) o.IsCanInput = !o.IsCanInput;
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  //默认样式：多选样式
  .default-checker {
    .weui-icon-checked {
      &:before {
        content: "\EA01";
        color: #c9c9c9;
        font-size: 22px;
        display: block;
      }
    }
  }

  .selected-checker {
    .weui-icon-checked {
      &:before {
        content: "\EA06";
        color: #09bb07;
      }
    }
  }

  /*单项选择题样式*/
  .radioStyle {
    .default-checker {
      .weui-icon-checked {
        &:before {
          content: "\EA01";
          color: #c9c9c9;
          font-size: 22px;
          display: block;
        }
      }
    }

    .selected-checker {
      .weui-icon-checked {
        &:before {
          content: "\EA06";
          color: #09bb07;
        }
      }
    }
  }

  //单选&多选，选项
  .option-desc-wrap {
    position: relative;
    display: box;
    display: flex;
    box-align: center;
    align-items: center;
    .desc-text {
      flex: 1;
      min-width: 0;
      margin-left: 30px;

      //正确答案
      &.is-answer {
        color: red;
      }
      h4 {
        font-size: 14px;
        font-weight: 400;
      }
      p {
        font-size: 12px;
        color: #999999;
      }
    }
  }

  .other-wrap {
    margin: 2px 10px 5px 10px;
  }

</style>
