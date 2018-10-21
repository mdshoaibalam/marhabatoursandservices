const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const url = require('url');
const multer = require('multer');
const path = require('path');

const _storage = multer.diskStorage({
    destination:function(req , file , cb){
        cb(null, path.join(__dirname, '../../../../uploads/'));
    },
    filename:function(req , file , cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = function(req , file , cb){
   // if(file.mimeType === 'image/jpeg' || file.mimeType === 'image/png'){
        cb(null,true);
    //}else{
     //   cb(null,false)
   // }
}

const upload = multer({
     storage:_storage
    // limits:{
    // fileSize: 1024 * 1024 * 5
    // },    
   // fileFilter:fileFilter
});


const packageController = require('../controllers/package.controller');

router.get('/',packageController.get_all_packages);

router.get('/:packageId', packageController.get_package_details);

router.post('/',upload.single('packageImage'), packageController.create_package);

router.patch('/:packageId', packageController.update_package_details);

router.delete('/:packageId', packageController.delete_package);

module.exports = router;