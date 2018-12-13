<template>
  <div class="lc-main wrap register">
    <x-header class="white-bottom-none">
      <img class="icon" slot="overwrite-left" src="../../assets/images/register/icon1.png" alt="">
      <span class="title" slot="overwrite-left">注 册</span>
    </x-header>

    <group :model="form.personalInfo" class="form">

      <x-input title="姓名" label-width="74px" raw-value v-model="form.personalInfo.Name" placeholder="请输入您的姓名" name="name" v-validate="'required|name'"
               :show-clear="false"></x-input>
      <i v-show="veeErrors.has('name')" class="fa fa-warning"></i>

      <x-input title="邮箱" label-width="74px" v-model="form.personalInfo.Email" placeholder="请输入您的邮箱" name="email" v-validate="'required|email'"
               :show-clear="false"></x-input>
      <i v-show="veeErrors.has('email')" class="fa fa-warning"></i>

      <popup-picker title="地址" :data="form.data.addressData" v-model="form.data.AddressValue" :columns="2" @on-change="addressChange" placeholder="请选择您的地址"
                    name="address" v-validate="'required'" value-text-align="left"></popup-picker>
      <i v-show="veeErrors.has('address')" class="fa fa-warning"></i>

      <popup-picker title="医院" :data="form.data.hospitalData" v-model="form.data.HospitalValue" placeholder="请先选择地址后再选择医院" value-text-align="left"
                    name="hospital" v-validate="'required'"></popup-picker>
      <i v-show="veeErrors.has('hospital')" class="fa fa-warning"></i>

      <popup-picker title="科室" :data="form.data.departmentData" v-model="form.data.DepartmentValue" placeholder="请选择您的科室" value-text-align="left" name="department"
                    v-validate="'required'"></popup-picker>
      <i v-show="veeErrors.has('department')" class="fa fa-warning"></i>

      <popup-picker title="职称" :data="form.data.Enums.GetList(form.data.Enums.Positions)" v-model="form.data.PositionValue" placeholder="请选择您的职称" value-text-align="left" :columns="1"
                    show-name name="position" v-validate="'required'"></popup-picker>
      <i v-show="veeErrors.has('position')" class="fa fa-warning"></i>

      <!--获取验证码组件-->
      <x-input title="手机号" name="mobile" v-validate="'required|mobile'" label-width="74px" placeholder="请输入您的手机号码" v-model="form.personalInfo.Mobile"
               :show-clear="false" :max="11" @on-change="mobileChange">
      </x-input>
      <i v-show="veeErrors.has('mobile')" class="fa fa-warning"></i>

      <x-input title="验证码" v-model="form.personalInfo.Code" placeholder="请输入验证码" :max="4" :show-clear="false" label-width="74px" type="tel"
               name="code" v-validate="'required|code'">
      </x-input>
      <i v-show="veeErrors.has('code')" class="fa fa-warning code-warning"></i>

      <get-auth-code class="authCode"></get-auth-code>
    </group>

    <div class="pd15 mt20">
      <x-button type="submit" class="Bgblue fontsize15" @click.native="dosave">下一步</x-button>
    </div>
    <div>
      <router-link to="login">
        <div class="regText-color">已有账号？点击登录
          <div class="line"></div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {Group,XInput,XButton,Alert,PopupPicker,XAddress,XHeader} from 'vux'
  import {mapState,mapMutations,mapActions} from 'vuex'
  import {Enums} from '../../common/config/enums'
  import getAuthCode from '../../components/getAuthCode.vue'

  export default {
    components: {
      Group,
      XInput,
      XButton,
      PopupPicker,
      XAddress,
      XHeader,
      getAuthCode
    },
    data() {

      return {
        form: {
          // 表单各项元素的数据源
          data: {
            Enums: Enums, //枚举信息
            addressData: [], //地址数据
            hospitalData: [], //医院数据
            departmentData: [], //科室数据

            HospitalValue: [], //医院列表
            DepartmentValue: [], //科室列表
            AddressValue: [], //地址列表
            PositionValue: [], //职称列表
          },
          // 提交个人信息表单
          personalInfo: {
            ID: 0,
            Name: '',
            Email: '',
            Mobile: '',
            Department: '',
            Province: '',
            City: '',
            Hospital: '',
            Position: '',
            Code: ''
          }
        }
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    mounted() {
      this.getAddressData();
      this.getDepartmentData();
    },
    methods: {
      ...mapActions([
        'changeAccess'
      ]),

      /*
       * 实时更新共享仓库中的mobile便于验证码组件获取手机号码
       * */
      mobileChange(value) {
        this.userInfo.Mobile = value;
      },

      /*
       * 初始化地址;数据结构按照vux(parent为父)联动
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
            self.form.data.addressData = arr;
          }
        })
      },

      /*
       * 初始化医院
       * */
      getHospitalData(params) {
        this.$http('/mobile/hospital/GetHospitals', params, (ret) => {
          if (ret.status) {
            this.form.data.hospitalData.push(ret.data);
          }
        })
      },

      /*
       * 初始化科室
       * */
      getDepartmentData() {
        this.$http('/mobile/hospital/getdepartments', {}, (ret) => {
          if (ret.status) {
            this.form.data.departmentData.push(ret.data);
          }
        })
      },

      /*
       * 地址改变时获取对应的医院
       * @param {Object} params 用户选择的地址信息
       * */
      addressChange(value) {
        this.form.HospitalValue = [];
        let params = {
          Province: value[0],
          City: value[1]
        }
        this.form.personalInfo.Province = value[0];
        this.form.personalInfo.City = value[1];
        this.form.data.hospitalData = [];
        this.getHospitalData(params);
      },


      /*
       * 保存注册个人信息(替换全局个人信息)
       * */
      dosave() {
        this.$validator.validateAll().then((result) => {
          if (!result) {
            this.alert.show('请完善信息');
            return false
          }
          // 获取全局个人信息的ID并赋值给当前用户的ID
          this.form.personalInfo.ID = this.userInfo.ID;

          // 数组转化为字符串
          this.form.personalInfo.Department = this.form.data.DepartmentValue.toString();
          this.form.personalInfo.Hospital = this.form.data.HospitalValue.toString();
          this.form.personalInfo.Position = Number(this.form.data.PositionValue[0]);

          this.$http('/mobile/api/register', this.form.personalInfo, (ret) => {
            if (ret.status) {
              // 返回全局个人信息 替换为刚注册成功的全局个人信息
              let userInfo = ret.data;
              this.changeAccess({
                register: userInfo.Status,
                userInfo: userInfo
              })
              this.$router.push({
                path: '/'
              })
            }else {
              this.alert.show(ret.errmsg);
            }
          })
        })

      }
    }
  }

</script>
