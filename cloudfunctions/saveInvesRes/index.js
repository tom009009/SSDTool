// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var list = event.invesList;
  var befID = 0;
  await db.collection('invesRecordContent').where({
    // gt 方法用于指定一个 "大于" 条件，此处 _.gt(30) 是一个 "大于 30" 的条件
    endFlag: _.eq(1)
  })
  .get({
    success: function(res) {
        befID = res.data.invesID;
    }
  })
  befID = befID + 1;
  await db.collection('invesRecordContent').add({
    data: {
      invesID : befID,
      invesList: list,
      endFlag : 0,
    } ,
    success(res) { //成功打印消息
      console.log(res)
    },
    fail(res) { //存入数据库失败
      console.log('存入数据库操作失败');
    }
  })
  return {
    list,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}