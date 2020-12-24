// miniprogram/pages/bisPage/nowDevoteResDetailPage/nowDevoteResDetailPage.js
var comConst = require("../../../utils/comConst.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadStr: comConst.loadStr,
    detailInfo: [],
  },
  async getData() {
    await wx.cloud.callFunction({
      // 云函数名称
      name: 'getUnfinishInvesRes',
      // 传给云函数的参数
      data: {
      },
    }).then((res) => {
      var data = res.result.invesList.data[0];
      console.log("yes"+ JSON.stringify(data));
      if (data != undefined) {
        this.getInvesDetail(data.invesID);
      } else {
        this.setData({
          loadStr : "目前没有未结束的投票！"
        })
      }
    });
  },
  async getInvesDetail(invesID) {
    await wx.cloud.callFunction({
      // 云函数名称
      name: 'getInvesResDetail',
      // 传给云函数的参数
      data: {
        invesID: invesID,
      },
    }).then((res) => {
       console.log(JSON.stringify(res.result.invesResDetail.list));
       this.setData({
        detailInfo: res.result.invesResDetail.list,
        loadStr: ""
       })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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