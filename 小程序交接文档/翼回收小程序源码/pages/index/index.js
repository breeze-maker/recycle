const app = getApp();
var amapFile = require('../../libs/amap-wx.js');
var common = require('../../common/common.js');
var markersData = {
  latitude: '',//纬度
  longitude: '',//经度
  key: "58332c0da8f11a4bd9ed7eaa1df73d88"//你申请的高德地图key
};

Page({
  textM: 0,
  textN: '元旦快乐！元旦快乐！元旦快乐！元旦快乐！',
  textW: 0,
  textL: 50, 

  /**
   * 这里处理滚动事件处理
   */
  listenSwiper: function (e) {
    //打印信息

  },

  onShareAppMessage: function () {
    return {
      title: '你的手机还值多少钱，要不我送一部。你的手机还值多少钱，要不我送一部。',
      desc: '你的手机还值多少钱，要不我送一部。',
      path: '/pages/index/index'
    }
  },
  

  setJsCode: function (code) {
    this.setData({
      setCodeParams: {
        code: code,
      },
    })
  },

  setModelParam: function (openId, brand, model) {
    this.setData({
      setModelParam: {
        openId: openId,
        brand: brand,
        model: model,
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

  setAddressParams: function (openId, address, longitude, latitude) {
    this.setData({
      setAddressParam: {
        openId: openId,
        address: address,
        longitude: longitude,
        latitude: latitude,
      }
    })
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    let promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../images/qrcode.jpg',
        success: function (res) {
          console.log('绘制二维码')
          resolve(res);
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../images/qrbg.png',
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

      ctx.setTextAlign('center')
      ctx.setFillStyle('#ffffff')
      ctx.setFontSize(22)
      ctx.fillText('分享文字描述1', 545 / 2, 130)
      ctx.fillText('分享文字描述2', 545 / 2, 160)

      ctx.stroke()
      ctx.draw()
    });


    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          that.setJsCode(res.code);

          that.GetOpenId();
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });


    // var that = this;
    // var textM = 20;
    // //获取屏幕宽度的封装方法
    // var phoneWidth = util.nowPhoneWH()[0];
    // //文字宽度=文字长度+字体大小
    // var textW = parseInt(Number(that.data.textN.length) * 12);
    // that.setData({ textW: textW, textL: phoneWidth });
    // if (phoneWidth > textW) {
    //   var centerL = Number(phoneWidth / 2) - (Number(textW) / 2)
    //   that.setData({ textL: centerL });
    // } else {
    //   var textTime = setInterval(function () {
    //     var textL = that.data.textL;
    //     if (textL < -(textW - 20)) {
    //       that.setData({ textL: phoneWidth })
    //       return
    //     }
    //     textL -= 2;
    //     that.setData({ textL: textL })
    //   }, 30)
    // }

  },

  //定位获取当前位置
  GetLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        markersData.latitude = res.latitude;
        markersData.longitude = res.longitude;
        that.Map();
      }
    });
  },

  Map: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: markersData.key });
    myAmapFun.getRegeo({
      success: function (data) {
        that.setData({
          longitude: markersData.longitude,
          latitude: markersData.latitude,
          formatted_address: data[0].regeocodeData.formatted_address,
        }),
          that.GetAddress();
      },
      fail: function (info) {
        console.log(info)
      }
    })
  },

  ToCheckSession: function (res) {
    var that = this;
    wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
        console.log('登录未过期！')
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程 
        console.log('登录已经失效！')
        // wx.login() //重新登录
      }
    })
  },

  //获取手机机型并显示
  setMobleName: function (name) {
    this.setData({
      mobleName: name
    })
  },

  //检测是否已保存手机号
  setOpenIdParams: function (id) {
    this.setData({
      setOpenIdParams: {
        openId: id
      },
    })
  },

  //根据手机平台设置为IOS图标或是android图标
  changeImg: function (name) {
    var i = name;
    if (name == 'android') {
      this.setData({
        mobleIco: '../image/moble_android.png'
      });
    } else {
      this.setData({
        mobleIco: '../image/moble_ios.png'
      });
    }
  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '../selectMoble/selectMoble'
    })
  },


  // 页面渲染完成
  onReady: function () {

  },

  //提交用户当前位置信息
  GetAddress: function () {
    var that = this;
    that.setAddressParams(that.data.openId, that.data.formatted_address, that.data.longitude, that.data.latitude),
      console.log(that.data.setAddressParam);
    wx.request({
      url: common.common.BaseUrl + common.common.GetAddress,
      data: {
        params: JSON.stringify(that.data.setAddressParam),
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("提交定位地址" + res.errMsg)
      },
      fail: function (err) {
        console.log(res.errMsg)
      },
    })
  },

  GetOpenId: function () {  
    var that = this;
    wx.request({
      url: common.common.BaseUrl + common.common.GetOpenId,
      data: {
        params: JSON.stringify(that.data.setCodeParams),
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: function (res) {
        that.setData({
          openId: res.data.result.openId,
        });
        that.CheckPhoneNumber();

        that.GetLocation();
        that.GetSystemInfo();
        that.GetUserInfo();

      },
      fail: function (err) {
        console.log(res.errMsg)
      },
    })
  },

  CheckPhoneNumber: function () {
    var that = this;

    that.setOpenIdParams(that.data.openId);
    wx.request({
      url: common.common.BaseUrl + common.common.IsGetMobile,
      data: {
        params: JSON.stringify(that.data.setOpenIdParams),
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: function (res) {
        console.log(res),
          that.setData({
            showView: res.data.result.mobile,
          });
      },
      fail: function (err) {
        console.log(res.errMsg)
        that.setData({
          showView: true,
        });
      },
    })
  },

  GetSystemInfo: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        that.setMobleName(res.model);
        if (res.system.indexOf("iOS") != -1) {
          that.changeImg('ios');
        } else {
          that.changeImg('android');
        };
        console.log('brand=' + res.brand);
        //获取手机信息并上传
        that.setModelParam(that.data.openId, res.brand, res.model);
        wx.request({
          url: common.common.BaseUrl + common.common.GetModel,
          data: {
            params: JSON.stringify(that.data.setModelParam),
          },
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },

          success: function (res) {
            console.log("getModel" + res.errMsg)
          },
          fail: function (err) {
            console.log(res.errMsg)
          },
        })
      }
    });
  },

  GetUserInfo: function () {
    var that = this;

    /************************新版增加授权提示**********************************/
    // wx.getSetting({// 查看是否授权
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) { // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console(res.userInfo)
    //         }
    //       })
    //     } else {
    //       console.log('获取用户信息授权失败！');
    //     }
    //   }
    // })

    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country

        //获取用户信息并上传
        that.setUserInfoOrMobileParam(that.data.openId, res.iv, res.encryptedData);
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
            console.log("getUserInfo" + res.errMsg)
          },
          fail: function (err) {
            console.log(res.errMsg)
          },
        })
      },
      Error: function (err) {

      }

    });
  },

  clickButton: function () {
    wx.navigateTo({
      url: '../selectMoble/selectMoble'
    })

    // this.setData({
    //   modal_hidden: false
    // });
  },

  //提交用户手机号
  GetPhoneNumber: function (iv, encryptedData) {
    var that = this;
    if (that.data.openId.length == 0) {
      console.log("openid为空，请稍后再试!");
    } else {
      //获取用户手机号并上传
      that.setUserInfoOrMobileParam(that.data.openId, iv, encryptedData);
      wx.request({
        url: common.common.BaseUrl + common.common.GetMobile,
        data: {
          params: JSON.stringify(that.data.setUserInfoOrMobileParam),
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },

        success: function (res) {
          // console.log("getMobile=" + res.errMsg)
          //跳转页面
          wx.navigateTo({
            url: '../selectMoble/selectMoble'
          })
        },
        fail: function (err) {
          // console.log(err.errMsg)
        },
      })
    }
  },

  //点击品牌跳转
  turntomenu1: function (event) {
    var that = this;
    var index = event.currentTarget.dataset.index;
    if(index == 0){//苹果
      wx.setStorageSync('url', 'https://m-super.com/ty_wap/product.html?bid=1&tip=1&fm=7');
      wx.navigateTo({
        url: '../product/product'
      });
    }else if(index == 1){//华为
      wx.setStorageSync('url', 'https://m-super.com/ty_wap/product.html?bid=6&tip=1&fm=7');
      wx.navigateTo({
        url: '../product/product'
      });
    }else if(index == 2){//小米
      wx.setStorageSync('url', 'https://m-super.com/ty_wap/product.html?bid=4&tip=1&fm=7');
      wx.navigateTo({
        url: '../product/product'
      });
    }
   
  },

  //点击品牌跳转
  turntomenu2: function (event) {
    var that = this;
    var index = event.currentTarget.dataset.index;
    if (index == 0) {
      wx.setStorageSync('url', 'https://m-super.com/ty_wap/product.html?bid=15&tip=1&fm=7');
      wx.navigateTo({
        url: '../product/product'
      });

      // //传递机型信息
      // try {
      //   wx.setStorageSync('project_id', '20171220141338338');
      //   wx.setStorageSync('img_href', 'http://114.215.210.238/resources/Mobile/iPhone8.png');
      //   wx.setStorageSync('model_name', 'iPhone 8 Plus');
      //   wx.setStorageSync('is_select', 'false');

      //   wx.navigateTo({
      //     url: '../selectTest/selectTest'
      //   });
      // } catch (e) {
      // }
    } else if (index == 1) {
      wx.setStorageSync('url', 'https://m-super.com/ty_wap/product.html?bid=16&tip=1&fm=7');
      wx.navigateTo({
        url: '../product/product'
      });
    } else if (index == 2) {
      wx.setStorageSync('url', 'https://m-super.com/ty_wap/product.html?bid=1&tip=1&fm=7');
      wx.navigateTo({
        url: '../product/product'
      });
    }

  },

  onShow: function () {
    // 页面显示
    wx.getSystemInfo({
      success: function (res) {

      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  GetPhoneNumberEvent: function (e) {
    var that = this;
    //检测Session有没有过期
    // that.ToCheckSession();
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      //未授权
    } else {
      //已授权
      that.GetPhoneNumber(e.detail.iv, e.detail.encryptedData);
    };

    // this.setData({
    //   modal_hidden: false
    // });
  },


  data: {
    hidden: true,
    arry1: [
      { src: "../image/apple.png" },
      { src: "../image/huawei.png" },
      { src: "../image/xiaomi.png" }
    ],
    arry2: [
      { src: "../image/oppo.png" },
      { src: "../image/vivo.png" },
      { src: "../image/more.png" },
    ],
    arry3: [
      { src: "../image/bottom_icon1.png", text: "顺丰包邮" },
      { src: "../image/bottom_icon2.png", text: "上门回收" },
      { src: "../image/bottom_icon3.png", text: "隐私安全" },
      { src: "../image/bottom_icon4.png", text: "快速打款" },
    ],

    imgUrls: [
      'https://m-super.com/ty_wap/img/swiper_item1.png',
      'https://m-super.com/ty_wap/img/swiper_item2.png',
    ],

    openId: '',

    setCodeParams: {
      code: '',
    },

    setOpenIdParams: {
      openId: '',
    },

    setUserInfoOrMobileParam: {
      openId: 1,
      iv: 1,
      encryptedData: 1,
    },

    setModelParam: {
      openId: '',
      brand: '',
      model: '',
    },

    setAddressParam: {
      openId: '',
      address: '',
      longitude: '',
      latitude: '',
    },

    latitude: '',//纬度
    longitude: '',//经度
    formatted_address: '',


    mobleIco: '../image/moble_android.png',
    mobleName: '选择机型',

    showView: false,

    modal_hidden: true,
    nocancel: false,
  },

  ModalCancel: function () {
    this.setData({
      modal_hidden: true
    });
  },
  ModalConfirm: function () {
    this.setData({
      nocancel: !this.data.nocancel
    });
    console.log("clicked confirm");
  },

  
  /**
   * 生成分享图
  */
  share: function () {
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
    var that = this
    console.log('开始保存');
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
            if (res.confirm) {
              console.log('用户点击确定');
              that.setData({
                hidden: true
              })
            }
          }
        })
      }
    })
  },



})
