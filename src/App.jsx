import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ConsultarProducto from "./pages/ConsultarProducto";
import ModificarProducto from "./pages/ModificarProducto"; 
import CrearProducto from "./pages/CrearProducto"; // Importamos la nueva página
import Sidebar from "./components/Sidebar";
import CrearUsuario from "./pages/CrearUsuario";
import ModificarUsuario from "./pages/ModificarUsuario";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("rol");

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        {/* Mostrar el Sidebar solo si el usuario ha iniciado sesión */}
        {isAuthenticated && <Sidebar role={userRole} />}
        
        <div className="main-content">
          <Routes>
            {/* Si el usuario está autenticado, lo redirige al dashboard */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Rutas protegidas, solo accesibles si hay sesión activa */}
            {isAuthenticated ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/consultar-producto" element={<ConsultarProducto />} />
                <Route path="/modificar-producto" element={<ModificarProducto />} /> 
                <Route path="/crear-producto" element={<CrearProducto/>} />
                <Route path="/crear-usuario" element={<CrearUsuario/>} />
                <Route path="/modificar-usuario" element={<ModificarUsuario/>} />{/* Nueva ruta */}
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<Navigate to="/login" />} />
                <Route path="/consultar-producto" element={<Navigate to="/login" />} />
                <Route path="/modificar-producto" element={<Navigate to="/login" />} />
                <Route path="/crear-producto" element={<CrearProducto/>} />
                <Route path="/crear-usuario" element={<CrearUsuario/>} />
                <Route path="/modificar-usuario" element={<ModificarUsuario/>} />{/* Protegida */}
              </>
            )}
            
            {/* Redirige a login si la ruta no existe */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
