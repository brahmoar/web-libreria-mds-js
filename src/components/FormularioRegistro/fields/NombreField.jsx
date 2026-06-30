import FieldBase from './FieldBase'
import { teclasEdicion } from '../../../utils/constantes'

const caracteresNombrePermitidos = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]$/
const caracteresNombreInvalidos = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g

function limpiarNombre(valor) {
  return valor.replace(caracteresNombreInvalidos, '')
}

function esTeclaDeNombrePermitida(e) {
  if (teclasEdicion.includes(e.key) || e.ctrlKey || e.metaKey) return true
  return caracteresNombrePermitidos.test(e.key)
}

function handleKeyDown(e) {
  if (!esTeclaDeNombrePermitida(e)) e.preventDefault()
}

function construirTextoPegado(elemento, textoLimpio) {
  const { selectionStart: start, selectionEnd: end, value } = elemento
  return value.slice(0, start) + textoLimpio + value.slice(end)
}

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
    const limpio = limpiarNombre(pasted)
    if (limpio === pasted) return
    e.preventDefault()
    onChange(construirTextoPegado(e.target, limpio))
  }

  const handleChange = (e) => {
    onChange(limpiarNombre(e.target.value))
  }

  return (
    <FieldBase
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={handleChange}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      autoComplete="off"
      error={error}
      requerido={requerido}
    />
  )
}