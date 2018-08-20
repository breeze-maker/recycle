const app = getApp();
var common = require('../../common/common.js');
var CusBase64  = require('../../utils/Base64.js');

Page({
 data: {
    url: '',//webview访问地址
  },

  onLoad: function (options) {
    try {

      var Url = common.common.BaseUrl + '/ty_wap/resultPrize.html?tip=1&fm=7&' + 'productid=' + app.globalData.productId + '&img_href=' + app.globalData.modelImageUrl + '&is_select=false' + '&openId=' + app.globalData.openId + '&modelCode=' + app.globalData.modelCode + '&modelName=' + app.globalData.modelName + '&lastPrice=' + app.globalData.lastPrice;

      // console.log("resultPrize=" + Url);
      Url = encodeURI(Url);
      console.log("resultPrize1=" + Url);
      

      // var result = CusBase64.CusBASE64.encoder(Url);
      // console.log("resultPrize--result=" + result);
      
      this.setData({
        url: Url,
      });

    } catch (e) {
      console.log(e);
    }

  

  },

  bindGetMsg(e) {
    var that = this;

    console.log(e);
    var test = e.detail.data[0].val;
    app.globalData.val = test;
    console.log("出价页面="+app.globalData.val);
  }, 

}) 