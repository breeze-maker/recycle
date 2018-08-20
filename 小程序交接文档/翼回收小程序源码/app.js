//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => { 
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    val:"",//估价URL信息传递给H5页面
    openId:'',//当前小程序用户openId
    brand:'',//手机品牌
    brandId:'',//手机品牌ID
    modelName:'',//手机名称
    modelCode:'',//手机标识码（小程序获取的机型码）
    productId:'',//产品ID
    modelId:'',//手机机型ID
    lastPrice:'',//上次估价价格
    modelImageUrl:'',//手机图片

    avatarUrl:'',//微信用户头像地址
    nickName:'',//微信昵称

    percent: '',//击败用户百分百
    price:'',//手机的估价
    prizeMobile: "",//参加抽奖的手机号码
  }
})