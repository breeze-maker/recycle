const app = getApp();
var amapFile = require('../../libs/amap-wx.js');
var common = require('../../common/common.js');

Page({

  data: {
    lastPriceHidden: true,

    modelImageUrl:'../image/default_phone_ico.png',

    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    openId: '',

    modelName:'未知机型',

    setCodeParams: {code: '',},

    setOpenIdParams: { openId: ''},

   ProductIdParam:{
     openId:1,
     brand:1,
     modelName:1,
   },

   setsavePrizeNewsParams: {
     openId: '',
     mobile: '',
     name: '',
     province: '',
     city: '',
     area: '',
     street: '',
   },

   setIsSaveAddressParams: {
     openId:'',
   }
    
  },

  onLoad: function (options) {
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

    wx.getSystemInfo({
      success: function (res) {
        //把获取到的品牌、机型名称赋值给全局变量
        // res.brand="iPhone";
        // res.model ="iPhone 7 Plus<iPhone8,1>";

        res.brand ="iPhone";
        res.model ="iPhone 7 Plus<iPhone9,2>";

        // res.brand ="HUAWEI";
        // res.model ="HUAWEI NXT-AL10";
        
        if (res.brand == 'iphone' || res.brand == 'iPhone'){
          app.globalData.brand = 'apple';
          if (res.model.indexOf("<") > -1){ 
            app.globalData.modelCode = res.model.split("<")[1].split(">")[0];
          } else {
            app.globalData.modelCode = res.model;
          }
          
          console.log("name=" + res.model.split("<")[1].split(">")[0]);
        }else{
          app.globalData.brand =res.brand;
          app.globalData.modelCode = res.model;
        }
      }
    });
  },

  //点击立即回收跳转到选择品牌页面
  toSelectBrandOnClick:function(){
    var that = this;
    that.IsSaveAddress(app.globalData.openId, 2);
  },

  //点击评估抽奖
  toSelectMobileOnClick:function(){
    var that = this;
    
    that.IsSaveAddress(app.globalData.openId, 1);
  },

  //1.9.14判断是否需要重新获取收货信息
  IsSaveAddress: function (openId, type){
    var that = this;
    that.setIsSaveAddressParams(openId);
    wx.request({
      url: common.common.BaseUrl + common.common.IsSaveAddress,
      data: {
        params: JSON.stringify(that.data.setIsSaveAddressParams),
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: function (res) {
        if (res.data.result.isSave){
          if (app.globalData.modelName == "") {
            wx.navigateTo({
              url: '../product/product'
            })
          } else {
            if (type == 1) {
              wx.navigateTo({
                url: '../resultPrize/resultPrize'
              })
            } else if (type == 2) {
              wx.navigateTo({
                url: '../product/product'
              })
            }
          }
         
        }else{
          //获取用户收货地址
          wx.chooseAddress({
            success: function (res) {
              that.SavePrizeNews(app.globalData.openId, res.telNumber, res.userName, res.provinceName, res.cityName, res.countyName, res.detailInfo, 1);
            },
            fail: function (res) {
              wx.showToast({
                title: '授权失败！',
                icon: 'succes',
                duration: 3000,
                mask: true
              })
            }
          })
        }

      },
      fail: function (err) {
        console.log(err.errMsg)
      },
    })
  },

  //保存收货信息
  SavePrizeNews: function (openId, mobile, name, province, city, area, street,type) {
    var that = this;
    that.setsavePrizeNewsParams(openId, mobile, name, province, city, area, street);
    wx.request({
      url: common.common.BaseUrl + common.common.SavePrizeNews,
      data: {
        params: JSON.stringify(that.data.setsavePrizeNewsParams),
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: function (res) {
        //保存收货信息成功,跳转到出价页面
        if(type == 1){
          wx.navigateTo({
            url: '../resultPrize/resultPrize'
          })
        }else if(type == 2){
          wx.navigateTo({
            url: '../product/product'
          })
        }
      },
      fail: function (err) {
        console.log(err.errMsg)
      },
    })

  },

  //根据品牌、机型获取对应的产品Id
  GetProductId:function(){
    var that=this;
    that.ProductIdParam(app.globalData.openId, app.globalData.brand, app.globalData.modelCode);
    wx.request({
      url: common.common.BaseUrl+ common.common.GetProductId,
      data:{
        params: JSON.stringify(that.data.ProductIdParam),
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res);
        if (res.data.success == true){
            that.setMobleName(res.data.result.modelName),//设置界面手机名称
            that.setMobleLastPrice(res.data.result.lastPrice);//设置界面手机上次回收价格
            if(res.data.result.goodPrice){
              that.setMobleGoodPrice(res.data.result.goodPrice)
            } else {
              that.setMobleGoodPrice(0)
            };

            that.setData({
              modelImageUrl: res.data.result.modelLogo,
            }),//设置手机图片

            app.globalData.lastPrice = res.data.result.lastPrice,
            app.globalData.modelName = res.data.result.modelName,
            app.globalData.productId = res.data.result.productId,
            app.globalData.brandId = res.data.result.brandId,
            app.globalData.brand = res.data.result.brand,
            app.globalData.modelId = res.data.result.modelId,
            app.globalData.modelImageUrl = res.data.result.modelLogo

            if (res.data.result.lastPrice !== null && res.data.result.lastPrice !== undefined && res.data.result.lastPrice !== '') {
              that.setData({
                lastPriceHidden: false,
              })
            } else {
              that.setData({
                lastPriceHidden: true,
              })
            }
        }else{
         //请求失败
          that.setData({
            modelImageUrl: '../image/default_phone_ico.png',
          });
          that.setMobleGoodPrice(0)
        }
 
      },
      fail: function (err) {
       
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
        app.globalData.openId=res.data.result.openId;
        that.setData({
          openId: res.data.result.openId,
        });

        //获得当前机型名称及上次估价价格、良品价格
        that.GetProductId();
      },
      fail: function (err) {
        console.log(err.errMsg)
      },
    })
  },


  setJsCode: function (code) {
    this.setData({
      setCodeParams: {
        code: code,
      },
    })
  },

  ProductIdParam:function(openId,brand,modelName){
    this.setData({
      ProductIdParam:{
        openId: openId,
        brand: brand,
        modelName: modelName,
      }
    })
  },

  //获取手机机型并显示
  setMobleName: function (modelName) {
    this.setData({
      modelName: modelName
    })
  },
  setMobleLastPrice: function (lastPrice){
    this.setData({
      lastPrice: lastPrice
    })
  },
  setMobleGoodPrice: function (goodPrice) {
    this.setData({
      goodPrice: goodPrice
    })
  },

  setsavePrizeNewsParams: function (openId, mobile, name, province, city, area, street) {
    this.setData({
      setsavePrizeNewsParams: {
        openId: openId,
        mobile: mobile,
        name: name,
        province: province,
        city: city,
        area: area,
        street: street,
      },
    })
  },

  setIsSaveAddressParams: function (openId){
    this.setData({
      setIsSaveAddressParams:{
        openId: openId
      }
    })
  }
  
})