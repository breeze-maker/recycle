var common = {
  BaseUrl:'https://m-super.com',
  // BaseUrl: 'https://ananla.top',
  // BaseUrl:'http://134.98.83.132',


  //1.9.1换取openId
  GetOpenId: '/recycle/getOpenId.do',

  //1.9.2储存用户信息
  GetUserInfo: '/recycle/getUserInfo.do',

  //1.9.3储存用户机型信息
  GetModel:  '/recycle/getModel.do',

  //1.9.4储存用户手机号
  GetMobile: '/recycle/getMobile.do',

  //1.9.5储存用户地址，经纬度
  GetAddress: '/recycle/getAddress.do',

  //1.9.6是否需要授权手机号
  IsGetMobile:  '/recycle/isGetMobile.do',

  // 1.1.4通过机型名称获取productId等信息
  GetProductId: '/recycle/getProductId.do',

  //1.9.9小程序分享事件
  RecycleShare: '/recycle/recycleShare.do',

  //1.9.11保存抽奖人收货信息
  SavePrizeNews:'/recycle/savePrizeNews.do',

  //1.9.14判断是否需要重新获取收货信息
  IsSaveAddress:'/recycle/isSaveAddress.do',
}

module.exports.common = common;
