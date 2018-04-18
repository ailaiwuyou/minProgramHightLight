//index.js
const app = getApp()

Page({
    data: {
        homeUrl: '../index/index',
        mineUrl: '../mine/mine',
        newFillUrl: '../newFill/newFill',
        historyUrl: '../historyData/historyData',
        json: [{ name: '你是谁', age: 'awdqww\\k', address: 'auemnkjkifwh{\\efwfheffoewjowef', aihao: ['sdsd', 'sdfsd', 'sdsf'] }, { name: '98797', age: '6544656', address: 'https://www.baidu.com/' }],
        newJson: '',
        tempText: '',
        showShadow: false,
        chartNumber: 0,
        newStr:''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            newJson: this.data.json
        })
    },
    haha: function () {
        console.log('haha');
        wx.navigateTo({
            url: '../mine/mine',
        })
    },
    digui: function (newJson, obj, key) {
        var urlReg = new RegExp('(https ?|ftp | file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]')
        var that = this;
        var reg = that.data.tempText;
        if (that.data.tempText == '.' || that.data.tempText == '\\' || that.data.tempText == '\?' || that.data.tempText == '\[' || that.data.tempText == '\]') {
            reg = '\\' + that.data.tempText
        }
        var reg = new RegExp(reg, 'ig');
        if (newJson.constructor == Array) {
            newJson.forEach(function (item, index) {
                if (item.constructor == String && !urlReg.test(item)) {
                    obj[key].splice(index, 1, item.replace(reg, function (index) {
                        if (that.data.newStr != ''){
                            that.setData({
                                chartNumber: (that.data.chartNumber + 1)
                            })
                        }
                        return "<span style='color:red'>" + that.data.tempText + "</span>"
                    }))
                } else {
                    that.digui(item, newJson);
                }
            });
        } else if (newJson.constructor == Object) {
            var json = {};
            for (var key in newJson) {
                json[key] = newJson;
                that.digui(newJson[key], newJson, key);
            }
        } else if (newJson.constructor == String && !urlReg.test(newJson)) { // 这里做全局替换
            if (key) {
                obj[key] = newJson.replace(reg, function () {
                    if (that.data.newStr != '') {
                        that.setData({
                            chartNumber: (that.data.chartNumber + 1)
                        })
                    }
                    return "<span style='color:red'>" + that.data.tempText + "</span>"
                })
            }
        }
    },
    showBgShadow: function (e) {
        this.setData({
            showShadow: e.detail.showBgShadow
        })
    },
    bindKeyInput: function (e) {
        var regChart = this.data.regChart;
        var text = e.detail.value;
        var newStr = '';
        newStr = text.replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?\\\.]/, '')
        this.setData({
            tempText: newStr,
            chartNumber: 0,
            newStr: newStr
        })
        var newJson = JSON.parse(JSON.stringify(this.data.json));

        this.digui(newJson);
        this.setData({
            newJson: newJson
        })
    }

})
