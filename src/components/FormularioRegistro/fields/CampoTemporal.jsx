import FieldBase from './FieldBase'

export default function CampoTemporal({
  label,
  id,
  name,
  type,
  value,
  onChange,
  onFocus,
  error,
}) {
  return (
    <FieldBase
      id={id}
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      error={error}
    />
  )
}
