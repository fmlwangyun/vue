/**
 * Created by zhaoxiaoyun on 2018/4/16.
 */
import Vue from 'vue'
Vue.prototype.alert = [];
Vue.prototype.alert.show = function (content) {
  Vue.$vux.alert.show({
    title: '提示',
    content: content
  })
};
Vue.prototype.alert.show2 = function (title, content, buttonText, onshowcallback, onhidecallback) {
  Vue.$vux.alert.show({
    title: title,
    content: content,
    buttonText: buttonText,
    onShow: onshowcallback || function () {
      console.log('Plugin: I\'m showing')
    },
    onHide: onhidecallback || function () {
      console.log('Plugin: I\'m hiding')
    }
  })
};
Vue.prototype.alert.hide = function (text) {
  Vue.$vux.alert.hide();
};
