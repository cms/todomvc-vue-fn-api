import { value, watch, computed, onMounted } from "vue-function-api";
import todoStorage from "../..//helpers/todo-storage";
import filters from "../..//helpers/filters";

export default function useTodoList() {
    const todos = value(todoStorage.fetch());
    const newTodo = value("");
    const editedTodo = value(null);
    const visibility = value("all");
    const beforeEditCache = value("");

    watch(
      () => todos.value,
      todos => {
        todoStorage.save(todos);
      },
      { deep: true, lazy: true }
    );

    const addTodo = () => {
      var value = newTodo.value && newTodo.value.trim();
      if (!value) {
        return;
      }
      todos.value.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      });
      newTodo.value = "";
    };

    const removeTodo = todo => {
      todos.value.splice(todos.value.indexOf(todo), 1);
    };

    const editTodo = todo => {
      beforeEditCache.value = todo.title;
      editedTodo.value = todo;
    };

    const doneEdit = todo => {
      if (!editedTodo) {
        return;
      }
      editedTodo.value = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        removeTodo(todo);
      }
    };

    const cancelEdit = todo => {
      editedTodo.value = null;
      todo.title = beforeEditCache.value;
    };

    const removeCompleted = () => {
      todos.value = filters.active(todos.value);
    };

    return {
        todos,
        newTodo,
        editedTodo,
        visibility,

        addTodo,
        editTodo,
        removeTodo,
        doneEdit,
        cancelEdit,
        removeCompleted
    }
}