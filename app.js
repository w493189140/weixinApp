//app.js
var base = require('pages/base/base.js');
var utils = require('utils/util.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    //this.getUserInfo();
  },
  /*getUserInfo: function (cb) {
    var that = this;

    var baseName = utils.hexMD5('phone=18353852910&pwd=xm12345');
    
    console.log(baseName);

    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      var url = "http://10.1.1.117/api/1505209264712/1/" + baseName+"/login";

      wx.request({
        url: url,
        method: 'POST',
        data: {
          phone:"17091266225",
          pwd:"123456"
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res);
        },
        fail: function (error) {
          console.log(error)
        }
      })
     // base.ajax(url,this.callback);
    }
  },
  callback:function(res){
   // console.log(res.resultData.loginToken);
    console.log("已经登录")
    console.log(res)
    //var url = 'http://app.91bee.com/api/1/1/1/getUserInfo?token=' + res.resultData.loginToken;
    //base.ajax(url, this.aa);
  },
  aa:function(res){
    console.log(res)
  },*/
  globalData: {
    userInfo: null,
    basePath:"http://10.1.1.115",
    // basePath:"https://www.91bee.com"
  }
})