var app = getApp()
var base = require('../base/base.js')
Page({
  data: {
    currentNum: 1,
    videos: [],
    basePath: "",
    typeId: 1,
    pageNow: 1,
    isEmpty:false,
    resultCode:0,
  },
  onLoad: function (options) {
    console.log(this.data.basePath);
    this.setData({
      basePath: app.globalData.basePath
    })
    var url = this.data.basePath + "/mini/queryCHCourseList.shtml?type=" + this.data.typeId + "&pageNow=" + this.data.pageNow;
    console.log(url);
    base.ajax(url, this.videoDate);
  },
  videoDate: function (res) {
    console.log(res.resultCode);
    
    if (res.resultCode == 1 && this.data.pageNow==1){
      this.setData({
        isEmpty: true,
      });
    }else if(res.resultCode==0){
      var videosData = res.data.list;
      videosData = this.data.videos.concat(videosData);
      this.setData({
        videos: videosData,
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
    var url = this.data.basePath + "/mini/queryCHCourseList.shtml?type=" + this.data.typeId + "&pageNow=" + this.data.pageNow;
    base.ajax(url, this.videoDate);
    wx.showNavigationBarLoading();
  },
  onTabTap: function (event) {
    var tabId = event.target.dataset.tabid;
    this.setData({
      videos:[],
      currentNum: tabId,
      typeId: tabId,
      isEmpty: true,
      pageNow:1,
    });
    var url = this.data.basePath + "/mini/queryCHCourseList.shtml?type=" + this.data.typeId + "&pageNow=" + this.data.pageNow;
    console.log(url);
    base.ajax(url, this.videoDate);
  },
  onScrollTap: function (event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../play/play?id=" + id
    })
  },
  onReady: function () {
    console.log("reday");
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