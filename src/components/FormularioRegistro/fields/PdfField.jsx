import ArchivoField from './ArchivoField'

export default function PdfField({ value, onArchivoChange, error }) {
  return (
    <ArchivoField
      id="idArchivoPdf"
      name="archivoPdf"
      label="Archivo PDF"
      tipo="pdf"
      accept=".pdf"
      tipoEtiqueta="PDF"
      value={value}
      onArchivoChange={onArchivoChange}
      error={error}
    />
  )
}