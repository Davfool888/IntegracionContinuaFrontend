import React from 'react';
import Constantes from "./Constantes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

// Wrapper para pasar navigate a componentes de clase
export function withNavigation(Component) {
    return function WrappedComponent(props) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}

class AgregarUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: {
                nombre: "",
                apellido: "",
                telefono: "",
                email: "",
            },
        };
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioDeFormulario = this.manejarEnvioDeFormulario.bind(this);
    }

    render() {
        return (
            <div className="container mt-4">
                <h1 className="h3 mb-4">Agregar usuario</h1>
                <ToastContainer />
                <form onSubmit={this.manejarEnvioDeFormulario}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre:</label>
                        <input
                            autoFocus
                            required
                            placeholder="Nombre"
                            type="text"
                            id="nombre"
                            onChange={this.manejarCambio}
                            value={this.state.usuario.nombre}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="apellido" className="form-label">Apellido:</label>
                        <input
                            required
                            placeholder="Apellido"
                            type="text"
                            id="apellido"
                            onChange={this.manejarCambio}
                            value={this.state.usuario.apellido}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="telefono" className="form-label">Teléfono:</label>
                        <input
                            required
                            placeholder="Teléfono"
                            type="tel"
                            id="telefono"
                            onChange={this.manejarCambio}
                            value={this.state.usuario.telefono}
                            className="form-control"
                            pattern="[0-9]{10}"
                            maxLength={10}
                            title="Ingrese un número de teléfono válido de 10 dígitos, sin espacios ni guiones"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo electrónico:</label>
                        <input
                            required
                            placeholder="Correo electrónico"
                            type="email"
                            id="email"
                            onChange={this.manejarCambio}
                            value={this.state.usuario.email}
                            className="form-control"
                            title="Ingrese un correo electrónico válido"
                        />
                    </div>

                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-success">Guardar</button>
                        <Link to="/usuarios/ver" className="btn btn-primary">Volver</Link>
                    </div>
                </form>
            </div>
        );
    }

    async manejarEnvioDeFormulario(evento) {
        evento.preventDefault();
        const cargaUtil = JSON.stringify(this.state.usuario);

        try {
            const respuesta = await fetch(`${Constantes.RUTA_API}/guardar_usuario.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: cargaUtil,
            });

            const exitoso = await respuesta.json();

            if (exitoso) {
                toast.success("Usuario guardado ✔️", {
                    position: "top-left",
                    autoClose: 2000,
                });

                this.setState({
                    usuario: { nombre: "", apellido: "", telefono: "", email: "" }
                });

                if (this.props.navigate) {
                    this.props.navigate("/usuarios/ver");
                }

            } else {
                toast.error("Error guardando. Intenta de nuevo");
            }
        } catch (error) {
            console.error("Error al guardar usuario:", error);
            toast.error("Error de conexión con el servidor");
        }
    }

    manejarCambio(evento) {
        const clave = evento.target.id;
        const valor = evento.target.value;

        this.setState(state => {
            const usuarioActualizado = { ...state.usuario };
            usuarioActualizado[clave] = valor; 
            return { usuario: usuarioActualizado };
        });
    }
}

export default withNavigation(AgregarUsuario);
