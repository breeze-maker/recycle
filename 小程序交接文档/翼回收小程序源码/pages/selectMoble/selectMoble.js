const app = getApp()

Page({
  onShareAppMessage(options) {
    console.log(options.webViewUrl)
  
  },

  bindGetMsg(e){
    var that = this;

    console.log(e);
    var test = e.detail.data[0].val;
    app.globalData.val=test;
    console.log(app.globalData.val);
  },

  data:{
    val: '',

  },

}) 