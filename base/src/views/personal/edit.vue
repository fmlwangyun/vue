<template>
  <div class="lc-main wrap modifyInfor">
    <x-header class="white-bottom-none">
      <img class="icon" slot="overwrite-left" src="../../assets/images/register/icon1.png" alt="">
      <span class="title" slot="overwrite-left">个人信息</span>
    </x-header>

    <p class="fontsize15 personTip">上传医师资格证/执业证/胸卡 <span class="red">*</span></p>

    <div class="wxphoto_warp">
      <div class="wxphoto_box">
        <img class="cameraPng" @click="wxphoto()" src="../../assets/images/register/camera.png"
             v-if="page.photo.isShowImg" alt="">

        <img :src="page.personalInfo.LicenseImgUrl" @click="wxpreview()" v-if="!page.photo.isShowImg"
             class="licenseImgUrl" alt="">

        <div class="photoColor" v-if="page.photo.isShowImg">上传照片</div>

        <div class="photoColor" @click="wxphoto()" v-if="!page.photo.isShowImg">重新上传照片</div>

        <div @click="delphoto()" v-if="!page.photo.isShowImg" class="delphoto">
          <img src="../../assets/images/register/del.png" alt="" class="imgall">
        </div>

      </div>
    </div>
    <group :model="page.personalInfo">
      <x-input title="姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名" label-width="100px" v-model="page.personalInfo.Name"
               name="name" v-validate="'required|name'" :show-clear="false"></x-input>
      <i v-show="veeErrors.has('name')" class="fa fa-warning"></i>

      <x-input title="执业证号" keyboard="number" label-width="100px" :max="27" v-model="page.personalInfo.License"
               name="license" v-validate="'required|license'" :show-clear="false"></x-input>
      <i v-show="veeErrors.has('license')" class="fa fa-warning"></i>

      <popup-picker title="所在地址" :data="page.data.addressData" v-model="page.data.AddressValue" :columns="2"
                    @on-change="addressChange" value-text-align="left"
                    name="address" v-validate="'required'"></popup-picker>
      <i v-show="veeErrors.has('address')" class="fa fa-warning"></i>

      <popup-picker title="所在医院" :data="page.data.hospitalData" v-model="page.data.HospitalValue"
                    value-text-align="left" name="hospital" v-validate="'required'"></popup-picker>
      <i v-show="veeErrors.has('hospital')" class="fa fa-warning"></i>

      <popup-picker title="所在科室" :data="page.data.departmentData" v-model="page.data.DepartmentValue"
                    value-text-align="left" name="department" v-validate="'required'"></popup-picker>
      <i v-show="veeErrors.has('department')" class="fa fa-warning"></i>

      <popup-picker title="职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称"
                    :data="page.data.Enums.GetList(page.data.Enums.Positions)" v-model="page.data.PositionValue"
                    placeholder="请选择您的职称"
                    value-text-align="left" :columns="1" show-name name="position"
                    v-validate="'required'"></popup-picker>
      <i v-show="veeErrors.has('position')" class="fa fa-warning"></i>

      <x-input title="邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱" label-width="100px"
               v-model="page.personalInfo.Email"
               name="email" v-validate="'required|email'" :show-clear="false"></x-input>
      <i v-show="veeErrors.has('email')" class="fa fa-warning"></i>

    </group>
    <div class="pd15">
      <x-button type="primary" class="Bgblue fontsize15" @click.native="dosave">确 认</x-button>
    </div>
  </div>
</template>

