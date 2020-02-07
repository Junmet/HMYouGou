import {getSetting,openSetting,chooseAddress} from "../../utils/asyncWx.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 点击获取收货地址 try catch 方法可以把报错处理掉
  async getSite() {
    try {
      const res = await getSetting()
      const scopeAddress = res.authSetting["scope.address"]
      if (scopeAddress === false) await openSetting()
      const res2 = await chooseAddress()
      // 把获取到的地址本地存储
      wx.setStorageSync("siteMessage", res2);
    } catch (error) {
    }
  }
})