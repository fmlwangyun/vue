<template>
  <div class="container">
    <div class="detail-container" v-cloak>
      <div class="title-wrap">
        <h1 class="title">{{detail.name}}</h1>
        <div class="date-wrap">
          <div v-if="!!detail.beginTime" class="start">
            <span>{{detail.beginTime | formatDate}}</span>
          </div>
          <div v-if="!!detail.endTime" class="end">
            <span>{{detail.endTime | formatDate}}</span>
          </div>
        </div>
      </div>
      <!--问题列表-->
      <div class="question-wrap">
        <!--问题项-->
        <div class="question-item" v-for="(item, index) in detail.questionList" :key="index">
          <!--问题描述-->
          <div class="question-title">
            <div class="desc-text">
              <h3 class="title">{{(index + 1) + '. ' + item.Name}}<span class="type"
                                                                        v-if="item.InputType==0">（单选）</span><span
                v-if="item.InputType==1" class="type">（多选）</span><i v-if="item.IsRequired" class="required"> *</i></h3>
              <p class="desc">说明：{{item.Memo}}</p>
            </div>
            <div class="desc-img" v-if="!!item.ImageUrl">
              <img :src="item.ImageUrl" alt="">
            </div>
          </div>
          <!--选择题——问题选项-->
          <div class="question-option" v-if="item.InputType<3">
            <!--单选多选-->
            <checker v-if="item.InputType!==2" v-model="item.optionSn" :type="item.InputType==1?'checkbox':'radio'"
                     default-item-class="default-checker"
                     selected-item-class="selected-checker"
                     :class="item.InputType==1?'checkboxStyle':'radioStyle'"
                     @on-change="checkerChange(item)">
              <div v-for="(optionItem,optionIndex) in item.Options" :key="optionIndex">
                <checker-item :value="optionItem.Sn" :disabled="detail.disabled"
                              @on-item-click="itemClick(optionItem,item,item.InputType,detail.disabled)">
                  <!--选项描述-->
                  <div class="option-desc-wrap">
                    <div class="weui-cell__hd" style="position: absolute;top: 0;">
                      <i class="weui-icon-checked vux-checklist-icon-checked" style="vertical-align: top"></i>
                    </div>
                    <div :class="detail.disabled&&optionItem.IsAnswer?'is-answer desc-text':'desc-text'">
                      <h4 class="title">{{optionItem.Name}}</h4>
                      <p class="desc">{{optionItem.Memo}}</p>
                    </div>
                  </div>
                  <div class="desc-img" v-if="!!optionItem.ImageUrl">
                    <img :src="JSON.parse(optionItem.ImageUrl)[0].url" alt="">
                  </div>
                </checker-item>
                <div class="other-wrap"
                     v-if="(detail.disabled&&item.InputType==1&&!!optionItem.optionValue&&optionItem.IsAllowInput)||(item.InputType==1&&optionItem.inputValue&&optionItem.IsAllowInput)">
                  <group>
                    <x-input :disabled="detail.disabled" style="font-size: 12px;" label-width="38px" title=""
                             v-model="optionItem.optionValue"
                             :placeholder="detail.disabled&&!optionItem.optionValue?'无':''" show-clear
                             :name="'optionValue'+optionIndex" v-validate="'required'"></x-input>
                    <!--验证提示-->
                    <div v-if="veeErrors.has('optionValue'+optionIndex)&&!detail.disabled" class="error-tip">
                      <!--<i class="error-icon"></i>-->
                      <span style="font-size: 12px">* 必填</span>
                    </div>
                  </group>
                </div>
                <!--单选时-->
                <div class="other-wrap"
                     v-if="(detail.disabled&&item.InputType==0&&optionItem.IsAllowInput)
                     ||(item.InputType==0&&item.inputValue&&optionItem.IsAllowInput)">
                  <group>
                    <x-input :disabled="detail.disabled" style="font-size: 12px;" label-width="38px" title=""
                             v-model="item.otherValue" :placeholder="detail.disabled&&!item.otherValue?'无':''"
                             show-clear :name="'radio'+index+'-'+optionIndex" v-validate="'required'"></x-input>
                    <!--验证提示-->
                    <div v-if="veeErrors.has('radio'+index+'-'+optionIndex)&&!detail.disabled" class="error-tip">
                      <!--<i class="error-icon"></i>-->
                      <span style="font-size: 12px">* 必填</span>
                    </div>
                  </group>
                </div>
              </div>
            </checker>
            <!--下拉选项-->
            <div v-else :class="'selector-wrap'">
              <group>
                <selector :ref="'selectorCom'+index" placeholder="请选择选项" :readonly="detail.disabled"
                          v-model="item.optionSn" :value-map="['Sn', 'Name']"
                          :options="item.Options" @on-change="selectorChange(item,item.Options,index)"></selector>
              </group>
              <!--其他输入-->
              <div class="other-wrap" v-if="item.optionSn.length>0">
                <group>
                  <x-input :disabled="detail.disabled" v-if="(detail.disabled&&item.inputValue)||item.inputValue"
                           style="font-size: 12px;" label-width="38px" title=""
                           v-model="item.otherValue" :placeholder="detail.disabled&&!item.otherValue?'无':''"
                           show-clear :name="'otherValue'+index" v-validate="'required'"></x-input>
                  <!--验证提示-->
                  <div v-if="veeErrors.has('otherValue'+index)&&!detail.disabled" class="error-tip">
                    <!--<i class="error-icon"></i>-->
                    <span style="font-size: 12px">* 必填</span>
                  </div>
                </group>
              </div>
            </div>
            <!--其他输入-->
            <!--<div class="other-wrap" v-if="(item.InputType!==1)&&(item.optionSn.length>0)">-->
            <!--<group>-->
            <!--&lt;!&ndash;单选时的备注&ndash;&gt;-->
            <!--<x-input v-if="!detail.disabled&&item.inputValue" style="font-size: 12px;" label-width="38px" title=""-->
            <!--v-model="item.otherValue" :placeholder="detail.disabled&&!item.otherValue?'无':''"-->
            <!--show-clear :name="'otherValue'+index" v-validate="'required'"></x-input>-->

            <!--&lt;!&ndash;提交后的展示&ndash;&gt;-->
            <!--<x-input v-if="detail.disabled&&!!item.otherValue" :disabled="detail.disabled" style="font-size: 12px;" label-width="38px" title="备注："-->
            <!--v-model="item.otherValue"></x-input>-->
            <!--&lt;!&ndash;验证提示&ndash;&gt;-->
            <!--<div v-if="veeErrors.has('otherValue'+index)&&!detail.disabled" class="error-tip">-->
            <!--&lt;!&ndash;<i class="error-icon"></i>&ndash;&gt;-->
            <!--<span style="font-size: 12px">* 必填</span>-->
            <!--</div>-->
            <!--</group>-->
            <!--</div>-->
          </div>

          <!--问答题——回答区域-->
          <div v-if="item.InputType==3||item.InputType==4" class="answer-wrap">
            <group v-if="item.InputType==3">
              <x-input title="答：" :disabled="detail.disabled" v-model="item.otherValue" @on-change="inputChange(item)"
                       placeholder="请回答"></x-input>
            </group>
            <group v-else>
              <x-textarea :readonly="detail.disabled" title="答：" :disabled="detail.disabled" v-model="item.otherValue"
                          @on-change="textAreaChange(item)"
                          placeholder="请回答"></x-textarea>
            </group>
          </div>

          <!--上传-->
          <div v-if="item.InputType==5" class="user-upload-wrap clearfix">
            <ul class="img-list clearfix">
              <li v-for="(image,index) in item.imgList">
                <img :src="image" alt="">
              </li>
            </ul>
            <div v-if="!detail.disabled" class="upload-btn" @click="wxImage(item)"></div>
          </div>

          <!--验证提示-->
          <div v-if="!item.selected&&item.IsRequired" class="error-tip">
            <!--<i class="error-icon"></i>-->
            <span v-if="item.InputType==3">请填写答案</span>
            <span v-if="item.InputType==4">请填写答案</span>
            <span v-if="item.InputType==5">请上传图片</span>
            <span v-if="item.InputType==0">* 必选，请至少选择1项</span>
            <span v-if="item.InputType==1">* 必选，请至少选择<span v-if="item.ChoiceNumMin">{{item.ChoiceNumMin}}</span>
              <span v-else>1</span>项</span>
            <span v-if="item.InputType==2">* 必选，请至少选择1项</span>

          </div>
        </div>
      </div>

      <!--提交-->
      <div class="submit-wrap" v-if="!detail.disabled&&!detail.disedit&&btnShow">
        <x-button type="primary" @click.native="onSubmit">提交</x-button>
      </div>
      <!--todo: 改为插件形式调用-->
      <confirm v-model="confirmShow"
               title="确认提交"
               @on-confirm="onConfirm">
      </confirm>
    </div>
  </div>
