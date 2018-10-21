const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    packageId: {type:mongoose.Schema.Types.ObjectId , ref:'Package', required:true},
    packageName :{type:String},
    firstName: {type:String},
    lastName: {type:String},
    mobile: {type:Number},
    email: {type:String},
    fullAddress: {type:String},
    pincode: {type:Number},
    city: {type:String},
    noOfRoom:{type:Number},
    price: {type: Number}
})

module.exports = mongoose.model('Order',orderSchema);