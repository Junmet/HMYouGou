import {request} from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    carousel: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,

    // 导航数据
    navigationimg: [],

    // 商品详情数据
    commodity: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 轮播图请求
    this.slideshow()

    //导航请求
    this.navigation()

    //商品详情
    this.towerTier()
  },

  // 轮播图方法
  async slideshow(){
    const res = await request({url: '/home/swiperdata',method:"GET"})
    //获取到的图片集赋值给data的轮播图数组
    this.setData({carousel: res.data.message})
  },

  // 导航方法
  async navigation(){
    const res = await request({url: '/home/catitems',method:"GET"})
    // console.log(res);
    this.setData({navigationimg: res.data.message})
  },

  // 楼层方法
  async towerTier(){
    const res = await request({url: '/home/floordata',method:"GET"})
    // console.log(res);
    this.setData({ commodity: res.data.message})
  }
})