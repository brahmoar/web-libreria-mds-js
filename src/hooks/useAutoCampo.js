import { useCallback, useEffect, useRef, useState } from 'react'

export function useAutoCampo(obtenerValorActual, onChange, intervaloMs = 60_000) {
  const [esManual, setEsManual] = useState(false)
  const onChangeRef = useRef(onChange)
  const obtenerValorActualRef = useRef(obtenerValorActual)

  useEffect(() => {
    onChangeRef.current = onChange
    obtenerValorActualRef.current = obtenerValorActual
  }, [onChange, obtenerValorActual])

  const actualizarValorAuto = useCallback(() => {
    onChangeRef.current(obtenerValorActualRef.current())
  }, [])

  useEffect(() => {
    actualizarValorAuto()
  }, [actualizarValorAuto])

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!esManual) {
        actualizarValorAuto()
      }
    }, intervaloMs)

    return () => window.clearInterval(id)
  }, [actualizarValorAuto, esManual, intervaloMs])

  const handleFocus = useCallback(() => setEsManual(true), [])

  const handleChange = useCallback((evento) => {
    const valor = evento.target.value
    onChangeRef.current(valor)

    if (!valor) {
      setEsManual(false)
      onChangeRef.current(obtenerValorActualRef.current())
    }
  }, [])

  return { handleFocus, handleChange }
}