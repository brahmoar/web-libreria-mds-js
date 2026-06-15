export function limpiarRut(value) {
  return value.replace(/[^0-9kK]/g, '').toUpperCase()
}

export function formatearRut(raw) {
  const limpio = limpiarRut(raw).slice(0, 9)
  if (limpio.length <= 1) return limpio
  return `${limpio.slice(0, -1)}-${limpio.slice(-1)}`
}

export function calcularDv(cuerpo) {
  const cuerpoStr = String(cuerpo).replace(/\./g, '')
  let suma = 0
  let multiplo = 2

  for (let i = cuerpoStr.length - 1; i >= 0; i--) {
    suma += Number(cuerpoStr[i]) * multiplo
    multiplo = multiplo < 7 ? multiplo + 1 : 2
  }

  const resultado = 11 - (suma % 11)
  if (resultado === 11) return '0'
  if (resultado === 10) return 'K'
  return String(resultado)
}

export function validarRut(rut) {
  const limpio = limpiarRut(rut)

  if (limpio.length < 2) {
    return { valido: false, mensaje: 'El RUT es demasiado corto.' }
  }

  const cuerpo = limpio.slice(0, -1)
  const dvIngresado = limpio.slice(-1)
  const dvCalculado = calcularDv(cuerpo)

  if (dvIngresado !== dvCalculado) {
    return { valido: false, mensaje: 'El RUT no es válido (dígito verificador incorrecto).' }
  }

  return { valido: true, mensaje: '' }
}