import React from 'react';
import Constantes from "./Constantes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FilaDeTablaDeUsuario from './FilaDeTablaDeUsuario';

class VerUsuarios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
        };
    }

    async componentDidMount() {
        try {
            const respuesta = await fetch(`${Constantes.RUTA_API}/obtener_usuarios.php`);
            const usuarios = await respuesta.json();
            this.setState({
                usuarios: usuarios,
            });
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="mb-4">
                    <h1 className="h3">Ver usuarios</h1>
                    <ToastContainer />
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Teléfono</th>
                                <th>Fecha de registro</th>
                                <th>Fecha de edición</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.usuarios.map(usuario => (
                                <FilaDeTablaDeUsuario key={usuario.id} usuario={usuario} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default VerUsuarios;
