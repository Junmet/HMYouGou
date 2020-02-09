import {getSetting,openSetting,chooseAddress} from "../../utils/asyncWx.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    siteMessages:{},
    cart:[],// 购物车数据
    allchk:false, //全选参数
    totalPrice:0, //选中的总价格
    totalNum:0 //选中的总数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow: function() {
    // 页面出现在前台时执行
    const siteMessages = wx.getStorageSync("siteMessage");

    // 获取本地存储中的购物车数据
    const cart = wx.getStorageSync("cart")||[];

    // 全选效果
    // const allchk = cart.length?cart.every((v)=>v.checked):false

    // 总价格 总数量
    let allchk = true
    let totalNum =0
    let totalPrice =0
    cart.forEach((v)=>{
      if(v.checked){
        // 总价格
        totalPrice +=v.num * v.goods_price
        // 总数量
        totalNum += v.num
      }else{
        allchk=false
      }
    })

    // 空数组不会执行forEach  所以防止cart 为空数组的时候 进行判断 数组是否为空
    allchk = cart.length!=0?allchk:false

    this.setData({
      siteMessages:siteMessages,
      cart:cart,
      allchk:allchk,
      totalPrice:totalPrice,
      totalNum:totalNum
    })
  },

  // 点击获取收货地址 try catch 方法可以把报错处理掉
  async getSite() {
    try {
      const res = await getSetting()
      const scopeAddress = res.authSetting["scope.address"]
      if (scopeAddress === false) await openSetting()
      let res2 = await chooseAddress()
      // 拼接地址
      res2.all = res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo
      // 把获取到的地址本地存储
      wx.setStorageSync("siteMessage", res2);
    } catch (error) {
    }
  }
})