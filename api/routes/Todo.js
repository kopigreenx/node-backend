const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const todoSchema = require('../models/todos')
const jwt = require('jsonwebtoken')
const Auth = require('../../controllers/auth')

router.get('/',Auth,(req ,res, next) => {
    todoSchema.find().exec().then((result) => {
        res.status(201).json({
            data: result,
            token: req.token
        });
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:todosId', Auth, (req, res, next) => {
     const id = req.params.todosId;
     todoSchema.findById(id).exec().then((result) => {
         res.status(201).json(result);
     }).catch((err) => {
         res.status(500).json({
             error: err
         });
     });
});

router.post('/', Auth, (req, res, next) => {

    const todoData = new todoSchema({
        _id: new mongoose.Types.ObjectId,
        description: req.body.description,
        confirmed: req.body.confirmed
    });

    todoData
    .save()
    .then((result) => {
        res.status(201).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.put('/:todosId', Auth, (req, res, next) => {
    const id = req.params.todosId;
    todoSchema.updateOne({
            _id: id
        }, {
            $set: {
                description: req.body.description,
                confirmed: req.body.confirmed
            }
        })
        .exec().then((result) => {
            const data = {
                _id: req.params.todosId,
                description: req.body.description,
                confirmed: req.body.confirmed
            }
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:todosId', Auth, (req, res, next) => {
    const id = req.params.todosId;
    todoSchema.deleteOne({
        _id: id
    })
    .exec()
    .then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;