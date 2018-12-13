let wxApi = {}

wxApi.install = function (Vue, options) {
  var UrlEncode;
  UrlEncode = function (str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
  };

  var wx_debug = true;
  var wx_backurl = UrlEncode(window.location.href.split('#')[0]);

  document.write('<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"><\/script>');
  //1. 使用框架自带的jssdk
  document.write('<script type="text/javascript" src="http://vue.rndmed.com/JavaScript/jsconfig?debug=' + wx_debug + '&url=' + wx_backurl + ' "><\/script>');

  //2. 接入紫微星jssdk
  var key='这里是测试号的key';//测试号
  //var key='这里是正式号的key';//正式号
  // document.write('<script type="text/javascript" src="http://open.vhdong.com/api/config.js?key=' + key + '&debug=' + wx_debug + '&url=' + wx_backurl + ' "><\/script>');

  /* 隐藏右上角菜单接口 */
  // function hideOptionMenu() {
  //   if (typeof wx == "undefined") return false;
  //   wx.hideOptionMenu();
  // }

  //微信分享等按钮隐藏
  // document.write("<script type='text/javascript'>wx.ready(function () { hideOptionMenu(); });<\/script>");

  Vue.prototype.$wx = {
    /* 上传单张图片 */
    wxsolaupload: function (callback) {
      this.chooseImage(function (res) {
        var localIds = res.localIds.toString();
        if (localIds.indexOf(",") != -1) {
          return;
        }
        wx.uploadImage({
          localId: localIds,
          isShowProgressTips: 1,
          success: function (resoure) {
            callback(resoure.serverId);
          },
          fail: function (resoure) {
            layer.alert("上传失败请重试！！");
          }
        });
      });
    },


    /* 拍照或从手机相册中选图接口 */
    /* 返回选定照片的本地ID列表，localIds可以作为img标签的src属性显示图片 */
    chooseImage: function (callback) {
      if (typeof wx == "undefined") return false;
      wx.chooseImage({
        success: function (res) {
          callback(res);
          var localIds = res.localIds;
        }
      });
    },
    /* 上传多张图片 */
    wxmultiupload: function (callback) {
      this.chooseImage(function (res) {
        var localIds = res.localIds.toString().split(",");
        if (localIds.length > 0) {
          var serverId = [];
          var i = 0;

          function upload() {
            wx.uploadImage({
              localId: localIds[i],
              isShowProgressTips: 1,
              success: function (resoure) {
                serverId.push(resoure.serverId);
                i++;
                if (i < localIds.length) {
                  upload();
                } else {
                  callback(serverId);
                }
              },
              fail: function (resoure) {
                upload();
                //callback(false,"微信上传失败！！");
                // console.log('wxmultiupload.chooseImage.uploadImage.fail: ' + JSON.stringify(resoure));
              }
            });
          };
          upload();


        }
      });
    },

    /* 显示右上角菜单接口 */
    showOptionMenu: function () {
      if (typeof wx == "undefined") return false;
      wx.showOptionMenu();
    },

    /* 关闭当前网页窗口接口 */
    closeWindow: function () {
      if (typeof wx == "undefined") {
        window.close();
      } else {
        wx.closeWindow();
      }
    },

    /* 批量隐藏功能按钮接口 */
    hideMenuItems: function (array) {
      if (typeof wx == "undefined") return false;

      wx.hideMenuItems({
        menuList: array // 要隐藏的菜单项，所有menu项见附录3
      });
    },

    /* 批量显示功能按钮接口 */
    showMenuItems: function (array) {
      if (typeof wx == "undefined") return false;

      wx.showMenuItems({
        menuList: array // 要显示的菜单项，所有menu项见附录3
      });
    },

    /* 隐藏所有非基础按钮接口 */
    hideAllNonBaseMenuItem: function () {
      if (typeof wx == "undefined") return false;

      wx.hideAllNonBaseMenuItem();
    },

    /* 显示所有功能按钮接口 */
    showAllNonBaseMenuItem: function () {
      if (typeof wx == "undefined") return false;

      wx.showAllNonBaseMenuItem();
    },

    /* 获取网络状态接口 */

    /* 返回网络类型2g，3g，4g，wifi */
    getNetworkType: function () {
      if (typeof wx == "undefined") return false;

      wx.getNetworkType({
        success: function (res) {
          return res.networkType;
        }
      });
    },

    /* 上传图片接口 */
    /* localId: 需要上传的图片的本地ID，由chooseImage接口获得 */
    /* isShowProgressTips: 默认为1，显示进度提示 */
    /* serverId: 返回图片的服务器端ID */

    /* 返回图片的服务器端ID */
    uploadImage: function (localId, isShowProgressTips) {
      if (typeof wx == "undefined") return false;

      wx.uploadImage({
        localId: localId,
        isShowProgressTips: isShowProgressTips,
        success: function (res) {
          var serverId = res.serverId;
        }
      });
    },

    /* 预览图片接口 */
    /* current: 当前显示的图片链接 */

    /* urls: 需要预览的图片链接列表 */
    previewImage1: function (current, urls) {
      if (typeof wx == "undefined") return false;

      wx.previewImage({
        current: current,
        urls: urls
      });
    },

    //图片预览
    previewImage: function (url, urls) {
      if (!url) {
        urls = urls || [];
        var s = document.getElementsByTagName('img');
        for (var i = s.length - 1; i >= 0; i--) {
          urls.unshift(s[i].src);
          s[i].onclick = function () {
            previewImage(this.src, urls);
          }
        }
      } else {
        wx.previewImage({
          current: url,
          urls: urls
        });
      }
    },

    /* 验证是否为远程地址 */
    isRemoteURL: function (url) {
      var strRegex = "^((https|http)?://)";
      var re = new RegExp(strRegex);
      return re.test(url);
    },

    scanQRCode: function (need, callback) {
      wx.scanQRCode({
        needResult: need ? need : 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          //var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          if (callback) callback(res);
        }, fail: function (resoure) {
          // alert(JSON.stringify(resoure));
        }
      });
    },

    share: function (o) {
      var a = o || {},
        t = document.title,
        h = location.href,
        d = new Date(),
        s = document.getElementsByTagName('img');

      var title = (a.title || t),
        desc = (a.desc || ''),
        link = (a.link || h),
        imgUrl = (a.imgUrl || "");

      //默认第一张图片
      if (!a.imgUrl && s.length > 0) a.imgUrl = s[0].src;

      //分享给朋友
      wx.onMenuShareAppMessage({
        title: title,// 分享标题
        desc: desc,// 分享描述
        link: link,// 分享链接
        imgUrl: imgUrl,// 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });

      //分享到朋友圈
      wx.onMenuShareTimeline({
        title: title,// 分享标题
        desc: desc,// 分享描述
        link: link,// 分享链接
        imgUrl: imgUrl,// 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });

      //分享到QQ
      wx.onMenuShareQQ({
        title: title,// 分享标题
        desc: desc,// 分享描述
        link: link,// 分享链接
        imgUrl: imgUrl,// 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
      //分享到微博
      wx.onMenuShareWeibo({
        title: title,// 分享标题
        desc: desc,// 分享描述
        link: link,// 分享链接
        imgUrl: imgUrl,// 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
    },

    //获取url中的参数
    getUrlParam: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    },
    //开始录音
    wxstartRecord: function (callback) {
      wx.startRecord(
        {
          success: function () {
            callback(true,'');
          },
          fail:function () {
            callback(false,'录音失败！！');
          },
          cancel: function () {
            callback(false,'用户拒绝授权录音！！');
          }
        }

      );
    },
    //停止录音接口
    wxstopRecord: function (callback) {
      wx.stopRecord({
        success: function (res) {
          callback(true,res.localId);
          //var localId = res.localId;
        },
        fail: function (res) {
          callback(false,"微信停止录音失败");
        }

      });
    },
    //监听录音自动停止接口
    wxonVoiceRecordEnd: function (callback) {
      wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
          callback(true,res.localId);
        },
        fail: function (res) {
          callback(false,"微信自动停止录音失败");
        }
      });
    },
    //播放语音接口
    wxplayVoice: function (localId) {
      wx.playVoice({
        localId: localId
      });
    },
    //暂停播放接口
    wxpauseVoice: function (localId) {
      wx.pauseVoice({
        localId: localId // 需要暂停的音频的本地ID，由stopRecord接口获得
      });
    },
    // 语音自动停止播放接口
    wxonVoicePlayEnd: function (callback) {
      wx.onVoicePlayEnd({
        success: function (res) {
          callback(res)
        },
        fail: function (res) {
          callback("微信语音自动停止播放失败！！");
        }
      });
    },
    // 停止播放接口
    wxstopVoice: function (localId) {
      wx.stopVoice({
        localId: localId // 需要停止的音频的本地ID，由stopRecord接口获得
      });
    },
    //上传语音接口
    wxuploadVoice: function (localId,callback) {
      wx.uploadVoice({
        localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          callback(true,res.serverId);
          //var serverId = res.serverId; // 返回音频的服务器端ID
        },
        fail: function (res) {
          callback(false,"微信接口上传语音失败！！");
        }
      });
    },
    //隐藏右上角菜单接口
    hideOptionMenu:function(){
      if (typeof wx == "undefined") return false;
        wx.hideOptionMenu();
    }
  }
}

export default wxApi
