import { useCallback, useEffect, useRef } from 'react'

export default function Modal({
  abierto,
  titulo,
  mensaje,
  labelConfirmar = 'Confirmar',
  labelCancelar = 'Cancelar',
  onConfirmar,
  onCancelar,
}) {
  const dialogRef = useRef(null)

  const handleCancelar = useCallback(() => {
    onCancelar?.()
  }, [onCancelar])

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) return

    if (abierto) {
      if (!dialog.open) {
        dialog.showModal()
      }

      document.body.style.overflow = 'hidden'
    } else if (dialog.open) {
      dialog.close()
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [abierto])

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) return

    const handleClose = () => {
      handleCancelar()
    }

    dialog.addEventListener('close', handleClose)

    return () => {
      dialog.removeEventListener('close', handleClose)
    }
  }, [handleCancelar])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="modal-titulo"
      className="rounded-2xl border-none p-0 bg-transparent overflow-visible"
    >
      <div className="modal-enter bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <h2 id="modal-titulo" className="text-lg font-bold text-gray-800 mb-2">
          {titulo}
        </h2>

        <p className="text-sm text-gray-500 mb-6">{mensaje}</p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCancelar}
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
    </dialog>
  )
}
