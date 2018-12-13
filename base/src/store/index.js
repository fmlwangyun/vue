/**
 * Created by mark on 2017/9/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  //全局变量状态
  state: {
    login: false,
    //用户信息
    userInfo: null,
    //是否注册
    register: 0,
    //是否签到
    checkin: false,
    tabs: [
      {
        name: 'home',
        label: '首页',
        icon: '/vue-mobile/img/home/t-home.svg',
        link: '/home'
      }, {
        name: 'personal',
        label: '个人中心',
        icon: '/vue-mobile/img/home/t-personal.svg',
        link: '/personal',
      }, {
        name: 'activity',
        label: '最新活动',
        icon: '/vue-mobile/img/home/t-activity.png',
        link: '/activity',
      }, {
        name: 'academic',
        label: '学术资讯',
        icon: '/vue-mobile/img/home/t-academic.svg',
        link: '/academic',
      }, {
        name: 'rostrum',
        label: '专家讲坛',
        icon: '/vue-mobile/img/home/t-rostrum.svg',
        link: '/rostrum',
      }
    ],
    //底部导航状态
    showTab: false,
    //首页签到&注册提示弹窗状态
    homeconfirm: true,
    //底部tab状态
    selectedTab: 0,
    //购物车数据
    shoppingList: []
  },
  //state派生出一些状态
  getters: {},
  //更改 Vuex 的 store 中的状态
  mutations: {
    //记录用户信息
    recordUserInfo(state, payload){
      state.login = true
      state.userInfo = payload.userInfo
    },
    //更新底部导航显示状态
    updateShowTab (state, payload) {
      state.showTab = payload.showTab
    },
    //更新首页注册&签到显示状态
    updateConfirmShow (state, payload) {
      state.homeconfirm = payload.homeconfirm
    },
    //更新底部tab选中状态
    updateTab(state, payload){
      state.selectedTab = payload.selectedTab
    },
    //更新注册状态
    updateRegister(state, payload){
      state.register = payload.register
    },
    //更新签到状态
    updateCheckin(state, payload){
      state.checkin = payload.checkin
    },
    //更新购物车数据
    updataShoppingList(state, payload){
      state.shoppingList = payload;
    }
  },
  /*
   * 调用mutation改变全局变量
   * Action 提交的是 mutation，而不是直接变更状态。
   * Action 可以包含任意异步操作。
   * */
  actions: {
    //更改权限信息
    changeAccess({commit, state}, params){
      commit('updateRegister', {register: params.register})
      commit('recordUserInfo', {userInfo: params.userInfo})
    }
  }

})
