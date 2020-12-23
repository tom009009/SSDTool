// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid = wxContext.OPENID;
  var resData;
  await db.collection('users').aggregate()
  .lookup({
    from: "departments",
    localField: "departid",
    foreignField: "idx",
    as: "departInfo",
  })
  .match({
    openid: openid,
  })
  .end().then( res => {
    resData = res;
  });

  return {
    departUserInfo: resData,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}