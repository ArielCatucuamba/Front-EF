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
<<<<<<< HEAD
            const respuesta = await axios.get(`${backendUrl}/reservas`, {
=======
            const url = `${backendUrl}/reservas`;
            const options = {
>>>>>>> cf828cf04a2b4623d74f85ce22486e5028ed4084
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
<<<<<<< HEAD
            });
            setReservas(respuesta.data); // Asegúrate de que los datos vienen correctamente
=======
            };
            const respuesta = await axios.get(url, options);
            setSellers(respuesta.data);
            
>>>>>>> cf828cf04a2b4623d74f85ce22486e5028ed4084
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

<<<<<<< HEAD
    // Busca reservas por cédula de conferencista
    const buscarReservaPorCedula = async () => {
        if (!searchCedula) {
            toast.warn("Ingrese una cédula válida");
=======
    // Función para buscar un vendedor por cédula
    const buscarSeller = async () => {
        if (!searchId) {
            toast.warn("Ingrese un código válido");
>>>>>>> cf828cf04a2b4623d74f85ce22486e5028ed4084
            return;
        }

        try {
            const backendUrl = import.meta.env.VITE_URL_BACKEND_API;
            const token = localStorage.getItem("token");
<<<<<<< HEAD
            const respuesta = await axios.get(`${backendUrl}/reservas?cedula=${searchCedula}`, {
=======
            const url = `${backendUrl}/reservas/${searchId}`;
            const options = {
>>>>>>> cf828cf04a2b4623d74f85ce22486e5028ed4084
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
<<<<<<< HEAD
            });

            if (respuesta.data.length > 0) {
                setReservas(respuesta.data); // Almacena las reservas encontradas
                toast.success("Reservas encontradas");
            } else {
                toast.error("No se encontraron reservas para esta cédula");
                setReservas([]);  // Si no lo encuentra, limpiamos la lista
            }
=======
            };
            const respuesta = await axios.get(url, options);
            setSellers([respuesta.data.msg]);
            toast.success("reserva encontrado");
>>>>>>> cf828cf04a2b4623d74f85ce22486e5028ed4084
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
<<<<<<< HEAD
                    placeholder="Cédula del conferencista"
                    value={searchCedula}
                    onChange={(e) => setSearchCedula(e.target.value)}
=======
                    placeholder="Código reserva"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
>>>>>>> cf828cf04a2b4623d74f85ce22486e5028ed4084
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
<<<<<<< HEAD
                    Registrar Reserva
=======
                    Registrar reserva
>>>>>>> cf828cf04a2b4623d74f85ce22486e5028ed4084
                </button>
            </div>

            {/* Mensaje cuando no hay registros */}
            {reservas.length === 0 ? (
                <Mensaje tipo="error">No existen registros</Mensaje>
            ) : (
                <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
<<<<<<< HEAD
                    {reservas.map((reserva) => (
                        <div key={reserva._id} className="w-full max-w-sm p-4 shadow-lg bg-white relative cursor-pointer hover:bg-gray-100 transition duration-200 rounded-lg flex flex-col" onClick={() => navigate(`/dashboard/reservas/${reserva._id}`)}>
                            {/* Detalles de la reserva */}
                            <div className="text-left px-2">
                                <p className="text-lg font-semibold"><strong>Conferencista:</strong> {reserva.conferencista.nombre} {reserva.conferencista.apellido}</p>
                                <p className="text-lg"><strong>Cédula:</strong> {reserva.conferencista.cedula}</p>
                                <p className="text-lg"><strong>Auditorio:</strong> {reserva.auditorio.nombre}</p>
                                <p className="text-lg"><strong>Fecha:</strong> {new Date(reserva.fecha).toLocaleDateString()}</p>
=======
                    {sellers.map((seller) => (
                        <div key={seller._id} className="w-full max-w-sm p-4 shadow-lg bg-white rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => navigate(`/dashboard/clients/${seller._id}`)}>
                            <div className="text-left px-2">
                                <p className="text-lg"><strong>Código:</strong> {seller.codigo}</p>
                                <p className="text-lg"><strong>Descripción:</strong> {seller.descripcion}</p>
                                <p className="text-lg"><strong>Fecha de registro:</strong> {seller.createdAt}</p>
>>>>>>> cf828cf04a2b4623d74f85ce22486e5028ed4084
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ClientList;
