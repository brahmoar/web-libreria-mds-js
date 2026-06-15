import ArchivoField from './ArchivoField'

const ACCEPT_IMAGEN_VIDEO =
  'image/jpeg,image/png,image/gif,image/webp,video/mp4,video/quicktime,video/x-msvideo'

export default function ImagenField({ value, onArchivoChange, error }) {
  return (
    <ArchivoField
      id="idArchivoImagen"
      name="archivoImagen"
      label="Archivo IMG / Video"
      tipo="img"
      accept={ACCEPT_IMAGEN_VIDEO}
      tipoEtiqueta="IMG"
      value={value}
      onArchivoChange={onArchivoChange}
      error={error}
    />
  )
}