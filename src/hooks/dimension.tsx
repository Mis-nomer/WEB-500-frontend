import { useState, useEffect } from 'react'

export const debounce = <A extends unknown[]>(callback: (...args: A) => unknown, msDelay: number) => {
  let timer: any

  return (...args: A) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      timer = undefined
      callback(...args)
    }, msDelay)
  }
}

export const useWindowDimension = (msDelay = 100) => {
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const resizeHandler = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    const handler = msDelay <= 0 ? resizeHandler : debounce(resizeHandler, msDelay)

    window.addEventListener('resize', handler)

    return () => window.removeEventListener('resize', handler)
  }, [])

  return dimension
}

export type Dimension = ReturnType<typeof useWindowDimension>
