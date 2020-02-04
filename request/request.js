import {
    BASE_URL
} from "./url.js"
export const request = (params) => {
    console.log(params);
    
    // 添加请求后的遮障
    wx.showLoading({
        title: "正在加载....",
        mask: true
    })
    return new Promise(function (resolve, reject) {
        wx.request({
            url: BASE_URL + params.url,
            data: params.data,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                wx.hideLoading();
            }
        });
    })
}