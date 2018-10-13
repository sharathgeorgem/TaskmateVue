const mongoose = require('mongoose')
const Schema = mongoose.Schema

let todoSchema = new Schema({
  description: String,
  completed: Boolean,
  isHidden: Boolean,
  comment: String
})

module.exports = mongoose.model('Todo', todoSchema)
