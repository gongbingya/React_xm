var express = require('express');
var app = express();
var mongoose = require('mongoose');
// 连接数据库 ershouche
mongoose.connect("localhost/ershouche");
// 引入控制器
var carCtrl = require("./controllers/carCtrl.js");

var adminCtrl = require("./controllers/adminCtrl.js");

var ownerCtrl = require("./controllers/ownerCtrl.js");
// 静态化
app.use(express.static("www"));
// 路由的中间件
app.get("/carinfo/:orderId",carCtrl.showCarInfo);
app.get("/carimages/:orderId",carCtrl.showCarImages);
app.get("/carlike/:orderId",carCtrl.showCarlike);
app.post("/carsearch",carCtrl.carsearch);
app.post("/uploadCarimages",carCtrl.uploadCarimages);
app.post("/uploaderCarfiles",carCtrl.uploaderCarfiles);
app.post("/addCar",carCtrl.addCar);

app.post("/uploadAvatar",adminCtrl.uploadAvatar);
app.post("/docut",adminCtrl.docut);
app.get("/getAvatar",adminCtrl.getAvatar);

app.get("/owners",ownerCtrl.owners);

// 端口的监听
app.listen(3000,function(){
    console.log("服务器已开启，在3000端口");
})
