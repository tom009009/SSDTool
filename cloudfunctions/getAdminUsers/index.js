// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var resData;
  await db.collection('adminUser').
  get().then( res => {
    console.log("成功");
    console.log("test2" + res);
    resData = res;
  });
  return {
    adminUsers: resData,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}