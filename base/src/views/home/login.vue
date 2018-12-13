<template>
  <div class="lc-main wrap login">
    <x-header class="white-bottom-none">
      <img class="icon" slot="overwrite-left" src="../../assets/images/register/icon1.png" alt="">
      <span class="title" slot="overwrite-left">登 录</span>
    </x-header>

    <group :model="page.personalInfo" class="form">

      <!--获取验证码组件-->
      <x-input title="手机号" label-width="74px" placeholder="请输入您的手机号码" keyboard="number" :max="11"
               v-model="page.personalInfo.Mobile" class="mobile"
               @on-change="mobileChange" :show-clear="false" name="mobile" v-validate="'required|mobile'">
      </x-input>
      <i v-show="veeErrors.has('mobile')" class="fa fa-warning"></i>

      <x-input title="验证码" v-model="page.personalInfo.Code" placeholder="请输入验证码" :max="6" :show-clear="false"
               label-width="74px" type="tel"
               name="code" v-validate="'required|code'">
      </x-input>
      <i v-show="veeErrors.has('code')" class="fa fa-warning code-warning"></i>

      <get-auth-code class="authCode"></get-auth-code>
    </group>
    <div class="pd15 mt20">
      <x-button type="primary" class="Bgblue fontsize15" @click.native="dosave">登 录</x-button>
    </div>

    <div>
      <router-link to="register">
        <div class="regText-color">没有账号？点击注册
          <div class="line"></div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {Group, XInput, XButton, Cell, XHeader} from 'vux'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import getAuthCode from '../../components/getAuthCode.vue'

  export default {
    components: {
      Cell,
      Group,
      XInput,
      XButton,
      XHeader,
      getAuthCode
    },
    data() {
      return {
        page: {
          personalInfo: {
            Mobile: '',
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
    methods: {

      /*
       * 实时更新共享仓库中的mobile便于验证码组件获取手机号码
       * */
      mobileChange(value) {
        this.userInfo.Mobile = value
      },

      /*
       * @synopsis 保存登录个人信息(替换全局个人信息)
       * */
      dosave() {

        this.$validator.validateAll().then((result) => {
          if (!result) {
            this.alert.show('请完善信息');
            return false
          }
          this.page.personalInfo.OpenID = this.userInfo.OpenID;
          this.$http('/mobile/user/wechatlogon', this.page.personalInfo, (ret) => {
            if (ret.status) {
              this.$router.push({
                path: '/home'
              })
            } else {
              this.alert.show(ret.errmsg);
            }
          })
        })
      }
    }
  }

</script>
