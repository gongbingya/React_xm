var fs = require("fs");
var path = require("path");
var Mock = require("mockjs");
var Random = Mock.Random;

// 得到汽车的基数据json文件的地址
var jishujuURL = path.resolve(__dirname,"./汽车基数据.json");
// 写入的文件的地址
var xieruwenjianURL = path.resolve(__dirname,"./生成的车的模拟数据.txt");
// 缩略图图片地址
var carimages_smallURL = path.resolve(__dirname,"../www/carimages_small");

// 如果已经文件写入了，我们就删除文件，否则写入
// fs.existsSync() 表示文件是否存在
// fs.unlinkSync() 表示删除文件
if(fs.existsSync(xieruwenjianURL)){
    fs.unlinkSync(xieruwenjianURL);
};
// 读数据
fs.readFile(jishujuURL,function(err,content){
    // 读取的文件，并转成对象
    var arr = JSON.parse(content.toString());
    // 遍历数组中每一个对象，添加一个属性值
    for (var i = 0; i < arr.length; i++) {
        // 售价 ，随机一个 0.2万 到 100万的车
        // 精度小数点后两位，至少2位，之多2位。
        arr[i].price = Random.float(0.2,100,2,2)
        // km 【公里】
        arr[i].km = Random.integer(0,2000000);
        // ownerID 【车主的ID】, 有位数限制【5，从10000】,有5000位
        arr[i].ownerID = Random.integer(10000,14999);
        // engine 【引擎】
        arr[i].engine = Random.pick(["1.0","1.2","1.2T","1.4","1.4T","1.6","1.6T","2.0","2.0T","5.0"])
        //buydate 【购买日期】我们随机最近20年的车
        arr[i].buydate = new Date() - Random.integer(0,60*60*24*365*20*1000);
        // license 【是否上牌】
        arr[i].license = Random.boolean();
        // exhaust 【排气标准】
        arr[i].exhaust = Random.pick(["国一","国二","国三","国四","国五","国六"]);
        // gearbox 【变速箱】
        arr[i].gearbox = Random.pick(["自动","手动","手自一体"]);
        // fuel【燃油】
        arr[i].fuel = Random.pick(["汽油","柴油","油电混合","纯电动","燃气","人力"]);
        // 增加汽车的形象图
        arr[i].avatar = fs.readdirSync(`${carimages_smallURL}/${arr[i].id}/view`)[0];
        // 汽车的图片信息
        arr[i].images = {

            "view": fs.readdirSync(`${carimages_smallURL}/${arr[i].id}/view`),
            "inner": fs.readdirSync(`${carimages_smallURL}/${arr[i].id}/inner`),
            "engine": fs.readdirSync(`${carimages_smallURL}/${arr[i].id}/engine`),
            "more": fs.readdirSync(`${carimages_smallURL}/${arr[i].id}/more`)
        }
        // 写入最终生成的文件
        fs.appendFileSync(xieruwenjianURL,JSON.stringify(arr[i]) + "\n\r")
    };

    console.log("已经写入"+ arr.length + "条新数据，快去用用吧！");
})
