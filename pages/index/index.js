Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    carousel:[],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,

    // 导航数据
    navigationimg:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 轮播图请求
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      method: 'GET',
      success: (res) => {
        // console.log(res)
        //获取到的图片集赋值给data的轮播图数组
        this.setData({
          carousel: res.data.message
        })
      }
    });

    // 导航请求
    wx:wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      method: 'GET',
      success:(res) => {
        console.log(res)
        this.setData({
          navigationimg: res.data.message
        })
      },

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})