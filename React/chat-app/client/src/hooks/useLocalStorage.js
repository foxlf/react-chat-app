import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    console.log(222)
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  useEffect(() => {
    const item = JSON.stringify(value)
    console.log('item: ' + item + ' type: ' + typeof(item))
    window.localStorage.setItem(key, item)
  }, [value])

  return [value, setValue]
}