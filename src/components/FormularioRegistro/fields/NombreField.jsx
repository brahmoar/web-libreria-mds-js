import { TECLAS_SISTEMA } from '../../../utils/constantes'

const REGEX_LETRAS = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]$/

export default function NombreField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  placeholder = 'Ingrese su nombre',
  requerido = false,
}) {
  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text') || ''
    const limpio = pasted.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '')
    if (limpio === pasted) return
    e.preventDefault()
    const start = e.target.selectionStart
    const end = e.target.selectionEnd
    const nuevo = e.target.value.slice(0, start) + limpio + e.target.value.slice(end)
    onChange(nuevo)
  }

  const handleKeyDown = (e) => {
    if (TECLAS_SISTEMA.includes(e.key) || e.ctrlKey || e.metaKey) return
    if (!REGEX_LETRAS.test(e.key)) e.preventDefault()
  }

  const handleChange = (e) => {
    const limpio = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '')
    onChange(limpio)
  }

  const borderClass = error
    ? 'border-red-500 shadow-[0_0_0_3px_rgba(230,60,60,0.15)]'
    : 'border-gray-300 focus:ring-2 focus:ring-blue-500'

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {requerido && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        aria-invalid={!!error}
        className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none ${borderClass}`}
      />
      {error && <small className="field-error text-xs text-red-500 mt-1 block">{error}</small>}
    </div>
  )
}