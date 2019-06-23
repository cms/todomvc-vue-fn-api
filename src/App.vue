<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodo"
          @keyup.enter="addTodo"
        >
      </header>
      <section class="main" v-show="todos.length" v-cloak>
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
        <label for="toggle-all"></label>
        <ul class="todo-list">
          <li
            v-for="todo in filteredTodos"
            class="todo"
            :key="todo.id"
            :class="{ completed: todo.completed, editing: todo == editedTodo }"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed">
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input
              class="edit"
              type="text"
              v-model="todo.title"
              v-todo-focus="todo == editedTodo"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
            >
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length" v-cloak>
        <span class="todo-count">
          <strong>{{ remaining }}</strong>
          {{ remaining | pluralize }} left
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibility == 'all' }">All</a>
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibility == 'active' }">Active</a>
          </li>
          <li>
            <a href="#/completed" :class="{ selected: visibility == 'completed' }">Completed</a>
          </li>
        </ul>
        <button
          class="clear-completed"
          @click="removeCompleted"
          v-show="todos.length > remaining"
        >Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>
        Written by
        <a href="http://evanyou.me">Evan You</a>
      </p>
      <p>
        Part of
        <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  </div>
</template>

<script>
//import {
//  value,
//  state,
//  computed,
//  watch,
//  onMounted
//} from "vue-function-api";
import { value, watch, computed, onMounted } from "vue-function-api";
import todoStorage from "../helpers/todo-storage";
import filters from "../helpers/filters";

export default {
  name: "App",
  setup() {
    onMounted(() => {
      const app = this;
      function onHashChange() {
        var visibility = window.location.hash.replace(/#\/?/, "");
        if (filters[visibility]) {
          app.visibility = visibility;
        } else {
          window.location.hash = "";
          app.visibility = "all";
        }
      }

      window.addEventListener("hashchange", onHashChange);
      onHashChange();
    });
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

    // computed:
    const filteredTodos = computed(() => filters[this.visibility](todos.value));
    const remaining = computed(() => filters.active(todos.value).length);
    const allDone = computed(
      () => remaining.value === 0,
      value => {
        todos.value.forEach(function(todo) {
          todo.completed = value;
        });
      }
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

      filteredTodos,
      remaining,
      allDone,
      addTodo,
      removeTodo,
      editTodo,
      doneEdit,
      cancelEdit,
      removeCompleted
    };
  },
  filters: {
    pluralize: function(n) {
      return n === 1 ? "item" : "items";
    }
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
