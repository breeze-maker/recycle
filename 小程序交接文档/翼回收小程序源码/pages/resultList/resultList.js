const app = getApp();
var common = require('../../common/common.js');

Page({

  data: {
    url: '',//webview访问地址
  },

  onShareAppMessage(options) {
    console.log(options.webViewUrl)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var Url = common.common.BaseUrl +'/ty_wap/resultList.html?tip=1&fm=7&' + "openId=" + app.globalData.openId + "&" + app.globalData.val;

      Url = encodeURI(Url);
      console.log("resultList="+Url);
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },


  bindGetMsg(e) {
    var that = this;
    var test = e.detail.data[0].val;
    app.globalData.val = test;
    console.log("resultList==" + app.globalData.val);
  },
  

})