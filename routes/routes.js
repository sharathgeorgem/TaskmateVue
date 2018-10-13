const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')
const path = require('path')

const htmlPath = path.join(__dirname, '../static')
router.use(express.static(htmlPath))

router.get('/todos', function (req, res) {
  Todo.find({}).then(function (results) {
    res.setHeader('Content-Type', 'application/json')
    res.json(results)
    // res.send(JSON.stringify(console.log({todos: results})))
  })
})

router.post('/todos', function (req, res) {
  console.log(req.body, typeof req.body)
  let newTodo = new Todo({
    description: req.body.description,
    completed: req.body.completed,
    isHidden: req.body.isHidden
  })
  newTodo
    .save()
    .then(function (result) {
      console.log(result)
      res.redirect('/') // Not necessary
    }) // Types of redirects
})

router.post('/todos/:uid/completed', function (req, res) {
  console.log(req.params)
  let todoId = req.params.id
  Todo.findById(todoId)
    .exec()
    .then(function (result) {
      result.completed = req.params.completed
      return result.save()
    })
    .then(function (result) {
      res.redirect('/')
    })
})

module.exports = router
