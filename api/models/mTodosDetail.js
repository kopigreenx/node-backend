const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    parent_id:String,
    description:String,
    confirmed:Boolean
})

module.exports = mongoose.model('users_todo_detail',todoSchema)