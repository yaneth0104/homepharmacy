import { useState, useEffect } from "react";

const ModificarUsuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/api/users/usuarios")
            .then((res) => res.json())
            .then((data) => {
                console.log("Usuarios obtenidos:", data);
                setUsuarios(data);
            })
            .catch((error) => console.error("Error al obtener usuarios:", error));
    }, []);

    const abrirModal = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setUsuarioSeleccionado(null);
    };

    const handleChange = (e) => {
        setUsuarioSeleccionado({ ...usuarioSeleccionado, [e.target.name]: e.target.value });
    };

    const handleModificar = async () => {
        if (!usuarioSeleccionado) return;

        const usuarioModificado = {
            nombre: usuarioSeleccionado.nombre,
            apellido: usuarioSeleccionado.apellido,
            tipoIdentificacion: usuarioSeleccionado.tipo_identificacion,
            numeroIdentificacion: usuarioSeleccionado.numero_identificacion,
            ciudad: usuarioSeleccionado.ciudad,
            direccion: usuarioSeleccionado.direccion,
            telefono: usuarioSeleccionado.telefono,
            correo: usuarioSeleccionado.correo_electronico,
            contraseña: usuarioSeleccionado.contraseña,
            rol: usuarioSeleccionado.rol,
        };

        try {
            const response = await fetch(`http://localhost:5000/api/users/usuarios/${usuarioSeleccionado.id_usuario}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuarioModificado),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Usuario actualizado correctamente");
                cerrarModal();
                window.location.reload();
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const handleEliminar = async () => {
        if (!usuarioSeleccionado) return;

        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar a ${usuarioSeleccionado.nombre}?`);
        if (!confirmacion) return;

        try {
            const response = await fetch(`http://localhost:5000/api/users/usuarios/${usuarioSeleccionado.id_usuario}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Usuario eliminado correctamente");
                cerrarModal();
                window.location.reload();
            } else {
                const data = await response.json();
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return (
        <div>
            <h2>Modificar Usuario</h2>

            {/* Tabla de Usuarios */}
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Tipo ID</th>
                        <th>Número ID</th>
                        <th>Ciudad</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Contraseña</th>
                        <th>Rol</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id_usuario}>
                            <td>{usuario.id_usuario}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido}</td>
                            <td>{usuario.tipo_identificacion}</td>
                            <td>{usuario.numero_identificacion}</td>
                            <td>{usuario.ciudad}</td>
                            <td>{usuario.direccion}</td>
                            <td>{usuario.telefono}</td>
                            <td>{usuario.correo_electronico}</td>
                            <td>{usuario.contraseña}</td>
                            <td>{usuario.rol}</td>
                            <td>
                                <button onClick={() => abrirModal(usuario)}>Modificar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de Modificación */}
            {modalAbierto && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Modificar Usuario</h3>

                        <div className="modal-form">
                            <div>
                                <label>Nombre:</label>
                                <input type="text" name="nombre" value={usuarioSeleccionado.nombre} onChange={handleChange} />
                            </div>

                            <div>
                                <label>Apellido:</label>
                                <input type="text" name="apellido" value={usuarioSeleccionado.apellido} onChange={handleChange} />
                            </div>

                            <div>
                                <label>Tipo de Identificación:</label>
                                <input type="text" name="tipo_identificacion" value={usuarioSeleccionado.tipo_identificacion} onChange={handleChange} />
                            </div>

                            <div>
                                <label>Número de Identificación:</label>
                                <input type="text" name="numero_identificacion" value={usuarioSeleccionado.numero_identificacion} onChange={handleChange} />
                            </div>

                            <div>
                                <label>Ciudad:</label>
                                <input type="text" name="ciudad" value={usuarioSeleccionado.ciudad} onChange={handleChange} />
                            </div>

                            <div>
                                <label>Dirección:</label>
                                <input type="text" name="direccion" value={usuarioSeleccionado.direccion} onChange={handleChange} />
                            </div>

                            <div>
                                <label>Teléfono:</label>
                                <input type="text" name="telefono" value={usuarioSeleccionado.telefono} onChange={handleChange} />
                            </div>

                            <div>
                                <label>Correo:</label>
                                <input type="email" name="correo_electronico" value={usuarioSeleccionado.correo_electronico} onChange={handleChange} />
                            </div>

                            <div>
                                <label>Contraseña:</label>
                                <input type="text" name="contraseña" value={usuarioSeleccionado.contraseña} onChange={handleChange} />
                            </div>

                            <div>
                                <label>Rol:</label>
                                <select name="rol" value={usuarioSeleccionado.rol} onChange={handleChange}>
                                    <option value="administrador">Administrador</option>
                                    <option value="vendedor">Vendedor</option>
                                </select>
                            </div>
                        </div>

                        <div className="modal-buttons">
                            <button className="guardar" onClick={handleModificar}>Guardar Cambios</button>
                            <button className="eliminar" onClick={handleEliminar} style={{ backgroundColor: "red", color: "white" }}>
                                Eliminar Usuario
                            </button>
                            <button className="cancelar" onClick={cerrarModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModificarUsuario;
