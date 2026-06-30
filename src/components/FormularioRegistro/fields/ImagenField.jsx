import ArchivoField from './ArchivoField'

const tiposPermitidosImagenVideo =
  'image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/x-msvideo'

export default function ImagenField({ value, onArchivoChange, error }) {
  return (
    <ArchivoField
      id="idArchivoImagen"
      name="archivoImagen"
      label="Archivo IMG / Video"
      tipo="img"
      accept={tiposPermitidosImagenVideo}
      tipoEtiqueta="IMG"
      value={value}
      onArchivoChange={onArchivoChange}
      error={error}
    />
  )
}