import { useCallback } from 'react'
import { useAutoCampo } from '../../../hooks/useAutoCampo'

const fechaHoraActual = () => {
  const now = new Date()
  const fecha = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const hora = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  return `${fecha}T${hora}`
}

export default function FechaHoraField({ value, onChange, error }) {
  const onChangeMemo = useCallback((val) => onChange(val), [onChange])
  const { modoManual, handleFocus, handleChange } = useAutoCampo(fechaHoraActual, onChangeMemo)

  const borderClass = error
    ? 'border-red-500 shadow-[0_0_0_3px_rgba(230,60,60,0.15)]'
    : 'border-gray-300 focus:ring-2 focus:ring-blue-500'

  return (
    <div className="mb-4">
      <label htmlFor="idFechaHora" className="block text-sm font-medium text-gray-700 mb-1">
        Fecha y Hora
      </label>
      <input
        type="datetime-local"
        id="idFechaHora"
        name="fechaHora"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        aria-invalid={!!error}
        className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none ${borderClass}`}
      />
      <small className="text-xs text-gray-400 mt-1 block">
        {modoManual
          ? 'Modo manual activado. Borra el valor para volver al automático.'
          : 'Se establece automáticamente. Puedes editarla si lo deseas.'}
      </small>
      {error && <small className="field-error text-xs text-red-500 mt-1 block">{error}</small>}
    </div>
  )
}