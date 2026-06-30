import { forwardRef } from 'react'

function obtenerBorderClass(error) {
  return error
    ? 'border-red-500 shadow-[0_0_0_3px_rgba(230,60,60,0.15)]'
    : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
}

const FieldBase = forwardRef(function FieldBase(
  {
    id,
    name,
    label,
    value,
    type = 'text',
    error,
    placeholder,
    requerido = false,
    autoComplete,
    maxLength,
    inputMode,
    onChange,
    onPaste,
    onKeyDown,
    onFocus,
    className = '',
    ...props
  },
  ref
) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {requerido && <span className="text-red-500"> *</span>}
      </label>
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onPaste={onPaste}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        inputMode={inputMode}
        required={requerido}
        aria-invalid={!!error}
        className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none ${obtenerBorderClass(error)} ${className}`.trim()}
        {...props}
      />
      {error && <small className="field-error text-xs text-red-500 mt-1 block">{error}</small>}
    </div>
  )
})

export default FieldBase
