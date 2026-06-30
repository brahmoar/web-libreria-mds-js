import { useCallback } from 'react'
import { useAutoCampo } from '../../../hooks/useAutoCampo'
import CampoTemporal from './CampoTemporal'

const obtenerFechaHoraActual = () => {
  const ahora = new Date()
  const fecha = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`
  const hora = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}`
  return `${fecha}T${hora}`
}

export default function FechaHoraField({ value, onChange, error }) {
  const manejarCambio = useCallback((valor) => onChange(valor), [onChange])
  const { handleFocus, handleChange } = useAutoCampo(obtenerFechaHoraActual, manejarCambio)

  return (
    <CampoTemporal
      label="Fecha y Hora"
      id="idFechaHora"
      name="fechaHora"
      type="datetime-local"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      error={error}
    />
  )
}