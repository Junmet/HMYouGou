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
    goodsList: []
  },
  // 请求参数
  QueryParams: {
    query: "", //关键字
    cid: "", //分类id
    pagenum: 1, //页码
    pagesize: 10 //页容量
  },
  // 总页数
  totalPages: 1,

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
      success: (res) => {
        const {message} = res.data
        // 总条数
        const total = res.data.message.total
        // 总页数 = 总条数（total） / 一页显示多少条数据的页容量（pagesize）
        this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
        this.setData({
          // 拼接数组
          goodsList: [...this.data.goodsList,...message.goods]
        })
      }
    })
    // 当请求成功后 关闭下拉刷新的窗口
    wx.stopPullDownRefresh()
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
  // 页面上拉触底事件
  onReachBottom: function () { 
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({title: '没有数据了'})
    }else{
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },
  onPullDownRefresh: function() {
    // 触发下拉刷新时执行
    // 重置数组
    this.setData({
      goodsList:[]
    })
    // 重置页码
    this.QueryParams.pagenum = 1
    // 再次发送请求
    this.getGoodsList()
  }
})