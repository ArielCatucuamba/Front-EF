import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Carga";
import { ToastContainer, toast } from "react-toastify";

const OrderDetaill = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { cedula } = useParams(); // Cambié el parámetro a cedula
    const navigate = useNavigate();

    const [conferencista, setConferencista] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        genero: "",
        fecha_nacimiento: "",
        ciudad: "",
        direccion: "",
        telefono: "",
        email: "",
        empresa: "",
        status: true
    });

    // Obtener los datos del conferencista por cédula
    const getConferencista = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const backUrl = import.meta.env.VITE_URL_BACKEND_API;
            const url = `${backUrl}/conferencistas/${cedula}`;  // Cambié la URL para usar cedula
            const options = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get(url, options);

            const conferencistaData = response.data.data;

            
            setConferencista({
                nombre: conferencistaData.nombre,
                apellido: conferencistaData.apellido,
                cedula: conferencistaData.cedula,
                genero: conferencistaData.genero,
                fecha_nacimiento: conferencistaData.fecha_nacimiento,
                ciudad: conferencistaData.ciudad,
                direccion: conferencistaData.direccion,
                telefono: conferencistaData.telefono,
                email: conferencistaData.email,
                empresa: conferencistaData.empresa,
                status: conferencistaData.status
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Eliminar un conferencista
    const eliminarConferencista = async (cedula) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este conferencista?");
        if (!confirmacion) return;

        try {
            const backendUrl = import.meta.env.VITE_URL_BACKEND_API;
            const token = localStorage.getItem("token");
            const url = `${backendUrl}/conferencistas/eliminar/${cedula}`;  // Cambié la URL de eliminación
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.delete(url, options);
            toast.success(respuesta.data.msg);
            setTimeout(() => {
                navigate("/dashboard/orders");
            }, 2000); // Actualizar la lista de conferencistas
        } catch (error) {
            console.error(error);
            alert("Error al eliminar el conferencista");
        }
    };

    useEffect(() => {
        getConferencista();
    }, [cedula]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <ToastContainer />
            <button
                onClick={() => navigate('/dashboard/orders')}
                className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-full sm:w-auto"
            >
                ← Atrás
            </button>

            <div className="flex justify-end gap-4 mt-6">
                <button
                    onClick={() => navigate(`/dashboard/orders/update/${cedula}`)}
                    className="px-4 py-2 bg-[#e28a8a] text-white rounded hover:bg-[#ff5858]"
                >
                    Actualizar
                </button>

                <button
                    onClick={() => eliminarConferencista(cedula)}  // Usé la cédula para eliminar
                    className="px-4 py-2 bg-[#bb4d4d] text-white rounded hover:bg-[#870000]"
                >
                    Eliminar
                </button>
            </div>

            <h2 className="text-2xl font-bold text-center mb-6">Conferencista</h2>

            <div className="w-full max-w-screen-lg mx-auto px-4">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <img
                            src="https://www.shutterstock.com/image-vector/man-giving-speech-event-260nw-2463254767.jpg"
                            alt="Conferencista"
                            className="w-32 h-32 object-cover rounded-full border-4 border-blue-600"
                        />
                    </div>
                </div>

                <div className="space-y-4 mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-bold text-gray-700">Nombre:</label>
                            <p className="text-gray-800 p-2 rounded">{conferencista?.nombre || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Apellido:</label>
                            <p className="text-gray-800 p-2 rounded">{conferencista?.apellido || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Cédula:</label>
                            <p className="text-gray-800 p-2 rounded">{conferencista?.cedula || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Género:</label>
                            <p className="text-gray-800 p-2 rounded">{conferencista?.genero || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Fecha de nacimiento:</label>
                            <p className="text-gray-800 p-2 rounded">{conferencista?.fecha_nacimiento ? new Date(conferencista?.fecha_nacimiento).toLocaleDateString() : "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Ciudad:</label>
                            <p className="text-gray-800 p-2 rounded">{conferencista?.ciudad || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Dirección:</label>
                            <p className="text-gray-800 p-2 rounded">{conferencista?.direccion || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Teléfono:</label>
                            <p className="text-gray-800 p-2 rounded">{conferencista?.telefono || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Email:</label>
                            <p className="text-gray-800 p-2 rounded">{conferencista?.email || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Empresa:</label>
                            <p className="text-gray-800 p-2 rounded">{conferencista?.empresa || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Estado:</label>
                            <p className="text-gray-800 p-2 rounded">{conferencista?.status ? "Activo" : "Inactivo"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetaill;
