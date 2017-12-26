//index.js
//获取应用实例
import { LiveVideo } from "../BCLVideo/video";
var app = getApp();
var base = require('../base/base.js');
var formatTime = require('../../utils/util.js');
Page({
    
  data: {
    flag: true,
    newId: { activityId: "A201604010000051" },
    sdkResult: "",
    // src: 'http://dwzb.91bee.com/AppName/91bee_phd.m3u8',
    source: "1",//来源
    videoId: "",//
    teacherId: "",//讲师id
    is_self: "",//提问人
    pageNow: 1,//页码
    pageSize: 20,//条数
    leaveMesgs: [],
    userId: 0,
    beAsked: "",
    isCheck: 0,
    playState: "1",
    questionContent: "",
    questionImg: "",
    randomUserId: "471223",
    role: "",
    source: "1",
    sourceCode: "4",
  },
  //事件处理函数
  onLoad: function () {
    var that = this;
    this.player = LiveVideo({ activityId: "A201604010000051", autoplay: "1" }, "BLV", this);
    this.player.addEventListener("playerEvent", function (e) {
      console.info(e.args[1], e.args[2]);
      var sdkResult = that.data.sdkResult;
      sdkResult += '\n' + "type:" + e.args[1] + "        data:" + e.args[2] + '\n';
      that.setData({ sdkResult: sdkResult });
    })
    var randomUserId = Math.random()*900000|0+100000;
    //调用应用实例的方法获取全局数据
    that.setData({
      randomUserId:randomUserId,
      basePath: app.globalData.basePath,
      isEmptyMesg: false,
    });
    this.downloadeQuestion();
  },
 /* onScrollLower:function(){
        this.downloadeQuestion();
        wx.showNavigationBarLoading();
  },*/
  
  downloadeQuestion: function () {    //获取评论数据
    var url = this.data.basePath + "/queryNewQuestionList.do?source="//this.data.basePath
      + this.data.source
      + "&videoId=" + this.data.videoId
      + "&teacherId=" + this.data.teacherId
      + "&is_self=" + this.data.is_self
      + "&pageNow=" + this.data.pageNow
      + "&pageSize=" + this.data.pageSize;
    base.ajax(url, this.leaveMesg);
  },
  leaveMesg: function (res) {   //渲染评论数据
    if (res.resultCode == 1 && this.data.pageNow == 1) {
      this.setData({
        isEmptyMesg: true,
      });
    } else if (res.resultCode == 0) {
      var leaveMesgData = res.data.list;
      var str = JSON.stringify(leaveMesgData),
        str = str.replace(/&nbsp;/g, "　");
      str = str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, "[图片]");
      // str = str.replace(/\>/g,"\>\</image\>");
      var json = JSON.parse(str);
      leaveMesgData = this.data.leaveMesgs.concat(json);
      console.log(leaveMesgData)
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
  },
  changeVideo: function () {  //切换音视频
    var _flag = !this.data.flag;
    this.setData({
      flag: _flag
    });
    if (!_flag) {
      setTimeout(this.audioPlay, 300)
    }
  },
  audioPlay: function () {    //音频播放
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.play()
  },
  askQuestion: function () {        //问题提交服务端
    var url = this.data.basePath + "/addQuestion.do?source="//this.data.basePath
      + this.data.source
      + "&beAsked=" + this.data.beAsked
      + "&randomUserId=" + this.data.randomUserId
      + "&questionContent=" + this.data.questionContent
      + "&playState=" + this.data.playState
      + "&sourceCode=" + this.data.sourceCode
      + "&role=" + this.data.role;
     base.ajax(url, this.changeMesg);
  },
  changeMesg:function(res){  //提交问题后反馈
    this.setData({
        questionContent: ""
    })
  },
  pageMesg:function(){   //本地发言数据
    var nowTime = formatTime.formatTime(new Date());
    nowTime = nowTime.substring(11, 16);
    var newQuestion = {
        askTimeStr:nowTime,
        askUser:"游客"+this.data.randomUserId,
        headerImg:"/image/common/headerImg/tourists.png",
        askContent:this.data.questionContent
    }
      var leaveMesgData = this.data.leaveMesgs;
      leaveMesgData.unshift(newQuestion);
      this.setData({
        nowTime:nowTime,
        leaveMesgs: leaveMesgData,
      });
  },
  submitQuestion:function(){  //提交数据
      this.pageMesg();
      this.askQuestion();
  },
  bindKeyInput: function(e) {   //input数据
    console.log(e);
    this.setData({
        questionContent: e.detail.value
    })
  },
  onReachBottom:function(){
      console.log("0123")
       this.downloadeQuestion();
      wx.showNavigationBarLoading();
  },
  onPullDownRefresh: function () {  
    wx.showNavigationBarLoading();
    this.setData({
        pageNow: 1,//页码
        leaveMesgs: [],
    })
    this.downloadeQuestion();
    // wx.stopPullDownRefresh;
  },
  onShareAppMessage: function () {

  }

})
