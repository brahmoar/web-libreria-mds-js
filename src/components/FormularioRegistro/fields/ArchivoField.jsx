import { useState, useRef, useEffect } from 'react'
import {
  validarArchivo,
  crearUrlTemporal,
  liberarUrl,
  esVideo,
  esPdf,
  esImagenOVideo,
  esPdfPorNombre,
  esImagenOVideoPorNombre,
} from '../../../utils/archivos'

export default function ArchivoField({
  id,
  name,
  label,
  tipo,
  accept,
  tipoEtiqueta,
  value,
  onArchivoChange,
  error,
}) {
  const [errorTipo, setErrorTipo] = useState('')
  const [dragging, setDragging] = useState(false)
  const [dragInvalid, setDragInvalid] = useState(false)

  const [urlBlob, setUrlBlob] = useState(null)
  const inputRef = useRef(null)
  const errorTimeoutRef = useRef(null)

  useEffect(() => {
    if (!value) {
      setUrlBlob(null)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
      return
    }

    if (typeof value === 'string') {
      setUrlBlob(value)
      return
    }

    let url = null
    try {
      url = crearUrlTemporal(value)
      setUrlBlob(url)
    } catch {
      setUrlBlob(null)
    }

    return () => {
      if (url) liberarUrl(url)
    }
  }, [value])

  const limpiar = (emitChange = true) => {
    if (inputRef.current) inputRef.current.value = ''
    if (emitChange) onArchivoChange(null)
    setErrorTipo('')
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current)
      errorTimeoutRef.current = null
    }
  }

  const procesarArchivo = (file) => {
    const { valido, mensaje } = validarArchivo(file, tipo)
    if (!valido) {
      limpiar()
      setErrorTipo(mensaje)
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current)
      errorTimeoutRef.current = setTimeout(() => {
        setErrorTipo('')
        errorTimeoutRef.current = null
      }, 4000)
      return
    }
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current)
      errorTimeoutRef.current = null
    }
    setErrorTipo('')
    onArchivoChange(file)
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) procesarArchivo(file)
  }

  const getTransferFileInfo = (dataTransfer) => {
    if (dataTransfer.items?.length) {
      for (const item of dataTransfer.items) {
        if (item.kind === 'file') {
          const file = item.getAsFile()
          if (file) return file
          return { type: item.type || '', name: '' }
        }
      }
    }
    if (dataTransfer.files?.length) {
      return dataTransfer.files[0]
    }
    return null
  }

  const validarArrastre = (dataTransfer) => {
    const elemento = getTransferFileInfo(dataTransfer)
    if (!elemento) {
      if (dataTransfer.types?.includes('Files')) return null
      return true
    }
    if (tipo === 'pdf') {
      return esPdf(elemento) || esPdfPorNombre(elemento)
    }
    return esImagenOVideo(elemento) || esImagenOVideoPorNombre(elemento)
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    const valido = validarArrastre(e.dataTransfer)
    setDragging(true)
    setDragInvalid(valido === false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    const valido = validarArrastre(e.dataTransfer)
    setDragging(true)
    setDragInvalid(valido === false)
  }

  const handleDragLeave = () => {
    setDragging(false)
    setDragInvalid(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    setDragInvalid(false)
    const file = e.dataTransfer.files[0]
    if (file) procesarArchivo(file)
  }

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current)
      }
    }
  }, [])

  const etiqueta = value && esVideo(value) ? 'VID' : tipoEtiqueta

  const nombreArchivo = value?.name || (typeof value === 'string' ? value.split('/').pop() : '')

  const pesoArchivo =
    value && typeof value !== 'string'
      ? value.size < 1024 * 1024
        ? `${(value.size / 1024).toFixed(1)} KB`
        : `${(value.size / 1024 / 1024).toFixed(2)} MB`
      : ''

  const wrapperBorder = dragInvalid
    ? 'border-2 border-dashed border-red-500 bg-red-50'
    : dragging
    ? 'border-2 border-dashed border-blue-400 bg-blue-50'
    : 'border border-gray-200'

  return (
    <div
      className={`mb-4 ${wrapperBorder} rounded-lg`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        ref={inputRef}
        type="file"
        id={id}
        name={name}
        accept={accept}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-500
          file:mr-3 file:py-1 file:px-3 file:rounded file:border-0
          file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
      />

      {value && urlBlob && (
        <div className="mt-2 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
          <span className="text-xs font-semibold text-gray-400 shrink-0">{etiqueta}</span>
          <span className="flex-1 truncate font-medium">{nombreArchivo}</span>
          <span className="text-xs text-gray-400 shrink-0">{pesoArchivo}</span>
          <a
            href={urlBlob}
            download={nombreArchivo || undefined}
            className="text-blue-500 hover:text-blue-700 text-xs font-medium underline shrink-0 transition-colors"
          >
            Descargar
          </a>
          <button
            type="button"
            title="Quitar archivo"
            onClick={limpiar}
            className="text-red-400 hover:text-red-600 font-bold text-lg leading-none transition-colors shrink-0"
          >
            &times;
          </button>
        </div>
      )}

      {dragInvalid && (
        <small className="text-xs text-red-700 mt-1 block rounded-md bg-red-50 px-2 py-1">
          Advertencia: tipo de archivo no permitido para este campo.
        </small>
      )}
      {errorTipo && <small className="text-xs text-red-500 mt-1 block">{errorTipo}</small>}
      {error && <small className="field-error text-xs text-red-500 mt-1 block">{error}</small>}
    </div>
  )
}