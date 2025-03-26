import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    idType: "",
    idNumber: "",
    city: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("✅ Botón Registrarse presionado");
  
    // 🔹 Limpiar el formulario inmediatamente después de presionar el botón
    setFormData({
      name: "",
      lastName: "",
      idType: "",
      idNumber: "",
      city: "",
      address: "",
      phone: "",
      email: "",
      password: "",
    });
  
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("✅ Respuesta del backend:", data);
  
      if (!response.ok) {
        setError(data.message || "Error en el registro.");
        setMessage("");
      } else {
        setMessage(data.message);
        setError("");
  
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("❌ Error de conexión con el servidor:", error);
      setError("Error de conexión con el servidor.");
      setMessage("");
    }
  };

  return (
    <div className="signup-container">
      <h2>Registro</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-row">
          <div>
            <label>Nombre:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Apellido:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label>Tipo de Identificación:</label>
            <select name="idType" value={formData.idType} onChange={handleChange} required>
              <option value="">Seleccione</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="CE">Cédula de Extranjería</option>
            </select>
          </div>
          <div>
            <label>N. Identificación:</label>
            <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label>Ciudad:</label>
            <select name="city" value={formData.city} onChange={handleChange} required>
              <option value="">Seleccione una ciudad</option>
              <option value="Bogotá">Bogotá</option>
              <option value="Medellín">Medellín</option>
              <option value="Cali">Cali</option>
            </select>
          </div>
          <div>
            <label>Dirección:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label>Teléfono:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <label>Correo Electrónico:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label>Contraseña:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
        </div>

        <button type="submit">Registrarse</button>
      </form>
      <p className="login-link">¿Ya estás registrado? <a href="/login">Inicia sesión aquí</a></p>
    </div>
  );
};

export default Signup;
