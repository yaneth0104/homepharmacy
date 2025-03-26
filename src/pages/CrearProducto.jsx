import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CrearProducto = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "descripcion" && value.length > 100) return; // Limite de 100 caracteres
    setProducto({ ...producto, [name]: value });
  };

  const crearProducto = () => {
    fetch("http://localhost:5000/api/users/crearProducto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setProducto({ nombre: "", descripcion: "", precio: "", categoria: "", stock: "" });
        navigate("/consultar-producto"); 
      })
      .catch((error) => console.error("Error al crear producto:", error));
  };

  return (
    <div>
      <h2>Crear Producto</h2>
      <label>Nombre:</label>
      <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} />

      <label>Descripción (máx 100 caracteres):</label>
      <textarea 
        name="descripcion" 
        value={producto.descripcion} 
        onChange={handleChange} 
        maxLength="100"
      />

      <label>Precio:</label>
      <input type="text" name="precio" value={producto.precio} onChange={handleChange} />

      <label>Categoría:</label>
      <input type="text" name="categoria" value={producto.categoria} onChange={handleChange} />

      <label>Stock:</label>
      <input type="text" name="stock" value={producto.stock} onChange={handleChange} />

      <button onClick={crearProducto}>Crear</button>
      <button onClick={() => navigate("/dashboard")}>Cancelar</button>
    </div>
  );
};

export default CrearProducto;
