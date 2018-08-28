var fs = require('fs');
var path = require("path");
var Admin = require("../models/Admin.js");
var formidable = require("formidable");
var gm  = require("gm");

exports.uploadAvatar = function (req,res) {

   var form = new formidable.IncomingForm();
   // 设置上传的路径
   form.uploadDir = path.resolve(__dirname,"../www/uploads");
   // 保持文件的拓展名字
   form.keepExtensions = true;
   form.parse(req,function (err,fields,files) {
       // 得到上传之后的文件的名字，
       var base = path.parse(files.adminavatar.path).base;

       // 我们现在得到上传图片的尺寸

       gm(path.resolve(__dirname,"../www/uploads/"+ base))
       .size(function (err,size) {

          res.send("<script>window.parent.onUpDone('"+base+"',+"+size.width+","+size.height+")</script>")
       })
   })

}

exports.docut  = function (req,res) {

   var form = new formidable.IncomingForm();
   // 设置上传的路径
   form.uploadDir = path.resolve(__dirname,"../www/uploads");
   // 保持文件的拓展名字
   form.keepExtensions = true;
   form.parse(req,function (err,{w,h,l,t,picurl},files) {

       gm(path.resolve(__dirname,"../www/uploads/"+ picurl))
       .crop(w,h,l,t)
       .resize(160,160)
       .write(path.resolve(__dirname,"../www/avatars/"+ picurl),function () {

           // 改变数据库
           Admin.update({"email":"huang@163.com"},{"$set":{"avatar":picurl}},function() {

               res.json({

                    "result":1
               })
           })
       })

   })

}

// 得到头像
exports.getAvatar = function (req,res) {

    Admin.find({"email":"huang@163.com"},function (err,docs) {

        // 头像
        if( docs[0].avatar){
            var avatar = path.resolve(__dirname,"../www/avatars/"+ docs[0].avatar);
        }else{
            var avatar = path.resolve(__dirname,"../www/avatars/defaultavatar.jpg");
        }

        // 直接返回头像信息，
        res.sendFile(avatar)
    })
}