<script>
  import {Group, XInput, XButton, PopupPicker, XAddress, XHeader} from 'vux'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {Enums} from '../../common/config/enums'

  export default {
    components: {
      Group,
      XInput,
      XButton,
      PopupPicker,
      XAddress,
      XHeader
    },
    data() {
      return {
        page: {
          // 表单各项元素的数据源
          data: {
            hospitalData: [], //医院数据
            departmentData: [], //科室数据
            addressData: [], //地址数据
            Enums: Enums, //枚举信息
            AddressValue: [], //地址列表
            HospitalValue: [], //医院列表
            DepartmentValue: [], //科室列表
            PositionValue: [], //职称列表
          },

          // 头像区域
          photo: {
            isShowImg: true, //默认上传的图片
          },

          personalInfo: {
            ID: 0,
            Name: '',
            LicenseImgUrl: '',
            Email: '',
            License: '',
            Province: '',
            City: '',
            Hospital: '',
            Position: '',
            Department: ''
          }
        }
      }
    },
    mounted() {
      this.initPage(this.userInfo);
      console.log('m111111')
      console.log(this.page.data.Enums.Positions);
      console.log(this.page.data.Enums.GetList(this.page.data.Enums.Positions));
      console.log('m222222')
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    methods: {
      ...mapActions([
        'changeAccess'
      ]),

      /*
       * 获取全局个人信息页面初始化
       * */
      initPage(arg) {
        if (arg.LicenseImgUrl != null && arg.LicenseImgUrl != undefined && arg.LicenseImgUrl != '') {
          this.page.photo.isShowImg = false;
        }
        console.log('this is personal edit:::initPage');
        console.log(arg)
        console.log(this.page.personalInfo)
        this._.extendOwnPrototies(this.page.personalInfo, arg);
        this.page.data.AddressValue.push(arg.Province, arg.City);
        this.page.data.HospitalValue.push(arg.Hospital);
        this.page.data.PositionValue.push(arg.Position.toString());
        this.page.data.DepartmentValue.push(arg.Department);
        this.getAddressData();
        this.getDepartmentData();
      },

      /*
       * 初始化地址,数据结构按照vux(parent为父)联动
       * */
      getAddressData() {
        let self = this;
        self.$http('/mobile/hospital/GetProvinces', {}, (ret) => {
          if (ret.status) {
            var arr = ret.data;
            self._.each(self._.where(arr, {
              parent: "0"
            }), function (item, idx) {
              item.parent = 0;
            });
            self.page.data.addressData = arr;
          }
        })
      },

      /*
       * 初始化医院
       * */
      getHospitalData(params) {
        this.$http('/mobile/hospital/GetHospitals', params, (ret) => {
          if (ret.status) {
            this.page.data.hospitalData.push(ret.data);
          }
        })
      },

      /*
       * 初始化科室
       * */
      getDepartmentData() {
        this.$http('/mobile/hospital/getdepartments', {}, (ret) => {
          if (ret.status) {
            this.page.data.departmentData.push(ret.data);
          }
        })
      },

      /*
       * 调用jssdk获取本地图片
       * */
      wxphoto() {
        var self = this;
        self.$wx.wxmultiupload(function (ret) {
          if (ret.length > 1) {
            self.alert.show('一次只能上传一张图片');
            return false;
          }
          if (ret.length == 1) {
            self.wxdownloadImage(ret);
          } else {
            self.alert.show('微信上传失败');
          }
        })
      },

      // 预览图片
      wxpreview() {
        var self = this;
        self.$wx.previewImage1(self.page.personalInfo.LicenseImgUrl, [self.page.personalInfo.LicenseImgUrl]);
      },

      // 删除图片
      delphoto() {
        this.page.personalInfo.LicenseImgUrl = '';
        this.page.photo.isShowImg = true;
      },

      // 下载图片
      wxdownloadImage(serverId) {
        var self = this;
        let params = {
          serverId: serverId,
          urlWhere: 'userimg',
          filetype: '.jpg'
        };
        self.$http('/mobile/public/WechatDownLoadImg', params, (ret) => {
          if (ret.status) {
            self.page.photo.isShowImg = false;
            self.page.personalInfo.LicenseImgUrl = ret.data[0];
          } else {
            self.alert.show(ret.errmsg);
          }
        })
      },

      /*
       * 由于职称是枚举 用这个方法方便获取 ids == 枚举value
       * */
      positionsShadowChange(id, name) {
        this.page.personalInfo.Position = id;
      },
      /*
       * @synopsis 地址改变时获取对应的医院
       * @param {Object} params 用户选择的地址信息
       * */
      addressChange(value) {
        this.page.data.HospitalValue = [];
        let params = {
          Province: value[0],
          City: value[1]
        }
        this.page.personalInfo.Province = value[0];
        this.page.personalInfo.City = value[1];
        this.page.data.hospitalData = [];
        this.getHospitalData(params);
      },

      /*
       * @synopsis 修改个人信息(替换全局个人信息)
       * @param {Object} this.page.personalInfo 用户输入的个人信息
       * */
      dosave() {

        this.$validator.validateAll().then((result) => {
          if (!result) {
            this.alert.show('请完善信息');
            return false
          }
          // 获取全局个人信息的ID并赋值给当前用户的ID
          this.page.personalInfo.ID = this.userInfo.ID;
          // 数组转化为字符串
          this.page.personalInfo.Department = this.page.data.DepartmentValue.toString();
          this.page.personalInfo.Hospital = this.page.data.HospitalValue.toString();

          this.page.personalInfo.Position = Number(this.page.data.PositionValue[0]);
          this.$http('/mobile/user/Save', this.page.personalInfo, (ret) => {
            if (ret.status) {
              // 返回全局个人信息 替换为刚注册成功的全局个人信息
              let userInfo = ret.data;
              if (userInfo) {
                this.changeAccess({register: userInfo.Status, userInfo: userInfo});
              }
              this.$router.push({path: '/personal'});
            } else {
              this.alert.show(ret.errmsg);
            }
          })
        });
      }
    }
  }

</script>

<style scoped lang="less">
  .lc-main {
    .personTip {
      display: block;
      padding: 10px 15px;
      background-color: #fff;
      border-bottom: 1px solid #D9D9D9;
      border-top: 1px solid #D9D9D9;
      color: #999;
      .red {
        color: red;
      }
    }
    .wxphoto_warp {
      width: 100%;
      height: 280px;
      position: relative;
      background-color: #fff;
      text-align: center;
      .wxphoto_box {
        width: 200px;
        height: 150px;
        border: 1px dashed deepskyblue;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .photoColor {
          color: #1094fa;
        }
        .cameraPng {
          width: 50px;
          height: 50px;
          margin-top: 30px;
        }
      }
    }
  }

  .imgall {
    height: 100%;
    width: 100%;
    display: inline-block
  }

  .licenseImgUrl {
    width: 200px;
    height: 150px;
  }

  .delphoto {
    width: 30px;
    height: auto;
    z-index: 99999;
    margin-top: -190px;
    margin-left: 180px;
  }

</style>
