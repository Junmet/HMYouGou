import {BASE_URL} from "./url.js"

// 同时发送异步请求的次数 主要类似针对与主页面的3个异步请求数据
let ajaxNumber=0

export const request = (params) => {
    // console.log(params);
    ajaxNumber++
    // 添加请求后的遮障 提示窗口
    wx.showLoading({
        title: "正在加载....",
        mask: true
    })
    return new Promise((resolve, reject) => {
        wx.request({
            url: BASE_URL + params.url,
            data: params.data,
            method:params.method,
            // 解构写法
            // ...params,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxNumber--
                if(ajaxNumber===0){
                    // 关闭提示正在加载中的窗口
                    wx.hideLoading();
                }
            }
        });
    })
}