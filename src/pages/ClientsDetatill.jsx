import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Carga";
import { ToastContainer, toast } from "react-toastify";

const ClientDetaill = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate()

    const [seller, setSeller] = useState({
        codigo: "",
        lastNames: "",
        numberID: "",
        username: "",
        email: "",
        SalesCity: "",
        PhoneNumber: "",
        role: "Seller",
        status: true,
        token: null,
        confirmEmail: false
    });


    const getSeller = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token')
            const backUrl = import.meta.env.VITE_URL_BACKEND_API
            const url = `${backUrl}/reservas/${id}`;
            const options = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const response = await axios.get(url, options);

            const Seller = response.data.data

            console.log( Seller);

            console.log(seller)
            

            setSeller({
                fecha: Seller.updatedAt,
                codigo: Seller.codigo,
                descripcion: Seller.descripcion,
                auditorioC: Seller.auditorio.codigo,
                auditorioCap: Seller.auditorio.capacidad,
                auditorioUb: Seller.auditorio.ubicacion,
                auditorioN: Seller.auditorio.nombre + seller, 
                conf: Seller.conferencista.nombre,
                conA: Seller.conferencista.apellido,
                confG: Seller.conferencista.genero,
                confT: Seller.conferencista.telefono,
            })

        } catch (error) {
            console.log(error);


        } finally {
            setIsLoading(false);
        }
    }

    const eliminarSeller = async (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este vendedor?");
        if (!confirmacion) return;

        try {
            const backendUrl = import.meta.env.VITE_URL_BACKEND_API;
            const token = localStorage.getItem("token");
            const url = `${backendUrl}/deleteSellerinfo/${id}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.delete(url, options);
            toast.success(respuesta.data.msg);
            setTimeout(() => {
                navigate("/dashboard/clients");
            }, 2000); // Actualizar la lista de vendedores
        } catch (error) {
            console.error(error);
            alert("Error al eliminar el vendedor");
        }
    };


    useEffect(() => {
        getSeller()
    }, [])

    if (isLoading) {
        return (
            <Loader />
        );
    }

    return (
        <>
            <ToastContainer />
            <button
                onClick={() => navigate('/dashboard/clients')}
                className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-full sm:w-auto"
            >
                ← Atrás
            </button>

            <div className="flex justify-end gap-4 mt-6">
                <button
                    onClick={() => navigate(`/dashboard/clients/update/${id}`)}
                    className="px-4 py-2 bg-[#e28a8a] text-white rounded hover:bg-[#ff5858]"
                >
                    Actualizar
                </button>

                <button
                    onClick={() => eliminarSeller(id)}
                    className="px-4 py-2 bg-[#bb4d4d] text-white rounded hover:bg-[#870000]"
                >
                    Eliminar
                </button>
            </div>


            <h2 className="text-2xl font-bold text-center mb-6">Reserva</h2>

            <div className="w-full max-w-screen-lg mx-auto px-4">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <img
                            src="https://framerusercontent.com/images/c4RekPnAcDHaTgIsPtCLCGImfE.jpeg"
                            alt="Seller"
                            className="w-32 h-32 object-cover rounded-full border-4 border-blue-600"
                        />
                    </div>
                </div>

                <div className="space-y-4 mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        

                        <div>
                            <label className="block font-bold text-gray-700">Codigo:</label>
                            <p className="text-gray-800 p-2 rounded">{seller?.codigo || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Descripcion:</label>
                            <p className="text-gray-800 p-2 rounded">{seller?.descripcion || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Auditorio:</label>
                            <p className="text-gray-800 p-2 rounded">{seller?.auditorioC || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Conferencista:</label>
                            <p className="text-gray-800 p-2 rounded">{seller?.conf + "" + seller.conA || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Capacidad:</label>
                            <p className="text-gray-800 p-2 rounded">{seller?.auditorioCap || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Ubicación:</label>
                            <p className="text-gray-800 p-2 rounded">{seller?.auditorioUb || "N/A"}</p>
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Fecha:</label>
                            <p className="text-gray-800 p-2 rounded">{seller?.fecha || "N/A"}</p>
                        </div>

                        
                    </div>
                </div>


            </div>
        </>
    );

}



export default ClientDetaill