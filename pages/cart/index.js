// pages/cart/index.js
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
  // 点击获取收货地址
  getSite() {
    // 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。看scope.address 是true、false
    wx.getSetting({
      success: (result) => {
        const scopeAddress = result.authSetting["scope.address"]
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (res) => {
              console.log(res);
              
            },
          });
        } else {
          // 3. 用户 拒绝过授予权限 先诱导用户打开授权页面
          wx.openSetting({
            success: (result) => {
              wx.chooseAddress({
                success: (res2) => {
                  console.log(res2);
                }
              });
            }
          });
        }
      }
    });
  }
})