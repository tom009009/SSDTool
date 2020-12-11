// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  var title = event.title;
  var befID = 0;
  await db.collection('invesRecordMain').orderBy("invesID", "desc").where({
    endFlag:1
  })
  .get().then( res => {
      if (res.data[0] != undefined) {
        befID = res.data[0].invesID;
        console.log("成功");
        console.log("test1:" + res.data[0].invesID);
        console.log("test2" + res.data);
      }
  });
  befID = befID + 1;
  var list = event.invesList;
  var saveList = [];
  for (let i = 0; i < list.length; i++) {
    saveList[i] = {
      idx: i + 1,
      val: list[i]
    }
  };
  await db.collection('invesRecordMain').add({
    data: {
      invesID : befID,
      endFlag : 0,
      content : saveList,
      title: title
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