import './FormularioRegistro.css'
import { useFormulario } from '../../hooks/useFormulario'
import Modal from './modal/Modal'
import { useCallback } from 'react'

import RutField from './fields/RutField'
import NombreField from './fields/NombreField'
import ApellidoField from './fields/ApellidoField'
import EmailField from './fields/EmailField'
import TelefonoField from './fields/TelefonoField'
import FechaField from './fields/FechaField'
import FechaHoraField from './fields/FechaHoraField'
import HoraField from './fields/HoraField'
import DireccionField from './fields/DireccionField'
import PdfField from './fields/PdfField'
import ImagenField from './fields/ImagenField'

export default function FormularioRegistro() {
  const {
    valores,
    errores,
    enviado,
    mostrarModal,
    actualizarCampo,
    actualizarArchivo,
    enviarFormulario,
    confirmarEnvio,
    cancelarEnvio,
  } = useFormulario()

  const manejarCampo = useCallback(
    (campo) => (valor) => actualizarCampo(campo, valor),
    [actualizarCampo]
  )
  const manejarArchivo = useCallback(
    (campo) => (archivo) => actualizarArchivo(campo, archivo),
    [actualizarArchivo]
  )

  return (
    <>
      <div className="formulario-card bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8">
        <h1 id="form-titulo" className="text-2xl font-bold text-gray-800 mb-6">
          Formulario de Registro
        </h1>

        {enviado && (
          <div
            role="status"
            className="success-banner mb-6 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm font-medium"
          >
            Los datos se registraron exitosamente.
          </div>
        )}

        <form onSubmit={enviarFormulario} noValidate aria-labelledby="form-titulo">
          <RutField value={valores.rut} onChange={manejarCampo('rut')} error={errores.rut} />

          <NombreField
            id="idNombres"
            name="nombres"
            label="Nombres"
            value={valores.nombres}
            onChange={manejarCampo('nombres')}
            error={errores.nombres}
            placeholder="Ingrese ambos nombres"
            requerido
          />

          <ApellidoField
            id="idApellidoPaterno"
            name="apellidoPaterno"
            label="Apellido Paterno"
            value={valores.apellidoPaterno}
            onChange={manejarCampo('apellidoPaterno')}
            error={errores.apellidoPaterno}
            requerido
          />

          <ApellidoField
            id="idApellidoMaterno"
            name="apellidoMaterno"
            label="Apellido Materno"
            value={valores.apellidoMaterno}
            onChange={manejarCampo('apellidoMaterno')}
            error={errores.apellidoMaterno}
            requerido={false}
          />

          <EmailField
            value={valores.correoElectronico}
            onChange={manejarCampo('correoElectronico')}
            error={errores.correoElectronico}
          />

          <TelefonoField
            value={valores.telefono}
            onChange={manejarCampo('telefono')}
            error={errores.telefono}
          />

          <FechaField value={valores.fecha} onChange={manejarCampo('fecha')} error={errores.fecha} />

          <FechaHoraField
            value={valores.fechaHora}
            onChange={manejarCampo('fechaHora')}
            error={errores.fechaHora}
          />

          <HoraField value={valores.hora} onChange={manejarCampo('hora')} error={errores.hora} />

          <PdfField
            value={valores.archivoPdf}
            onArchivoChange={manejarArchivo('archivoPdf')}
            error={errores.archivoPdf}
          />

          <ImagenField
            value={valores.archivoImagen}
            onArchivoChange={manejarArchivo('archivoImagen')}
            error={errores.archivoImagen}
          />

          <DireccionField
            value={valores.direccion}
            onChange={manejarCampo('direccion')}
            error={errores.direccion}
          />

          <div className="mt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

      <Modal
        abierto={mostrarModal}
        titulo="¿Estás seguro de enviar?"
        mensaje="Revisa que todos los datos sean correctos antes de continuar."
        labelConfirmar="Sí, enviar"
        labelCancelar="Volver atrás"
        onConfirmar={confirmarEnvio}
        onCancelar={cancelarEnvio}
      />
    </>
  )
}