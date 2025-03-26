import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'; // Asegúrate de importar el archivo CSS para los estilos

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nuevo estado para controlar el login
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si hay un token y redirige automáticamente
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (token) {
      if (rol === "administrador") {
        navigate("/dashboard");
      } else {
        navigate("/consultar-producto");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error en el inicio de sesión.");
      } else {
        console.log("Token recibido:", data.token);
        console.log("Rol recibido:", data.rol);

        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", data.rol);

        // Cambiar el estado isLoggedIn a true para aplicar el difuminado
        setIsLoggedIn(true);

        // Forzar una actualización del estado
        window.location.reload(); // 🔹 Fuerza la actualización para detectar cambios
      }
    } catch (error) {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className={`form-container login-container ${isLoggedIn ? 'blur-background' : ''}`}>
      {/* Si el usuario está logueado, se aplica el difuminado */}

      <h2>Iniciar Sesión</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Correo Electrónico:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Iniciar Sesión</button>
      </form>

      <p className="register-link">
        ¿Aún no estás registrado?{" "}
        <a href="/signup" className="link">Regístrate aquí</a>
      </p>
    </div>
  );
};

export default Login;
