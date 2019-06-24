import {value} from 'vue-function-api'
import filters from '../../helpers/filters'
import useLocalStorage from './useLocalStorage'

export default function useTodoList() {
  const todos = useLocalStorage('todos-vuejs-fn-api-2.0')
  const newTodo = value('')
  const editedTodo = value(null)
  const beforeEditCache = value('')

  const addTodo = () => {
    var value = newTodo.value && newTodo.value.trim()
    if (!value) {
      return
    }
    todos.value.push({
      id: todos.length,
      title: value,
      completed: false,
    })
    newTodo.value = ''
  }

  const removeTodo = todo => {
    todos.value.splice(todos.value.indexOf(todo), 1)
  }

  const editTodo = todo => {
    beforeEditCache.value = todo.title
    editedTodo.value = todo
  }

  const doneEdit = todo => {
    if (!editedTodo) {
      return
    }
    editedTodo.value = null
    todo.title = todo.title.trim()
    if (!todo.title) {
      removeTodo(todo)
    }
  }

  const cancelEdit = todo => {
    editedTodo.value = null
    todo.title = beforeEditCache.value
  }

  const removeCompleted = () => {
    todos.value = filters.active(todos.value)
  }

  return {
    todos,
    newTodo,
    editedTodo,

    addTodo,
    editTodo,
    removeTodo,
    doneEdit,
    cancelEdit,
    removeCompleted,
  }
}
