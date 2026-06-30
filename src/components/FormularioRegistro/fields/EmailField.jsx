import FieldBase from './FieldBase'
import { teclasEdicion } from '../../../utils/constantes'

const caracteresCorreoPermitidos = /^[a-zA-Z0-9._+\-@]$/
const caracteresCorreoInvalidos = /[^a-zA-Z0-9._+\-@]/g

function limpiarCorreo(valor) {
  return valor.replace(caracteresCorreoInvalidos, '')
}

function esTeclaDeCorreoPermitida(e) {
  if (teclasEdicion.includes(e.key) || e.ctrlKey || e.metaKey) return true
  return caracteresCorreoPermitidos.test(e.key)
}

function handleKeyDown(e) {
  if (!esTeclaDeCorreoPermitida(e)) e.preventDefault()
}

function esPegadoInvalido(textoPegado) {
  const textoLimpio = limpiarCorreo(textoPegado)
  return textoPegado.includes('%') || textoLimpio !== textoPegado
}

function handlePaste(e) {
  const textoPegado = e.clipboardData.getData('text') || ''
  if (esPegadoInvalido(textoPegado)) {
    e.preventDefault()
  }
}

export default function EmailField({ value, onChange, error }) {
  const handleChange = (e) => {
    onChange(limpiarCorreo(e.target.value))
  }

  return (
    <FieldBase
      id="idEmail"
      name="correoElectronico"
      label="Correo Electrónico"
      type="email"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      placeholder="tucorreo@ejemplo.com"
      autoComplete="email"
      error={error}
      requerido
    />
  )
}