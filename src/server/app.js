const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const tourpackageRoutes = require('./api/routes/tour-package');
const orderRoutes = require('./api/routes/orders');
const url = 'mongodb://admin:admin@cluster0-shard-00-00-agni3.mongodb.net:27017,cluster0-shard-00-01-agni3.mongodb.net:27017,cluster0-shard-00-02-agni3.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
const localUrl ='mongodb://localhost/myappdatabase';
mongoose.connect(localUrl,{
     useNewUrlParser: true 
})

app.use('/uploads',express.static('uploads'))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//handling CORS
app.use((req , res , next )=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

//importing routes
app.use('/api/packages',tourpackageRoutes);
app.use('/api/orders',orderRoutes); 

app.use('/',(req , res)=>{
    res.status(200).json({message:'root url'})
})
app.use((req , res, next)=>{
    const error = new Error('Not Found Resource ');
    error.status = 404;
    next(error);
});

app.use((err,req , res, next)=>{
    res.status(err.status || 500);
    res.json({
        error:{
            message : err.message
        }
    });
});


module.exports = app;