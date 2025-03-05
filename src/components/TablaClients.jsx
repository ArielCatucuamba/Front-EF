import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";
import Loader from "./Carga";
import { ToastContainer, toast } from "react-toastify";

const ClientList = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga
    const [sellers, setSellers] = useState([]); // Estado para almacenar los vendedores
    const [searchId, setSearchId] = useState(""); // Estado para manejar la búsqueda por cédula

    // Función para listar todos los vendedores desde el backend
    const listarSellers = async () => {
        setIsLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_URL_BACKEND_API;
            const token = localStorage.getItem("token");
            const url = `${backendUrl}/reservas`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            setSellers(respuesta.data);
            
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para buscar un vendedor por cédula
    const buscarSeller = async () => {
        if (!searchId) {
            toast.warn("Ingrese un código válido");
            return;
        }

        try {
            const backendUrl = import.meta.env.VITE_URL_BACKEND_API;
            const token = localStorage.getItem("token");
            const url = `${backendUrl}/reservas/${searchId}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            setSellers([respuesta.data.msg]);
            toast.success("reserva encontrado");
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al buscar");
        }
    };

    useEffect(() => {
        listarSellers();
    }, []);

    if (isLoading) return <Loader />;

    return (
        <>
            <ToastContainer />
            {/* Sección de búsqueda */}
            <div className="p-4 flex flex-col sm:flex-row justify-center items-center gap-4 rounded-lg mb-4 w-full">
                <input
                    type="text"
                    placeholder="Código reserva"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="border p-2 rounded w-full sm:w-64 max-w-xs"
                />
                <button onClick={buscarSeller} className="bg-[#e28a8a] text-white px-4 py-2 rounded hover:bg-[#ff5858]">
                    Buscar
                </button>
                <button onClick={listarSellers} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                    Mostrar Todos
                </button>
            </div>

            {/* Botón de registro */}
            <div className="flex justify-end mb-4 px-4">
                <button onClick={() => navigate("register")} className="bg-[#e28a8a] text-white px-4 py-2 rounded-lg hover:bg-[#ff5858] transition flex items-center">
                    <i className="fas fa-user-plus mr-2"></i>
                    Registrar reserva
                </button>
            </div>

            {/* Mensaje cuando no hay registros */}
            {sellers.length === 0 ? (
                <Mensaje tipo="error">No existen registros</Mensaje>
            ) : (
                <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
                    {sellers.map((seller) => (
                        <div key={seller._id} className="w-full max-w-sm p-4 shadow-lg bg-white rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => navigate(`/dashboard/clients/${seller._id}`)}>
                            <div className="text-left px-2">
                                <p className="text-lg"><strong>Código:</strong> {seller.codigo}</p>
                                <p className="text-lg"><strong>Descripción:</strong> {seller.descripcion}</p>
                                <p className="text-lg"><strong>Fecha de registro:</strong> {seller.createdAt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ClientList;
