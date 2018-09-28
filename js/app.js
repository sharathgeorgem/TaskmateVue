(() => new Vue({
  el: '.todoapp',
  data: {
    newTodo: '',
    editedTodo: null,
    todos: []
  },
  created () {
    this.todos = JSON.parse(window.localStorage.getItem('todo-storage') || '[]')
  },
  methods: {
    addTodo: function () {
      this.todos.push({title: this.newTodo, completed: false, comment: null, isHidden: true, id: this.todos.length})
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
    },
    commentTodo: function (todo) {
      todo.isHidden = true
      window.localStorage.setItem(storeTodo, JSON.stringify(this.todos))
    }
  }
}))()

var storeTodo = 'todo-storage'
