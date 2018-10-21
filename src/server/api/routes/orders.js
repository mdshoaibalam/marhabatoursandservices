const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const url = require('url');


const Order  = require('../models/order.model');
const Package = require('../models/tour.package.model');

router.get('/',(req , res , next)=>{
    Order.find()    
    .exec()
    .then(docs =>{
            const response ={
                count:docs.length,
                orders:docs.map(doc=>{
                    return {
                        id:doc._id,
                        packageId:doc.packageId,
                        packageName: doc.packageName,
                        price: doc.price,
                        noOfRoom:doc.noOfRoom,                        
                        name: doc.firstName+' '+doc.lastName,
                        mobile: doc.mobile,
                        email:doc.email,                     
                        request:{
                            type:'GET',
                            uri :url.format({
                                protocol: req.protocol,
                                host: req.get('host'),
                                pathname: req.originalUrl
                              }) +'/'+doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
          
    })
    .catch(err=>res.status(500).json({error:err}));

});

router.get('/:orderId',(req , res , next)=>{
    const Id = req.params.orderId;
    Order.findById(Id)
    .select('_id package quantity')
    .populate('package','packageName price')
    .exec()
    .then(doc => {
        if(doc){
            console.log('from DB=> '+doc);
            res.status(200).json(doc);
        }
        else
        {
            console.log('Not Found in DB');
            res.status(404).json({
                message:'requested resource cannot be found'
            })
        }
     
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});

router.post('/',(req , res , next)=>{
    Package.findById(req.body.packageId)
    .then(docs =>{
        if(!docs){
            return res.status(404).json({message:'PackageId doesn\'t exist'})
        }
        const order = new Order({
            _id:mongoose.Types.ObjectId(),            
            packageId: req.body.packageId,
            packageName :req.body.packageName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobile: req.body.mobile,
            email: req.body.email,
            fullAddress: req.body.fullAddress,
            pincode: req.body.pincode,
            city: req.body.city,
            noOfRoom: req.body.noOfRoom,
            price: req.body.price
        });
        return order.save();
    })  
    .then( result => {
        console.log(result);
        res.status(201).json({
            createdRequest : {
                _id: result._id,
                package: result.Package
            },
            request:{
                type:'GET',
                url:'localhost://'
            }

        });
    })
    .catch(err=>{
        console.log('err');
        res.status(500).json({
            error:err
        })
    });   

});

router.patch('/:orderId',(req , res , next)=>{
    const Id = req.params.orderId;
    
    const updateOperation = {};
    for (const ops of req.body){
        updateOperation[ops.propName] = ops.propValue;
    }

    Order.update({_id:Id},{$set:updateOperation}).exec()
    .then(doc => {
            console.log('from DB=> '+doc);
            res.status(200).json(doc);   
     
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});

router.delete('/:orderId',(req , res , next)=>{
    const Id = req.params.orderId;
    Order.remove({_id:Id}).exec()
    .then(doc => { 
        console.log('from DB=> '+doc);
        res.status(200).json(doc);
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});

module.exports = router;