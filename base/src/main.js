// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import FastClick from 'fastclick'
import App from './App'

//字体
import 'font-awesome/css/font-awesome.min.css';
//样式
import './styles/base.less'
//插件
import {LoadingPlugin, ToastPlugin, AlertPlugin} from 'vux'
import  './common/vux/toast';
import  './common/vux/alert';
import WxApi from './common/utils/wxApi'
import  './common/utils/date';

// 验证
import './common/utils/validate.js';
import Util from './common/utils/storage';
import {Enums} from './common/config/enums'

import underscore from 'underscore';
Vue.prototype._ = underscore;
Vue.prototype._.extendOwnPrototies = function (destination, sources) {
  for (var p in sources) {
    if (sources.hasOwnProperty(p) && destination.hasOwnProperty(p))
      destination[p] = sources[p];
  }
};

Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)

// Vue.use(WxApi)
Vue.use(require('vue-wechat-title'))

FastClick.attach(document.body)

Vue.config.productionTip = false

/*
 * @synopsis 将axios绑定到Vue对象的原型链上
 * @param {String} url 地址
 * @param {Object} params 参数
 * @param {Function} callback 回调函数
 * @param {String} method 请求方式
 * */
Vue.prototype.$http = function (url, params, callback, method = 'post') {
  if (typeof callback !== 'function') {
    return;
  }
  let config = {};
  config['method'] = method;

  config['url'] = url;
  if (method == 'post') {
    config['data'] = params;
  } else if (method == 'get') {
    config['params'] = params;
  }
  axios(config)
    .then((res) => {
      callback(res.data)
    })
    .catch((error) => {
      callback(error)
    });
}

/*
 * @synopsis 路由钩子
 * */
router.beforeEach(function (to, from, next) {
  Vue.$vux.loading.show()
  let lp = (Util.getStore('lastPath') || undefined);
  if (typeof(Util.getStore('lastNum')) == "undefined") {
    Util.setStore('lastNum', 0);
  }

  let i = 0;
  if (!store.state.login) {
    Util.setStore('lastNum', parseInt(Util.getStore('lastNum') + 1));
    Vue.prototype.$http('/mobile/api/getuser', to.query, (ret) => {
      if (ret.status) {
        let userInfo = ret.data;
        store.dispatch('changeAccess', {register: userInfo.Status, userInfo: userInfo})
        if (userInfo.IsSign) {
          store.commit('updateCheckin', {checkin: userInfo.IsSign})
        }
        //todo: 重构以下验证逻辑1
        //页面有权限要求  用户没注册则进入注册界面
        if (userInfo.Status == Enums.WechatUserStatus.None.Value && (to.meta.auth || to.path == "/register")) {
          router.replace({path: '/register', query: to.query});
        }
        else {
          //记录最新页面的链接
          if (to.path != "/register" || lp == null || (typeof(lp) == "undefined")) {
            Util.setStore('lastPath', to.path);
            lp = to.path;
          }
          //是否是刷新
          if (to.path == "/register" && (typeof(lp) != "undefined") && lp != "/register") {
            nextRouter(to, from, next, lp)
          } else {
            nextRouter(to, from, next, to.path)
          }
        }
      } else {
        Vue.prototype.toast_warn(ret.errmsg);
      }
    })
  }
  else {
    //todo: 重构以下验证逻辑2
    //页面有权限要求  用户没注册则进入注册界面
    if (store.state.register == 0 && to.meta.auth && to.path != "/register") {
      router.replace({path: '/register', query: to.query});
    }
    else {
      //是否是刷新
      if (to.path == "/register" && (typeof(lp) != "undefined") && lp != '/register' && Util.getStore('lastNum') < 1) {
        Vue.$vux.loading.hide();
        nextRouter(to, from, next, lp)
      } else {
        nextRouter(to, from, next, to.path)
      }
    }
  }
})

//封装公用方法
function nextRouter(to, from, next, toPath) {
  console.log(to)
  console.log(toPath)
  console.log('--------------------')
  let parentRoute = toPath.indexOf('/', 1);
  let path = parentRoute > -1 ? toPath.substr(0, parentRoute) : toPath;
  store.commit('updateShowTab', {showTab: !to.meta.hideTab});

  let tabIndex = store.state.tabs.findIndex(function (a, b) {
    return a.link == path;
  });
  store.commit('updateTab', {selectedTab: tabIndex});

  //todo: 重构以下验证逻辑3
  //判断to.path与真正跳转的页面是否相同
  if (toPath != to.path && to.path != '/register') {
    Vue.$vux.loading.hide()
    router.replace({path: toPath, query: to.query});
    next(toPath);
  }
  else {
    next();
  }
}
router.afterEach(function (to) {
  Vue.$vux.loading.hide()
  Vue.$vux.alert.hide()
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
