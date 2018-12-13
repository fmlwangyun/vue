require('./check-versions')();
var config = require('../config');
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var proxyMiddleware = require('http-proxy-middleware');
var webpackConfig = require('./webpack.dev.conf');
var md5 = require('md5');
var _ = require('underscore');

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
    // Define HTTP proxies to your custom API backend
    // https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable;

var app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

let multer = require('multer');
app.use(multer({ storage: multer.memoryStorage() }).single('multerfile'));

//本地mock服务
// var index = require('../mock/index');
// app.use('/mobile',index);

//如果从远程API中获取数据，使用代理接口
/***********************Start 代理接口******************************/
process.env.accountID = '';
process.env.openid = '';
var request = require('request');
app.all('/mobile/*', function(req, res, next) {
    //测试接口地址
    let host = 'http://vue.rndmed.com';
    // let host = 'http://10.211.55.4:52617';
    // let host = 'http://localhost:52617';
    var path = host + req.path;
    console.log('请求远程API：' + path);
    let params = req.body;
    let headerConfig = {
        "Content-type": "application/json; charset=UTF-8",
    };
    let json = JSON.stringify(params).toLowerCase();
    if (process.env.openid.length == 0) {
        let index = json.indexOf("openid");
        if (index > 0) {
            let last = json.substring(index + 9);
            let i = last.indexOf("\"");
            process.env.openid = json.substr((index + 9), i);
        }
    }
    if (req.path.toLowerCase() == '/mobile/api/getuser') {
        if (process.env.openid.length == 0) {
            path += "?openid=123";
        } else {
            path += "?openid=" + process.env.openid;
        }
    }
    if (process.env.accountID) {
        let str = 'eDotor-Mobile-weixin' + process.env.accountID;
        let cookie = md5('MobileAccount-ID') + '=' + process.env.accountID + '; ' + md5('MobileAccount-Key') + '=' + md5(str);
        headerConfig['Cookie'] = cookie.toUpperCase();
    }
    request({
        method: req.method,
        uri: path,
        json: true,
        headers: headerConfig,
        body: params,
    }, function(err, httpResponse, body) {
        if (err) {
            console.log(err);
            res.json({ errmsg: '接口异常错误: ' + err })
        } else {
            //登陆时
            if (req.path.toLowerCase() == '/mobile/api/getuser') {
                process.env.accountID = body.data.ID;
                process.env.openid = body.data.OpenID;
            } else if (req.path == '/mobile/user/logout') { //退出时
                process.env.accountID = '';
                process.env.openid = '';
            }
            res.json(body);
        }

    });
});

/***********************END 代理接口******************************/

var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
});

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({ action: 'reload' });
        cb()
    })
});

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context];
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

var uri = 'http://localhost:' + port;

var _resolve;
var readyPromise = new Promise(resolve => {
    _resolve = resolve
});

devMiddleware.waitUntilValid(function() {
    console.log('> Listening at ' + uri + '\n')
});

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return
    }

    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
});