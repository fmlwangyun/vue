import Vue from "vue";
import VeeValidate, {Validator} from "vee-validate";
import zh from "vee-validate/dist/locale/zh_CN"; //引入中文文件

import regExp from './regExp.js'

// 配置中文
// Validator.addLocale(zh);

// 自定义validate
const dictionary = {
  zh_CN: {
    messages: {
      email: () => "请输入正确的邮箱格式",
      required: field => " "
    },
    attributes: {
      // email: "邮箱",
      // // name: "姓名",
      // mobile: "手机号码",
      // address: "地址",
      // hospital: "医院",
      // department: "科室",
      // position: "职称",
      // code: "验证码",
      // license: "执业证号"
    }
  }
};
const config = {
  errorBagName: "veeErrors", // change if property conflicts
  dictionary: dictionary,
  locale: "zh_CN"
};
Vue.use(VeeValidate, config);

Validator.extend("mobile", {
  getMessage: field => " ",
  validate: value => {
    return (
      regExp.phone.regexp.test(value) && /^[0-9]*$/.test(value)
    );
  }
});

Validator.extend("name", {
  getMessage: field => " ",
  validate: value => {
    return (
      regExp.nameNE.regexp.test(value) && !/^[0-9]*$/.test(value)
    );
  }
});

Validator.extend("code", {
  getMessage: field => " ",
  validate: value => {
    return /^[0-9]*$/.test(value) && /^\d{4}$/.test(value);
  }
});

Validator.extend("license", {
  getMessage: field => " ",
  validate: value => {
    return regExp.license.regexp.test(value);
  }
});
