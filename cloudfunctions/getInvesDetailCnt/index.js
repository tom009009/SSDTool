// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  var tmpRes;
  var invesID = event.invesID;
  var openid = wxContext.OPENID;
  await db.collection('invesResultDetail').where({
    openid: openid,
    invesID: invesID,
  })
  .count().then( res => {
      tmpRes = res;
  });
  return {
    cnt : tmpRes,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}