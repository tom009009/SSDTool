// miniprogram/pages/bisPage/userSetPage/userSetPage.js
var app = getApp();
var comConst = require("../../../utils/comConst.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectArray: [],
    userInfo: {},
    departsIdx : 0,
    departName: "",
    departPass: "",
    departPassServer: "",
    popErrorMsg: "",
    isLogin: false,
    departUserInfoStr: "",
  },

  select: function(e) {
    console.log("departments.idx:" + e.detail.idx);
    this.setData({
      departsIdx: e.detail.idx
    });
  },
  submit: function() {

    if (this.data.isLogin == false) {
      this.setData({
        popErrorMsg: "您还没有登录，请先登录!"
      });
      return;
    }

    if (this.data.departsIdx == 0) {
      this.setData({
        popErrorMsg: "所在部门必须选择!"
      });
      return;
    }
    if (comConst.trim(this.data.departName) == "") {
      this.setData({
        popErrorMsg: "名字不能为空!"
      });
      return;
    }
    if (comConst.trim(this.data.departPass) == "") {
      this.setData({
        popErrorMsg: "SSD密码不能为空!"
      });
      return;
    } else {
      if (this.data.departPass != this.data.departPassServer) {
        console.log("pass" + this.data.departPass);
        console.log("server pass" + this.data.departPassServer);
        this.setData({
          popErrorMsg: "SSD密码不正确!"
        });
        return;
      }
    }

    var idxTmp = this.data.departsIdx;
    var usernameTmp = this.data.departName;
    const userInfo = this.data.userInfo;
    
    wx.cloud.callFunction({
      // 云函数名称
      name: 'saveUserInfo',
      // 传给云函数的参数
      data: {
        idx : idxTmp,
        username: usernameTmp,
        nickname : userInfo.nickName,
      },
      success: function(res) {
        console.log(res);
        wx.redirectTo({
          url: "/pages/index/index",
        })
      },
      fail: console.error
    })
  },  
  
  async getDepartmentUserInfo() {
    await wx.cloud.callFunction({
      // 云函数名称
      name: 'getUserInfo',
      // 传给云函数的参数
      data: {
      },
    }).then((res) => {
      console.log("departUserInfo:" + JSON.stringify(res.result.departUserInfo.list[0]));
      if (res.result.departUserInfo.list[0] != undefined) {
        this.setData({
          departUserInfoStr: "您已经设定过部门，再次设定将更新！所在部门为：" + res.result.departUserInfo.list[0].departInfo[0].value + "，姓名为：" + res.result.departUserInfo.list[0].username,
        })
        
      }
    });
  },

  getDepartName:function(e){
    var val=e.detail.value;//获取输入的值
    this.setData({
        departName: val
    })
  },

  getDepartPass:function(e){
    var val=e.detail.value;//获取输入的值
    this.setData({
        departPass: val
    })
  },

  async getSsdPass() {
    await wx.cloud.callFunction({
      // 云函数名称
      name: 'getPass',
      // 传给云函数的参数
      data: {
        passKey: "departPass",
      },
    }).then((res) => {
      var data = res.result.pass.data[0].password;
      console.log("server pass: " + data);
      this.setData({departPassServer: data});
    });
  },

  async getDeparts() {
    await wx.cloud.callFunction({
      // 云函数名称
      name: 'getDepartments',
      // 传给云函数的参数
      data: {
      },
    }).then((res) => {
        var data = res.result.departments.data;
        console.log("departments:" + JSON.stringify(data));
        this.setData({
          selectArray: data,
        })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfoLocal = app.globalData.userInfo;
    if (userInfoLocal) {
      if (userInfoLocal.nickName != undefined) {
        this.setData({
          isLogin: true,
        })
      }
    } 
    this.setData({
      userInfo : userInfoLocal,
    });
    this.getDepartmentUserInfo();
    this.getDeparts();
    this.getSsdPass();
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