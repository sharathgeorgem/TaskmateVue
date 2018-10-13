(() => new Vue({
  el: '.todoapp',
  data: {
    newTodo: '',
    editedTodo: null,
    todos: []
  },
  created () {
    console.log(this)
    fetch('http://localhost:3000/todos')
      .then((response) => {
        return response.json()
      })
      .then((todosInDB) => {
        this.todos = todosInDB
      })
    // this.todos = JSON.parse(window.localStorage.getItem('todo-storage') || '[]')
  },
  methods: {
    addTodo: function () {
      this.todos.push({description: this.newTodo, completed: false, comment: null, isHidden: true, id: this.todos.length})
      fetch('http://localhost:3000/todos', {
        method: 'POST',
        body: JSON.stringify({
          description: this.newTodo,
          completed: false,
          comment: null,
          isHidden: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error))
      this.newTodo = ''
      window.localStorage.setItem(storeTodo, JSON.stringify(this.todos))
    },
    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
      window.localStorage.setItem(storeTodo, JSON.stringify(this.todos))
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
      window.localStorage.setItem(storeTodo, JSON.stringify(this.todos))
    },
    completeTodo: function () {
      window.localStorage.setItem(storeTodo, JSON.stringify(this.todos))
      fetch('http://localhost:3000/todos/{{_id}}/completed', {
        method: 'POST',
        body: JSON.stringify({
          completed: this.completed
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
      window.localStorage.setItem(storeTodo, JSON.stringify(this.todos))
    }
  }
}))()

var storeTodo = 'todo-storage'
