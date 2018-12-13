/**
 * Created by mark on 2017/8/14
 */
export default {
  name: {
    name: '姓名', regexp: /^[A-Za-z\u4e00-\u9fa5][\w\._-]{0,44}$/
  },
  chinesename: {
    name: '姓名', regexp: /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/
  },
  code:{"name":'编号',regexp:/^[0-9]*$/},
  username: {
    name: '用户名', regexp: /^[A-Za-z][\w\._-]{0,44}$/
  },
  // 中英文
  nameNE: {
    name: '姓名', regexp: /^[\u4e00-\u9fa5]{2,4}$|^[\dA-Za-z_]{1,10}$/
  },
  password: {//6--18位的数字和字母组合
    name: '密码', regexp: /^(?:\d+|[a-zA-Z]+){6,18}$/
  },
  routerURL: {//格式如：/abc/cba
    name: 'API-UR／页面URL', regexp: /^\/\w+\/?\w*$/
  },
  phone: {
    name: '手机号码', regexp: /^[1]([3|5|8|7|9|4][0-9]{1}|70|73|75|76|77|78|45|47|49)[0-9]{8}$/
  },
  number: {
    name: '数字', regexp: /^[0-9]*$/
  },
  email: {
    name: '邮箱', regexp: /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/
  },
  postcode: {
    name: '邮编', regexp: /^[1-9][0-9]{5}$/
  },
  date: {
    name: '日期', regexp: /^[0-9]{4}[-/.][0-9]{2}[-/.][0-9]{2}$/
  },
  license: {
    name: '执业证号', regexp: /^\d{24}|\d{}27$/
  },
  string_1_10: {
    name: '1-10位字符', regexp: /^.{1,10}$/
  },
  number_gt_0: {
    name: '大于0数字', regexp: /^[1-9][0-9]*$/
  },
  number_in_01: {
    name: '数字0或1', regexp: /^[01]$/
  },
  number_in_4: {
    name: '数字4位以内', regexp: /^[0-9]{1,4}$/
  }
};

