import {request} from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodityDetails:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const {goods_id} = options
    this.commodity(goods_id)
  },

  // 获取商品详情数据
  async commodity(goods_id){
    const res = await request({url:'/goods/detail',data:{goods_id}})
    this.setData({commodityDetails:res.data.message})
  }
})