import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";
import Loader from "./Carga";
import { ToastContainer, toast } from "react-toastify";

const ClientList = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [reservas, setReservas] = useState([]);
    const [searchCedula, setSearchCedula] = useState("");

    // Obtiene la lista de todas las reservas
    const listarReservas = async () => {
        setIsLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_URL_BACKEND_API;
            const token = localStorage.getItem("token");
            const respuesta = await axios.get(`${backendUrl}/reservas`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setReservas(respuesta.data); // Asegúrate de que los datos vienen correctamente
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Busca reservas por cédula de conferencista
    const buscarReservaPorCedula = async () => {
        if (!searchCedula) {
            toast.warn("Ingrese una cédula válida");
            return;
        }

        try {
            const backendUrl = import.meta.env.VITE_URL_BACKEND_API;
            const token = localStorage.getItem("token");
            const respuesta = await axios.get(`${backendUrl}/reservas?cedula=${searchCedula}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (respuesta.data.length > 0) {
                setReservas(respuesta.data); // Almacena las reservas encontradas
                toast.success("Reservas encontradas");
            } else {
                toast.error("No se encontraron reservas para esta cédula");
                setReservas([]);  // Si no lo encuentra, limpiamos la lista
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al buscar reservas");
        }
    };

    useEffect(() => {
        listarReservas();
    }, []);

    if (isLoading) return <Loader />;

    return (
        <>
            <ToastContainer />
            {/* Sección de búsqueda */}
            <div className="p-4 flex flex-col sm:flex-row justify-center items-center gap-4 rounded-lg mb-4 w-full">
                <input
                    type="text"
                    placeholder="Cédula del conferencista"
                    value={searchCedula}
                    onChange={(e) => setSearchCedula(e.target.value)}
                    className="border p-2 rounded w-full sm:w-64 max-w-xs"
                />
                <button onClick={buscarReservaPorCedula} className="bg-[#e28a8a] text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-[#ff5858] transition">
                    Buscar
                </button>
                <button onClick={listarReservas} className="bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-gray-600 transition">
                    Mostrar Todos
                </button>
            </div>

            {/* Botón de registro */}
            <div className="flex justify-end mb-4 px-4">
                <button onClick={() => navigate("register")} className="bg-[#e28a8a] text-white px-4 py-2 rounded-lg hover:bg-[#ff5858] transition flex items-center">
                    <i className="fas fa-user-plus mr-2"></i>
                    Registrar Reserva
                </button>
            </div>

            {/* Mensaje cuando no hay registros */}
            {reservas.length === 0 ? (
                <Mensaje tipo="error">No existen registros</Mensaje>
            ) : (
                <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
                    {reservas.map((reserva) => (
                        <div key={reserva._id} className="w-full max-w-sm p-4 shadow-lg bg-white relative cursor-pointer hover:bg-gray-100 transition duration-200 rounded-lg flex flex-col" onClick={() => navigate(`/dashboard/reservas/${reserva._id}`)}>
                            {/* Detalles de la reserva */}
                            <div className="text-left px-2">
                                <p className="text-lg font-semibold"><strong>Conferencista:</strong> {reserva.conferencista.nombre} {reserva.conferencista.apellido}</p>
                                <p className="text-lg"><strong>Cédula:</strong> {reserva.conferencista.cedula}</p>
                                <p className="text-lg"><strong>Auditorio:</strong> {reserva.auditorio.nombre}</p>
                                <p className="text-lg"><strong>Fecha:</strong> {new Date(reserva.fecha).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ClientList;
