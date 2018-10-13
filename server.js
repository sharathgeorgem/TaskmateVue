const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/routes')

mongoose.connect('mongodb://localhost:27017/mongo_todos', {
  useNewUrlParser: true
}).then(function () {
  console.log('Database connected.')
})

const app = express()
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({extended: true})) // Revise

app.use('/', routes)

app.listen(3000, function () {
  console.log('Listening on port 3000')
})
