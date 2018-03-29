//index.js
const app = getApp()

Page({
    data: {
        homeUrl: '../index/index',
        mineUrl: '../mine/mine',
        newFillUrl: '../newFill/newFill',
        historyUrl: '../historyData/historyData',
        json: [{ name: 'eiolewkfp', age: 'awdqwwdk', address: 'aueifwhefwfheffoewjowef',aihao:['sdsd','sdfsd','sdsf']}, { name: '98797', age: '6544656', address: '65494364' }],
        newJson: '',
        tempText:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            newJson:this.data.json
        })
    },
    digui: function (newJson,obj,key) {
        var that = this;
        var reg = new RegExp(that.data.tempText,'g');
        if (newJson.constructor == Array) { 
            newJson.forEach(function (item,index) {
                if (item.constructor == String){
                    obj[key].splice(index, 1, item.replace(reg, "<span style='color:red'>" + that.data.tempText + "</span>"))
                }else{
                    that.digui(item, newJson);
                }
            });
        } else if (newJson.constructor == Object) {
            var json = {};
            for (var key in newJson) {
                json[key] = newJson;
                that.digui(newJson[key],newJson,key);
            }
        } else if (newJson.constructor == String) { // 这里做全局替换
            if(key){
                obj[key] = newJson.replace(reg, "<span style='color:red'>" + that.data.tempText + "</span>")
            }
        }
    },
    bindKeyInput: function (e) {
        var text = e.detail.value;
        this.setData({
            tempText:text
        })
        var newJson = JSON.parse(JSON.stringify(this.data.json));
        
        this.digui(newJson);
        this.setData({
            newJson:newJson
        })
    }

})
