import FieldBase from './FieldBase'

const caracteresDireccionInvalidos = /[^A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ\s.,#°º\-/]/g

export default function DireccionField({ value, onChange, error }) {
  const handleChange = (e) => {
    onChange(e.target.value.replace(caracteresDireccionInvalidos, ''))
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text') || ''
    const limpio = pasted.replace(caracteresDireccionInvalidos, '')
    if (limpio === pasted) return
    e.preventDefault()
    const start = e.target.selectionStart
    const end = e.target.selectionEnd
    const nuevo = e.target.value.slice(0, start) + limpio + e.target.value.slice(end)
    onChange(nuevo)
  }

  return (
    <FieldBase
      id="idDireccion"
      name="direccion"
      label="Dirección"
      value={value}
      onChange={handleChange}
      onPaste={handlePaste}
      placeholder="Ingrese su dirección"
      error={error}
      className="mb-6"
    />
  )
}