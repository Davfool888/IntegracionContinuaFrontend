import React from 'react';
import { NavLink } from "react-router-dom";

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mostrarMenu: false };
        this.intercambiarEstadoMenu = this.intercambiarEstadoMenu.bind(this);
    }

    intercambiarEstadoMenu() {
        this.setState(state => ({ mostrarMenu: !state.mostrarMenu }));
    }

    render() {
        return (
          <nav className="navbar navbar-expand-lg navbar-pastel-red">
                <div className="container-fluid">
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        onClick={this.intercambiarEstadoMenu}
                        aria-controls="navbarNav" 
                        aria-expanded={this.state.mostrarMenu ? "true" : "false"} 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${this.state.mostrarMenu ? "show" : ""}`} id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink 
                                    onClick={() => this.setState({ mostrarMenu: false })}
                                    to="/usuarios/ver" 
                                    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                                >
                                    Registros
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    onClick={() => this.setState({ mostrarMenu: false })}
                                    to="/usuarios/agregar" 
                                    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                                >
                                    Agregar
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;
