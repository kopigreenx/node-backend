const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const userSchema = require('../models/mUsers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/login',(req,res,next) =>{
    const username = req.body.username;
    const password = bcrypt.hash(req.body.password)
    userSchema
        .find({username:username})
        .exec().then((result) => {
            if (result.length > 0) {
                var token = jwt.sign({
                    id: result[0]._id,
                    username:result[0].username
                }, process.env.JWT_SECRET,{
                    expiresIn:86400
                })
                res.status(200).json({
                    data: result,
                    auth:true,
                    token:token
                })
            }else{
                res.status(500).json({
                    auth: false,
                    data: "user not found"
                })
            }

        }).catch((err) => {
            res.status(500).json(err)
        });
})
router.post('/register',(req,res,next) =>{
    const username  = req.body.username;
    const email     = req.body.email;
    const password  = bcrypt.hashSync(req.body.password);
    const usersData = new userSchema({
        _id     : new mongoose.Types.ObjectId,
        username: username,
        email   : email,
        password: password
    });
    
    usersData
    .save()
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    });
})

module.exports = router;