import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";
import Loader from "./Carga";
import { ToastContainer, toast } from "react-toastify";

const TablaRecepcionistas = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [recepcionistas, setRecepcionistas] = useState([]);
    const [searchId, setSearchId] = useState("");

    // Obtiene la lista de recepcionistas
    const listarRecepcionistas = async () => {
        setIsLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_URL_BACKEND_API;
            const token = localStorage.getItem("token");
            const respuesta = await axios.get(`${backendUrl}/conferencistas`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setRecepcionistas(respuesta.data.data);  // Asegúrate de que los datos vienen correctamente bajo `data`
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Busca un recepcionista por cédula
    const buscarRecepcionista = async () => {
        if (!searchId) {
            toast.warn("Ingrese una cédula válida");
            return;
        }

        try {
            const backendUrl = import.meta.env.VITE_URL_BACKEND_API;
            const token = localStorage.getItem("token");
            const respuesta = await axios.get(`${backendUrl}/conferencistas/${searchId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
                
                
            if (respuesta.data.data) {
                setRecepcionistas([respuesta.data.data]); // Almacena el recepcionista encontrado
                toast.success("Conferencista encontrado");
            } else {
                toast.error("Conferencista no encontrado");
                setRecepcionistas([]);  // Si no lo encuentra, limpiamos la lista
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al buscar Conferencista");
        }
    };

    useEffect(() => {
        listarRecepcionistas();
    }, []);

    if (isLoading) return <Loader />;

    return (
        <>
            <ToastContainer />
            {/* Sección de búsqueda */}
            <div className="p-4 flex flex-col sm:flex-row justify-center items-center gap-4 rounded-lg mb-4 w-full">
                <input
                    type="text"
                    placeholder="Cédula del recepcionista"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="border p-2 rounded w-full sm:w-64 max-w-xs"
                />
                <button onClick={buscarRecepcionista} className="bg-[#e28a8a] text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-[#ff5858] transition">
                    Buscar
                </button>
                <button onClick={listarRecepcionistas} className="bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-gray-600 transition">
                    Mostrar Todos
                </button>
            </div>

            {/* Botón de registro */}
            <div className="flex justify-end mb-4 px-4">
                <button onClick={() => navigate("register")} className="bg-[#e28a8a] text-white px-4 py-2 rounded-lg hover:bg-[#ff5858] transition flex items-center">
                    <i className="fas fa-user-plus mr-2"></i>
                    Registrar Recepcionista
                </button>
            </div>

            {/* Mensaje cuando no hay registros */}
            {recepcionistas.length === 0 ? (
                <Mensaje tipo="error">No existen registros</Mensaje>
            ) : (
                <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
                    {recepcionistas.map((recepcionista) => (
                        <div key={recepcionista.searchId} className="w-full max-w-sm p-4 shadow-lg bg-white relative cursor-pointer hover:bg-gray-100 transition duration-200 rounded-lg flex flex-col" onClick={() => navigate(`/dashboard/orders/${recepcionista.searchId}`)}>
                            {/* Imagen del recepcionista */}
                            <div className="flex justify-center mb-3">
                                <img src="https://www.shutterstock.com/image-vector/man-giving-speech-event-260nw-2463254767.jpg" alt={`Imagen de ${recepcionista.nombre}`} className="w-20 h-20 object-cover rounded-full" />
                            </div>
                            {/* Detalles del recepcionista */}
                            <div className="text-left px-2">
                                <p className="text-lg font-semibold"><strong>Cédula:</strong> {recepcionista.cedula}</p>
                                <p className="text-lg"><strong>Nombre:</strong> {recepcionista.nombre}</p>
                                <p className="text-lg"><strong>Apellidos:</strong> {recepcionista.apellido}</p>
                                <p className="text-lg"><strong>Ciudad:</strong> {recepcionista.ciudad}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default TablaRecepcionistas;
