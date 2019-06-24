import { onMounted, onUnmounted } from "vue-function-api";

export default function useEventListener(eventName, handler, element = window) {
    onMounted(() => {
        element.addEventListener(eventName, handler);
    })
    onUnmounted(() => {
        element.removeEventListener(eventName, handler);
    })
}