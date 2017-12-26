import { VodVideo } from "../BCLVideo/video";
var base = require('../base/base.js');
var date = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    source: 1,//来源
    videoId: 9239,//
    teacherId: 37,//讲师id
    is_self: 0,//提问人
    pageNow: 1,//页码
    pageSize: 20,//条数
    leaveMesgs:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var id = options.id;
    var that = this;

    this.player = VodVideo({ uu: "94xiy5kak8", vu: "a0846309a8", autoplay: "0" }, "BLV", this);
    this.player.addEventListener("playerEvent", function (e) {
      // console.info(e.args[1], e.args[2]);
      var sdkResult = that.data.sdkResult;
      sdkResult += '\n' + "type:" + e.args[1] + "        data:" + e.args[2] + '\n';
      that.setData({ sdkResult: sdkResult });
    })
    //调用应用实例的方法获取全局数据
   /* app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      //that.videoHandler();
    })*/
    that.setData({
     /* basePath: app.globalData.basePath,
      source: 3,
      videoId: 9246,
      teacherId: 37,
      is_self: 794472,
      isEmptyMesg: false,*/
    });
    var url = this.data.basePath + "/queryNewQuestionList.do?source="//this.data.basePath
      + this.data.source
      + "&videoId=" + this.data.videoId
      + "&teacherId=" + this.data.teacherId
      + "&is_self=" + this.data.is_self
      + "&pageNow=" + this.data.pageNow
      + "&pageSize=" + this.data.pageSize;
    console.log(url);
    base.ajax(url, this.leaveMesg);
    var urlVideo = this.data.basePath + "/mini/chPlayer.shtml?videoId=" + this.data.videoId;
    base.ajax(urlVideo, this.loadVideo)


  },
  loadVideo:function(res){
    console.log(res);
  },
  leaveMesg: function (res) {
    if (res.resultCode == 1 && this.data.pageNow == 1) {
      this.setData({
        isEmptyMesg: true,
      });
    } else if (res.resultCode == 0) {
      var leaveMesgData = res.data.list;
      console.log(leaveMesgData);
      leaveMesgData = this.data.leaveMesgs.concat(leaveMesgData);
      this.setData({
        leaveMesgs: leaveMesgData,
        pageNow: ++this.data.pageNow,
        isEmpty: false
      });
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    } else {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh()
    }
    this.setData({
      resultCode: res.resultCode,
    });
  },
  onScrollLower: function () {
    console.log("dibu");
   
   
    wx.showNavigationBarLoading();
  },
  videoHandler: function () {

  },
  loadPageCountent: function () {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
  
})