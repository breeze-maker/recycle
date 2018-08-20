
const app = getApp();
var common = require('../../common/common.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    setRecycleShareParams: {
      openId: '',
      status: '',
    },

    setUserInfoOrMobileParam: {
      openId: 1,
      iv: 1,
      encryptedData: 1,
    },
  },

  onLoad: function (options) {
      wx.showShareMenu({
        withShareTicket: true //要求小程序返回分享目标信息
      })

  },

  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '你的手机还值多少钱，要不我送一部。',
      path: '/pages/index1/index1',
      imageUrl: '../../images/Sharing_to_friends.png',
      success: function (res) {
        wx.showToast({
          title: '快去抽奖吧！',
          icon: 'succes',
          duration: 3000,
          mask: true
        }),
        setTimeout(function () {
          //转发成功后返回抽奖页面
          that.RecycleShare();
        }, 3000)
      },
      fail: function (res) {
        console.log("转发失败", res);
      }
    }
  },

  RecycleShare: function () {
    var that = this;
    that.setRecycleShareParams(app.globalData.openId, 'true');
    wx.request({
      url: common.common.BaseUrl + common.common.RecycleShare,
      data: {
        params: JSON.stringify(that.data.setRecycleShareParams),
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: function (res) {
        //成功分享后增加一次抽奖机会，跳转到抽奖页面
        wx.navigateTo({
          url: '../resultPrize/resultPrize'
        })
      },
      fail: function (err) {
        console.log(err.errMsg)
      },
    })
  },

   //返回
  backOnclick:function(){
    wx.navigateTo({
      url: '../resultPrize/resultPrize'
    })
  },

  setRecycleShareParams: function (openId, status) {
    this.setData({
      setRecycleShareParams: {
        openId: openId,
        status: status,
      },
    })
  },

  setUserInfoOrMobileParam: function (openId, iv, encryptedData) {
    this.setData({
      setUserInfoOrMobileParam: {
        openId: openId,
        iv: iv,
        encryptedData: encryptedData,
      }
    })
  },

})