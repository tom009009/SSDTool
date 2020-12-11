// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var paramList = event.paramList;
  var invesID = event.invesID;
  var resList = [];
  for (var i = 0; i < paramList.length; i++) {
    await db.collection('invesResultDetail').where({
      selectRes: paramList[i],
      invesID: invesID,
    })
    .count().then( res => {
        console.log("成功");
        console.log("test2" + res);
        var tmpRes = res;
        resList.push(tmpRes);
    });
  }


  return {
    resList: resList,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}