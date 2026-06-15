import { useEffect, useState } from 'react'

export function useAutoCampo(obtenerValorActual, onChange, intervaloMs = 60_000) {
  const [modoManual, setModoManual] = useState(false)

  useEffect(() => {
    if (!modoManual) {
      onChange(obtenerValorActual())
    }
  }, [modoManual, onChange, obtenerValorActual])

  useEffect(() => {
    const id = setInterval(() => {
      if (!modoManual) {
        onChange(obtenerValorActual())
      }
    }, intervaloMs)

    return () => clearInterval(id)
  }, [modoManual, onChange, obtenerValorActual, intervaloMs])

  const handleFocus = () => setModoManual(true)

  const handleChange = (e) => {
    const val = e.target.value
    onChange(val)
    if (!val) setModoManual(false)
  }

  return { modoManual, handleFocus, handleChange }
}