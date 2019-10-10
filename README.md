# TodoMVC implementation on Vue Function API RFC

This is a demo project implementing TodoMVC with the new proposed [Vue Composition API](https://vue-composition-api-rfc.netlify.com/). Using the official Vue 2 plugin [@vue/composition-api](https://github.com/vuejs/composition-api).

Based on the [Official Vue 2 TodoMVC](https://vuejs.org/v2/examples/todomvc.html) originally made by Evan You.

The code was refactored into functional pieces:

## useLocalStorage(key: string, initialValue: any?)

A simple implementation of the wrapped `ref` concept but persisted in `localStorage`. It's used just like the API `ref` function. But it will be persisted on localStorage in the provided key.

```javascript
const todos = useLocalStorage('todos', [])
```

## useEventListener(eventName, handler, element = window)

Basic hook to handle events, it was used in this project to handle the `hashchange` event.

```javascript
// Example usage:
function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener('mousemove', e => {
    x.value = e.pageX
    y.value = e.pageY
  })

  return { x, y }
}
```

## useVisibilityFilter(todos)

This hooks abstracts the filtering of the todos.

## useTodoList()

Top-most level logic, handles the todo list.
