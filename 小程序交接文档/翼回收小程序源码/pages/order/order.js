
var common = require('../../common/common.js');
Page({
  onShareAppMessage(options) {
    console.log(common);
    console.log(options.webViewUrl)
  }
}) 