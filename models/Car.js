var mongoose = require('mongoose');
module.exports = mongoose.model("Car",{
    "id":Number,
    "type":String,
    "seat":Number,
    "brand":String,
    "series":String,
    "color":String,
    "price":Number,
    "km":Number,
    "ownerID":Number,
    "engine":String,
    "buydate":String,
    "license":Boolean,
    "exhaust":String,
    "gearbox":String,
    "fuel":String,
    "avatar":String,
    "images":Object,
    "carfiles":Object
})