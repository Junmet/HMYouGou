import {showToast} from "../../utils/asyncWx.js"
Page({
    data: {
        // 被选中图片的路径数组
        chooseImg: [],
        // 文本域的内容
        textVal: ""
    },
    // 外网的图片的路径数组
    UpLoadImgs: [],

    // 添加图片
    addImg() {
        // 调用小程序内置的选择图片api
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (result) => {
                this.setData({
                    chooseImg: [...this.data.chooseImg, ...result.tempFilePaths]
                })
            }
        });
    },
    // 删除图片
    removeImg(e) {
        const index = e.target.dataset.index
        const {chooseImg} = this.data
        chooseImg.splice(index, 1)
        this.setData({chooseImg})
    },
    // 文本域输入事件
    textVal(e) {
        const {value} = e.detail
        this.setData({textVal: value})
    },
    // 提交按钮事件
    async submitBtn() {
        const {textVal} = this.data
        if (!textVal.trim()) {
            await showToast({title: "内容不为空！！！"})
            return
        } else {
            await showToast({title: "提交成功！"})
            this.setData({textVal: ""})
            wx.navigateBack({delta: 1});
        }
        // chooseImg.forEach((v, i) => {
        //     // 准备上传图片 到专门的图片服务器
        //     wx.uploadFile({
        //         // 文件上传的到哪里的路径
        //         url: 'https://images.ac.cn/',
        //         // 被上传的路径
        //         filePath:v,
        //         // 上传文件的名称
        //         name:"file",
        //         // 上传文件时的文本信息附带
        //         formData: {},
        //         success: (result) => {
        //             console.log(result);
        //         },
        //         fail: () => {},
        //         complete: () => {}
        //     });
        // })
    }
})