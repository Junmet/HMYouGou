// 获取用户的当前设置
export const getSetting = () => {
    return new Promise ((resolve,reject)=>{
        wx.getSetting({
            success: (res)=>{
                resolve(res)
            },
            fail: (err)=>{
                reject(err)
                console.log("111");
                
            },
        });
    })
}

// 调起客户端小程序设置界面，返回用户设置的操作结果。
export const openSetting = () => {
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (res)=>{
                resolve(res)
            },
            fail: (err)=>{
                reject(err)
                console.log("222");
                
            }
        });
    })
}

// 获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。
export const chooseAddress = () => {
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (res)=>{
                resolve(res)
            },
            fail: (err)=>{
                reject(err)
                console.log("123");
                
            }
        });
    })
}