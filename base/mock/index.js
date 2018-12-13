let express = require('express');
let router = express.Router();

let _ = require('underscore');

let common = require('./data/common');
let article = require('./data/article');
let activity = require('./data/activity');
let userData = require('./data/user.json');

//通用测试接口, 根据URL匹配下面的 apiResponse
router.post('/*', function (req, res, next) {
  console.log('XXXXXXX:'+req.url)
  let data = apiResponse.getResponse(req.url);

  if (typeof data == 'undefined') {
    console.error('no mock data:::' + req.url);
    data = common.defaultResList
  } else {
    console.log('common mock:::' + req.url)
  }

  res.send(data)
});

let apiResponse = {
  apis: {
    '/mobile/api/bannerlist': common.banners,

    '/mobile/api/getuser': userData,
    '/mobile/user/wechatlogon': common.defaultRes,
    '/mobile/api/sign': common.defaultRes,

    '/mobile/hospital/getdepartments': common.departments,
    '/mobile/hospital/getprovinces': common.provinces,
    '/mobile/hospital/gethospitals': common.hospitals,

    '/mobile/article/list': article.list,
    '/mobile/article/detail': {status: true, data: article.list.data.PageList[0]},
    '/mobile/comment/list': article.comment,

    '/mobile/api/activitylist': activity.list,
    '/mobile/api/getactivity': activity.activitydetail,

    '/mobile/user/save': common.defaultRes,
    '/mobile/exam/list': common.defaultResList,

    '/mobile/api/exchangegoods': common.goods
  },
  getResponse(url){
    return _.find(this.apis, function (a, v) {
      return v.toLowerCase() == url.toLowerCase() || v.replace('/mobile/','/').toLowerCase()== url.toLowerCase() ;
    })
  }
};


module.exports = router;
