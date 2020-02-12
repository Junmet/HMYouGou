import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast
} from "../../utils/asyncWx.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    siteMessages: {},
    cart: [], // 购物车数据
    totalPrice: 0, //选中的总价格
    totalNum: 0 //选中的总数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow: function () {
    // 页面出现在前台时执行
    const siteMessages = wx.getStorageSync("siteMessage");

    // 获取本地存储中的购物车数据
    let cart = wx.getStorageSync("cart") || [];

    // 支付是checked===true的时候才进行支付 那样我们就把他过滤出来（filter）
    cart = cart.filter((v) => v.checked === true)

    let totalNum = 0
    let totalPrice = 0
    cart.forEach((v) => {
      // 总价格
      totalPrice += v.num * v.goods_price
      // 总数量
      totalNum += v.num
    })
    this.setData({
      cart: cart,
      totalPrice: totalPrice,
      totalNum: totalNum,
      siteMessages: siteMessages
    })
  },

  //点击 支付
  payment() {
    // 判断缓存中是否有token值
    const token = wx.getStorageSync("token");
    // 判断
    if (!token) {
      wx.navigateTo({url: '/pages/auth/index'});
      return
    }
    console.log(123);
  }
})