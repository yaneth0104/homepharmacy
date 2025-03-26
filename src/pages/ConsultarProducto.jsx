import { useEffect, useState } from "react";

const ConsultarProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/productos") // Ajusta la URL si es necesario
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Precio</th>
            <th style={styles.th}>Categoría</th>
            <th style={styles.th}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} style={styles.tr}>
              <td style={styles.td}>{producto.id}</td>
              <td style={styles.td}>{producto.nombre}</td>
              <td style={styles.td}>${producto.precio}</td>
              <td style={styles.td}>{producto.categoria}</td>
              <td style={styles.td}>{producto.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Estilos en línea para mejorar la tabla
const styles = {
  th: {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
  },
  td: {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
  },
  tr: {
    backgroundColor: "#ffffff",
  },
};

export default ConsultarProductos;
