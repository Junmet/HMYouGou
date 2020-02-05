import {request} from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodityDetails:{}
  },

  // 商品详情返回全部的总数据
  allData:{},

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
    this.allData = res.data.message
    this.setData({
      commodityDetails:{
        pics:res.data.message.pics,
        goods_name:res.data.message.goods_name,
        goods_price:res.data.message.goods_price,
        // iphone部分手机 不识别 webp图片格式
        // 临时自己修改 要确保后台有 1.webp => 1.jpg
        goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g,".jpg"),
      }
    })
  },

  // 点击轮播图放大预览
  previewImg(e){
    const current = e.target.dataset.src.pics_mid
    // 图片数据（Array）
    const urls = this.allData.pics.map(v=>{return v.pics_mid})
   wx.previewImage({
     current: current,
     urls: urls,
   }); 
  }
})