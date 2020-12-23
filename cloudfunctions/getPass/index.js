// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var passKey = event.passKey;
  var resData;
  await db.collection('ssdPassword').where({
    passKey: passKey
  })
  .get().then( res => {
      resData = res;
  });
  return {
    pass: resData,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}