
Page({
  GetUsermessage(e){
    const userinfo = e.detail.userInfo
    wx.setStorageSync("userinfo", userinfo);
    wx.navigateBack({delta: 1});
  }
})