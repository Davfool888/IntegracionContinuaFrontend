import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Constantes from './Constantes';

class FilaDeTablaDeUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eliminado: false, // Si se ha eliminado el usuario, no lo mostramos
        };
        this.redireccionarParaEditar = this.redireccionarParaEditar.bind(this);
        this.eliminar = this.eliminar.bind(this);
    }

    redireccionarParaEditar() {
        return <Navigate to={`/usuarios/editar/${this.props.usuario.id}`} />
    }

    async eliminar() {
        const resultado = await Swal.fire({
            title: 'Confirmación',
            text: `¿Eliminar "${this.props.usuario.nombre}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#0d6efd', // azul bootstrap
            cancelButtonColor: '#dc3545', // rojo bootstrap
            cancelButtonText: 'No',
            confirmButtonText: 'Sí, eliminar'
        });

        // Si no confirma, detenemos la función
        if (!resultado.value) {
            return;
        }

        const respuesta = await fetch(
            `${Constantes.RUTA_API}/eliminar_usuario.php?id=${this.props.usuario.id}`, 
            { method: "DELETE" }
        );

        const exitoso = await respuesta.json();

        if (exitoso) {
            toast.success('Usuario eliminado ✅', {
                position: "top-left",
                autoClose: 2000,
            });
            this.setState({ eliminado: true });
        } else {
            toast.error("Error eliminando. Intenta de nuevo");
        }
    }

    render() {
        if (this.state.eliminado) {
            return null;
        }

        return (
            <tr>
                <td>{this.props.usuario.id}</td> 
                <td>{this.props.usuario.nombre}</td>
                <td>{this.props.usuario.apellido}</td>
                <td>{this.props.usuario.telefono}</td>
                <td>{this.props.usuario.fecha_registro}</td>   
                <td>{this.props.usuario.ultima_modificacion}</td>
                <td>
                    <Link 
                        to={`/usuarios/editar/${this.props.usuario.id}`} 
                        className="btn btn-info btn-sm"
                    >
                        Editar
                    </Link>
                </td>
                <td>
                    <button onClick={this.eliminar} className="btn btn-danger btn-sm">
                        Eliminar
                    </button>
                </td>
            </tr>
        );
    }
}

export default FilaDeTablaDeUsuario;
