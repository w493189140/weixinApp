//index.js
//获取应用实例
const app = getApp();
var base = require('../base/base.js');
Page({
  data: {
    motto: 'hehehe',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function () {
    this.setData({
      basePath: app.globalData.basePath,
    });
    var url = this.data.basePath + "/queryNewQuestionList.do?source="//未知！！！！！！！！！！！
      + this.data.source
      + "&videoId=" + this.data.videoId
      + "&pageSize=" + this.data.pageSize;
    base.ajax(url, this.lodeData);
    
  },
  lodeData:function(res){
    this.setData({

    });
  },
  onShareAppMessage: function () {

  },
  dzbTap: function () {
    wx.navigateTo({
      url: '../live/live'
    })
  },
  lhbTap: function () {
    wx.navigateTo({
      url: '../lhb/lhb'
    })
  },
  qbzTap: function () {
    wx.navigateTo({
      url: '../qbz/qbz'
    })
  },
  chTap: function () {
    wx.navigateTo({
      url: '../chenhao/chenhao'
    })
  },
  onShareAppMessage: function () {

  }
})
