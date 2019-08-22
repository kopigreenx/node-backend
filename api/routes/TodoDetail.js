const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const todoSchema = require('../models/mTodosDetail')
const Auth = require('../../controllers/auth')

router.get('/',(req ,res, next) => {
    todoSchema.find().exec().then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:todosId', Auth, (req, res, next) => {
     const id = req.params.todosId;
     todoSchema.find({parent_id:id}).exec().then((result) => {
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
        parent_id:req.body.parent_id,
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
            _id: id,
            parent_id:req.body.parent_id
        }, {
            $set: {
                description: req.body.description,
                confirmed: req.body.confirmed
            }
        })
        .exec().then((result) => {
            const data = {
                _id: req.params.todosId,
                parent_id: req.body.parent_id,
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
    todoSchema.deleteMany({
        parent_id: id
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