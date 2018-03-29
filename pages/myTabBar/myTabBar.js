Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        homeUrl: {
            type: String,
            value: '../index/index'
        },
        mineUrl: {
            type: String,
            value: '../mine/mine'
        },
        newFillUrl: {
            type: String,
            value: '../newFill/newFill'
        },
        historyUrl: {
            type: String,
            value: '../historyData/historyData'
        }
    },
    data: {
        // 这里是一些组件内部数据
        someData: {},
        isShow: false,
        isRotate: false,
        showBgShadow:false,
        showClose:false
    },
    methods: {
        // 这里是一个自定义方法
        fill: function () {
            var that = this;
            this.setData({
                showBgShadow: !this.data.showBgShadow
            })
            setTimeout(function(){
                that.setData({
                    isShow: !that.data.isShow,
                    isRotate: !that.data.isRotate,
                    showClose: !that.data.showClose
                })
            },50)
        },
        closeFill:function(){
            var that = this;
            this.setData({
                isShow: !this.data.isShow,
                isRotate: !this.data.isRotate,
                showClose: !this.data.showClose
            })
            setTimeout(function(){
                that.setData({
                    showBgShadow: !that.data.showBgShadow
                })
            },500)
        },
        toHistoryData: function () {
            wx.navigateTo({ url: this.data.historyUrl })
        },
        toNewFill: function () {
            wx.navigateTo({ url: this.data.newFillUrl })
        },
        toMine: function () {
            wx.redirectTo({ url: this.data.mineUrl })
        },
        toHome: function () {
            wx.redirectTo({ url: this.data.homeUrl })
        }
    }
})