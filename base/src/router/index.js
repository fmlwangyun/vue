import Vue from 'vue'
import Router from 'vue-router'

//ES6的引入方式，不能异步加载
import Home from '@/views/home/index';
import Register from '@/views/home/register';
import Login from '@/views/home/login';

//结合webpack 的code splitting feature,实现组件异步加载（建议：复杂业务逻辑组件使用异步加载）
const Personal = r => require.ensure([], () => r(require('@/views/personal/index')), 'personal');
const personaledit = r => require.ensure([], () => r(require('@/views/personal/edit')), 'personal');

const Calendar = r => require.ensure([], () => r(require('@/views/activity/index')), 'activity');
const ActivityView = r => require.ensure([], () => r(require('@/views/activity/detail')), 'activity');

const Academic = r => require.ensure([], () => r(require('@/views/article/academic')), 'article');
const Rostrum = r => require.ensure([], () => r(require('@/views/article/rostrum')), 'article');
const Article = r => require.ensure([], () => r(require('@/views/article/detail')), 'article');

const Exchange = r => require.ensure([], () => r(require('@/views/exchange/index')), 'exchange');
const Present = r => require.ensure([], () => r(require('@/views/exchange/present')), 'exchange');
const Integralrule = r => require.ensure([], () => r(require('@/views/exchange/rule')), 'exchange');
const Clearing = r => require.ensure([], () => r(require('@/views/exchange/clearing')), 'exchange');

//考试&调研
const examIndex = r => require.ensure([], () => r(require('@/views/exam/index')), 'exam');
const examDetail = r => require.ensure([], () => r(require('@/views/exam/detail')), 'exam');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      redirect:'/home',
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        auth:false,
        title: '首页',
        hideTab: true
      },
      component: Home
    },
    {
      path: '/activity',
      name: 'activityindex',
      meta: {
        auth:true,
        title: '最新活动'
      },
      component: Calendar
    },
    {
      path: '/activity/detail/:id',
      name: 'activity-view',
      meta: {
        auth:true,
        title: '活动详情'
      },
      component: ActivityView
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        auth:false,
        title: '注册',
        hideTab: true
      },
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        auth:false,
        title: '登陆',
        hideTab: true
      },
      component: Login
    },
    {
      path: '/personal',
      name: 'personal',
      meta: {
        auth:true,
        title: '个人中心'
      },
      component: Personal,
    },
    {
      path: '/personal/exchangerule',
      name: 'Integralrule',
      meta: {
        auth:true,
        title: '积分规则'
      },
      component: Integralrule
    },
    {
      path: '/personal/exchangeindex',
      name: 'exchange',
      meta: {
        auth:true,
        title: '兑换商城'
      },
      component: Exchange
    },
    {
      path: '/personal/present/:id',
      name: 'personal-exchange-present',
      meta: {
        auth:true,
        title: '商品详情'
      },
      component: Present
    },
    {
      path: '/personal/edit',
      name: 'personaledit',
      meta: {
        auth:true,
        title: '个人信息'
      },
      component: personaledit
    },
    {
      path: '/personal/article/:id',
      name: 'personal-article',
      meta: {
        auth:false,
        title: '我的收藏--文章详情'
      },
      component: Article
    },
    {
      path: '/academic',
      name: 'academic',
      meta: {
        auth:false,
        title: '学术资讯'
      },
      component: Academic
    },
    {
      path: '/academic/article/:id',
      name: 'academic-article',
      meta: {
        auth:false,
        title: '学术资讯--文章详情'
      },
      component: Article
    },
    {
      path: '/rostrum',
      name: 'rostrum',
      meta: {
        auth:false,
        title: '专家讲坛'
      },
      component: Rostrum
    },
    {
      path: '/rostrum/article/:id',
      name: 'rostrum-article',
      meta: {
        auth:false,
        title: '专家讲坛--文章详情'
      },
      component: Article
    },
    {
      path: '/personal/exchange/clearing',
      name: 'clearing',
      meta: {
        auth:true,
        title: '礼品兑换'
      },
      component: Clearing
    },
    {
      path: '/exam',
      name: 'exam',
      meta: {
        auth:true,
        title: '考试&调研'
      },
      component: examIndex
    },
    {
      path: '/exam/detail/:id',
      name: 'examDetail',
      meta: {
        auth:true,
        title: ''
      },
      component: examDetail
    }
  ],
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})
