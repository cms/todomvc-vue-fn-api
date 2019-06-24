import Vue from 'vue'
import App from './App.vue'
import 'todomvc-app-css/index.css'
import { plugin } from 'vue-function-api'

Vue.config.productionTip = false

Vue.directive('todo-focus', {
  bind: function(el, binding) {
    if (binding.value) {
      el.focus()
    }
  },
})

Vue.use(plugin)

new Vue({
  render: h => h(App),
}).$mount('#app')