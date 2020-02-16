Page({
    data:{
        // 被选中图片的路径数组
        chooseImg:[]
    },
    addImg(){
        // 调用小程序内置的选择图片api
        wx.chooseImage({
            count: 9,
            sizeType: ['original','compressed'],
            sourceType: ['album','camera'],
            success: (result)=>{
                   this.setData({
                       chooseImg:[...this.data.chooseImg,...result.tempFilePaths]
                    })
            }
        });
    }
})