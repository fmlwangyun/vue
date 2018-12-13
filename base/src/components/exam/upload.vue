<template>
  <section class="user-upload-wrap clearfix">
    <ul class="img-list clearfix">
      <li  v-for="(image,index) in imgList">
        <img :src="image" alt="" >
      </li>
    </ul>
    <div v-if="!disabled" class="upload-btn" @click="wxphoto()"></div>
  </section>
</template>
<script>

  export default{
    props:{
      index:{default:0,type:Number},
      item:{default:{},type:Object},
      disabled:{default:false,type:Boolean},
    },
    data(){
      return{
        imgList:[],
      }
    },
    created(){
      if(this.item.Answer) {
        if (this.item.Answer.OptionValue)
          this.imgList = JSON.parse(this.item.Answer.OptionValue);
      }
    },
    methods:{
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
              for (var i = 0; i < ret.data.length; i++) {
                JSON.parse(self.item.Answer.OptionValue).push(ret.data[i]);
              }
            self.item.Answer.OptionValue=JSON.stringify(self.item.Answer.OptionValue);
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
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">

  //上传
  .user-upload-wrap {
    padding:0 10px 5px 10px;
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
      margin: 5px;
      width: 58px;
      height: 58px;
      border: 1px solid #d9d9d9;
      &:before {
        content: " ";
        position: absolute;
        width: 2px;
        height: 39.5px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #d9d9d9;
      }
      &:after {
        content: " ";
        position: absolute;
        width: 39.5px;
        height: 2px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #d9d9d9;
      }
    }
  }

</style>
