// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  
  var openid = wxContext.OPENID;
  var unionid = wxContext.UNIONID;
  var idx = event.idx;
  var username = event.username;
  var nickname = event.nickname;

  var uflag = false;
  // 先检索，如果有则更新，没有插入
  
  await db.collection('users').where({
    openid: openid,
  }).
  get().then( res => {
    console.log(res);
    // 更新
    if (res.data[0] != undefined) {
      uflag = true;
    } 
  });

  if (uflag == true) {
    await db.collection('users').where({
      openid: openid,
    })
    .update({
      data: {
        unionid : unionid,
        departid : idx,
        username: username,
        nickname: nickname,
      }
    })
  } else {
    await db.collection('users').add({
      data: {
        openid : openid,
        unionid : unionid,
        departid : idx,
        username: username,
        nickname: nickname,
      } ,
      success(res) { //成功打印消息
        console.log(res)
      },
      fail(res) { //存入数据库失败
        console.log('存入数据库操作失败');
      }
    })
  }

  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}