import React from 'react';
import { NavLink } from "react-router-dom";
import './Nav.css';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mostrarMenu: true }; // Por defecto abierto en desktop
        this.intercambiarEstadoMenu = this.intercambiarEstadoMenu.bind(this);
    }

    intercambiarEstadoMenu() {
        this.setState(state => ({ mostrarMenu: !state.mostrarMenu }));
    }

    render() {
        return (
            <div>
                {/* Sidebar */}
                <div className={`sidebar ${this.state.mostrarMenu ? "sidebar-show" : "sidebar-hide"}`}>
                    <div className="sidebar-header p-3">
                        <h3 className="fw-bold nombre-sidebar mb-0">
                            DAVID SANTIAGO HERRERA REALES
                        </h3>
                    </div>
                    <ul className="list-unstyled ps-0 flex-grow-1">
                        <li>
                            <NavLink 
                                onClick={() => this.setState({ mostrarMenu: false })}
                                to="/usuarios/ver" 
                                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                            >
                                Registros
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                onClick={() => this.setState({ mostrarMenu: false })}
                                to="/usuarios/agregar" 
                                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                            >
                                Agregar
                            </NavLink>
                        </li>
                        <li>
                            <a className="nav-link" href="https://www.linkedin.com/in/david-herrera-reales/">LinkedIn</a>
                        </li>
                        <li>
                            <a className="nav-link" href="https://github.com/Davfool888">GitHub</a>
                        </li>
                    </ul>

                    {/* Botón cerrar en la parte inferior */}
                    <div className="sidebar-footer p-3">
                        <button 
                            className="btn btn-primary btn-sm w-100"
                            onClick={this.intercambiarEstadoMenu}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>

                {/* Botón menú siempre visible */}
                {!this.state.mostrarMenu && (
                    <button 
                        className="btn btn-primary btn-toggle"
                        onClick={this.intercambiarEstadoMenu}
                    >
                       ☷
                    </button>
                )}
            </div>
        );
    }
}

export default Nav;
