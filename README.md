# TodoMVC implementation on Vue Function API RFC

This is a demo project implementing TodoMVC with the new proposed [Vue Function API](https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md). Using the implementation [vue-function-api](https://github.com/liximomo/vue-function-api) made by [liximomo](https://github.com/liximomo).

Based on the [Official Vue 2 TodoMVC](https://vuejs.org/v2/examples/todomvc.html) originally made by Evan You.

The code was refactored into functional pieces:

## useLocalStorage(initialValue: any?)

 A simple implementation of the wrapped `value` concept but persisted in `localStorage`. It's used just like the API `value` function. But it will be persisted.

```javascript
const myValue = useLocalStorage('initial')
```

## useEventListener(eventName, handler, element = window)

Basic hook to handle events, it was used in this project to handle the `hashchange` event.

```javascript
// Example usage:
function useMouse() {
  const x = value(0)
  const y = value(0)

  useEventListener('mousemove', e => {
    x.value = e.pageX
    y.value = e.pageY
  })

  return { x, y }
}
```

## useVisibilityFilter

This hooks abstracts the filtering of the todos.

## useTodoList

Top-most level logic, handles the todo list.
