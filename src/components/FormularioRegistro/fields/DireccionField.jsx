const REGEX_DIRECCION_VALIDA = /[^A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ\s.,#°º\-/]/g

export default function DireccionField({ value, onChange, error }) {
  const handleChange = (e) => {
    onChange(e.target.value.replace(REGEX_DIRECCION_VALIDA, ''))
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text') || ''
    const limpio = pasted.replace(REGEX_DIRECCION_VALIDA, '')
    if (limpio === pasted) return
    e.preventDefault()
    const start = e.target.selectionStart
    const end = e.target.selectionEnd
    const nuevo = e.target.value.slice(0, start) + limpio + e.target.value.slice(end)
    onChange(nuevo)
  }

  const borderClass = error
    ? 'border-red-500 shadow-[0_0_0_3px_rgba(230,60,60,0.15)]'
    : 'border-gray-300 focus:ring-2 focus:ring-blue-500'

  return (
    <div className="mb-6">
      <label htmlFor="idDireccion" className="block text-sm font-medium text-gray-700 mb-1">
        Dirección
      </label>
      <input
        type="text"
        id="idDireccion"
        name="direccion"
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        placeholder="Ingrese su dirección"
        aria-invalid={!!error}
        className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none ${borderClass}`}
      />
      {error && <small className="field-error text-xs text-red-500 mt-1 block">{error}</small>}
    </div>
  )
}