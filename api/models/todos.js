const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    description:String,
    confirmed:Boolean
})

module.exports = mongoose.model('users_todo',todoSchema)