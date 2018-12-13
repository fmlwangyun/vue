Date.prototype.Format = function (fmt) {

  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

Date.prototype.DateWeekFormat = function (fmt) {

  let myday = this.getDay()//注:0-6对应为星期日到星期六

  var w = ['日', '一', '二', '三', '四', '五', '六']

  return '星期' + w[myday];
}

String.prototype.JsonFormat = function () {
  var jsondate = this;
  jsondate = jsondate.replace("/Date(", "").replace(")/", "");
  if (jsondate.indexOf("+") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("+"));
  }
  else if (jsondate.indexOf("-") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("-"));
  }

  var date = new Date(parseInt(jsondate, 10));
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return date.getFullYear() + "-" + month + "-" + currentDate;
}

String.prototype.ToDate = function () {
  var jsondate = this;
  jsondate = jsondate.replace("/Date(", "").replace(")/", "");
  if (jsondate.indexOf("+") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("+"));
  }
  else if (jsondate.indexOf("-") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("-"));
  }

  var date = new Date(parseInt(jsondate, 10));
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return new Date(date.getFullYear(), date.getMonth(), currentDate);
}

String.prototype.ToDateTime = function () {
  var jsondate = this;
  jsondate = jsondate.replace("/Date(", "").replace(")/", "");
  if (jsondate.indexOf("+") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("+"));
  }
  else if (jsondate.indexOf("-") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("-"));
  }

  var date = new Date(parseInt(jsondate, 10));
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

  var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  return new Date(date.getFullYear(), month, currentDate, hour, minute, second);
}

String.prototype.ToDateTime2 = function () {
  var jsondate = this;
  jsondate = jsondate.replace("/Date(", "").replace(")/", "");
  if (jsondate.indexOf("+") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("+"));
  }
  else if (jsondate.indexOf("-") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("-"));
  }

  var date = new Date(parseInt(jsondate, 10));
  var month = date.getMonth() < 10 ? "0" + (date.getMonth()) : date.getMonth();
  var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

  var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  return new Date(date.getFullYear(), month, currentDate, hour, minute, second);
}

String.prototype.TimeJsonFormat = function () {
  var jsondate = this;
  jsondate = jsondate.replace("/Date(", "").replace(")/", "");
  if (jsondate.indexOf("+") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("+"));
  }
  else if (jsondate.indexOf("-") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("-"));
  }

  var date = new Date(parseInt(jsondate, 10));
  var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return hour + ":" + minute;
}



