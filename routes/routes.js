const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')
const path = require('path')

const htmlPath = path.join(__dirname, '../static')
router.use(express.static(htmlPath))

router.get('/todos', function (req, res) {
  Todo
    .find({})
    .then(function (results) {
      res.setHeader('Content-Type', 'application/json')
      res.json(results)
    })
})

router.post('/todos', function (req, res) {
  let newTodo = new Todo({
    description: req.body.description,
    completed: req.body.completed,
    isHidden: req.body.isHidden,
    comment: req.body.comment
  })
  newTodo
    .save()
    .then(function () {
      console.log('New task added')
    }) // Types of redirects
})

router.post('/todos/completed', function (req, res) {
  let todoId = req.body.id
  Todo.findById(todoId)
    .exec()
    .then(function (result) {
      result.completed = req.body.completed
      return result.save()
    })
    .catch(function (error) {
      console.log('Error bruh ' + error)
    })
})

router.post('/todos/doneEdit', function (req, res) {
  let todoId = req.body.id
  Todo.findById(todoId)
    .exec()
    .then(function (result) {
      result.description = req.body.description
      return result.save()
    })
    .then(function () {
      res.description = req.body.description
    })
    .catch(function (error) {
      console.log('Error bruh ' + error)
    })
})

router.post('/todos/remove', function (req, res) {
  let todoId = req.body.id
  Todo
    .remove({_id: todoId})
    .then(function () {
      console.log('Task removed')
    })
    .catch(function (error) {
      console.log('Error bruh ' + error)
    })
})

router.post('/todos/comment', function (req, res) {
  let todoId = req.body.id
  Todo.findById(todoId)
    .exec()
    .then(function (result) {
      result.comment = req.body.comment
      result.isHidden = req.body.isHidden
      return result.save()
    })
    .catch(function (error) {
      console.log('Error bruh ' + error)
    })
})

module.exports = router
