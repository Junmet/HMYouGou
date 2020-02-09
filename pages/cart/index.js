import {getSetting,openSetting,chooseAddress,showModal} from "../../utils/asyncWx.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    siteMessages: {},
    cart: [], // 购物车数据
    allchk: false, //全选参数
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
    const cart = wx.getStorageSync("cart") || [];

    this.setData({siteMessages: siteMessages})

    this.setCart(cart)
  },

  // 点击获取收货地址 try catch 方法可以把报错处理掉
  async getSite() {
    try {
      const res = await getSetting()
      const scopeAddress = res.authSetting["scope.address"]
      if (scopeAddress === false) await openSetting()
      let res2 = await chooseAddress()
      // 拼接地址
      res2.all = res2.provinceName + res2.cityName + res2.countyName + res2.detailInfo
      // 把获取到的地址本地存储
      wx.setStorageSync("siteMessage", res2);
    } catch (error) {}
  },

  // 取消复选框选项的时候触发
  cancelOption(e) {
    // 获取被修改的id
    const goods_id = e.target.dataset.id
    //解构出data里面的cart 拿取cart数据
    const {cart} = this.data
    //找到对应的goods_id的索引值
    const index = cart.findIndex(v => v.goods_id === goods_id)
    //然后找到对应得索引值后把checked取反  从true => false
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },

  // 封装 计算总价格 总数量 还有全选的状态值
  setCart(cart) {
    let allchk = true
    let totalNum = 0
    let totalPrice = 0
    cart.forEach((v) => {
      if (v.checked) {
        // 总价格
        totalPrice += v.num * v.goods_price
        // 总数量
        totalNum += v.num
      } else {
        allchk = false
      }
    })
    // 空数组不会执行forEach  所以防止cart 为空数组的时候 进行判断 数组是否为空
    allchk = cart.length != 0 ? allchk : false
    this.setData({cart: cart,allchk: allchk,totalPrice: totalPrice,totalNum: totalNum})
    wx.setStorageSync("cart", cart);
  },

  //   全选 取反 事件
  allpitchon() {
    // 把data里面的allchk cart 解构出来
    let {allchk,cart} = this.data
    // 取反
    allchk = !allchk
    // 遍历cart数组 修改 checked
    cart.forEach(v => {v.checked = !v.checked})
    this.setCart(cart)
  },

  // 商品的添加数量 和减少数量功能
  async addSubtractQuantity(e) {
    const goods_id = e.target.dataset.id
    const operation = e.target.dataset.operation
    let {cart} = this.data
    // 根据id找到对用的索引值
    const index = cart.findIndex(v => v.goods_id === goods_id)
    if (cart[index].num === 1 && operation === -1) {
      const res = await showModal({content: "你确定要删除嘛?"})
      if (res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      }
    } else {
      // 数量修改
      cart[index].num += operation
      this.setCart(cart)
    }
  }
})