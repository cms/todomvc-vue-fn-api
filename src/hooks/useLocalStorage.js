import {value, watch} from 'vue-function-api'

function getStoredValue(key) {
  const stringValue = localStorage.getItem(key)
  try {
    return JSON.parse(stringValue)
  } catch (err) {
    localStorage.removeItem(key)
    return null
  }
}

export default function useLocalStorage(key, initialValue) {
  const val = value(initialValue)
  const storedValue = getStoredValue(key)

  if (storedValue) {
    val.value = storedValue
  }

  watch(
    val,
    newVal => {
      const jsonValue = JSON.stringify(newVal)
      localStorage.setItem(key, jsonValue)
    },
    {deep: true, lazy: true},
  )

  return val
}
