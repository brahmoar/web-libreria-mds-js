import FieldBase from './FieldBase'
import { teclasEdicion } from '../../../utils/constantes'

const MaxNumeroTelefono = 9

function limpiarTelefono(valor) {
  return valor.replace(/\D/g, '').slice(0, MaxNumeroTelefono)
}

function esTeclaDeTelefonoPermitida(e) {
  if (teclasEdicion.includes(e.key) || e.ctrlKey || e.metaKey) return true
  return /^\d$/.test(e.key)
}

function handleKeyDown(e) {
  if (!esTeclaDeTelefonoPermitida(e)) e.preventDefault()
}

function construirTelefonoPegado(elemento, textoLimpio) {
  const { selectionStart: start, selectionEnd: end, value } = elemento
  return limpiarTelefono(value.slice(0, start) + textoLimpio + value.slice(end))
}

export default function TelefonoField({ value, onChange, error }) {
  const handleChange = (e) => {
    onChange(limpiarTelefono(e.target.value))
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text') || ''
    const limpio = limpiarTelefono(pasted)
    if (limpio === pasted) return
    e.preventDefault()
    onChange(construirTelefonoPegado(e.target, limpio))
  }

  return (
    <FieldBase
      id="idTelefono"
      name="telefono"
      label="Teléfono"
      type="tel"
      value={value}
      onChange={handleChange}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      placeholder="Ingrese su número de teléfono"
      maxLength={MaxNumeroTelefono}
      error={error}
      requerido
    />
  )
}