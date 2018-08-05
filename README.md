# minProgramHightLight

小程序实现页面搜索高亮显示

# 思路

在实现的过程中主要考虑，不同类型的数据结构，过滤掉特殊符号，url这些基本需求；同时在实现的过程中每次都要去处理最原始的数据，这就需要考虑到对象的深拷贝问题，目前所采用的方法是通过JSON.parse(JSON.stringify(str))来处理，因为在这个全局搜索的项目中不太会用到函数这些对象。最后通过replace方法来处理这些目标字符串。

# 截图

![](http://otj5p4ayj.bkt.clouddn.com/miniProgramsearch.png)
