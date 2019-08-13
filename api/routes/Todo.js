const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const todoSchema = require('../models/todos')

router.get('/',(req ,res, next) => {
    todoSchema.find().exec().then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:todosId',(req ,res, next) => {
     const id = req.params.todosId;
     todoSchema.findById(id).exec().then((result) => {
         res.status(201).json(result);
     }).catch((err) => {
         res.status(500).json({
             error: err
         });
     });
});

router.post('/',(req ,res, next) => {

    const todoData = new todoSchema({
        _id: new mongoose.Types.ObjectId,
        description: req.body.description,
        confirmed: req.body.confirmed
    });

    todoData
    .save()
    .then((result) => {
        res.status(201).json({
            message: 'Handling POST request /todo',
            createTodo: result
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.patch('/:todosId', (req, res, next) => {
    const id = req.params.todosId;
    todoSchema.update({
            _id: id
        }, {
            $set: {
                description: req.body.description,
                confirmed: req.body.confirmed
            }
        })
        .exec().then((result) => {
            res.status(201).json(result);
        }).catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:todosId', (req, res, next) => {
    const id = req.params.todosId;
    todoSchema.remove({_id:id})
    .exec()
    .then((result) => {
        res.status(201).json({
            message: 'Handling DELETE request /todo with params ',
            result: result
        });
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;