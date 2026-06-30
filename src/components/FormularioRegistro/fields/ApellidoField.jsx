import NombreField from './NombreField'

export default function ApellidoField({ id, name, label, value, onChange, error, requerido }) {
  return (
    <NombreField
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      placeholder={`Ingrese su ${label?.toLowerCase() ?? 'apellido'}`}
      requerido={requerido}
    />
  )
}