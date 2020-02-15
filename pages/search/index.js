import {request} from "../../request/request.js"
import {showToast} from "../../utils/asyncWx.js"
Page({
  data: {
    // 搜索列表数据
    goods:[]
  },
  // 输入框输入的值
  values:"",
  // 输入框的值改变 就会触发这个事件
   searchCommodity(e){
    const {value} = e.detail
    this.values = value
  },

  // 点击搜索按钮时 触发
  async searchBtn(){
    let query = this.values
    if(!query.trim()){
      await showToast({title:"输入不合法"})
      return
     }
    const res = await request({url:"/goods/search",method:"GET",data:{query}})
    const goods = res.data.message.goods
    this.setData({goods})
  }
})