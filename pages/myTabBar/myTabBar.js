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
        showBgShadow: false,
        showClose: false,
        isPopping: false,//是否已经弹出
        animPlus: {},//旋转动画
        animHistory: {},//item位移,透明度
        animNewfill: {},//item位移,透明度
        animBg: {}, // 背景动画
        animOpacity: {}
    },
    methods: {
        // 这里是一个自定义方法
        fill: function () {
            var that = this;
            this.setData({
                showBgShadow: !this.data.showBgShadow
            })
            setTimeout(function () {
                that.setData({
                    isShow: !that.data.isShow,
                    isRotate: !that.data.isRotate,
                    showClose: !that.data.showClose
                })
            }, 50)
        },
        closeFill: function () {
            var that = this;
            this.setData({
                isShow: !this.data.isShow,
                isRotate: !this.data.isRotate,
                showClose: !this.data.showClose
            })
            setTimeout(function () {
                that.setData({
                    showBgShadow: !that.data.showBgShadow
                })
            }, 300)
        },
        toHistoryData: function () {
            var that = this;
            wx.navigateTo({ url: this.data.historyUrl })
            setTimeout(function () {
                that.plus();

            }, 50)

        },
        toNewFill: function () {
            var that = this;
            wx.navigateTo({ url: this.data.newFillUrl })
            setTimeout(function () {
                that.plus();

            }, 50)

        },
        toMine: function () {

            wx.redirectTo({ url: this.data.mineUrl })
        },
        toHome: function () {
            wx.redirectTo({ url: this.data.homeUrl })
        },
        plus: function () {
            // var that = this;
            // if (this.data.showBgShadow){
            //     setTimeout(function(){
            //         that.setData({
            //             showBgShadow: !that.data.showBgShadow
            //         })
            //     },300)
            // }else{
            //     that.setData({
            //         showBgShadow: !that.data.showBgShadow
            //     })
            // }

            if (!this.data.isPopping) {
                //缩回动画
                this.popp();
                this.setData({
                    isPopping: true
                })
            } else {
                //弹出动画
                this.takeback();
                this.setData({
                    isPopping: false
                })
            }
        },
        Newfill: function () {
            console.log("Newfill")
        },
        History: function () {
            console.log("History")
        },

        //弹出动画
        popp: function () {
            this.setData({
                showBgShadow: true
            })
            this.triggerEvent('showBgShadow', this.data);
            //plus顺时针旋转
            var animOpacity = wx.createAnimation({
                duration: 300,
                timingFunction: 'ease-out'
            })
            var animationPlus = wx.createAnimation({
                duration: 0,
                timingFunction: 'ease-out'
            })
            var animationHistory = wx.createAnimation({
                duration: 300,
                timingFunction: 'ease-out'
            })
            var animationNewfill = wx.createAnimation({
                duration: 300,
                timingFunction: 'ease-out'
            })
            var animBackground = wx.createAnimation({
                duration: 100,
                timingFunction: 'ease-out'
            })
            animOpacity.opacity(1).step();
            animBackground.opacity(1).step();
            animationPlus.rotateZ(180).step();
            animationHistory.translate(125, -80).rotateZ(360).opacity(1).step();
            animationNewfill.translate(-100, -80).rotateZ(360).opacity(1).step();
            this.setData({
                animOpacity: animOpacity,
                animBg: animBackground,
                animPlus: animationPlus,
                animHistory: animationHistory,
                animNewfill: animationNewfill
            })
        },
        //收回动画
        takeback: function () {
            var that = this;
            //plus逆时针旋转
            var animOpacity = wx.createAnimation({
                duration: 300,
                timingFunction: 'ease-out'
            })
            var animationPlus = wx.createAnimation({
                duration: 300,
                timingFunction: 'ease-out'
            })
            var animationHistory = wx.createAnimation({
                duration: 300,
                timingFunction: 'ease-out'
            })
            var animationNewfill = wx.createAnimation({
                duration: 300,
                timingFunction: 'ease-out'
            })
            var animBackground = wx.createAnimation({
                duration: 200,
                timingFunction: 'ease-out',
                delay: 300
            })
            animOpacity.opacity(0).step();
            animationPlus.rotateZ(0).step();
            animationHistory.translate(0, 0).rotateZ(0).opacity(0).step();
            animationNewfill.translate(0, 0).rotateZ(0).opacity(0).step();
            animBackground.opacity(0).step();

            this.setData({
                animOpacity: animOpacity,
                animBg: animBackground,
                animPlus: animationPlus,
                animHistory: animationHistory,
                animNewfill: animationNewfill
            });
            setTimeout(function () {
                that.setData({
                    showBgShadow: false
                })
                that.triggerEvent('showBgShadow', that.data);
            }, 300)
            
        }
    }
})