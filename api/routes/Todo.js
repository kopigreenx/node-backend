const express = require('express')
const router = express.Router();

router.get('/',(req ,res, next) => {
    res.status(200).json({
        message:'Handling GET request /todo'
    });
});

router.get('/:todosId',(req ,res, next) => {
    const id = req.params.todosId;
    res.status(200).json({
        message:'Handling GET request /todo with params ',
        id_:id
    });
});

router.post('/',(req ,res, next) => {
    res.status(200).json({
        message:'Handling POST request /todo'
    });
});

router.patch('/:todosId', (req, res, next) => {
    const id = req.params.todosId;
    res.status(200).json({
        message: 'Handling PATCH request /todo with params ',
        id_: id
    });
});

router.delete('/:todosId', (req, res, next) => {
    const id = req.params.todosId;
    res.status(200).json({
        message: 'Handling DELETE request /todo with params ',
        id_: id
    });
});

module.exports = router;