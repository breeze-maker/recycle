
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

  SetShareText: function (res) {
    var that = this;
    console.log('分享页面')
    console.log(app.globalData.val)

    var price = app.globalData.val.split("&price=")[1];
    var percent = app.globalData.val.split("&price=")[0].split("&percent=")[1];

    // function circleImg(ctx, img, x, y, r) {
    //   ctx.save();
    //   var d = 2 * r;
    //   var cx = x + r;
    //   var cy = y + r;
    //   ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    //   ctx.clip();
    //   ctx.drawImage(img, x, y, d, d);
    //   ctx.restore();
    // };

    let promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../images/share_ico1.png',
        success: function (res) {
          console.log('绘制二维码')
          resolve(res);
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      var BackgroundUrl = '';
      if (price == 300) {
        BackgroundUrl = '../../images/share_ico5.png'
      } else if (300 < price <= 500) {
        BackgroundUrl = '../../images/share_ico4.png'
      } else if (500 < price <= 1000) {
        BackgroundUrl = '../../images/share_ico3.png'
      } else if (1000 < price <= 2000) {
        BackgroundUrl = '../../images/share_ico2.png'
      } else if (2000 < price) {
        BackgroundUrl = '../../images/share_ico1.png'
      }
      wx.getImageInfo({
        src: BackgroundUrl,
        success: function (res) {
          console.log('绘制背景')
          resolve(res);
        }
      })
    });
    Promise.all([
      promise1, promise2
    ]).then(res => {
      console.log(res)
      const ctx = wx.createCanvasContext('shareImg')

      //主要就是计算好各个图文的位置
      ctx.drawImage('../../' + res[0].path, 158, 190, 210, 210)
      ctx.drawImage('../../' + res[1].path, 0, 0, 545, 771)

      // var img = new Image();
      // img.src = app.globalData.avatarUrl;
      // var canvas1 = document.querySelector("#canvas1");
      // var context1 = canvas1.getContext("2d"); 
      // circleImg(context1, img, 545 / 10 * 3, 180, 50);

      ctx.setTextAlign('center')
      ctx.setFillStyle('#000000')
      ctx.setFontSize(36)
      ctx.fillText(app.globalData.nickName, 545 / 2, 200)//姓名

      ctx.setFontSize(16)
      ctx.setFillStyle('#666666')
      ctx.fillText('微信用户', 545 / 2, 240)

      ctx.setFontSize(22)
      ctx.setFillStyle('#666666')
      ctx.fillText('刚刚评估了', 545 / 2, 320)

      // ctx.setFillStyle('#ff9500') 
      // ctx.fillText(app.globalData.modelName, 545 / 10 * 3, 360)

      ctx.setFillStyle('#666666')

      var mModelName = app.globalData.modelName;

      if (mModelName.indexOf("（") > -1) {
        mModelName = mModelName.split("（")[0];
      }
      ctx.fillText(mModelName + '  的价格为', 545 / 10 * 4, 360)
      ctx.setFillStyle('#ff9500')
      ctx.fillText(price + '元', 545 / 10 * 7, 360)

      ctx.setFillStyle('#666666')
      ctx.fillText('打败了全国', 545 / 9 * 3, 400)
      ctx.fillText('的估价用户', 545 / 9 * 6, 400)

      ctx.setFillStyle('#ff9500')
      ctx.fillText(percent + '%', 545 / 4 * 2, 400)

      ctx.stroke()
      ctx.draw()
    });

   var that=this;
   wx.showLoading({
     title: '正在生成中...'
   })
    setTimeout(function () {
      wx.hideLoading();
      that.share2();
    }, 1000)
  },

  setRecycleShareParams: function (openId, status) {
    this.setData({
      setRecycleShareParams: {
        openId: openId,
        status: status,
      },
    })
  },

  share3:function(){
    var that=this;
    console.log("nickName=" + app.globalData.nickName)
    if (app.globalData.nickName != ""){
      that.share2();
    }else{
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {// 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                console.log("res.userInfo.nickName=" + res.userInfo.nickName);
                app.globalData.avatarUrl = res.userInfo.avatarUrl;
                app.globalData.nickName = res.userInfo.nickName;
                
                that.SetShareText();
                //获取用户信息并上传
                that.setUserInfoOrMobileParam(app.globalData.openId, res.iv, res.encryptedData);
                wx.request({
                  url: common.common.BaseUrl + common.common.GetUserInfo,
                  data: {
                    params: JSON.stringify(that.data.setUserInfoOrMobileParam),
                  },
                  method: 'POST',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },

                  success: function (res) {
                  
                  },
                  fail: function (err) {
                    wx.navigateTo({
                      url: '../resultPrize/resultPrize'
                    })
                  },
                })
              }
            })
          }
        }
      })

    }
    
  },

  /**
   * 生成分享图
  */
  share2: function () {
    var that = this
    wx.showLoading({
      title: '努力生成中...'
    })
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 545,
      height: 771,
      destWidth: 545,
      destHeight: 771,
      canvasId: 'shareImg',
      success: function (res) {
        console.log(res.tempFilePath);
        that.setData({
          prurl: res.tempFilePath,
          hidden: false
        })
        wx.hideLoading()
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 保存到相册
  */
  save: function () {
    var that = this;
    //生产环境时 记得这里要加入获取相册授权的代码
    wx.saveImageToPhotosAlbum({
      filePath: that.data.prurl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好哒',
          confirmColor: '#72B9C3',
          success: function (res) {
            if (res.confirm) {//用户点击确定
              that.setData({
                hidden: true
              })
              wx.navigateTo({
                url: '../resultPrize/resultPrize'
              })

            }
          }
        })
      }
    })
  },

  //返回
  backOnclick: function () {
    wx.navigateTo({
      url: '../resultPrize/resultPrize'
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