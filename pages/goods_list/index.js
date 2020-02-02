import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    // 商品列表数据
    goodsList:[]
  },
  // 请求参数
  QueryParams: {
    query: "", //关键字
    cid: "", //分类id
    pagenum: 1, //页码
    pagesize: 10 //页容量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },

  // 发送请求获取商品列表数据
  getGoodsList() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/goods/search',
      method: 'GET',
      data: this.QueryParams,
      success:(res) => {
        const {message} = res.data
        this.setData({
          goodsList:message.goods
        })
      }
    })

  },
  onMyevent(e) {
    // console.log(e);
    // 获取点击索引值  是从子组件传递过来的值
    const {
      index
    } = e.detail
    // 修改tabs数组
    let {
      tabs
    } = this.data
    tabs.forEach((v, i) => {
      if (i === index) {
        v.isActive = true
      } else {
        v.isActive = false
      }
    })
    this.setData({
      tabs
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

  }
})