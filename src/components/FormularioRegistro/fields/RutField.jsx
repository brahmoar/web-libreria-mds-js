import { formatearRut, limpiarRut } from '../../../utils/rut'
import { TECLAS_SISTEMA } from '../../../utils/constantes'

export default function RutField({ value, onChange, error }) {
  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text') || ''
    const limpio = pasted.replace(/[^0-9kK]/g, '').slice(0, 9)
    if (limpio === pasted) return
    e.preventDefault()
    const start = e.target.selectionStart
    const end = e.target.selectionEnd
    const nuevo = e.target.value.slice(0, start) + limpio + e.target.value.slice(end)
    onChange(formatearRut(limpiarRut(nuevo).slice(0, 9)))
  }

  const handleKeyDown = (e) => {
    if (TECLAS_SISTEMA.includes(e.key) || e.ctrlKey || e.metaKey) return
    if (!/^\d$/.test(e.key) && e.key.toUpperCase() !== 'K') e.preventDefault()
  }

  const handleChange = (e) => {
    const raw = limpiarRut(e.target.value).slice(0, 9)
    onChange(formatearRut(raw))
  }

  const borderClass = error
    ? 'border-red-500 shadow-[0_0_0_3px_rgba(230,60,60,0.15)]'
    : 'border-gray-300 focus:ring-2 focus:ring-blue-500'

  return (
    <div className="mb-4">
      <label htmlFor="idRut" className="block text-sm font-medium text-gray-700 mb-1">
        RUT <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="idRut"
        name="rut"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder="Ej: 12345678-9"
        autoComplete="off"
        aria-invalid={!!error}
        className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none ${borderClass}`}
      />
      {error && <small className="field-error text-xs text-red-500 mt-1 block">{error}</small>}
    </div>
  )
}