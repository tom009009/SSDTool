// miniprogram/pages/bisPage/nowDevoteResPage/nowDevoteResPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadStr: "页面正在载入中，请稍后，你手机网络不给力啊",
    invesRes: [],
  },
  async getNowCnt(invesID, paramList, list) {
    await wx.cloud.callFunction({
      // 云函数名称
      name: 'getDevoteCnt',
      // 传给云函数的参数
      data: {
        invesID: invesID,
        paramList: paramList,
      },
    }).then((res) => {
        var data = res.result.resList;
        var tmpInvesRes = [];

        for (let key in data) {
          var tmp = {};
          tmp.idx = paramList[key];
          tmp.cnt = data[key].total;
          tmp.val = list[key].val;
          tmpInvesRes.push(tmp);
        }
       this.setData({
        loadStr : "",
        invesRes: tmpInvesRes,
       })
    });
  },
  async getData() {
    console.log("starting getData");
    await wx.cloud.callFunction({
      // 云函数名称
      name: 'getUnfinishInvesRes',
      // 传给云函数的参数
      data: {
      },
    }).then((res) => {
        var data = res.result.invesList.data[0];
        console.log(data);
        if (data != undefined) {
          var list = res.result.invesList.data[0].content;
          var tmpInvesID = res.result.invesList.data[0].invesID;
          console.log(list);
          var paramList = [];
          for (let key in list) {
            paramList.push(list[key].idx);
            console.log("value:" + list[key].idx);
          }
          this.getNowCnt(tmpInvesID, paramList, list);

        } else {
          this.setData({
            loadStr : "目前没有未结束的投票！"
          })
        }
        
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