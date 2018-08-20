const app = getApp();
var common = require('../../common/common.js');

Page({
  data:{
    url: '',//webview访问地址
  },


  onLoad: function (options) {
    try {
      var Url = common.common.BaseUrl + '/ty_wap/test.html?tip=1&fm=7&' + 'productid=' + app.globalData.productId + '&modelImageUrl=' + app.globalData.modelImageUrl + '&modelName=' + app.globalData.modelName + '&is_select=false' + '&openId=' + app.globalData.openId + '&lastPrice=' + app.globalData.lastPrice;

      Url = encodeURI(Url);
      console.log('selectTest=' + Url);

      this.setData({
        url: Url,
      });

    } catch (e) {
      console.log(e);
    }
  }
}) 