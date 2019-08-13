const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const todoRoutes = require('./api/routes/Todo')

mongoose.connect('mongodb://localhost:27017/my_data',{useNewUrlParser:true})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//HANDLE CORS CROSS ORIGIN RESOURCE SHARING
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin, X-requested-With, Content-Type, Accept,Authorization')
    if (req.method==="OPTIONS") {
        res.header('Access-Control-Allow-Origin','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next()
})

// REQUEST ROUTES
app.use('/todos',todoRoutes);

//ERROR HANDLING
app.use((req, res, next) => {
    const error = new Error('the page you requested Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error :{
            message:error.message
        }
    })
})


module.exports=app