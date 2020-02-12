import {request} from "../../request/request.js"
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
    // 切换左侧菜单的时候右侧菜单保持置顶显示
    scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 缓存技术
    // 用本地存储的方法  去判断有没有旧的数据，没有就发送请求，有就不用发送，使用本地的
    const localityData = wx.getStorageSync("commodity");
    // 不存在本地数据的时候
    if(!localityData){
      this.getData()
    }else{
      // 已经有数据的时候  定义过期时间
      if(Date.now()-localityData.time>1000*10){
        // 超过这个时间的时候就需要重新发送请求
        this.getData()
      }else{
        this.commodityClassify = localityData.data
        this.setData({
          leftMenuList: this.commodityClassify.map(v=>{
            return v.cat_name
          }),
          rightMenuList:this.commodityClassify[0].children
        })
      }
    }
  },

  // 发送请求获取分类数据
  async getData(){
    const res = await request({url: '/categories',method:"GET"})
    // 把返回的数据本地存储
    wx.setStorageSync("commodity", {time:Date.now(),data:res.data.message}),
    this.setData({
          commodityClassify: res.data.message,
          // 用数组map的方法构造左侧菜单的数据
          leftMenuList: res.data.message.map(v=>{
            return v.cat_name
          }),
          // 构造右侧商品数据
          rightMenuList:res.data.message[0].children
        })
  },

  // 点击事件
  handleItemTap(e){
    const {index}  = e.currentTarget.dataset
    // 点击对应的分类渲染对应的数据
    let rightData = e.currentTarget.dataset.indexid[index].children
    this.setData({  
      currentIndex:index,
      rightMenuList:rightData,
      scrollTop:0
    })
  }
})