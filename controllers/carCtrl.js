var fs = require('fs');
var path = require("path");
var Car = require("../models/Car.js");
var formidable = require("formidable");
// 显示指定ID的汽车信息
exports.showCarInfo = function(req,res){
    // 得到orderId
    var orderId = req.params.orderId;
    Car.find({"id":orderId},function(err,docs){
        res.json({
            "result":docs[0]
        })
    })
}

exports.showCarImages = function(req,res){
    // 得到orderId
    var orderId = req.params.orderId;
    Car.find({"id":orderId},function (err,docs) {
        res.json({
            "images":docs[0].images
        })
    })

}

exports.showCarlike = function(req,res){
    // 得到orderId
    var orderId = req.params.orderId;
    // 先去找这个id的车的brand和series;
    Car.find({"id":orderId},function(err,docs){
        var brand = docs[0].brand;
        var series = docs[0].series;
        // 然后寻找和他一样的车
        Car.find({brand,series},function(err,docs){
            res.json({
                "results":docs
            });
        })
    })
}

exports.carsearch = function(req,res){
    //识别前端发过来的数据  -- 请求体
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        var nowFilters = fields.nowfilters;
        var pagination = fields.pagination;
        var sorter = fields.sorter;
        // 查询体查询是一个对象
        var CHAXUNTI = {};

        nowFilters.forEach(item=>{

            CHAXUNTI[item.k] = item.v;

            if(item.k == "km"){
                item.v[0] *= 10000;
                item.v[1] *= 10000;
            }

            if(item.k == "price" || item.k == "km" || item.k == "buydate"){

                CHAXUNTI[item.k] = {"$gte":Number(item.v[0]), "$lte":Number(item.v[1])};
            }

            if(item.k == "license"){
                CHAXUNTI[item.k] = item.v == "是" ? true : false;
            }

        })


        //查询时候，注意，先查数量，再查数据
        Car.count(CHAXUNTI,function(err,total){

            Car
            .find(CHAXUNTI).sort({[sorter.sortby]:sorter.sortdirection == "ascend" ? 1 : -1 })
            .skip( pagination.pagesize * (pagination.page - 1) )
            .limit( pagination.pagesize )
            .exec(function(err,docs){

                res.json({
                    total,
                    "results":docs
                })
            })

        })
    })
}
// 上传车辆的图片
exports.uploadCarimages = function (req,res) {

    var form = new formidable.IncomingForm();
    // 上传的文件夹
    form.uploadDir = path.resolve(__dirname,"../www/uploads");
    // 保留文件的拓展名
    form.keepExtensions = true;
    form.parse(req,function(err,fields,files){

        res.json({
            "result":1,
            "base":path.parse(files.viewpics.path).base
        })

    })
}
// 上传汽车的文件
exports.uploaderCarfiles = function (req,res) {

    var form = new formidable.IncomingForm();
    // 上传的文件夹
    form.uploadDir = path.resolve(__dirname,"../www/carfiles");
    // 保留文件的拓展名
    form.keepExtensions = true;
    form.parse(req,function(err,fields,files){

        res.json({
            "result":1,
            "base":path.parse(files.carfiles.path).base,
            "ext":path.parse(files.carfiles.path).ext
        })
    })
}
// 创建汽车的订单
exports.addCar = function (req,res) {
    var uploadsbase = path.resolve(__dirname,"../www/uploads");
    var carimagesbase = path.resolve(__dirname,"../www/carimages");
    var carimagessmallbase = path.resolve(__dirname,"../www/carimages_small");

    Car.count({},function (err,count) {
        var id = count + 1000000 + 1;

        var form = new formidable.IncomingForm();

        form.parse(req,function (err,fields) {

            var form0 = JSON.parse(fields.form0);
            var form1 = JSON.parse(fields.form1);
            var form2 = JSON.parse(fields.form2);

            // 创建文件夹

            fs.mkdirSync(carimagesbase + "/" + id);
            fs.mkdirSync(carimagesbase + "/" + id + "/view");
            fs.mkdirSync(carimagesbase + "/" + id + "/inner");
            fs.mkdirSync(carimagesbase + "/" + id + "/engine");
            fs.mkdirSync(carimagesbase + "/" + id + "/more");

            fs.mkdirSync(carimagessmallbase + "/" + id);
            fs.mkdirSync(carimagessmallbase + "/" + id + "/view");
            fs.mkdirSync(carimagessmallbase + "/" + id + "/inner");
            fs.mkdirSync(carimagessmallbase + "/" + id + "/engine");
            fs.mkdirSync(carimagessmallbase + "/" + id + "/more");

            //复制文件图片
            for (var i = 0; i < form1.view.length; i++) {

                fs.copyFileSync(uploadsbase + '/' + form1.view[i] , carimagesbase + "/" + id + "/view/" + form1.view[i]);
                fs.copyFileSync(uploadsbase + '/' + form1.view[i] , carimagessmallbase + "/" + id + "/view/" + form1.view[i]);
            };

            for (var i = 0; i < form1.inner.length; i++) {

                fs.copyFileSync(uploadsbase + '/' + form1.inner[i] , carimagesbase + "/" + id + "/inner/" + form1.inner[i]);
                fs.copyFileSync(uploadsbase + '/' + form1.inner[i] , carimagessmallbase + "/" + id + "/inner/" + form1.inner[i]);
            };

            for (var i = 0; i < form1.engine.length; i++) {

                fs.copyFileSync(uploadsbase + '/' + form1.engine[i] , carimagesbase + "/" + id + "/engine/" + form1.engine[i]);
                fs.copyFileSync(uploadsbase + '/' + form1.engine[i] , carimagessmallbase + "/" + id + "/engine/" + form1.engine[i]);
            };

            for (var i = 0; i < form1.more.length; i++) {

                fs.copyFileSync(uploadsbase + '/' + form1.more[i] , carimagesbase + "/" + id + "/more/" + form1.more[i]);
                fs.copyFileSync(uploadsbase + '/' + form1.more[i] , carimagessmallbase + "/" + id + "/more/" + form1.more[i]);
            };
            console.log(form0);
            //写入数据库
            Car.create({
                "brand":form0.brandandSeries.value[1],
                "series":form0.brandandSeries.value[2],
                "price":form0.price1.value,
                "images":form1,
                "id":id,
                "avatar" : form1.view[0],
                "buydate": Date.parse(form0.buydate.value),
                "carfiles":form2
            },function () {
               res.json({
                "result":1
               })
            })
        })
    })
}