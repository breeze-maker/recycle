const app = getApp();
var common = require('../../common/common.js');

Page({

  data: {
    url: '',//webview访问地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var Url = common.common.BaseUrl + '/ty_wap/resultQuery.html?tip=1&fm=7&' + 'project_id=' + app.globalData.productId + '&img_href=' + app.globalData.modelImageUrl + '&model_name=' + app.globalData.modeCode + '&is_select=false' + '&openId=' + app.globalData.openId + '&lastPrice=' + app.globalData.lastPrice;

      Url = encodeURI(Url);
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
    var that = this;
    var test = e.detail.data[0].val;
    app.globalData.val = test;
    console.log("优惠劵==" + app.globalData.val);
  },
  
})