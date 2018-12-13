<template>
  <section>
    <div v-if="this.register===1">
      <div v-for="(CommentImg, index) in form.CommentImgList" class="comment-icon">
        <div @click="wxpreview(CommentImg,form.CommentImgList)" class="icon-pre">
          <img :src=CommentImg alt="" class="imgall">
        </div>
        <div @click="delImg(index)" class="del-img">
          <img src="../assets/images/register/del.png" alt="" class="imgall">
        </div>
      </div>
      <div class="comment-area">
      <textarea name="" id="" cols="30" rows="10" placeholder="写写你的感受吧,一不小心就成了评论高手。"
                v-model="form.Content" :focus="isFocus" @focus="setFocus()" @blur="setBlur()"></textarea>
        <div class="comment-tool clearfix">
          <div class="tool-box fl" @click="wxphoto()">
            <img src="../assets/images/activity/upload.jpg" alt="">
          </div>
          <div class="tool-box fl" @touchstart="wxspeaker" @touchend="wxspeaker"
               v-show="uploadvoice.isSpeaker">
            <img src="../assets/images/activity/bubbing.jpg" alt=""
                 v-show="!uploadvoice.isPressSpeaker">
            <img src="../assets/images/activity/bubble.jpg" alt=""
                 v-show="uploadvoice.isPressingSpeaker&&uploadvoice.isPressSpeaker">
          </div>
          <div class="tool-box fl" @click="wxStartListenSpeaker(localId)" v-if="uploadvoice.isStartPlaySpeaker">
            <img src="../assets/images/activity/play.jpg" alt="">
          </div>
          <div class="tool-box fl" @click="wxStopListenSpeaker()" v-if="uploadvoice.isStopPlaySpeaker">
            <img src="../assets/images/activity/stop.jpg" alt="">
          </div>
          <div class="tool-box fl" style="margin-left:-8px;" @click="restartSpeaker()"
               v-show="(uploadvoice.isStartPlaySpeaker||uploadvoice.isStopPlaySpeaker)">
            <img src="../assets/images/activity/replay.jpg" alt="">
          </div>
        </div>
        <div class="record" v-show="(uploadvoice.isSpeaker&&uploadvoice.isPressingSpeaker&&uploadvoice.isPressSpeaker)
            ||(!uploadvoice.isSpeaker&&!uploadvoice.isStartPlaySpeaker)">
          <img src="../assets/images/activity/replaying.png" alt=""
               v-show="!uploadvoice.isStopPlaySpeaker">
          <img src="../assets/images/activity/playspeaker.png" alt=""
               v-show="uploadvoice.isStopPlaySpeaker">
          <div class="recording">
            <div class="line line1 animate"></div>
            <div class="line line2 animate"></div>
            <div class="line line3 animate"></div>
            <div class="line line4 animate"></div>
            <div class="line line5 animate"></div>
            <div class="line line6 animate"></div>
          </div>
        </div>
      </div>
      <div class="group-row clearfix">
        <button @click="addComment()">提交评论</button>
      </div>
    </div>
    <div class="bor-bot fontstyle">评论列表</div>
    <div v-if="!(this.commentList.length === 0)">
      <div class="comment-content">
        <div class="comment-list">
          <div class="comment-item" v-for="(item, index) in commentList">
            <div class="index-comment-item-inner clearfix">
              <div class="clearfix">
                <div class="comment-img float-l">
                  <img v-bind:src="item.HeadImgUrl" height="46" width="46"/>
                </div>
                <div class="comment-title float-l">
                  {{ item.Name }}
                </div>
              </div>
              <div class="comment-details">
                <p>{{ item.Content }}</p>
                <div v-for="(CommentImg,index) in item.CommentImgList" v-if="item.CommentImgList.length>1"
                     class="details-icon">
                  <p @click="wxpreview(CommentImg,item.CommentImgList)" class="icon-pre">
                    <img v-bind:src="CommentImg" class="imgall"/>
                  </p>
                </div>
                <div v-for="(CommentImg,index) in item.CommentImgList" v-if="item.CommentImgList.length===1"
                     class="details-icon2">
                  <p @click="wxpreview(CommentImg,item.CommentImgList)" class="icon-pre">
                    <img v-bind:src="CommentImg" class="imgall"/>
                  </p>
                </div>
                <div style="height:15%;" v-show="item.CommentVoice!=null&&item.CommentVoice!=''">
                  <div class="clearfix">
                    <div class="talk-box float-l" @click="startListenSpeaker(item,item.ID,index)">
                      <img src="../assets/images/activity/talk-bg.png" alt="">
                      <div class="talking clearfix">
                        <div :class="item.talk1">
                          <img src="../assets/images/activity/talk1.png" alt="">
                        </div>
                        <div :class="item.talk2">
                          <img src="../assets/images/activity/talk2.png" alt="">
                        </div>
                        <div :class="item.talk3">
                          <img src="../assets/images/activity/talk3.png" alt="">
                        </div>
                      </div>
                    </div>
                    <div class="float-l voice-time small-font">
                      {{item.CommentVoiceTime}}
                    </div>
                  </div>
                </div>
                <div class="comment-tip clearfix">
                        <span class="float-l clearfix">
                          <span @click="thumbUp(index)" class="thumb-box float-l">
                            <img src="../assets/images/activity/zan-hong.png" v-if="item.toggle" alt="">
                             <img src="../assets/images/activity/zan-hui.png" v-else alt="">
                          </span>
                          <span class="thumb-num small-font  float-l">{{ item.PraiseCount}}</span>
                        </span>
                  <span class="comment-date small-font float-r">
                          {{ item.Created }}
                        </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="group-row clearfix">
        <button @click="doneLoad()" v-show="!pulldownDisable">点击加载更多</button>
        <div v-show="pulldownDisable">暂无更多数据</div>
      </div>

    </div>
    <p v-show="this.commentList.length === 0" class="no_comment ">暂无评论</p>
    <audio id="myvideo" v-show="false" controls="controls"></audio>
  </section>
