const ToursPackage  = require('../models/tour.package.model');
const url = require('url');
const mongoose = require('mongoose');

exports.create_package = (req , res , next)=>{
    console.log(req.file);
    const package = new ToursPackage({
        _id:mongoose.Types.ObjectId(),
        packageName: req.body.packageName,
        price: req.body.price,
        packageImage: req.file.path,
        features:req.body.features,
        currency:req.body.currency,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        duration:req.body.duration,
        updatedTime:new Date()
    })
    package.save()
    .then( result => {
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });   

}

exports.get_all_packages = (req , res , next)=>{
    ToursPackage.find()    
    .exec()
    .then(docs =>{
            const response ={
                count:docs.length,
                packages:docs.map(doc=>{
                    return {
                        _id : doc._id,
                        packageName:doc.packageName,
                        price: doc.price,
                        packageImage: doc.packageImage,
                        duration: doc.duration,
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
            res.status(200).json([response]);
          
    })
    .catch(err=>res.status(500).json({error:err}));

};

exports.get_package_details = (req , res , next)=>{
    const Id = req.params.packageId;
    ToursPackage.findById(Id).exec()
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
};

exports.update_package_details = (req , res , next)=>{
    const Id = req.params.packageId;
    
    const updateOperation = {};
    for (const ops of req.body){
        updateOperation[ops.propName] = ops.propValue;
    }

    ToursPackage.update({_id:Id},{$set:updateOperation}).exec()
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
}

exports.delete_package = (req , res , next)=>{
    const Id = req.params.packageId;
    ToursPackage.remove({_id:Id}).exec()
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
}