const tamanoMaximoMb = 5
const tamanoMaximoBytes = tamanoMaximoMb * 1024 * 1024
const tipoPdf = 'application/pdf'
const tiposImagen = ['image/jpeg', 'image/png', 'image/webp']
const tiposVideo = ['video/mp4', 'video/quicktime', 'video/x-msvideo']

export function esPdf(file) {
  return file?.type === tipoPdf
}

function esImagen(file) {
  return tiposImagen.includes(file?.type)
}

export function esVideo(file) {
  return tiposVideo.includes(file?.type)
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

function mensajeErrorTipo(tipo) {
  return tipo === 'pdf'
    ? 'Solo se permiten archivos PDF.'
    : 'Solo se permiten imágenes o videos: jpg, png, webp, mp4, mov.'
}

export function validarArchivo(file, tipo) {
  if (!file) return { valido: false, mensaje: 'No se seleccionó ningún archivo.' }

  const esValido = tipo === 'pdf' ? esPdf(file) : esImagenOVideo(file)
  if (!esValido) return { valido: false, mensaje: mensajeErrorTipo(tipo) }

  if (file.size > tamanoMaximoBytes) {
    const pesoMB = (file.size / 1024 / 1024).toFixed(2)
    return {
      valido: false,
      mensaje: `El archivo pesa ${pesoMB} MB. El máximo permitido es ${tamanoMaximoMb} MB.`,
    }
  }

  return { valido: true, mensaje: '' }
}