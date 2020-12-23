// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  var openid = wxContext.OPENID;
  await db.collection('invesResultDetail').add({
    data: {
      openid: openid,
      nickName : event.nickName,
      invesID : event.invesID,
      selectRes : event.selectRes
    } ,
    success(res) { //成功打印消息
      console.log(res)
    },
    fail(res) { //存入数据库失败
      console.log('存入数据库操作失败');
    }
  })
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}