import {requestPayment, showToast} from "../../utils/asyncWx.js"
import {request} from "../../request/request.js"
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
  async payment() {
    try {
      // 判断缓存中是否有token值
      const token = wx.getStorageSync("token");
      // 判断
      if (!token) {
        wx.navigateTo({url: '/pages/auth/index'});
        return
      }
      // 请求头
      const header = {Authorization: token}
      //请求体参数
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.siteMessages.all
      // goods数组参数
      let goods = []
      this.data.cart.forEach((v) => {
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price
        })
      })
      let payOrder = {order_price,consignee_addr,goods}
      // 发送请求创建订单
      const res = await request({
        url: "/my/orders/create",
        header: header,
        data: payOrder,
        method: "POST"
      })
      // 订单编号
      const order_number = res.data.message.order_number
      // 预支付
      const payParameter = await request({
        url: "/my/orders/req_unifiedorder",
        header: header,
        data: {order_number},
        method: "POST"
      })
      const {pay} = payParameter.data.message
      // 发起微信支付    
      await requestPayment(pay)
      // 查看订单支付状态
      const paymentState = await request({
        url: "/my/orders/chkOrder",
        header: header,
        data: {order_number},
        method: "POST"
      })
      // 支付成功提示
      await showToast({title:"支付成功"})
      // 支付成功后跳转订单页
      wx.navigateTo({url: '/pages/order/index'});
    } catch (error) {
      await showToast({title:"支付失败"})
      console.log(error);
    }
  }
})