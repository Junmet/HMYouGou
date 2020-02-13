// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"全部",
        isActive: true
      },
      {
        id:1,
        value:"待付款",
        isActive: false
      },
      {
        id:2,
        value:"待收货",
        isActive: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  onMyevent(e){
    const {index} = e.detail
    const {tabs} = this.data
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({tabs})
  }
})