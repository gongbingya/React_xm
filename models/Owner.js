var mongoose = require('mongoose');

module.exports = mongoose.model("Owner",{
    // 为什么使用字符串，因为方便find正则
    "id":Number,
    "name":String,
    "mobile":String,
    "sex":String,
    "city":String,
    "idcard":String,
    "email":String
})
