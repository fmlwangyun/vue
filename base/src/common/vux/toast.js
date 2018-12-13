/**
 * Created by zhaoxiaoyun on 2017/12/26.
 */

import Vue from 'vue'
Vue.prototype.toast_show = function (text) {
  Vue.$vux.toast.show({
    text: text,
    type: 'text'
  })
};
Vue.prototype.toast_warn = function (text) {
  Vue.$vux.toast.show({
    text: text,
    type: 'warn',
    time: 3000//默认显示时间
  })
};
Vue.prototype.toast_warn_time = function (text,time) {
  Vue.$vux.toast.show({
    text: text,
    type: 'warn',
    time: time//默认显示时间
  })
};
Vue.prototype.toast_success = function (text) {
  Vue.$vux.toast.show({
    text: text,
    type: 'success'
  })
};
Vue.prototype.toast_cancel = function (text) {
  Vue.$vux.toast.show({
    text: text,
    type: 'cancel'
  })
};
