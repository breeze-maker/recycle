const app = getApp();
var common = require('../../common/common.js');

Page({

  onShareAppMessage(options) {
    console.log(options.webViewUrl)

  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var Url = 'https://m-super.com/wechat/index.html';
      console.log('url=' + Url);

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

  },

  bindGetMsg(e) {
    
  },

})