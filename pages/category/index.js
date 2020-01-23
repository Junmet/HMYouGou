// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品分类总数据
    commodityClassify: [],
    // 左侧数据
    leftMenuList: [],
    // 右侧数据
    rightMenuList:[],
    // 左侧被点击是的变量 经索引值判断
    currentIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 获取商品分类数据
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/categories',
      method: 'GET',
      success: function (res){
        that.setData({
          commodityClassify: res.data.message,
          // 用数组map的方法构造左侧菜单的数据
          leftMenuList: res.data.message.map(v=>{
            return v.cat_name
          }),
          // 构造右侧商品数据
          rightMenuList:res.data.message[0].children
        })
      },
    })
  },
  // 点击事件
  handleItemTap(e){
    const {index}  = e.currentTarget.dataset
    // 点击对应的分类渲染对应的数据
    let rightData = e.currentTarget.dataset.indexid[index].children
    this.setData({  
      currentIndex:index,
      rightMenuList:rightData
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