// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  var resData;
  await db.collection('invesRecordMain').where({
    endFlag:0
  })
  .get().then( res => {
      console.log("成功");
      console.log("test2" + res);
      resData = res;
  });
  return {
    invesList: resData,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}

// exports.main = async (event, context) => new Promise((resolve, reject) => {
//   let resData = db.collection('invesRecordMain').where({
//     endFlag:0
//   })
//   .get();
//   resolve(resData);
// })