</template>
<script>
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex'
  export default{
    props: {
      /* 文章ID*/
      articleID: {
        type: String,
        default: '0'
      },
    },
    data(){
      return {
        form: {
          WxUserID:0,
          Content: '',
          ArticleID: '0',
          CommentImg: '',
          CommentVoice: '',
          CommentVoiceTime: 0,
          CommentImgList: []
        },
        img:{
          isShowWxImg: false,
        },
        uploadvoice:{
          //录音延时参数（避免点击时就录音）
          delaytime: 300,
          speakertime: 0,
          //是否在延时时间内
          iscan: false,
          //防止点击过快
          islock: false,
          //是否在录音评论
          isVoice: false,
          //是否在录音模块
          isSpeaker: true,
          //是否录音
          isPressSpeaker: false,
          //是否正在录音
          isPressingSpeaker: false,
          //是否开始听录音
          isStartPlaySpeaker: false,
          //是否停止听录音
          isStopPlaySpeaker: false,
          //记录录音时间
          speakerStart: 0,
          speakerEnd: 0,
        },
        commentvoice:{
          lisentid: 0,
        },
        isFocus: false,
        localId: '',
        pulldownDisable: false,
        PageSize: 5,
        PageIndex: 1,
        commentList: [],
      }
    },
    computed: {
      ...mapState([
        'userInfo',
        'register'
      ])
    },
    mounted() {
      let self = this;
      self.initCommentList();
      //录音时滑到外面  录音结束
      document.addEventListener('touchcancel', function (even) {
        //在录音但是失去了焦点
        if (self.uploadvoice.iscan && self.uploadvoice.isPressSpeaker) {
          self.wxspeaker();
        }
        //没录音 的时候重置uploadvoice参数
        if (!self.uploadvoice.isVoice && !(self.uploadvoice.iscan && self.uploadvoice.isPressSpeaker)) {
          self.restartSpeaker();
        }

      }, false);
    },
    methods: {
      //录音(暂停录音)
      wxspeaker(){
        var self = this;
        if (!self.uploadvoice.isPressingSpeaker) {
          if (!self.uploadvoice.islock) {
            self.uploadvoice.islock = true;
            self.uploadvoice.isPressingSpeaker = true;
            self.uploadvoice.iscan = true;
            self.uploadvoice.speakertime = new Date().getTime();
            self.speakersettimeout();
          }
        }
        //暂停语音
        else {
          //录音时间短重新录
          if ((new Date().getTime() - self.uploadvoice.speakertime) < self.uploadvoice.delaytime) {
            self.uploadvoice.iscan = false;
            self.restartSpeaker();
          }
          if (self.uploadvoice.iscan) {
            self.uploadvoice.iscan = false;
            self.uploadvoice.speakerEnd = new Date().getTime();
            self.$wx.wxstopRecord(function (issuccess, ret) {
              self.wxuploadVoicefunction(issuccess, ret);
            });
          }
        }
      },
      //延迟录音(delaytime秒)
      speakersettimeout(){
        let self = this;
        setTimeout(() =>{
          self.uploadvoice.islock = false;
          if (self.uploadvoice.iscan) {
            self.$wx.wxstartRecord(function (issuccess, msg) {
              if (issuccess) {
                //获取权限后可录音但是已失去焦点则取消
                if (self.uploadvoice.iscan) {
                  self.uploadvoice.isVoice = true;
                  self.uploadvoice.isPressSpeaker = true;
                  self.uploadvoice.speakerStart = new Date().getTime();
                  self.$wx.wxonVoiceRecordEnd(function (issuccess, ret) {
                    self.uploadvoice.iscan = false;
                    self.uploadvoice.speakerEnd = new Date().getTime();
                    self.wxuploadVoicefunction(issuccess, ret);
                  });
                }
                else {
                  self.$wx.wxstopRecord(function (issuccess, ret) {
                  });
                }
              }
              else {
                self.restartSpeaker();
                self.toast_warn(msg);
              }
            });

          }
        }, self.uploadvoice.delaytime)
      },
      //微信上传语音接口
      wxuploadVoicefunction(success, ret){
        let self = this;
        if (success) {
          self.localId = ret;
          self.uploadvoice.isSpeaker = false;
          self.uploadvoice.isStartPlaySpeaker = true;
          self.uploadvoice.isPressSpeaker = false;
          self.$wx.wxuploadVoice(self.localId, function (issuccess, ret) {
            if (issuccess) {
              ret = [ret];
              self.wxdownloadfile(ret, 0, '.amr', 'video');
            }
            else {
              self.restartSpeaker();
              self.toast_warn(ret);
            }
          })
        }
        else {
          self.restartSpeaker();
          self.toast_warn(ret);
        }
      },
      //在评论模块开始听语音
      wxStartListenSpeaker(value){
        let self = this;
        if (value != '') {
          self.uploadvoice.isStopPlaySpeaker = true;
          self.uploadvoice.isStartPlaySpeaker = false;
          self.$wx.wxplayVoice(value);
          self.$wx.wxonVoicePlayEnd(function (ret) {
            self.wxStopListenSpeaker();
          })
        } else {
          self.restartSpeaker();
          self.toast_warn("还没录音！！");
        }
      },
      //在评论模块停止听语音
      wxStopListenSpeaker(){
        let self = this;
        if (self.localId != '') {
          self.uploadvoice.isStopPlaySpeaker = false;
          self.uploadvoice.isStartPlaySpeaker = true;
          self.$wx.wxstopVoice(self.localId);
        }
        else {
          self.restartSpeaker();
          self.toast_warn("还没录音！！");
        }
      },
      //在评论列表模块中听语音（停听语止听语音）
      startListenSpeaker(value, id, j){
        var self = this;
        let audio = document.getElementById('myvideo');
        if (!(value.ID == self.commentvoice.lisentid)) {
          for (var i = 0; i < self.commentList.length; i++) {
            self.datareset(self.commentList[i]);
          }
          self.commentvoice.lisentid = id;
          value.talk1 = "talk talk1 fl";
          value.talk2 = "talk talk2 fl";
          value.talk3 = "talk talk3 fl";
          audio.src = value.CommentVoice;
          audio.play();
          audio.loop = false;
          audio.preload = true;
        }
        else {
          audio.pause();
          self.commentvoice.lisentid = 0;
          self.datareset(value);
        }
        audio.addEventListener('ended', function () {
          self.datareset(value);
          self.commentvoice.lisentid = 0;
        }, false);
      },
      //重置录音的uploadvoice参数
      restartSpeaker(){
        var self = this;
        self.uploadvoice.speakertime=0;
        self.uploadvoice.isSpeaker = true;
        self.uploadvoice.isVoice = false;
        self.uploadvoice.iscan = false;
        self.uploadvoice.isPressSpeaker = false;
        self.uploadvoice.isPressingSpeaker = false;
        self.localId = '';
        self.uploadvoice.isStartPlaySpeaker = false;
        self.uploadvoice.isStopPlaySpeaker = false;
        self.uploadvoice.speakerStart = 0;
        self.uploadvoice.speakerEnd = 0;
        self.form.CommentVoice = '';
      },
      //删除评论图片
      delImg(index)
      {
        var self = this;
        self.form.CommentImgList.splice(index, 1);
      },
      //预览图片
      wxpreview(value, valueList){
        var self = this;
        self.$wx.previewImage1(value, valueList)
      },
      //调用jssdk获取本地图片并上传到本地
      wxphoto() {
        var self = this;
        self.$wx.wxmultiupload(function (ret) {
          if (ret.length > 0) {
            self.wxdownloadfile(ret, 1, '.jpg', 'article');
          }
          else {
            self.toast_warn("微信上传失败！！");
          }
        })
      },
      //从腾讯下载到本地
      wxdownloadfile(serverId, isImg, filetype, where){
        var self = this;
        let params = {serverId: serverId, urlWhere: where, filetype: filetype};
        self.$http('/mobile/public/WechatDownLoadImg', params, (ret) => {
          if (ret.status) {
            if (isImg > 0) {
              self.img.isShowWxImg = true;
              for (var i = 0; i < ret.data.length; i++) {
                self.form.CommentImgList.push(ret.data[i]);
              }
            }
            else {
              self.form.CommentVoice = ret.data[0];
            }
          }
          else {
            if (isImg <= 0) {
              self.restartSpeaker();
            }
            self.toast_warn(ret.errmsg);
          }
        })
      },
      //添加评论
      addComment() {
        let self = this;
        self.$wx.wxstopVoice(self.localId);
        if (self.form.CommentImgList.length == 0 && (self.form.Content == '' || self.form.Content == null)
          && (self.form.CommentVoice == '' || self.form.CommentVoice == null)) {
          self.toast_warn("文字语音图片至少填一样！！");
          return false;
        }
        self.form.WxUserID=self.userInfo.ID;
        self.form.CommentImg = self.form.CommentImgList.join(',');
        self.form.ArticleID = this.articleID;
        self.form.CommentVoiceTime = parseInt((self.uploadvoice.speakerEnd - self.uploadvoice.speakerStart) / 1000);
        this.$http('/mobile/comment/articlecomment', self.form, (ret) => {
          if (ret.status) {
            //日期
            var str = ret.data.Created;
            console.log(str);
            var d = eval('new ' + str.substr(1, str.length - 2)); //new Date()
            ret.data.Created = d.Format("yyyy-MM-dd hh:mm:ss");
            if (ret.data.CommentImg != null && ret.data.CommentImg != '') {
              ret.data.CommentImgList = ret.data.CommentImg.split(",");
            }
            else {
              ret.data.CommentImgList = [];
            }
            self.datareset(ret.data);
            ret.data.PraiseCount = 0;
            ret.data.toggle = false;

            self.commentList.unshift(ret.data);

            self.restartSpeaker();
            self.img.isShowWxImg = false;
            self.form.Content = '';
            self.form.CommentImg = '';
            self.form.CommentImgList = [];

          } else {
            this.toast_warn(ret.errmsg);
          }
        })
      },
      //评论列表中动画class重置
      datareset(data){
        data.talk1 = " talk1 fl";
        data.talk2 = " talk2 fl";
        data.talk3 = " talk3 fl";
      },
      //textarea 获取焦点
      setFocus() {
        this.isFocus = true;
      },
      setBlur() {
        this.isFocus = false;
      },
      //初始化评论列表
      initCommentList() {
        let self = this;
        let params = {
          PageSize: self.PageSize,
          PageIndex: self.PageIndex,
          ArticleId: self.$route.params.id,
        }
        self.$http('/mobile/comment/list', params, (ret) => {
          if (ret.status) {
            if (ret.data.PageList.length >= ret.data.TotalItemCount) {
              this.pulldownDisable = true;
            }
            for (var i = 0; i < ret.data.PageList.length; i++) {
              self.datareset(ret.data.PageList[i]);
              //日期
              var str = ret.data.PageList[i].Created;
              var d = eval('new ' + str.substr(1, str.length - 2)); //new Date()
              ret.data.PageList[i].Created = d.Format("yyyy-MM-dd hh:mm:ss");
              if (ret.data.PageList[i].CommentImg != null && ret.data.PageList[i].CommentImg != '') {
                ret.data.PageList[i].CommentImgList = ret.data.PageList[i].CommentImg.split(",");
              }
              else {
                ret.data.PageList[i].CommentImgList = [];
              }
            }
            self.commentList = ret.data.PageList;
            if (self.commentList.length === 0) {
              self.commentList.isShow = !self.commentList.isShow;
              //self.$refs.demo.disablePullup()
            }
          } else {
            self.toast_warn(ret);
          }
        })
      },
      //加载更多评论
      doneLoad(){
        this.initCommentList({PageSize: this.PageSize += 5})
      },
      //点赞和取消点赞
      thumbUp(index) {
        if(this.register==1) {
          let params = {
            commentID: this.commentList[index].ID,
            iscancel: this.commentList[index].toggle,
          };
          this.$http('/mobile/comment/commentpraise', params, (ret) => {
            if (ret.status) {

              this.commentList[index].toggle = !this.commentList[index].toggle;
              if (this.commentList[index].toggle) {
                this.commentList[index].PraiseCount += 1;
              } else {
                this.commentList[index].PraiseCount -= 1;
              }
            } else {
              this.toast_warn(ret.errmsg);
            }
          })
        }
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

  .imgall {
    height: 100%;
    width: 100%;
    display: inline-block
  }

</style>
