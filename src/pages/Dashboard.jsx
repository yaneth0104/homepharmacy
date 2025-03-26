import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina los datos almacenados
    localStorage.removeItem("token");
    localStorage.removeItem("rol");

    // Borra toda la caché del navegador
    window.location.reload(true); // Recarga y limpia la caché
    navigate("/login"); // Redirige al login
  };

  return (
    <div>
      <h2>Bienvenido al Dashboard</h2>
      <button onClick={handleLogout} style={styles.logoutButton}>Cerrar Sesión</button>
    </div>
  );
};

// Estilos en línea
const styles = {
  logoutButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "20px"
  }
};

export default Dashboard;
