var fs = require("fs");
var path = require("path");
var Mock = require("mockjs");
var Random = Mock.Random;

// 写入的文件的地址
var xieruwenjianURL = path.resolve(__dirname,"./生成的车主的模拟数据.txt");
// 如果已经文件写入了，我们就删除文件，否则写入
// fs.existsSync() 表示文件是否存在
// fs.unlinkSync() 表示删除文件
if(fs.existsSync(xieruwenjianURL)){
    fs.unlinkSync(xieruwenjianURL);
};
for (var i = 0; i < 5000; i++) {
    var o = {
        "id": 100000 + i,
        "name": Random.cname(),
        // 手机号
        "mobile":Mock.mock(/^((13[0-9])|(14[57])|(15[0-9])|(16[67])|(17[78])|(18[0-9]))\d{8} $/),
        "sex":Random.pick(["男","女"]),
        "city":Random.city(true),
        "idcard":Random.integer(100000000000000000,900000000000000000),
        "email":Random.email()
    }
    // 写入最终生成的文件
    fs.appendFileSync(xieruwenjianURL,JSON.stringify(o) + "\n\r")
};
console.log("已经写入5000条新数据，快去用用吧！");
