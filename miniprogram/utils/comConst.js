const loadStr = "页面正在载入中，请稍后，你手机网络不给力啊";

//删除左右两端的空格
function trim(str){
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

module.exports = {
  loadStr: loadStr,
  trim: trim,
}