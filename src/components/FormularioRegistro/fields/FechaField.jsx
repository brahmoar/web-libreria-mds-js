import { useCallback } from 'react'
import { useAutoCampo } from '../../../hooks/useAutoCampo'
import CampoTemporal from './CampoTemporal'

const obtenerFechaActual = () => {
  const ahora = new Date()
  return `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`
}

export default function FechaField({ value, onChange, error }) {
  const manejarCambio = useCallback((valor) => onChange(valor), [onChange])
  const { handleFocus, handleChange } = useAutoCampo(obtenerFechaActual, manejarCambio)

  return (
    <CampoTemporal
      label="Fecha"
      id="idFecha"
      name="fecha"
      type="date"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      error={error}
    />
  )
}