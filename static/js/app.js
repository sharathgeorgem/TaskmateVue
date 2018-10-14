(() => new Vue({
  el: '.todoapp',
  data: {
    newTodo: '',
    editedTodo: null,
    todos: []
  },
  created () {
    fetch('http://localhost:3000/todos')
      .then((response) => {
        return response.json()
      })
      .then((todosInDB) => {
        this.todos = todosInDB
      })
  },
  methods: {
    addTodo: function () {
      this.todos.push({
        description: this.newTodo,
        completed: false,
        comment: 'No comment',
        isHidden: true,
        id: this.todos.length
      })
      fetch('http://localhost:3000/todos', {
        method: 'POST',
        body: JSON.stringify({
          description: this.newTodo,
          completed: false,
          comment: 'No comment',
          isHidden: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error))
      this.newTodo = ''
    },
    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
      fetch('http://localhost:3000/todos/remove', {
        method: 'POST',
        body: JSON.stringify({
          id: todo._id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error))
    },
    editTodo: function (todo) {
      this.editedTodo = todo
    },
    doneEditTodo: function (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
      let taskIndex = this.todos.findIndex((obj) => obj._id === todo._id)
      this.todos[taskIndex].description = todo.title
      fetch('http://localhost:3000/todos/doneEdit', {
        method: 'POST',
        body: JSON.stringify({
          id: todo._id,
          description: todo.title
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error))
    },
    completeTodo: function (todo) {
      fetch('http://localhost:3000/todos/completed', {
        method: 'POST',
        body: JSON.stringify({
          id: todo._id,
          completed: todo.completed
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error))
    },
    commentTodo: function (todo) {
      todo.isHidden = true
      fetch('http://localhost:3000/todos/comment', {
        method: 'POST',
        body: JSON.stringify({
          id: todo._id,
          isHidden: todo.isHidden,
          comment: todo.comment
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error))
    }
  }
}))()
