import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./Nav.jsx";
import AgregarUsuario from "./AgregarUsuario.jsx";
import VerUsuarios from "./VerUsuarios.jsx";
import EditarUsuario from "./EditarUsuario.jsx";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container mt-4">
        <div className="row">
          <Routes>
            <Route path="/usuarios/agregar" element={<AgregarUsuario />} />
            <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
            <Route path="/usuarios/ver" element={<VerUsuarios />} />
            <Route path="/" element={<VerUsuarios />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
