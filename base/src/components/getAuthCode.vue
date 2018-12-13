<template>
  <div>
    <x-button :disabled="page.disabled" @click.native="getAuthCode" slot="right" type="primary"
              class="fontsize15 btn-min-w Bgblue colorfea06c">{{ page.registNumTxt }}
    </x-button>
  </div>
</template>

<script>
  import {XButton} from 'vux'
  import regExp from '../common/utils/regExp.js'
  import {mapState, mapMutations, mapActions} from 'vuex'
  export default {
    components: {
      XButton
    },
    data() {
      return {
        page: {
          disabled: false,
          registNumTxt: '发送验证码', // 验证码文字
        }
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    mounted() {

    },
    methods: {
      /*
       * 获取验证码
       * @param {Object} params 用户输入的验证码
       * */
      getAuthCode() {
        //todo: 为什么不用VeeValidate
        if (!regExp.phone.regexp.test(this.userInfo.Mobile)) {
          this.alert.show('手机号码错误');
          return false
        }

        let params = {
          mobile: this.userInfo.Mobile
        };
        this.$http('/mobile/api/SendAuthCode', params, (ret) => {
          if (ret.status) {
            this.alert.show(ret.data);
          }
        })
        let num = 30;
        let _this = this;
        this.page.disabled = true;
        this.page.registNumTxt = '30s';
        this.timer = setInterval(function () {
          if (num > 0) {
            num--;
            _this.page.registNumTxt = `${num}s`;
          } else {
            _this.page.disabled = false;
            _this.page.registNumTxt = '重新获取'
            clearInterval(_this.timer)
          }
        }, 1000)
      }
    }
  }

</script>
