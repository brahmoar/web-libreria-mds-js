import { useEffect, useRef } from 'react'

export default function Modal({
  abierto,
  titulo,
  mensaje,
  labelConfirmar = 'Confirmar',
  labelCancelar = 'Cancelar',
  onConfirmar,
  onCancelar,
}) {
  const cancelarRef = useRef(null)

  useEffect(() => {
    if (abierto) {
      document.body.style.overflow = 'hidden'
      const id = setTimeout(() => cancelarRef.current?.focus(), 0)

      return () => {
        clearTimeout(id) 
        document.body.style.overflow = ''
      }
    }

    document.body.style.overflow = ''
    return undefined
  }, [abierto])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && abierto) {
        onCancelar?.()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [abierto, onCancelar])

  if (!abierto) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
    >
      <div className="modal-enter bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 text-center">
        <h2 id="modal-titulo" className="text-lg font-bold text-gray-800 mb-2">
          {titulo}
        </h2>
        <p className="text-sm text-gray-500 mb-6">{mensaje}</p>
        <div className="flex gap-3">
          <button
            ref={cancelarRef}
            type="button"
            onClick={onCancelar}
            className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
          >
            {labelCancelar}
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm"
          >
            {labelConfirmar}
          </button>
        </div>
      </div>
    </div>
  )
}