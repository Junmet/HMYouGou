import {
  request
} from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待收货",
        isActive: false
      }
    ],
    // 订单数据
    orders:[]
  },


  onShow: function () {
    const token = wx.getStorageSync("token");
    // 没有token值 跳转授权页面
    if(!token) {
      wx.navigateTo({url: '/pages/auth/index',});
      return;
    }
    
    // 获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。
    let page = getCurrentPages()
    // 获取页面参数
    const type = page[page.length - 1].options
    // 调用获取订单数据
    this.getOrder(type)
  },

  // 获取订单数据
  async getOrder(type) {
    // 获取token值
    const token = wx.getStorageSync("token");
    // 请求头
    const header = {Authorization: token}
    // 发送求
    const res = await request({
      url: "/my/orders/all",
      header:header,
      data:type
    })
    const {orders} = res.data.message
    this.setData({orders})
  },

  onMyevent(e) {
    // 获取被点击的索引值
    const {
      index
    } = e.detail
    // 修改原数组
    const {
      tabs
    } = this.data
    // 遍历数组
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  }
})