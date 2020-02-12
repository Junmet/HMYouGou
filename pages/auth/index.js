import {login} from "../../utils/asyncWx.js"
import {request} from "../../request/request.js"
Page({
  // 获取用户信息
 async GetUserInfo(e){
   try {
    const {encryptedData,rawData,iv,signature} = e.detail
    const {code} = await login()
    const loginParams = {encryptedData,rawData,iv,signature,code}
    // 发送请求 获取token值
    const res = await request({url:"/users/wxlogin",data:loginParams,method:"POST"})
    const {token} = res.data.message
    // 本地存储token值
    wx.setStorageSync("token", token);

    // 返回上一页
    wx.navigateBack({
      delta: 1
    });
   } catch (error) {
     console.log(error);
     
   }
  },
})