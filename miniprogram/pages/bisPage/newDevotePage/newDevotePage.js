Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[0],//默认显示一个
    inputVal:[],//所有input的内容
    title: "",
    errorMsg: "页面正在载入中，请稍后，你手机网络不给力啊"
},
//获取input的值
getInputVal:function(e){
    var nowIdx=e.currentTarget.dataset.idx;//获取当前索引
    var val=e.detail.value;//获取输入的值
    var oldVal=this.data.inputVal;
    oldVal[nowIdx] = val;//修改对应索引值的内容
    this.setData({
        inputVal:oldVal
    })
},
getTitleVal:function(e){
  var val=e.detail.value;//获取输入的值
  this.setData({
      title:val
  })
},
//添加input
addInput:function(){
    this.data.idx++;
    var old=this.data.array;
    old.push(1);//这里不管push什么，只要数组长度增加1就行
    this.setData({
        array: old
    })
},
//删除input
delInput:function(e){
    this.data.idx--;
    var nowidx=e.currentTarget.dataset.idx;//当前索引
    var oldInputVal=this.data.inputVal;//所有的input值
    var oldarr=this.data.array;//循环内容
    oldarr.splice(nowidx,1);    //删除当前索引的内容，这样就能删除view了
    oldInputVal.splice(nowidx,1);//view删除了对应的input值也要删掉
    if (oldarr.length < 1) {
        oldarr = [0]  //如果循环内容长度为0即删完了，必须要留一个默认的。这里oldarr只要是数组并且长度为1，里面的值随便是什么
    }
    this.setData({
        array:oldarr,
        inputVal: oldInputVal
    })
  }, 
  submit: function() {
    let that = this;
    console.log(this.data.inputVal[0]);
    console.log(this.data.inputVal[1]);
    wx.cloud.callFunction({
      // 云函数名称
      name: 'saveInvesRes',
      // 传给云函数的参数
      data: {
        invesList : this.data.inputVal,
        title : this.data.title
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
  
  async getUnfinishInves() {
    await wx.cloud.callFunction({
      // 云函数名称
      name: 'getUnfinishInvesRes',
      // 传给云函数的参数
      data: {
      },
    }).then((res) => {
        let resList = res.result.invesList.data[0];
        if (resList != undefined) {
          this.setData({
            errorMsg: "上一轮投票还未结束，不能发起新投票",
          });
        } else {
          this.setData({
            errorMsg: "",
          });
        }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUnfinishInves();
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