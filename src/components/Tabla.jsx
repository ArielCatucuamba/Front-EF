import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";
import Loader from "./Carga";
import { ToastContainer, toast } from "react-toastify";

const Tabla = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [auditorios, setAuditorios] = useState([]);
    const [searchId, setSearchId] = useState("");

    // Obtiene la lista de auditorios
    const listarAuditorios = async () => {
        setIsLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_URL_BACKEND_API;
            const token = localStorage.getItem("token");
            const respuesta = await axios.get(`${backendUrl}/auditorios`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setAuditorios(respuesta.data);  // Asegúrate de que los datos vienen correctamente bajo `data`
        } catch (error) {
            console.log(error);
            toast.error("Error al obtener los auditorios");
        } finally {
            setIsLoading(false);
        }
    };

    // Busca un auditorio por código
    const buscarAuditorio = async () => {
        if (!searchId) {
            toast.warn("Ingrese un código válido");
            return;
        }

        try {
            const backendUrl = import.meta.env.VITE_URL_BACKEND_API;
            const token = localStorage.getItem("token");
            const respuesta = await axios.get(`${backendUrl}/auditorios/${searchId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (respuesta.data.data) {
                setAuditorios([respuesta.data.data]); // Almacena el auditorio encontrado
                toast.success("Auditorio encontrado");
            } else {
                toast.error("Auditorio no encontrado");
                setAuditorios([]);  // Si no lo encuentra, limpiamos la lista
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al buscar auditorio");
        }
    };

    useEffect(() => {
        listarAuditorios();
    }, []);

    if (isLoading) return <Loader />;

    return (
        <>
            <ToastContainer />
            {/* Sección de búsqueda */}
            <div className="p-4 flex flex-col sm:flex-row justify-center items-center gap-4 rounded-lg mb-4 w-full">
                <input
                    type="text"
                    placeholder="Código del auditorio"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="border p-2 rounded w-full sm:w-64 max-w-xs"
                />
                <button onClick={buscarAuditorio} className="bg-[#e28a8a] text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-[#ff5858] transition">
                    Buscar
                </button>
                <button onClick={listarAuditorios} className="bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-gray-600 transition">
                    Mostrar Todos
                </button>
            </div>

            {/* Botón de registro */}
            <div className="flex justify-end mb-4 px-4">
                <button onClick={() => navigate("register")} className="bg-[#e28a8a] text-white px-4 py-2 rounded-lg hover:bg-[#ff5858] transition flex items-center">
                    <i className="fas fa-plus-circle mr-2"></i>
                    Registrar Auditorio
                </button>
            </div>

            {/* Mensaje cuando no hay registros */}
            {auditorios.length === 0 ? (
                <Mensaje tipo="error">No existen registros</Mensaje>
            ) : (
                <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
                    {auditorios.map((auditorio) => (
                        <div key={auditorio.codigo} className="w-full max-w-sm p-4 shadow-lg bg-white relative cursor-pointer hover:bg-gray-100 transition duration-200 rounded-lg flex flex-col" onClick={() => navigate(`/dashboard/sellers/${auditorio.codigo}`)}>
                            {/* Imagen del auditorio */}
                            <div className="flex justify-center mb-3">
                                <img src="https://framerusercontent.com/images/c4RekPnAcDHaTgIsPtCLCGImfE.jpeg" alt={`Imagen del auditorio ${auditorio.nombre}`} className="w-20 h-20 object-cover rounded-full" />
                            </div>
                            {/* Detalles del auditorio */}
                            <div className="text-left px-2">
                                <p className="text-lg font-semibold"><strong>Código:</strong> {auditorio.codigo}</p>
                                <p className="text-lg"><strong>Nombre:</strong> {auditorio.nombre}</p>
                                <p className="text-lg"><strong>Descripción:</strong> {auditorio.descripcion}</p>
                                <p className="text-lg"><strong>Capacidad:</strong> {auditorio.capacidad}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Tabla;
