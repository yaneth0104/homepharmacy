import { useState } from "react";

const CrearUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    tipoIdentificacion: "Cédula de Ciudadanía",
    numeroIdentificacion: "",
    ciudad: "Bogotá",
    direccion: "",
    telefono: "",
    correo: "",
    password: "",
    rol: "Vendedor",
  });

  const ciudadesColombia = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Cúcuta", "Bucaramanga", "Pereira", "Manizales", "Santa Marta"];
  const tiposIdentificacion = ["Cédula de Ciudadanía", "Cédula de Extranjería", "Pasaporte"];
  const roles = ["Administrador", "Vendedor"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/users/crearUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Usuario creado correctamente");
      setFormData({
        nombre: "",
        apellido: "",
        tipoIdentificacion: "Cédula de Ciudadanía",
        numeroIdentificacion: "",
        ciudad: "Bogotá",
        direccion: "",
        telefono: "",
        correo: "",
        password: "",
        rol: "Vendedor",
      });
    } else {
      alert("Error: " + data.message);
    }
  };

  return (
    <div>
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" required />
        
        <select name="tipoIdentificacion" value={formData.tipoIdentificacion} onChange={handleChange}>
          {tiposIdentificacion.map((tipo) => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>

        <input type="text" name="numeroIdentificacion" value={formData.numeroIdentificacion} onChange={handleChange} placeholder="Número de Identificación" required />

        <select name="ciudad" value={formData.ciudad} onChange={handleChange}>
          {ciudadesColombia.map((ciudad) => (
            <option key={ciudad} value={ciudad}>{ciudad}</option>
          ))}
        </select>

        <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" required />
        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" required />
        <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="Correo" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required />

        <select name="rol" value={formData.rol} onChange={handleChange}>
          {roles.map((rol) => (
            <option key={rol} value={rol}>{rol}</option>
          ))}
        </select>

        <button type="submit">Crear</button>
        <button type="button" onClick={() => setFormData({ nombre: "", apellido: "", tipoIdentificacion: "Cédula de Ciudadanía", numeroIdentificacion: "", ciudad: "Bogotá", direccion: "", telefono: "", correo: "", password: "", rol: "Vendedor" })}>Cancelar</button>
      </form>
    </div>
  );
};

export default CrearUsuario;
