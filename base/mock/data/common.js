/**
 * Created by zhaoxiaoyun on 2018/4/20.
 */
module.exports = {
  defaultRes: {
    "status": true,
    "errmsg": "ok",
    "data": {}
  },
  defaultResList: {
    "status": true,
    "errmsg": "ok",
    "data": {
      "PageList": [],
      "PageSize": 10,
      "PageIndex": 1,
      "TotalItemCount": 100
    }
  },
  hospitals: {
    "status": true,
    "errmsg": "ok",
    "data": ["启东市第三人民医院", "海安韩洋医院", "如皋广慈医院", "如皋港人民医院", "如皋市第四人民医院", "如皋市第三人民医院", "南通市第一人民医院", "南通市第三人民医院", "南通市妇幼保健院", "南通市中医院", "南通大学附属医院", "南通市海安高新区中心卫生院", "江苏省海安县人民医院", "南通市市级机关门诊部", "海安县中医院", "如皋市人民医院", "如皋市中医院", "如东县人民医院", "如东县中医院", "通州市人民医院", "如皋市博爱医院", "海安县李堡中心卫生院", "海安县南莫中心卫生院", "启东市人民医院", "启东市中医院", "南通瑞慈医院", "南通市第六人民医院", "南通大学附属东台医院", "南通大学附属东台医院", "南通大学附属东台医院", "南通大学附属东台医院"]
  },
  departments: {
    "status": true,
    "errmsg": "ok",
    "data": ["外科", "妇科", "心内科", "神经科", "骨科"]
  },
  banners: {
    "status": true,
    "errmsg": "ok",
    "data": [
      {
        "Sort": 1,
        "Url": "",
        "Img": "http://vue.rndmed.com/vue-mobile/img/ad/ad1.jpg",
        "FallbackImg": "",
        "IsValid": true,
        "ID": 1
      },
      {
        "Sort": 1,
        "Url": "",
        "Img": "http://vue.rndmed.com/vue-mobile/img/ad/ad2.jpg",
        "FallbackImg": "",
        "IsValid": true,
        "ID": 2
      }
    ]
  },
  goods: {
    "status": true,
    "errmsg": "ok",
    "data": [{
      "Name": "小米手环",
      "Description": "小米手环，赞！",
      "Integral": 200,
      "ImageUrl": "http://vue.rndmed.com\\upload\\meetingCompress\\20171027152404765.jpeg",
      "Amount": 10,
      "RemainingAmount": 76,
      "Status": 1,
      "ID": 1
    }, {
      "Name": "MacBookPro",
      "Description": "Apple 苹果 Mac Pro 笔记本电脑（工作站）新一代四核和双核 Intel 处理器 13 英寸 MacBook Pro 现配备 2.3GHz Intel Core i5 处理器或现有的最快速双核处理器：2.7GHzIntel Core i7。这些处理器的 Turbo Boost 睿频速度高达 3.4GHz，使 13 英寸 MacBook Pro 的运行速度可达到上代产品的 2 倍。",
      "Integral": 2000,
      "ImageUrl": "http://vue.rndmed.com\\upload\\meetingCompress\\20171027152421324.jpeg",
      "Amount": 10,
      "RemainingAmount": 0,
      "Status": 1,
      "ID": 2
    }, {
      "Name": "iPad Mini3",
      "Description": "好用！",
      "Integral": 800,
      "ImageUrl": "http://vue.rndmed.com\\upload\\meetingCompress\\20171027152340503.jpeg",
      "Amount": 10,
      "RemainingAmount": 97,
      "Status": 1,
      "ID": 3
    }]
  },
  provinces: {
    "status": true,
    "errmsg": "ok",
    "data": [
      {
        "name": "江苏",
        "value": "江苏",
        "parent": "0"
      },
      {
        "name": "南通市",
        "value": "南通市",
        "parent": "江苏"
      },
      {
        "name": "常州市",
        "value": "常州市",
        "parent": "江苏"
      },
      {
        "name": "无锡市",
        "value": "无锡市",
        "parent": "江苏"
      },
      {
        "name": "苏州市",
        "value": "苏州市",
        "parent": "江苏"
      },
      {
        "name": "安徽",
        "value": "安徽",
        "parent": "0"
      },
      {
        "name": "芜湖市",
        "value": "芜湖市",
        "parent": "安徽"
      },
      {
        "name": "安庆市",
        "value": "安庆市",
        "parent": "安徽"
      },
      {
        "name": "马鞍山市",
        "value": "马鞍山市",
        "parent": "安徽"
      },
      {
        "name": "宣城市",
        "value": "宣城市",
        "parent": "安徽"
      },
      {
        "name": "铜陵市",
        "value": "铜陵市",
        "parent": "安徽"
      },
      {
        "name": "黄山市",
        "value": "黄山市",
        "parent": "安徽"
      },
      {
        "name": "池州市",
        "value": "池州市",
        "parent": "安徽"
      },
      {
        "name": "蚌埠市",
        "value": "蚌埠市",
        "parent": "安徽"
      },
      {
        "name": "阜阳市",
        "value": "阜阳市",
        "parent": "安徽"
      },
      {
        "name": "亳州市",
        "value": "亳州市",
        "parent": "安徽"
      },
      {
        "name": "淮北市",
        "value": "淮北市",
        "parent": "安徽"
      },
      {
        "name": "淮南市",
        "value": "淮南市",
        "parent": "安徽"
      },
      {
        "name": "宿州市",
        "value": "宿州市",
        "parent": "安徽"
      },
      {
        "name": "合肥市",
        "value": "合肥市",
        "parent": "安徽"
      },
      {
        "name": "南京市",
        "value": "南京市",
        "parent": "江苏"
      },
      {
        "name": "滁州市",
        "value": "滁州市",
        "parent": "安徽"
      },
      {
        "name": "六安市",
        "value": "六安市",
        "parent": "安徽"
      },
      {
        "name": "宿迁市",
        "value": "宿迁市",
        "parent": "江苏"
      },
      {
        "name": "徐州市",
        "value": "徐州市",
        "parent": "江苏"
      },
      {
        "name": "连云港市",
        "value": "连云港市",
        "parent": "江苏"
      },
      {
        "name": "淮安市",
        "value": "淮安市",
        "parent": "江苏"
      },
      {
        "name": "泰州市",
        "value": "泰州市",
        "parent": "江苏"
      },
      {
        "name": "盐城市",
        "value": "盐城市",
        "parent": "江苏"
      },
      {
        "name": "扬州市",
        "value": "扬州市",
        "parent": "江苏"
      },
      {
        "name": "镇江市",
        "value": "镇江市",
        "parent": "江苏"
      },
      {
        "name": "山东",
        "value": "山东",
        "parent": "0"
      },
      {
        "name": "德州市",
        "value": "德州市",
        "parent": "山东"
      },
      {
        "name": "淄博市",
        "value": "淄博市",
        "parent": "山东"
      },
      {
        "name": "菏泽市",
        "value": "菏泽市",
        "parent": "山东"
      },
      {
        "name": "东营市",
        "value": "东营市",
        "parent": "山东"
      },
      {
        "name": "济宁市",
        "value": "济宁市",
        "parent": "山东"
      },
      {
        "name": "济南市",
        "value": "济南市",
        "parent": "山东"
      },
      {
        "name": "聊城市",
        "value": "聊城市",
        "parent": "山东"
      },
      {
        "name": "莱芜市",
        "value": "莱芜市",
        "parent": "山东"
      },
      {
        "name": "临沂市",
        "value": "临沂市",
        "parent": "山东"
      },
      {
        "name": "青岛市",
        "value": "青岛市",
        "parent": "山东"
      },
      {
        "name": "泰安市",
        "value": "泰安市",
        "parent": "山东"
      },
      {
        "name": "潍坊市",
        "value": "潍坊市",
        "parent": "山东"
      },
      {
        "name": "威海市",
        "value": "威海市",
        "parent": "山东"
      },
      {
        "name": "烟台市",
        "value": "烟台市",
        "parent": "山东"
      },
      {
        "name": "浙江",
        "value": "浙江",
        "parent": "0"
      },
      {
        "name": "金华市",
        "value": "金华市",
        "parent": "浙江"
      },
      {
        "name": "衢州市",
        "value": "衢州市",
        "parent": "浙江"
      },
      {
        "name": "温州市",
        "value": "温州市",
        "parent": "浙江"
      },
      {
        "name": "河南",
        "value": "河南",
        "parent": "0"
      },
      {
        "name": "洛阳市",
        "value": "洛阳市",
        "parent": "河南"
      },
      {
        "name": "三门峡市",
        "value": "三门峡市",
        "parent": "河南"
      },
      {
        "name": "郑州市",
        "value": "郑州市",
        "parent": "河南"
      },
      {
        "name": "福建",
        "value": "福建",
        "parent": "0"
      },
      {
        "name": "厦门市",
        "value": "厦门市",
        "parent": "福建"
      },
      {
        "name": "福州市",
        "value": "福州市",
        "parent": "福建"
      },
      {
        "name": "南平市",
        "value": "南平市",
        "parent": "福建"
      },
      {
        "name": "三明市",
        "value": "三明市",
        "parent": "福建"
      },
      {
        "name": "漳州市",
        "value": "漳州市",
        "parent": "福建"
      },
      {
        "name": "杭州市",
        "value": "杭州市",
        "parent": "浙江"
      },
      {
        "name": "宁波市",
        "value": "宁波市",
        "parent": "浙江"
      },
      {
        "name": "湖州市",
        "value": "湖州市",
        "parent": "浙江"
      },
      {
        "name": "嘉兴市",
        "value": "嘉兴市",
        "parent": "浙江"
      },
      {
        "name": "台州市",
        "value": "台州市",
        "parent": "浙江"
      },
      {
        "name": "上海",
        "value": "上海",
        "parent": "0"
      },
      {
        "name": "上海市",
        "value": "上海市",
        "parent": "上海"
      },
      {
        "name": "广东",
        "value": "广东",
        "parent": "0"
      },
      {
        "name": "东莞市",
        "value": "东莞市",
        "parent": "广东"
      },
      {
        "name": "惠州市",
        "value": "惠州市",
        "parent": "广东"
      },
      {
        "name": "佛山市",
        "value": "佛山市",
        "parent": "广东"
      },
      {
        "name": "广州市",
        "value": "广州市",
        "parent": "广东"
      },
      {
        "name": "河源市",
        "value": "河源市",
        "parent": "广东"
      },
      {
        "name": "深圳市",
        "value": "深圳市",
        "parent": "广东"
      },
      {
        "name": "珠海市",
        "value": "珠海市",
        "parent": "广东"
      },
      {
        "name": "中山市",
        "value": "中山市",
        "parent": "广东"
      },
      {
        "name": "湖南",
        "value": "湖南",
        "parent": "0"
      },
      {
        "name": "长沙市",
        "value": "长沙市",
        "parent": "湖南"
      },
      {
        "name": "邵阳市",
        "value": "邵阳市",
        "parent": "湖南"
      },
      {
        "name": "常德市",
        "value": "常德市",
        "parent": "湖南"
      },
      {
        "name": "郴州市",
        "value": "郴州市",
        "parent": "湖南"
      },
      {
        "name": "衡阳市",
        "value": "衡阳市",
        "parent": "湖南"
      },
      {
        "name": "湘潭市",
        "value": "湘潭市",
        "parent": "湖南"
      },
      {
        "name": "益阳市",
        "value": "益阳市",
        "parent": "湖南"
      },
      {
        "name": "株洲市",
        "value": "株洲市",
        "parent": "湖南"
      },
      {
        "name": "海南",
        "value": "海南",
        "parent": "0"
      },
      {
        "name": "海口市",
        "value": "海口市",
        "parent": "海南"
      },
      {
        "name": "三亚市",
        "value": "三亚市",
        "parent": "海南"
      },
      {
        "name": "四川",
        "value": "四川",
        "parent": "0"
      },
      {
        "name": "成都市",
        "value": "成都市",
        "parent": "四川"
      },
      {
        "name": "陕西",
        "value": "陕西",
        "parent": "0"
      },
      {
        "name": "宝鸡市",
        "value": "宝鸡市",
        "parent": "陕西"
      },
      {
        "name": "咸阳市",
        "value": "咸阳市",
        "parent": "陕西"
      },
      {
        "name": "西安市",
        "value": "西安市",
        "parent": "陕西"
      },
      {
        "name": "汉中市",
        "value": "汉中市",
        "parent": "陕西"
      },
      {
        "name": "渭南市",
        "value": "渭南市",
        "parent": "陕西"
      },
      {
        "name": "甘肃",
        "value": "甘肃",
        "parent": "0"
      },
      {
        "name": "兰州市",
        "value": "兰州市",
        "parent": "甘肃"
      },
      {
        "name": "天水市",
        "value": "天水市",
        "parent": "甘肃"
      },
      {
        "name": "张掖市",
        "value": "张掖市",
        "parent": "甘肃"
      },
      {
        "name": "新疆",
        "value": "新疆",
        "parent": "0"
      },
      {
        "name": "昌吉回族自治州",
        "value": "昌吉回族自治州",
        "parent": "新疆"
      },
      {
        "name": "巴音郭楞蒙古自治州",
        "value": "巴音郭楞蒙古自治州",
        "parent": "新疆"
      },
      {
        "name": "五家渠市",
        "value": "五家渠市",
        "parent": "新疆"
      },
      {
        "name": "克拉玛依市",
        "value": "克拉玛依市",
        "parent": "新疆"
      },
      {
        "name": "喀什地区",
        "value": "喀什地区",
        "parent": "新疆"
      },
      {
        "name": "石河子市",
        "value": "石河子市",
        "parent": "新疆"
      },
      {
        "name": "乌鲁木齐市",
        "value": "乌鲁木齐市",
        "parent": "新疆"
      },
      {
        "name": "和田地区",
        "value": "和田地区",
        "parent": "新疆"
      },
      {
        "name": "伊犁哈萨克自治州",
        "value": "伊犁哈萨克自治州",
        "parent": "新疆"
      },
      {
        "name": "湖北",
        "value": "湖北",
        "parent": "0"
      },
      {
        "name": "荆门市",
        "value": "荆门市",
        "parent": "湖北"
      },
      {
        "name": "武汉市",
        "value": "武汉市",
        "parent": "湖北"
      },
      {
        "name": "襄阳市",
        "value": "襄阳市",
        "parent": "湖北"
      },
      {
        "name": "恩施土家族苗族自治州",
        "value": "恩施土家族苗族自治州",
        "parent": "湖北"
      },
      {
        "name": "咸宁市",
        "value": "咸宁市",
        "parent": "湖北"
      },
      {
        "name": "孝感市",
        "value": "孝感市",
        "parent": "湖北"
      },
      {
        "name": "十堰市",
        "value": "十堰市",
        "parent": "湖北"
      },
      {
        "name": "黄石市",
        "value": "黄石市",
        "parent": "湖北"
      },
      {
        "name": "荆州市",
        "value": "荆州市",
        "parent": "湖北"
      },
      {
        "name": "随州市",
        "value": "随州市",
        "parent": "湖北"
      },
      {
        "name": "天门市",
        "value": "天门市",
        "parent": "湖北"
      },
      {
        "name": "仙桃市",
        "value": "仙桃市",
        "parent": "湖北"
      },
      {
        "name": "宜昌市",
        "value": "宜昌市",
        "parent": "湖北"
      },
      {
        "name": "河北",
        "value": "河北",
        "parent": "0"
      },
      {
        "name": "石家庄市",
        "value": "石家庄市",
        "parent": "河北"
      },
      {
        "name": "保定市",
        "value": "保定市",
        "parent": "河北"
      },
      {
        "name": "邯郸市",
        "value": "邯郸市",
        "parent": "河北"
      },
      {
        "name": "衡水市",
        "value": "衡水市",
        "parent": "河北"
      },
      {
        "name": "邢台市",
        "value": "邢台市",
        "parent": "河北"
      },
      {
        "name": "山西",
        "value": "山西",
        "parent": "0"
      },
      {
        "name": "太原市",
        "value": "太原市",
        "parent": "山西"
      },
      {
        "name": "运城市",
        "value": "运城市",
        "parent": "山西"
      },
      {
        "name": "晋中市",
        "value": "晋中市",
        "parent": "山西"
      },
      {
        "name": "临汾市",
        "value": "临汾市",
        "parent": "山西"
      },
      {
        "name": "长治市",
        "value": "长治市",
        "parent": "山西"
      },
      {
        "name": "朔州市",
        "value": "朔州市",
        "parent": "山西"
      },
      {
        "name": "吕梁市",
        "value": "吕梁市",
        "parent": "山西"
      },
      {
        "name": "晋城市",
        "value": "晋城市",
        "parent": "山西"
      },
      {
        "name": "阳泉市",
        "value": "阳泉市",
        "parent": "山西"
      },
      {
        "name": "沧州市",
        "value": "沧州市",
        "parent": "河北"
      },
      {
        "name": "天津",
        "value": "天津",
        "parent": "0"
      },
      {
        "name": "廊坊",
        "value": "廊坊",
        "parent": "天津"
      },
      {
        "name": "秦皇岛市",
        "value": "秦皇岛市",
        "parent": "河北"
      },
      {
        "name": "唐山市",
        "value": "唐山市",
        "parent": "河北"
      },
      {
        "name": "天津市",
        "value": "天津市",
        "parent": "天津"
      },
      {
        "name": "北京",
        "value": "北京",
        "parent": "0"
      },
      {
        "name": "北京市",
        "value": "北京市",
        "parent": "北京"
      },
      {
        "name": "海口",
        "value": "海口",
        "parent": "海南"
      },
      {
        "name": "三亚",
        "value": "三亚",
        "parent": "海南"
      },
      {
        "name": "文昌",
        "value": "文昌",
        "parent": "海南"
      },
      {
        "name": "琼海",
        "value": "琼海",
        "parent": "海南"
      },
      {
        "name": "儋州",
        "value": "儋州",
        "parent": "海南"
      },
      {
        "name": "广西",
        "value": "广西",
        "parent": "0"
      },
      {
        "name": "玉林",
        "value": "玉林",
        "parent": "广西"
      },
      {
        "name": "南宁",
        "value": "南宁",
        "parent": "广西"
      },
      {
        "name": "钦州",
        "value": "钦州",
        "parent": "广西"
      },
      {
        "name": "云南",
        "value": "云南",
        "parent": "0"
      },
      {
        "name": "昆明",
        "value": "昆明",
        "parent": "云南"
      },
      {
        "name": "曲靖",
        "value": "曲靖",
        "parent": "云南"
      },
      {
        "name": "玉溪",
        "value": "玉溪",
        "parent": "云南"
      },
      {
        "name": "大理",
        "value": "大理",
        "parent": "云南"
      },
      {
        "name": "重庆",
        "value": "重庆",
        "parent": "0"
      },
      {
        "name": "重庆市",
        "value": "重庆市",
        "parent": "重庆"
      },
      {
        "name": "开封市",
        "value": "开封市",
        "parent": "河南"
      },
      {
        "name": "安阳市",
        "value": "安阳市",
        "parent": "河南"
      },
      {
        "name": "鹤壁市",
        "value": "鹤壁市",
        "parent": "河南"
      },
      {
        "name": "新乡市",
        "value": "新乡市",
        "parent": "河南"
      },
      {
        "name": "濮阳市",
        "value": "濮阳市",
        "parent": "河南"
      },
      {
        "name": "周口市",
        "value": "周口市",
        "parent": "河南"
      },
      {
        "name": "许昌市",
        "value": "许昌市",
        "parent": "河南"
      },
      {
        "name": "驻马店市",
        "value": "驻马店市",
        "parent": "河南"
      },
      {
        "name": "平顶山市",
        "value": "平顶山市",
        "parent": "河南"
      },
      {
        "name": "河南省",
        "value": "河南省",
        "parent": "0"
      },
      {
        "name": "江西",
        "value": "江西",
        "parent": "0"
      },
      {
        "name": "赣州市",
        "value": "赣州市",
        "parent": "江西"
      },
      {
        "name": "鹰潭市",
        "value": "鹰潭市",
        "parent": "江西"
      },
      {
        "name": "上饶市",
        "value": "上饶市",
        "parent": "江西"
      },
      {
        "name": "九江市",
        "value": "九江市",
        "parent": "江西"
      },
      {
        "name": "南昌市",
        "value": "南昌市",
        "parent": "江西"
      },
      {
        "name": "吉安市",
        "value": "吉安市",
        "parent": "江西"
      },
      {
        "name": "萍乡市",
        "value": "萍乡市",
        "parent": "江西"
      },
      {
        "name": "衢州",
        "value": "衢州",
        "parent": "浙江"
      },
      {
        "name": "龙岩市",
        "value": "龙岩市",
        "parent": "福建"
      },
      {
        "name": "宁德市",
        "value": "宁德市",
        "parent": "福建"
      },
      {
        "name": "泉州市",
        "value": "泉州市",
        "parent": "福建"
      },
      {
        "name": "莆田市",
        "value": "莆田市",
        "parent": "福建"
      },
      {
        "name": "江苏省",
        "value": "江苏省",
        "parent": "0"
      },
      {
        "name": "承德",
        "value": "承德",
        "parent": "河北"
      },
      {
        "name": "安徽省",
        "value": "安徽省",
        "parent": "0"
      },
      {
        "name": "金华",
        "value": "金华",
        "parent": "浙江"
      },
      {
        "name": "绍兴市",
        "value": "绍兴市",
        "parent": "浙江"
      },
      {
        "name": "浙江省",
        "value": "浙江省",
        "parent": "0"
      },
      {
        "name": "山东省",
        "value": "山东省",
        "parent": "0"
      },
      {
        "name": "枣庄市",
        "value": "枣庄市",
        "parent": "山东省"
      },
      {
        "name": "鹿邑县",
        "value": "鹿邑县",
        "parent": "河南省"
      },
      {
        "name": "漯河市",
        "value": "漯河市",
        "parent": "河南省"
      },
      {
        "name": "太原",
        "value": "太原",
        "parent": "山西"
      },
      {
        "name": "邯郸",
        "value": "邯郸",
        "parent": "河北"
      },
      {
        "name": "秦皇岛",
        "value": "秦皇岛",
        "parent": "河北"
      },
      {
        "name": "江西省",
        "value": "江西省",
        "parent": "0"
      },
      {
        "name": "新余市",
        "value": "新余市",
        "parent": "江西省"
      },
      {
        "name": "南昌",
        "value": "南昌",
        "parent": "江西"
      },
      {
        "name": "雅安市",
        "value": "雅安市",
        "parent": "四川"
      },
      {
        "name": "山西省",
        "value": "山西省",
        "parent": "0"
      },
      {
        "name": "忻州市",
        "value": "忻州市",
        "parent": "山西省"
      },
      {
        "name": "成都",
        "value": "成都",
        "parent": "四川"
      },
      {
        "name": "南充",
        "value": "南充",
        "parent": "四川"
      },
      {
        "name": "遂宁",
        "value": "遂宁",
        "parent": "四川"
      },
      {
        "name": "达州",
        "value": "达州",
        "parent": "四川"
      },
      {
        "name": "资阳",
        "value": "资阳",
        "parent": "四川"
      },
      {
        "name": "广安",
        "value": "广安",
        "parent": "四川"
      },
      {
        "name": "抚州市",
        "value": "抚州市",
        "parent": "江西省"
      },
      {
        "name": "宜春市",
        "value": "宜春市",
        "parent": "江西"
      },
      {
        "name": "景德镇市",
        "value": "景德镇市",
        "parent": "江西"
      },
      {
        "name": "无锡",
        "value": "无锡",
        "parent": "江苏"
      },
      {
        "name": "广州",
        "value": "广州",
        "parent": "广东"
      },
      {
        "name": "青岛",
        "value": "青岛",
        "parent": "山东"
      },
      {
        "name": "东阳",
        "value": "东阳",
        "parent": "浙江"
      },
      {
        "name": "福建省",
        "value": "福建省",
        "parent": "0"
      },
      {
        "name": "莆田",
        "value": "莆田",
        "parent": "福建省"
      },
      {
        "name": "泉州",
        "value": "泉州",
        "parent": "福建省"
      },
      {
        "name": "福州",
        "value": "福州",
        "parent": "福建省"
      },
      {
        "name": "武汉",
        "value": "武汉",
        "parent": "湖北"
      },
      {
        "name": "枣庄",
        "value": "枣庄",
        "parent": "山东"
      },
      {
        "name": "绵阳市",
        "value": "绵阳市",
        "parent": "四川"
      },
      {
        "name": "芜湖",
        "value": "芜湖",
        "parent": "安徽"
      }
    ]
  }
}
