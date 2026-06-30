const TAMANIO_MAX_MB = 5
const TAMANIO_MAX_BYTES = TAMANIO_MAX_MB * 1024 * 1024
const MIME_PDF = 'application/pdf'
const MIME_IMAGENES = ['image/jpeg', 'image/png', 'image/webp']
const MIME_VIDEOS = ['video/mp4', 'video/quicktime', 'video/x-msvideo']

export function esPdf(file) {
  return file?.type === MIME_PDF
}

export function esImagen(file) {
  return MIME_IMAGENES.includes(file?.type)
}

export function esVideo(file) {
  return MIME_VIDEOS.includes(file?.type)
}

export function esImagenOVideo(file) {
  return esImagen(file) || esVideo(file)
}

export function esPdfPorNombre(file) {
  return !!file?.name?.toLowerCase().endsWith('.pdf')
}

export function esImagenOVideoPorNombre(file) {
  return !!file?.name?.toLowerCase().match(/\.(jpe?g|png|webp|mp4|mov)$/)
}

export function crearUrlTemporal(file) {
  return URL.createObjectURL(file)
}

export function liberarUrl(url) {
  if (url) URL.revokeObjectURL(url)
}

export function mensajeErrorTipo(tipo) {
  return tipo === 'pdf'
    ? 'Solo se permiten archivos PDF.'
    : 'Solo se permiten imágenes o videos: jpg, png, webp, mp4, mov.'
}

export function validarArchivo(file, tipo) {
  if (!file) return { valido: false, mensaje: 'No se seleccionó ningún archivo.' }

  const esValido = tipo === 'pdf' ? esPdf(file) : esImagenOVideo(file)
  if (!esValido) return { valido: false, mensaje: mensajeErrorTipo(tipo) }

  if (file.size > TAMANIO_MAX_BYTES) {
    const pesoMB = (file.size / 1024 / 1024).toFixed(2)
    return {
      valido: false,
      mensaje: `El archivo pesa ${pesoMB} MB. El máximo permitido es ${TAMANIO_MAX_MB} MB.`,
    }
  }

  return { valido: true, mensaje: '' }
}