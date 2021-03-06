import { request } from "../request/request";

// 获取用户的当前设置
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
                console.log("111");

            },
        });
    })
}

// 调起客户端小程序设置界面，返回用户设置的操作结果。
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
                console.log("222");

            }
        });
    })
}

// 获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
                console.log("123");

            }
        });
    })
}


// 显示模态对话框
export const showModal = ({content}) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: content,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
}

// 显示消息提示框
export const showToast = ({title}) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            mask: false,
            icon:"none",
            success: (res)=>{
                resolve(res)
            },
            fail: (err)=>{
                reject(err)
            },
        });
    })
}

// 登录后获取code
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout:10000,
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            },
        });
    })
}

// 发起微信支付
export const requestPayment = (datas) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            ...datas,
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            },
        });
    })
}