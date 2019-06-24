import { value, computed } from "vue-function-api";
import filters from "../../helpers/filters";
import useEventListener from "./useEventListener";

export default function useVisibilityFilter(todos) {

    const visibility = value("all");
    const onHashChange = () => {
      if (filters[visibility.value]) {
        visibility.value = window.location.hash.replace(/#\/?/, "");
      } else {
        window.location.hash = "";
        visibility.value = "all";
      }
    };

    useEventListener("hashchange", onHashChange);

    // computed:
    const filteredTodos = computed(() =>
      filters[visibility.value](todos.value)
    );
    const remaining = computed(() => filters.active(todos.value).length);
    const allDone = computed(
      () => remaining.value === 0,
      value => {
        todos.value.forEach(function(todo) {
          todo.completed = value;
        });
      }
    );

    const active = computed(() => filters.active(todos.value));


    return { visibility, filteredTodos, remaining, allDone, active }
}
