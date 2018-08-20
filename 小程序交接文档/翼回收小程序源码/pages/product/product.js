const app = getApp();
var common = require('../../common/common.js');

Page({
  onShareAppMessage(options) {
    console.log(options.webViewUrl)
  },

  data: {
    url: '',//webview访问地址
  },


  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    try {
      var Url = common.common.BaseUrl + '/ty_wap/product.html?tip=1&fm=7' + '&img_href=' + app.globalData.modelImageUrl + '&model_name=' + app.globalData.modelCode + '&is_select=false' + '&openId=' + app.globalData.openId;

      Url = encodeURI(Url);
      console.log('Product的URL=' + Url);


      this.setData({
        url: Url,
      });

    } catch (e) {
      console.log(e);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }

}) 