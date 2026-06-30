import FieldBase from './FieldBase'
import { formatearRut, limpiarRut } from '../../../utils/rut'
import { teclasEdicion } from '../../../utils/constantes'

const MaxDigitosRut = 9

function limpiarYFormatearRut(valor) {
  return formatearRut(limpiarRut(valor).slice(0, MaxDigitosRut))
}

function esTeclaDeRutPermitida(e) {
  if (teclasEdicion.includes(e.key) || e.ctrlKey || e.metaKey) return true
  return /^\d$/.test(e.key) || e.key.toUpperCase() === 'K'
}

function handleKeyDown(e) {
  if (!esTeclaDeRutPermitida(e)) e.preventDefault()
}

function construirRutPegado(elemento, textoLimpio) {
  const { selectionStart: start, selectionEnd: end, value } = elemento
  return value.slice(0, start) + textoLimpio + value.slice(end)
}

export default function RutField({ value, onChange, error }) {
  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text') || ''
    const limpio = pasted.replace(/[^0-9kK]/g, '').slice(0, MaxDigitosRut)
    if (limpio === pasted) return
    e.preventDefault()
    const nuevo = construirRutPegado(e.target, limpio)
    onChange(limpiarYFormatearRut(nuevo))
  }

  const handleChange = (e) => {
    onChange(limpiarYFormatearRut(e.target.value))
  }

  return (
    <FieldBase
      id="idRut"
      name="rut"
      label="RUT"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      placeholder="Ingrese su RUT"
      autoComplete="off"
      error={error}
      requerido
    />
  )
}