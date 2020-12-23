// miniprogram/pages/bisPage/endDevotePage/endDevotePage.js

var app = getApp();
var comConst = require("../../../utils/comConst.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageMsg: "当前发起的调查主题为：",
    title: "",
    userInfo: {},
  },

  endDevote: function() {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'updInvesToEnd',
      // 传给云函数的参数
      data: {
      },
      success: function(res) {
        console.log(res);
        wx.redirectTo({
          url: "/pages/bisPage/adminPage/adminPage",
        })
      },
      fail: console.error
    })
  },

  async getTitle() {
    await wx.cloud.callFunction({
      // 云函数名称
      name: 'getUnfinishInvesRes',
      // 传给云函数的参数
      data: {
      },
    }).then((res) => {
        console.log("res" + res.result.invesList.data[0]);
        let resList = res.result.invesList.data[0];
        if (resList != undefined) {
          var tmpTitle = res.result.invesList.data[0].title;
          console.log("title:" + tmpTitle)
          this.setData({
            title: tmpTitle,
          });
        } else {
          this.setData({
            pageMsg: "当前没有可以结束的投票",
          });
        }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let test = app.globalData.userInfo;
    this.setData({
      userInfo : test,
    });
    this.getTitle();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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