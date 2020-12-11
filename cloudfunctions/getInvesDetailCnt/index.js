// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  var tmpRes;
  var nickName = event.nickName;
  var invesID = event.invesID;
  await db.collection('invesResultDetail').where({
    nickName: nickName,
    invesID: invesID,
  })
  .count().then( res => {
      console.log("成功");
      console.log("test2" + res);
      tmpRes = res;
  });
  return {
    cnt : tmpRes,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}