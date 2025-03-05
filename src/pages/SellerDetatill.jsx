import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Carga";
import { ToastContainer, toast } from "react-toastify";

const SellerDetaill  = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { codigo } = useParams();  // Cambié 'id' por 'codigo' para que coincida con la ruta
    const navigate = useNavigate();

    const [auditorio, setAuditorio] = useState({
        nombre: "",
        codigo: "",
        ubicacion: "",
        capacidad: "",
        descripcion: ""
    });

    // Función para obtener los detalles del auditorio
    const getAuditorio = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const backUrl = import.meta.env.VITE_URL_BACKEND_API;
            const url = `${backUrl}/auditorios/${codigo}`;  // Usamos la ruta con 'codigo'
            const options = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get(url, options);

            const auditorioData = response.data.data;  // Cambié 'msg' por 'data' según la respuesta del backend

            setAuditorio({
                nombre: auditorioData.nombre,
                codigo: auditorioData.codigo,
                ubicacion: auditorioData.ubicacion,
                capacidad: auditorioData.capacidad,
                descripcion: auditorioData.descripcion
            });

        } catch (error) {
            console.log(error);
            toast.error("Error al obtener el auditorio");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAuditorio();
    }, [codigo]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <ToastContainer />
            <button
                onClick={() => navigate('/dashboard/sellers')} // Ruta a la lista de auditorios
                className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-full sm:w-auto"
            >
                ← Atrás
            </button>

            <h2 className="text-2xl font-bold text-center mb-6">Detalles del Auditorio</h2>

            <div className="w-full max-w-screen-lg mx-auto px-4">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <img
                            src="https://framerusercontent.com/images/c4RekPnAcDHaTgIsPtCLCGImfE.jpeg" // Imagen de ejemplo
                            alt="Auditorio"
                            className="w-32 h-32 object-cover rounded-full border-4 border-blue-600"
                        />
                    </div>
                </div>

                <div className="space-y-4 mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-bold text-gray-700">Código del Auditorio:</label>
                            <p className="text-gray-800 p-2 rounded">{auditorio?.codigo || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Nombre:</label>
                            <p className="text-gray-800 p-2 rounded">{auditorio?.nombre || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Ubicación:</label>
                            <p className="text-gray-800 p-2 rounded">{auditorio?.ubicacion || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Capacidad:</label>
                            <p className="text-gray-800 p-2 rounded">{auditorio?.capacidad || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Descripción:</label>
                            <p className="text-gray-800 p-2 rounded">{auditorio?.descripcion || "N/A"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SellerDetaill ;
