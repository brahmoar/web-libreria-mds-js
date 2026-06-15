import { useState, useCallback, useRef, useEffect } from 'react'
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

const ESTADO_INICIAL = {
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

function ejecutarValidaciones(valores) {
  const errores = {}

  const rut = validarRut(valores.rut, true)
  if (!rut.valido) errores.rut = rut.mensaje

  const nombres = validarTexto(valores.nombres, 'Nombres', true)
  if (!nombres.valido) errores.nombres = nombres.mensaje

  const apellidoPaterno = validarTexto(valores.apellidoPaterno, 'Apellido Paterno', true)
  if (!apellidoPaterno.valido) errores.apellidoPaterno = apellidoPaterno.mensaje

  const apellidoMaterno = validarTexto(valores.apellidoMaterno, 'Apellido Materno', false)
  if (!apellidoMaterno.valido) errores.apellidoMaterno = apellidoMaterno.mensaje

  const email = validarEmail(valores.correoElectronico, true)
  if (!email.valido) errores.correoElectronico = email.mensaje

  const telefono = validarTelefono(valores.telefono, true)
  if (!telefono.valido) errores.telefono = telefono.mensaje

  const fecha = validarFecha(valores.fecha, false)
  if (!fecha.valido) errores.fecha = fecha.mensaje

  const fechaHora = validarFechaHora(valores.fechaHora, false)
  if (!fechaHora.valido) errores.fechaHora = fechaHora.mensaje

  const hora = validarHora(valores.hora, true)
  if (!hora.valido) errores.hora = hora.mensaje

  const archivoPdf = validarArchivoField(valores.archivoPdf, 'pdf', 'Archivo PDF', false)
  if (!archivoPdf.valido) errores.archivoPdf = archivoPdf.mensaje

  const archivoImagen = validarArchivoField(
    valores.archivoImagen,
    'img',
    'Archivo IMG / Video',
    false
  )
  if (!archivoImagen.valido) errores.archivoImagen = archivoImagen.mensaje

  const direccion = validarDireccion(valores.direccion, false)
  if (!direccion.valido) errores.direccion = direccion.mensaje

  return errores
}

export function useFormulario() {
  const [valores, setValores] = useState(ESTADO_INICIAL)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)
  const [mostrarModal, setMostrarModal] = useState(false)

  const successTimeoutRef = useRef(null)
  const warningTimeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current)
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current)
    }
  }, [])

  const handleChange = useCallback((campo, valor) => {
    setValores((prev) => ({ ...prev, [campo]: valor }))
    setErrores((prev) => {
      if (!prev[campo]) return prev
      const nuevo = { ...prev }
      delete nuevo[campo]
      return nuevo
    })
  }, [])

  const handleArchivoChange = handleChange

  const validar = useCallback(() => {
   
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current)
      warningTimeoutRef.current = null
    }

    const nuevosErrores = ejecutarValidaciones(valores)
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      warningTimeoutRef.current = setTimeout(() => {
        setErrores({})
        warningTimeoutRef.current = null
      }, 4000)
    }

    return Object.keys(nuevosErrores).length === 0
  }, [valores])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (validar()) {
        setMostrarModal(true)
      }
    },
    [validar]
  )

  const confirmarEnvio = useCallback(() => {
    setMostrarModal(false)
    setEnviado(true)
    setValores(ESTADO_INICIAL)
    setErrores({})

    if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current)
    successTimeoutRef.current = setTimeout(() => {
      setEnviado(false)
      successTimeoutRef.current = null
    }, 4000)
  }, [])

  const cancelarEnvio = useCallback(() => {
    setMostrarModal(false)
  }, [])

  const resetear = useCallback(() => {
    setValores(ESTADO_INICIAL)
    setErrores({})
    setEnviado(false)
    setMostrarModal(false)
  }, [])

  return {
    valores,
    errores,
    enviado,
    mostrarModal,
    handleChange,
    handleArchivoChange,
    handleSubmit,
    confirmarEnvio,
    cancelarEnvio,
    resetear,
  }
}