const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    packageName: String,
    price : {type:Number,required:true},
    packageImage: {type:String},
    packageDetails:{type:String},
    features:{type:Array},
    currency:{type:String},
    startDate:Date,
    endDate:Date,
    duration:Number,
    isActive:{type: Boolean,default:true},
    updatedTime: Date    
})

module.exports = mongoose.model('Package',packageSchema);