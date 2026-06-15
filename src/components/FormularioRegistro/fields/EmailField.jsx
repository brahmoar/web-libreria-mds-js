import { TECLAS_SISTEMA } from '../../../utils/constantes'

const REGEX_EMAIL_CHARS = /^[a-zA-Z0-9._+\-@]$/

export default function EmailField({ value, onChange, error }) {
  const handleKeyDown = (e) => {
    if (TECLAS_SISTEMA.includes(e.key) || e.ctrlKey || e.metaKey) return
    if (!REGEX_EMAIL_CHARS.test(e.key)) e.preventDefault()
  }

  const handleChange = (e) => {
    const limpio = e.target.value.replace(/[^a-zA-Z0-9._+\-@]/g, '')
    onChange(limpio)
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text') || ''
    if (pasted.includes('%')) {
      e.preventDefault()
    }
  }

  const borderClass = error
    ? 'border-red-500 shadow-[0_0_0_3px_rgba(230,60,60,0.15)]'
    : 'border-gray-300 focus:ring-2 focus:ring-blue-500'

  return (
    <div className="mb-4">
      <label htmlFor="idEmail" className="block text-sm font-medium text-gray-700 mb-1">
        Correo Electrónico <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        id="idEmail"
        name="correoElectronico"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder="tucorreo@ejemplo.com"
        autoComplete="email"
        aria-invalid={!!error}
        className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none ${borderClass}`}
      />
      {error && <small className="field-error text-xs text-red-500 mt-1 block">{error}</small>}
    </div>
  )
}