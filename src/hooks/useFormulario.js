import { useCallback, useEffect, useRef, useState } from 'react'
import {
  validarRut,
  validarTexto,
  validarEmail,
  validarTelefono,
  validarFecha,
  validarFechaHora,
  validarHora,
  validarDireccion,
  validarArchivoField,
} from '../utils/validaciones'

function crearEstadoInicial() {
  return {
    rut: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correoElectronico: '',
    telefono: '',
    fecha: '',
    fechaHora: '',
    hora: '',
    archivoPdf: null,
    archivoImagen: null,
    direccion: '',
  }
}

function validarCampos(valoresFormulario) {
  const errores = {}

  const rut = validarRut(valoresFormulario.rut, true)
  if (!rut.valido) errores.rut = rut.mensaje

  const nombres = validarTexto(valoresFormulario.nombres, 'Nombres', true)
  if (!nombres.valido) errores.nombres = nombres.mensaje

  const apellidoPaterno = validarTexto(
    valoresFormulario.apellidoPaterno,
    'Apellido Paterno',
    true
  )
  if (!apellidoPaterno.valido) errores.apellidoPaterno = apellidoPaterno.mensaje

  const apellidoMaterno = validarTexto(valoresFormulario.apellidoMaterno, 'Apellido Materno', false)
  if (!apellidoMaterno.valido) errores.apellidoMaterno = apellidoMaterno.mensaje

  const email = validarEmail(valoresFormulario.correoElectronico, true)
  if (!email.valido) errores.correoElectronico = email.mensaje

  const telefono = validarTelefono(valoresFormulario.telefono, true)
  if (!telefono.valido) errores.telefono = telefono.mensaje

  const fecha = validarFecha(valoresFormulario.fecha, false)
  if (!fecha.valido) errores.fecha = fecha.mensaje

  const fechaHora = validarFechaHora(valoresFormulario.fechaHora, false)
  if (!fechaHora.valido) errores.fechaHora = fechaHora.mensaje

  const hora = validarHora(valoresFormulario.hora, true)
  if (!hora.valido) errores.hora = hora.mensaje

  const archivoPdf = validarArchivoField(
    valoresFormulario.archivoPdf,
    'pdf',
    'Archivo PDF',
    false
  )
  if (!archivoPdf.valido) errores.archivoPdf = archivoPdf.mensaje

  const archivoImagen = validarArchivoField(
    valoresFormulario.archivoImagen,
    'img',
    'Archivo IMG / Video',
    false
  )
  if (!archivoImagen.valido) errores.archivoImagen = archivoImagen.mensaje

  const direccion = validarDireccion(valoresFormulario.direccion, false)
  if (!direccion.valido) errores.direccion = direccion.mensaje

  return errores
}

export function useFormulario() {
  const [valores, setValores] = useState(crearEstadoInicial)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)
  const [mostrarModal, setMostrarModal] = useState(false)

  const timeoutExitoRef = useRef(null)
  const timeoutAdvertenciaRef = useRef(null)

  const limpiarTimeout = useCallback((timeoutRef) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      limpiarTimeout(timeoutExitoRef)
      limpiarTimeout(timeoutAdvertenciaRef)
    }
  }, [limpiarTimeout])

  const actualizarCampo = useCallback((campo, valor) => {
    setValores((prev) => ({ ...prev, [campo]: valor }))
    setErrores((prev) => {
      if (!prev[campo]) return prev
      const nuevosErrores = { ...prev }
      delete nuevosErrores[campo]
      return nuevosErrores
    })
  }, [])

  const actualizarArchivo = useCallback((campo, valor) => {
    setValores((prev) => ({ ...prev, [campo]: valor }))
    setErrores((prev) => {
      if (!prev[campo]) return prev
      const nuevosErrores = { ...prev }
      delete nuevosErrores[campo]
      return nuevosErrores
    })
  }, [])

  const validarFormulario = useCallback(() => {
    limpiarTimeout(timeoutAdvertenciaRef)

    const nuevosErrores = validarCampos(valores)
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      timeoutAdvertenciaRef.current = setTimeout(() => {
        setErrores({})
        timeoutAdvertenciaRef.current = null
      }, 4000) // Duracion de advertencias
    }

    return Object.keys(nuevosErrores).length === 0
  }, [limpiarTimeout, valores])

  const enviarFormulario = useCallback(
    (evento) => {
      evento.preventDefault()
      if (validarFormulario()) {
        setMostrarModal(true)
      }
    },
    [validarFormulario]
  )

  const confirmarEnvio = useCallback(() => {
    setMostrarModal(false)
    setEnviado(true)
    setValores(crearEstadoInicial())
    setErrores({})

    limpiarTimeout(timeoutExitoRef)
    timeoutExitoRef.current = setTimeout(() => {
      setEnviado(false)
      timeoutExitoRef.current = null
    }, 4000)
  }, [limpiarTimeout])

  const cancelarEnvio = useCallback(() => {
    setMostrarModal(false)
  }, [])

  const resetearFormulario = useCallback(() => {
    setValores(crearEstadoInicial())
    setErrores({})
    setEnviado(false)
    setMostrarModal(false)
    limpiarTimeout(timeoutExitoRef)
    limpiarTimeout(timeoutAdvertenciaRef)
  }, [limpiarTimeout])

  return {
    valores,
    errores,
    enviado,
    mostrarModal,
    actualizarCampo,
    actualizarArchivo,
    enviarFormulario,
    confirmarEnvio,
    cancelarEnvio,
    resetearFormulario,
  }
}