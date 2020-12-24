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
  var $ = cloud.database().command.aggregate;

  await db.collection('invesResultDetail').aggregate()
  .sort({
    idx: 1
  })
  // 第一个lookup先把调查结果和用户表关联
  .lookup({
    from: "users",
    localField: "openid",
    foreignField: "openid",
    as: "userInfo",
  })
  .replaceRoot({
    newRoot: $.mergeObjects([$.arrayElemAt(['$userInfo', 0]), '$$ROOT'])
  })
  .project({
    userInfo: 0
  })
  // 调查详细表和用户表关联后作为一个集合在和部门表结合
  .lookup({
    from: "departments",
    localField: "departid",
    foreignField: "idx",
    as: "departInfo",
  })
  .replaceRoot({
    newRoot: $.mergeObjects([$.arrayElemAt(['$departInfo', 0]), '$$ROOT'])
  })
  .project({
    departInfo: 0
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