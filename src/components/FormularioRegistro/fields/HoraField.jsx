import { useCallback } from 'react'
import { useAutoCampo } from '../../../hooks/useAutoCampo'
import CampoTemporal from './CampoTemporal'

const obtenerHoraActual = () => {
  const ahora = new Date()
  return `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}`
}

export default function HoraField({ value, onChange, error }) {
  const manejarCambio = useCallback((valor) => onChange(valor), [onChange])
  const { handleFocus, handleChange } = useAutoCampo(obtenerHoraActual, manejarCambio)

  return (
    <CampoTemporal
      label="Hora"
      id="idHora"
      name="hora"
      type="time"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      error={error}
    />
  )
}