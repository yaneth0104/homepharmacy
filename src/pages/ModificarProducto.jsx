import { useEffect, useState } from "react";

const ModificarProducto = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = () => {
    fetch("http://localhost:5000/api/users/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  };

  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setModalAbierto(true);
  };

  const handleChange = (e) => {
    setProductoSeleccionado({
      ...productoSeleccionado,
      [e.target.name]: e.target.value,
    });
  };

  const modificarProducto = () => {
    fetch(`http://localhost:5000/api/users/productos/${productoSeleccionado.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
        categoria: productoSeleccionado.categoria,
        stock: productoSeleccionado.stock,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setModalAbierto(false);
        obtenerProductos(); // Recargar la lista después de modificar
      })
      .catch((error) => console.error("Error al modificar producto:", error));
  };

  const eliminarProducto = () => {
    const confirmacion = window.confirm("¿Seguro que quieres eliminar este producto?");
    if (!confirmacion) return;

    fetch(`http://localhost:5000/api/users/productos/${productoSeleccionado.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setModalAbierto(false);
        obtenerProductos(); // Recargar la lista después de eliminar
      })
      .catch((error) => console.error("Error al eliminar producto:", error));
  };

  return (
    <div>
      <h2>Modificar o Eliminar Producto</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.precio}</td>
              <td>{producto.categoria}</td>
              <td>{producto.stock}</td>
              <td>
                <button onClick={() => seleccionarProducto(producto)}>
                  Seleccionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAbierto && productoSeleccionado && (
        <div className="modal">
          <div className="modal-content">
            <h3>Modificar o Eliminar Producto</h3>
            <label>ID:</label>
            <input type="text" value={productoSeleccionado.id} disabled />

            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={productoSeleccionado.nombre}
              onChange={handleChange}
            />

            <label>Precio:</label>
            <input
              type="text"
              name="precio"
              value={productoSeleccionado.precio}
              onChange={handleChange}
            />

            <label>Categoría:</label>
            <input
              type="text"
              name="categoria"
              value={productoSeleccionado.categoria}
              onChange={handleChange}
            />

            <label>Stock:</label>
            <input
              type="text"
              name="stock"
              value={productoSeleccionado.stock}
              onChange={handleChange}
            />

            <button onClick={modificarProducto}>Modificar</button>
            <button onClick={eliminarProducto} style={{ backgroundColor: "red", color: "white" }}>
              Eliminar
            </button>
            <button onClick={() => setModalAbierto(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModificarProducto;
