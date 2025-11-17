import React, { useEffect, useState } from "react";
import Constantes from "./Constantes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditarUsuario() {
  const { id } = useParams(); // obtiene el ID de la URL
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "", 
  });

  // Obtener datos del usuario al cargar el componente
  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const respuesta = await fetch(
          `${Constantes.RUTA_API}/obtener_usuario.php?id=${id}`
        );
        const datos = await respuesta.json();
        setUsuario(datos);
      } catch (error) {
        toast.error("Error al cargar el usuario");
      }
    };
    obtenerUsuario();
  }, [id]);

  // Manejar cambios en los inputs
  const manejarCambio = (evento) => {
    const { id: clave, value } = evento.target;
    setUsuario((prev) => ({
      ...prev,
      [clave]: clave === "telefono" ? parseFloat(value) : value,
    }));
  };

  // Manejar envío del formulario
  const manejarEnvioDeFormulario = async (evento) => {
    evento.preventDefault();

    try {
      const respuesta = await fetch(
        `${Constantes.RUTA_API}/actualizar_usuario.php`,
        {
          method: "PUT",
          body: JSON.stringify(usuario),
          headers: { "Content-Type": "application/json" },
        }
      );
      const exitoso = await respuesta.json();

      if (exitoso) {
        toast.success("Usuario guardado ✅", {
          position: "top-left",
          autoClose: 2000,
        });
        setTimeout(() => navigate("/usuarios/ver"), 2000);
      } else {
        toast.error("Error guardando. Intenta de nuevo");
      }
    } catch (error) {
      toast.error("Error de conexión con el servidor");
    }
  };

  return (
    <div className="col-md-6 offset-md-3 mt-4">
      <h1 className="mb-4">Editando usuario</h1>
      <ToastContainer />
      <form onSubmit={manejarEnvioDeFormulario}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre:
          </label>
          <input
            autoFocus
            required
            placeholder="Nombre"
            type="text"
            id="nombre"
            onChange={manejarCambio}
            value={usuario.nombre}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">
            Apellido:
          </label>
          <input
            required
            placeholder="Apellido"
            type="text"
            id="apellido"
            onChange={manejarCambio}
            value={usuario.apellido}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono:
          </label>
          <input
            required
            placeholder="Teléfono"
            type="number"
            id="telefono"
            onChange={manejarCambio}
            value={usuario.telefono}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico:
          </label>
          <input
            required
            placeholder="Correo electrónico"
            type="email"
            id="email"
            onChange={manejarCambio}
            value={usuario.email}
            className="form-control"
          />
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            Guardar
          </button>
          <Link to="/usuarios/ver" className="btn btn-primary">
            Volver
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditarUsuario;
