import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Sidebar = () => {
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const storedRol = localStorage.getItem("rol");
    console.log("Rol almacenado en localStorage:", storedRol);
    setRol(storedRol);
  }, []);

  return (
    <aside className="sidebar">
      <h2>Menú</h2>
      <ul>
        {rol === "administrador" && (
          <>
            <li><Link to="/inicio">Inicio</Link></li>
            <li><Link to="/consultar-producto">Consultar Producto</Link></li>
            <li><Link to="/modificar-producto">Modificar Producto</Link></li>
            <li><Link to="/crear-producto">Crear Producto</Link></li>
            <li><Link to="/crear-usuario">Crear Usuario</Link></li>
            <li><Link to="/modificar-usuario">Modificar Usuario</Link></li>
            
          </>
        )}
        {rol === "vendedor" && (
          <>
            <li><Link to="/consultar-producto">Consultar Producto</Link></li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