</template>

<script>
  import {Group, Divider, Checker, CheckerItem, XInput, XTextarea, Selector, XButton, Confirm} from 'vux'
  import {mapState} from 'vuex'

  export default {
    components: {
      Group,
      Divider,
      Checker,
      CheckerItem,
      XInput,
      XTextarea,
      Selector,
      XButton,
      Confirm
    },
    data() {
      return {
        /*详情*/
        detail: {
          //id
          id: '',
          sn: '',
          //提交选项记录
          answerLogs: [],
          //禁用
          disabled: false,
          disedit: false,
          //名称
          name: '',
          //类型
          type: '',
          //开始时间
          beginTime: '',
          //结束时间
          endTime: '',
          //问题列表
          questionList: []
        },

        /*参数*/
        params: {},

        /*提交提示弹窗*/
        confirmShow: false,

        /*btnShow*/
        btnShow: false,
        /*上传选项*/
        userUploader: {
          images: [],
          uploadUrl: '',
          max: 1,

        }
      }
    },
    mounted() {
      this.initDetailList();
    },
    beforeUpdate() {

    },
    computed: {
      ...mapState(['register'])
    },
    methods: {

      /*
       * 初始化详情列表
       * */
      initDetailList() {
        this.id = this.$route.params.id;
        this.$http('/mobile/exam/info', {id: this.id}, (ret) => {
          if (ret.status) {
            let examInfo = ret.data;
            //修改document.title
            document.title = examInfo.TypeStr;
            this.detail.id = examInfo.ID;
            this.detail.sn = examInfo.Sn;
            this.detail.disabled = examInfo.ExamLog ? true : false;
            this.detail.answerLogs = examInfo.ExamLog ? examInfo.ExamLog.AnswerLogs : [];
            this.detail.name = examInfo.Name;
            this.detail.type = examInfo.Type;
            this.detail.beginTime = examInfo.BeginTime;
            this.detail.endTime = examInfo.EndTime;

            //排序问题
            let questions = examInfo.Questions.sort((a, b) => (a.Sort - b.Sort));

            //遍历问题集合，修改内部数据结构
            this.detail.questionList = this._.map(questions, (value, key, list) => {
              let obj = value;
              let type = parseInt(obj.InputType)

              //对应问题的选项
              let arr = this._.where(this.detail.answerLogs, {QuestionSn: obj.Sn});

              //多选问题数组
              let filterArr = [];
              for (let i = 0; i < arr.length; i++) {
                filterArr.push(arr[i].OptionSn)
              }

              console.log(arr)
              if (type == 1) {//多选
                //inputValue：是否显示备注信息输入框

                obj['optionSn'] = arr.length > 0 ? filterArr : [];
                for (let i = 0; i < obj['Options'].length; i++) {
                  obj['Options'][i]['inputValue'] = false;
                  let osn = obj['Options'][i].Sn;
                  for (let x = 0; x < arr.length; x++) {
                    console.log(arr[x].OptionSn)
                    if (arr[x].OptionSn == osn) {
                      obj['Options'][i]['optionValue'] = arr[x]['OptionValue'];
                      continue;
                    }
                  }
                }

              } else if (type == 2) {//下拉选择
                obj['inputValue'] = false;
                obj['optionSn'] = arr.length > 0 ? arr[0].OptionSn : '';
              } else if (type == 3) {//单行输入
                obj['optionSn'] = '00000000-0000-0000-0000-000000000000';
              } else if (type == 4) {//多行输入
                obj['optionSn'] = '00000000-0000-0000-0000-000000000000';
              } else if (type == 5) {//上传
                obj['optionSn'] = '00000000-0000-0000-0000-000000000000';
                obj['imgList'] = [];
                for (let y = 0; y < arr.length; y++) {
                  console.log(arr[y].OptionValue)
                  obj['imgList'].push(arr[y].OptionValue);
                }
              } else {//单选
                obj['inputValue'] = false;
                obj['optionSn'] = arr.length > 0 ? arr[0].OptionSn : '';
                for (let i = 0; i < obj['Options'].length; i++) {
                  obj['Options'][i]['inputValue'] = false;
                  let osn = obj['Options'][i].Sn;
                  for (let x = 0; x < arr.length; x++) {
                    console.log(arr[x].OptionSn)
                    if (arr[x].OptionSn == osn) {
                      obj['Options'][i]['optionValue'] = arr[x]['OptionValue'];
                      continue;
                    }
                  }
                }
              }

              //问题的其他/备注输入框输入的值
              obj['otherValue'] = arr.length > 0 ? arr[0].OptionValue : '';

              //问题是否选择（默认为true）
              obj['selected'] = true;
              return obj
            });

            this.btnShow = true;
            console.log(this.detail.questionList)

            if(this.detail.disabled){
              this.$nextTick(function () {
                let textareaList = document.getElementsByTagName('textarea');
                let textareaListArr =  Array.prototype.slice.call(textareaList)
                textareaListArr.forEach((element)=>{
                  element.setAttribute('disabled','disabled')
                })
              });
            }



            if(ret.data.state==1)
            {
              this.detail.disedit=true;
              this.toast_warn(ret.data.errmsg);
            }
          } else {
            this.toast_warn(ret.errmsg);
          }
        })
      },

      /*
       * 选项改变
       * @param {Object} item 问题
       * */
      checkerChange(item) {
        item['selected'] = true;
      },

      /*
       * checkerItem被点击
       * @param {Object} optionItem 问题选项
       * @param {Object} item 问题
       * @param {Number} type 问题类型（单选、多选等）
       * @param {Boolean} disable 是否可以答题
       * */
      itemClick(optionItem, item, type, disable) {
        console.log(optionItem)
        if (!disable) {
          if (type == 1) {
            optionItem['inputValue'] = !optionItem['inputValue'];
          } else {
            if (optionItem['IsAllowInput']) {
              item['inputValue'] = !item['inputValue'];
            } else {
              item['inputValue'] = false;
              item['otherValue'] = ''
            }
//            item['inputValue'] = !item['inputValue'];
//            optionItem['IsAllowInput'] = optionItem['IsAllowInput']
          }
        }
      },

      /*
       * selector值发生改变
       * @param {Object} item 问题
       * @param {Array} itemOptions 问题选项集合
       * @param {Number} index 问题下标
       * */
      selectorChange(item, itemOptions, index) {
        setTimeout(() => {
          let sn = this.$refs['selectorCom' + index][0].getFullValue()[0].Sn;
          let arr = this._.where(itemOptions, {Sn: sn})
          item['inputValue'] = arr[0].IsAllowInput;
          if (!item['inputValue']) {
            item['otherValue'] = ''
          }
          item['selected'] = true;

        }, 200)
      },

      /*
       * input值发生变化
       * @param {Object} item 问题
       * */
      inputChange(item) {
        item['selected'] = true
      },

      /*
       * textArea值发生变化
       * @param {Object} item 问题
       * */
      textAreaChange(item) {
        item['selected'] = true
      },

      /*
       * 点击提交按钮
       * */
      onSubmit() {
        //问题集合副本
        let questionListCopy = [];

        //过滤问题集合，更改每道问题的选择状态
        let filterQuestionList = this._.map(this.detail.questionList, (value, key, list) => {
          let obj = value;
          let type = parseInt(obj.InputType)

          //问题的Sn有值
          if (obj.optionSn.length > 0) {
            obj['selected'] = true;
            if (obj.optionSn == '00000000-0000-0000-0000-000000000000') {
              if (type == 3) {
                if (!obj['otherValue']) {
                  obj['selected'] = false;
                }
              } else if (type == 4) {
                if (!obj['otherValue']) {
                  obj['selected'] = false;
                }
              } else if (type == 5) {
                if (obj.imgList.length > 0) {
                  obj['selected'] = true;
                } else {
                  obj['selected'] = false;
                }
              } else {
                obj['selected'] = false;
              }
            }
          } else {
            obj['selected'] = false;
          }
//          if (!!obj['otherValue']) {
//            obj['selected'] = true;
//          }

          return obj
        });

        this.detail.questionList = filterQuestionList;

        //忽略不是必选项，且未选择的问题
        questionListCopy = this._.reject(filterQuestionList, {selected: false, IsRequired: false});

        //检查是否有未选择的问题（第一次检查）
        let valid = this._.every(questionListCopy, (value, key, list) => {
          let obj = value;
          return obj['selected'] == true;
        });

        //第一次检查通过
        if (valid) {
          //validator表单验证插件的验证结果（第二次检查）
          this.$validator.validateAll().then((result) => {
            if (!result) {
              this.toast_show('请检查页面必填项');
              return false
            }

            //最终答案集合
            let answerLogs = [];
            //多项选择题
            let isArray = [];
            //单项选择题
            let noArray = [];
            //上传类型
            let uploadArray = [];

            //过滤出多项选择题
            isArray = this._.filter(questionListCopy, (value, key, list) => {
              return Array.isArray(value.optionSn)
            });

            //过滤出上传类型
            uploadArray = this._.filter(questionListCopy, (value, key, list) => {
              return Array.isArray(value.imgList)
            });


            //再次过滤多项选择题，改变数据结构
            let filterArr = [];
            //遍历多项选择题
            for (let i = 0; i < isArray.length; i++) {
              //单个题
              let parentArr = isArray[i];
              //题的选项
              let item = parentArr.Options;
              //optionSn，是个数组
              let optionItems = parentArr.optionSn;
              //遍历题的选项
              for (let x = 0; x < item.length; x++) {
                let obj = {};
                //保存选项的QuestionSn
                obj['QuestionSn'] = item[x].QuestionSn;
                let childValue = ''
                obj['OptionValue'] = item[x].optionValue ? item[x].optionValue : '';
                //判断optionSn中是否存在题目的对应选项
                let exist = this._.find(optionItems, (value) => {
                  //存在即保存
                  if (item[x].Sn == value) {
                    childValue = value;
                  } else {
                    childValue = '00000000-0000-0000-0000-000000000000';
                  }
                  return item[x].Sn == value;
                });

                if (childValue == '00000000-0000-0000-0000-000000000000') {
                  obj['OptionValue'] = '';
                }

                obj['OptionSn'] = childValue;

                filterArr.push(obj)
              }
            }

            //遍历上传组
            let filterUploader = [];
            //遍历多项选择题
            for (let i = 0; i < uploadArray.length; i++) {
              //单个上传对象
              let item = uploadArray[i];
              //图片列表，数组
              let imgList = item.imgList;

              //遍历图片列表
              for (let x = 0; x < imgList.length; x++) {
                let obj = {};
                //保存选项的QuestionSn
                obj['QuestionSn'] = item.Sn;
                obj['OptionValue'] = imgList[x];
                obj['OptionSn'] = '00000000-0000-0000-0000-000000000000';

                filterUploader.push(obj)
              }
            }

            //过滤出单项选择题
            noArray = this._.filter(questionListCopy, (value, key, list) => {
              return !Array.isArray(value.optionSn) && !Array.isArray(value.imgList)
            });

            //遍历单项选择题，更改内部数据结构
            let filterNoArray = this._.map(noArray, (value, key, list) => {
              let obj = {};
              obj['QuestionSn'] = value.Sn;
              obj['OptionSn'] = value.optionSn;
              obj['OptionValue'] = value.otherValue;
              return obj
            });

            console.log(filterUploader)

            answerLogs = [...filterArr, ...filterNoArray, ...filterUploader];
            console.log(answerLogs)
            this.params.ExamSn = this.detail.sn;

            //去除无效的答案
            this.params.AnswerLogs = this._.reject(answerLogs, {
              OptionSn: '00000000-0000-0000-0000-000000000000',
              OptionValue: ''
            });
            console.log(this.params)
            this.confirmShow = true;

          });

        } else {
          this.toast_show('请检查页面必填项');
        }

      },

      /*
       * 确定保存考试／调研
       * */
      onConfirm() {
        this.$http('/mobile/exam/save', this.params, (ret) => {
          if (ret.status) {
            window.location.reload();
          } else {
            this.toast_warn(ret.errmsg);
          }
          this.confirmShow = false
        })
      },

      /*
       * 调用jssdk获取本地图片
       * @param {Object} item 问题
       * */
      wxImage(item) {
        var self = this;
//        item.imgList.push('http://vue.rndmed.com/upload/userimg/71eb8cfbf3fd40f0b4a578e25257f616.jpg');
//        item.selected = true;
        self.$wx.wxmultiupload(function (ret) {
          if (ret.length > 1) {
            self.toast_warn("一次只能上传一张图片");
            return false;
          }
          if (ret.length == 1) {
            self.wxdownloadImage(ret, item);
          } else {
            self.toast_warn("微信上传失败");
          }
        })
      },

      /*
       * 下载图片
       * @param {String} serverId 图片在服务器上的ID
       * @param {Object} item 问题
       * */
      wxdownloadImage(serverId, item) {
        var self = this;
        let params = {
          serverId: serverId,
          urlWhere: 'userimg',
          filetype: '.jpg'
        };
        self.$http('/mobile/public/WechatDownLoadImg', params, (ret) => {
          if (ret.status) {
            item.imgList.push(ret.data[0]);
            item.selected = true;
          } else {
            this.toast_warn(ret.errmsg);

          }
        })
      },

      /*
       * 预览图片
       * */
      wxpreview(value, valueList) {
        var self = this;
        self.$wx.previewImage1(value, valueList)
      },

      // 删除图片
      delImage() {

      },
    },
    filters: {
      /*
       * 过滤日期
       * @param {String} date 字符串时间戳
       * */
      formatDate(date) {
        return  date.JsonFormat()+"   "+date.TimeJsonFormat();
      },
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

  .desc-img {
    margin-top: 5px;
    margin-left: 30px;
    width: 100px;
    height: auto;
  img {
    display: block;
    width: 100%;
    height: auto;
  }
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
  .start, .end {
    /*display: inline-block;*/
  }
  font-size: 13px;
  color: #999;
  }
  }

  /*问题列表容器*/
  .question-wrap {
  /*问题项*/
  .question-item {
    margin-top: 5px;
    padding: 5px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10);
  /*问题标题描述*/
  .question-title {
    position: relative;
    display: box;
    display: flex;
    box-align: center;
    align-items: center;
  .desc-text {
    flex: 1;
    min-width: 0;
  .title {
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
  h3 {
    font-weight: 400;
    font-size: 16px;
  }
  p {
    font-size: 12px;
    color: #999999;
  }
  }

  .desc-img {
    width: 40px;
    height: 40px;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  }
  }

  /*问题选项*/
  .question-option {

  .vux-checker-item {
    display: block;
  }

  //默认样式：多选样式
    .default-checker {
  .weui-icon-checked {
  &:before {
     content: '\EA01';
     color: #C9C9C9;
     font-size: 22px;
     display: block;
   }
  }
  }

  .selected-checker {
  .weui-icon-checked {
  &:before {
     content: '\EA06';
     color: #09BB07;
   }
  }
  }

  /*单项选择题样式*/
  .radioStyle {
  .default-checker {
  .weui-icon-checked {
  &:before {
     content: '\EA01';
     color: #C9C9C9;
     font-size: 22px;
     display: block;
   }
  }
  }

  .selected-checker {
  .weui-icon-checked {
  &:before {
     content: '\EA06';
     color: #09BB07;
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

  .desc-img {

  }
  }

  .other-wrap {

  }
  }
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

  //上传
    .user-upload-wrap {
  .img-list {
  li {
    float: left;
    margin-left: 5px;
    margin-bottom: 5px;
    width: 150px;
    height: auto;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  }

  .upload-btn {
    float: left;
    position: relative;
    margin-right: 5px;
    margin-bottom: 5px;
    width: 58px;
    height: 58px;
    border: 1px solid #D9D9D9;
  &:before {
     content: " ";
     position: absolute;
     width: 2px;
     height: 39.5px;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     background-color: #D9D9D9;
   }
  &:after {
     content: " ";
     position: absolute;
     width: 39.5px;
     height: 2px;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     background-color: #D9D9D9;
   }
  }
  }

  //提交按钮
    .submit-wrap {
      padding: 20px 50px;
    }

  }
  }

</style>
