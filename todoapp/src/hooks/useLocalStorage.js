import { useEffect, useState } from 'react'

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored) return JSON.parse(stored)
      return initialValue
    } catch (error) {
      console.error('Error reading localStorage', error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error writing localStorage', error)
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage

