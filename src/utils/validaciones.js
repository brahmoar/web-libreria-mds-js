import { validarRut as validarRutUtil } from './rut'
import { validarArchivo as validarArchivoUtil } from './archivos'

function validarRequerido(valor, label = 'Este campo') {
  const limpio = (valor ?? '').trim()
  if (!limpio) {
    return { valido: false, mensaje: `${label} es obligatorio.` }
  }
  return { valido: true, mensaje: '' }
}

function esFechaValida(fecha) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return false

  const [anio, mes, dia] = fecha.split('-').map(Number)
  const fechaCreada = new Date(anio, mes - 1, dia)

  return (
    fechaCreada.getFullYear() === anio &&
    fechaCreada.getMonth() === mes - 1 &&
    fechaCreada.getDate() === dia
  )
}

function esHoraValida(hora) {
  if (!/^\d{2}:\d{2}$/.test(hora)) return false

  const [horas, minutos] = hora.split(':').map(Number)
  return horas >= 0 && horas < 24 && minutos >= 0 && minutos < 60
}

function esFechaHoraValida(valor) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(valor)) return false

  const [fecha, hora] = valor.split('T')
  return esFechaValida(fecha) && esHoraValida(hora)
}

export function validarTexto(valor, label = 'Este campo', requerido = false) {
  if (requerido) {
    const req = validarRequerido(valor, label)
    if (!req.valido) return req
  }
  const limpio = (valor ?? '').trim()
  if (limpio && !/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(limpio)) {
    return { valido: false, mensaje: `${label} solo debe contener letras y espacios.` }
  }
  return { valido: true, mensaje: '' }
}

export function validarEmail(valor, requerido = true) {
  if (requerido) {
    const req = validarRequerido(valor, 'Correo electrónico')
    if (!req.valido) return req
  }
  const limpio = (valor ?? '').trim()
  if (limpio.includes('%')) {
    return { valido: false, mensaje: 'El correo no puede contener el carácter %.' }
  }
  if (limpio && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(limpio)) {
    return { valido: false, mensaje: 'El correo no tiene un formato válido.' }
  }
  return { valido: true, mensaje: '' }
}

export function validarTelefono(valor, requerido = true) {
  if (requerido) {
    const req = validarRequerido(valor, 'Teléfono')
    if (!req.valido) return req
  }
  const limpio = (valor ?? '').trim()
  if (limpio && !/^[0-9]+$/.test(limpio)) {
    return { valido: false, mensaje: 'El teléfono solo puede contener números.' }
  }

  if (limpio && limpio.length < 9) {
    return {
      valido: false,
      mensaje: `Teléfono incompleto: ingresaste ${limpio.length} de 9 dígitos.`,
    }
  }
  return { valido: true, mensaje: '' }
}

export function validarRut(valor, requerido = true) {
  if (requerido) {
    const req = validarRequerido(valor, 'RUT')
    if (!req.valido) return req
  }
  const limpio = (valor ?? '').trim()
  if (!limpio) return { valido: true, mensaje: '' }

  const soloChars = limpio.replace(/[^0-9kK]/g, '')

  if (soloChars.length < 8) {
    return {
      valido: false,
      mensaje: `RUT incompleto: ingresaste ${soloChars.length} de al menos 8 caracteres.`,
    }
  }

  return validarRutUtil(limpio)
}

export function validarFecha(valor, requerido = true) {
  if (requerido) {
    const req = validarRequerido(valor, 'Fecha')
    if (!req.valido) return req
  }
  const limpio = (valor ?? '').trim()
  if (limpio && !esFechaValida(limpio)) {
    return { valido: false, mensaje: 'La fecha no tiene un formato válido.' }
  }
  return { valido: true, mensaje: '' }
}

export function validarFechaHora(valor, requerido = true) {
  if (requerido) {
    const req = validarRequerido(valor, 'Fecha y hora')
    if (!req.valido) return req
  }
  const limpio = (valor ?? '').trim()
  if (limpio && !esFechaHoraValida(limpio)) {
    return { valido: false, mensaje: 'La fecha y hora no tienen un formato válido.' }
  }
  return { valido: true, mensaje: '' }
}

export function validarHora(valor, requerido = true) {
  if (requerido) {
    const req = validarRequerido(valor, 'Hora')
    if (!req.valido) return req
  }
  const limpio = (valor ?? '').trim()
  if (limpio && !esHoraValida(limpio)) {
    return { valido: false, mensaje: 'La hora no tiene un formato válido.' }
  }
  return { valido: true, mensaje: '' }
}

export function validarDireccion(valor, requerido = true) {
  if (requerido) {
    const req = validarRequerido(valor, 'Dirección')
    if (!req.valido) return req
  }

  const limpio = (valor ?? '').trim()
  if (!limpio) return { valido: true, mensaje: '' }

  if (!/^[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ\s.,#°º\-/]+$/.test(limpio)) {
    return {
      valido: false,
      mensaje:
        'La dirección solo puede contener letras, números, espacios y estos signos: . , # ° º - /',
    }
  }

  return { valido: true, mensaje: '' }
}

export function validarArchivoField(archivo, tipo, label, requerido = true) {
  if (requerido && !archivo) {
    return { valido: false, mensaje: `${label} es obligatorio.` }
  }

  if (!archivo) {
    return { valido: true, mensaje: '' }
  }

  return validarArchivoUtil(archivo, tipo)
}