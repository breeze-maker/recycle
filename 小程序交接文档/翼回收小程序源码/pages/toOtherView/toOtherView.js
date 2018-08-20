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
    var prizeMobile = app.globalData.val.split("&prizeMobile=")[1];

    console.log("跳转到不限量小程序prizeMobile=" + prizeMobile);

    if (prizeMobile != null && prizeMobile != 'undefined' && prizeMobile != '' && app.globalData.openId!=''){
      wx.navigateToMiniProgram({//跳转不限量助手
        appId: 'wx6168456a6cb4cba2', // 要跳转的小程序的appid
        path: 'pages/llindex/llindex' + '?openId=' + app.globalData.openId + '& prizeMobile=' + prizeMobile, // 跳转的目标页面
        extarData: {
        },
        success(res) {
          // 打开成功  
        }
      }) 
    }else{
      console.log("跳转异常mobile=" + mobile);
      console.log("跳转异常openId=" + app.globalData.openId);
     
    };
    
    // try {
    //   var Url = common.common.BaseUrl + '/ty_wap/resultQuery.html?tip=1&fm=7&' + 'project_id=' + app.globalData.productId + '&img_href=' + app.globalData.modelImageUrl + '&model_name=' + app.globalData.modeCode + '&is_select=false' + '&openId=' + app.globalData.openId + '&lastPrice=' + app.globalData.lastPrice;
    //   console.log('url=' + Url);

    //   this.setData({
    //     url: Url,
    //   });

    // } catch (e) {
    //   console.log(e);
    // }
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
    console.log("优惠劵跳转" + app.globalData.val);
  },

})