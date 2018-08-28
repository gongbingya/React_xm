var url = require("url");
var Owner = require("../models/Owner.js");
// 查询用户
exports.owners = function (req,res) {
    var {sortby='id',sortdirection = 1,page = 1,pagesize = 10,keyword = ''} = url.parse(req.url,true).query;

    // 将一组字符串变为正则， 我们可以用 new RegExp()
    var keywordRegExp = new RegExp(keyword,"g");

    //查询体
    var CHAXUN = {
        "$or":[
            {"name":keywordRegExp},
            {"mobile":keywordRegExp},
            {"city":keywordRegExp},
            {"idcard":keywordRegExp},
            {"email":keywordRegExp}
        ]
    };

    Owner.count(CHAXUN,function (err,total) {
        Owner
        .find(CHAXUN)
        .sort({[sortby]:sortdirection == "ascend" ? 1 : -1})
        .skip(pagesize*(page-1))
        .limit(pagesize)
        .exec(function (err,docs) {
            res.json({
                total,
                "results":docs
            })
        })
    })

}
