import {onMounted, onUnmounted} from '@vue/composition-api'

export default function useEventListener(eventName, handler, element = window) {
  onMounted(() => {
    element.addEventListener(eventName, handler)
  })
  onUnmounted(() => {
    element.removeEventListener(eventName, handler)
  })
}
