// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  var invesID = event.invesID;
  var resData;

  await db.collection('invesResultDetail').aggregate()
  .lookup({
    from: "users",
    localField: "openid",
    foreignField: "openid",
    as: "userInfo",
  })
  .lookup({
    from: "departments",
    localField: "departid",
    foreignField: "idx",
    as: "departInfo",
  })
  .match({
    invesID: invesID,
  })
  .end().then( res => {
    resData = res;
  });

  return {
    invesResDetail: resData,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}