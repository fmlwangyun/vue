
# vue-mobile

> mobile vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 服务号
### 本地开发，获取用户信息
**WebStorm dev：**

Demo1 url：http://localhost:8812/#/?openid=ojbsl1HIaZrZcdjY2kfIbAzjQeE8
说明：获取openid为 ojbsl1HIaZrZcdjY2kfIbAzjQeE8 的用户信息，进入主页面

Demo2 url：http://localhost:8812/#/activity?openid=ojbsl1HIaZrZcdjY2kfIbAzjQeE8
说明：获取openid为 ojbsl1HIaZrZcdjY2kfIbAzjQeE8 的用户信息 进入最新活动页面


**VS2015：**

Demo1 url：http://localhost:65069/mobile/user/test
说明：获取默认的用户信息 进入主页面

Demo2 url：http://localhost:65069/mobile/user/test?openid=ojbsl1HIaZrZcdjY2kfIbAzjQeE8
说明：获取openid=ojbsl1HIaZrZcdjY2kfIbAzjQeE8的用户信息 进入主页面

### 服务号菜单配置
Demo1 url：http://vue.rndmed.com/mobile/user/test
说明：获取默认的用户信息 进入主页面

Demo2 url：http://vue.rndmed.com/mobile/user/test?openid=ojbsl1HIaZrZcdjY2kfIbAzjQeE8
说明：获取openid=ojbsl1HIaZrZcdjY2kfIbAzjQeE8的用户信息 进入主页面

Demo3 url: http://vue.rndmed.com/mobile
说明: 获取到openid并直接进入的主页面

Demo4 url: http://vue.rndmed.com/mobile?status=1&ru=activity#/activity
说明: 获取到openid并跳转至activity页面，ru参数是指定进入的页面路由，vue前台的路由必须是以 **#／**activity结尾才可以跳转至activity页面

Demo5 url: http://vue.rndmed.com/mobile?openid=ojbsl1HIaZrZcdjY2kfIbAzjQeE8&status=1&ru=activity#/activity
说明: 获取openid=ojbsl1HIaZrZcdjY2kfIbAzjQeE8的用户信息 并跳转至activity页面，ru参数是指定进入的页面路由，vue前台的路由必须是以 **#／**activity结尾才可以跳转至activity页面

Demo6 url: http://vue.rndmed.com/mobile?status=1&ru=activity/article/44#/activity/article/44
说明：获取到openid并跳转至http://vue.rndmed.com/mobile/ ** activity/article/44 **


## 订阅号
### 本地开发，获取用户信息
**WebStorm dev：**

Demo1 url：http://localhost:8812/#/?openid=ojbsl1HIaZrZcdjY2kfIbAzjQeE8
说明：获取openid为ojbsl1HIaZrZcdjY2kfIbAzjQeE8的用户信息 进入首页

Demo2 url：http://localhost:8812/#/activity?openid=ojbsl1HIaZrZcdjY2kfIbAzjQeE8
说明：获取openid为ojbsl1HIaZrZcdjY2kfIbAzjQeE8的用户信息 进入path为activity的页面


**VS2015：**

Demo1  url：http://localhost:65069/mobile/user/test
说明：获取默认的用户信息 进入主页面

Demo1  url：http://localhost:65069/mobile/user/test?openid=ojbsl1HIaZrZcdjY2kfIbAzjQeE8
说明：获取openid为ojbsl1HIaZrZcdjY2kfIbAzjQeE8的用户信息  进入主页面

### 订阅号菜单配置

点击菜单回复的图文消息的url: http://vue.rndmed.com/mobile?openid=[_openid]
说明: 进入指定进入的主页面

点击菜单回复的图文消息的url: http://vue.rndmed.com/mobile?openid=[_openid]&ru=activity#/activity
说明: 紫微星会将[_openid]替换为当前用户的openid（比如：ojbsl1HIaZrZcdjY2kfIbAzjQeE8）， ru参数是指定进入的页面路由

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
