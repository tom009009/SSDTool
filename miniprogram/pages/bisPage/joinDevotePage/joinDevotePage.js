// miniprogram/pages/bisPage/devotePage/devotePage.js
var app = getApp();
var comConst = require("../../../utils/comConst.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    userInfo: {},
    loadStr : comConst.loadStr,
    loginedStr: " ",
    errorMsg: "",
    title: "",
    invesID : 0,
    detailCnt: 0,
    isLogin: false,
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items;
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = (items[i].idx == e.detail.value)
    }
    this.setData({
      items
    })
    console.log(items);
  },
  
  submit: function() {
    
    const userInfo = this.data.userInfo;
    console.log("当前昵称为：" + userInfo.nickName);
    this.setData({
      errorMsg : ""
    });
    let selected = false;
    const items = this.data.items;
    let selectedIdx = 0;
    for (let i = 0, len = items.length; i < len; ++i) {
      if (items[i].checked) {
        selected = true;
        selectedIdx = items[i].idx;
      }
    };
    // 没有选择不允许提交
    if (!selected) {
      this.setData({
        errorMsg : "请选择后再提交！！！！！！！"
      });
      return;
    };
    
    wx.cloud.callFunction({
      // 云函数名称
      name: 'saveInvesDetail',
      // 传给云函数的参数
      data: {
        invesID : this.data.invesID,
        nickName : userInfo.nickName,
        selectRes : selectedIdx,
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


  async getDetailCnt(tmpInvesID, tmpTitle, tmpList) {
    const userInfo = this.data.userInfo;
    console.log("nickName = " + userInfo.nickName);
    await wx.cloud.callFunction({
      // 云函数名称
      name: 'getInvesDetailCnt',
      // 传给云函数的参数
      data: {
        nickName : userInfo.nickName,
        invesID : tmpInvesID,
      },
    }).then((res) => {
        this.setData({
          detailCnt : res.result.cnt.total,
        });
        if (this.data.detailCnt >= 1) {
          this.setData({
            loginedStr: "您已经投过票，不允许重复投票",
            loadStr: "",
          })
        } else {
          // this.getData();
          this.setData({
            invesID: tmpInvesID,
          });
          this.setData({
            items: tmpList,
          });
          this.setData({
            title: tmpTitle,
          });
          this.setData({
            loginedStr : "",
            loadStr: ""
          })
        }
        console.log("cnt:" + res.result.cnt.total);
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
        // console.log("init:" + res.result.invesList.data[0].content[0].val);
        var data = res.result.invesList.data[0];
        console.log(data);
        if (data != undefined) {
          var list = res.result.invesList.data[0].content;
          var tmpInvesID = res.result.invesList.data[0].invesID;
          var tmpTitle = res.result.invesList.data[0].title;
          // var listJson = [];
          // for (let key in list) {
          //   listJson.push(list[key]);
          // }
          console.log(list);
          console.log("invesID:" + tmpInvesID);
          if (this.data.isLogin == true) {
            this.getDetailCnt(tmpInvesID, tmpTitle, list);
          } else {
               // this.getData();
            this.setData({
              invesID: tmpInvesID,
            });
            this.setData({
              items: list,
            });
            this.setData({
              title: tmpTitle,
            });
            this.setData({
              errorMsg : "由于您未登陆，只能查看投票内容和选项，不能提交，如想提交，请返回首页登陆再提交",
              loginedStr : "",
              loadStr: ""
            })
          }
          
        } else {
          this.setData({
            loginedStr : "目前没有可以投选的投票，请等待新一轮投票",
            loadStr: "",
          })
        }
        
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let test = app.globalData.userInfo;
    if (test) {
      if (test.nickName != undefined) {
        this.setData({
          isLogin: true,
        })
      }
      console.log("isLogin:" + this.data.isLogin);
      console.log("globbleINFO nickName:" + test.nickName);
    } 
    this.setData({
      userInfo : test,
    });
    // 查询当次投票是否已经参加，如果完成则不允许再次投票
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