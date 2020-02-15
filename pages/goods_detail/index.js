import {request} from "../../request/request.js"
import {showToast} from "../../utils/asyncWx.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodityDetails: {},
    // 商品是否被收藏 默认没有
    isCollect:false
  },

  // 商品详情返回全部的总数据
  allData: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: async function () {
    let page = getCurrentPages()
    const {goods_id} = page[page.length - 1].options
    this.commodity(goods_id)
  },

  // 获取商品详情数据
  async commodity(goods_id) {
    const res = await request({
      url: '/goods/detail',
      data: {goods_id},
      method:"GET"
    })
    this.allData = res.data.message

    // 商品收藏 获取本地缓存 看是否存在数组中
    let collect = wx.getStorageSync("collect") || [];
    // 判断当前商品是否被收藏 以变量的形式判断 true为有 false为没有
    let isCollect = collect.some(v=>v.goods_id===this.allData.goods_id)


    this.setData({
      commodityDetails: {
        pics: res.data.message.pics,
        goods_name: res.data.message.goods_name,
        goods_price: res.data.message.goods_price,
        // iphone部分手机 不识别 webp图片格式
        // 临时自己修改 要确保后台有 1.webp => 1.jpg
        goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, ".jpg"),
      },
      isCollect
    })
  },

  // 点击轮播图放大预览
  previewImg(e) {
    const current = e.target.dataset.src.pics_mid
    // 图片数据（Array）
    const urls = this.allData.pics.map(v => {
      return v.pics_mid
    })
    wx.previewImage({
      current: current,
      urls: urls,
    });
  },

  // 点击加入购物车
  handleCartAdd() {
    // console.log(123);
    // 1.获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart") || [];

    // 2.判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.allData.goods_id)
    if (index === -1) {
      // 3.不存在 是第一次添加商品
      this.allData.num = 1 //购买数量为1

      this.allData.checked = true // 选中商品(购物车页面使用)

      cart.push(this.allData)
    } else {
      // 4.已经存在  多次添加商品 num++
      cart[index].num++
    }
    //5.把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    //6.弹窗提示 加入成功
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 是为了防止用户疯狂点击 设置为true点击一次5秒后 用户才可以再一次点击
      mask: true
    })
  },

  // 商品收藏
  async commodityCollect(){
    //  1.判断该商品是否存在于缓存中
    //  2.存在就删除
    //  3.不存在就添加   
    let isCollect = false
    // 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect") || [];
    // 判断商品是否被收藏果
     let index = collect.findIndex(v => v.goods_id===this.allData.goods_id)
     if(index!=-1){
      //  收藏过 删除该商品
      collect.splice(index,1)
      isCollect = false
      await showToast({title:"取消收藏"})
     }else{
      //  没有收藏过
      collect.push(this.allData)
      isCollect = true
      await showToast({title:"收藏成功"})
     }
    //  再把数组本地缓存
     wx.setStorageSync("collect", collect);
    //  再修改 data 中属性 isCollect的值
    this.setData({isCollect})
  }
})