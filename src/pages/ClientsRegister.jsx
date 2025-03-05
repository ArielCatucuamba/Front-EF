import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const RegisterClients = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [estudiante, setEstudiante] = useState(null);
    const [materia, setMateria] = useState(null);

    const validationSchema = Yup.object({
        cedula: Yup.string()
            .required("La cédula es obligatoria")
            .matches(/^[0-9]{10}$/, "Debe tener 10 dígitos numéricos"),
        codigoMateria: Yup.string()
            .required("El código de la materia es obligatorio"),
        codigoMatricula: Yup.string().required("El código único de matrícula es obligatorio"),
        descripcion: Yup.string().required("La descripción es obligatoria"),
        creditos: Yup.number()
            .required("Los créditos son obligatorios")
            .positive("Debe ser un número positivo"),
    });

    const fetchEstudiante = async () => {
        setIsLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_URL_BACKEND_API;
            const token = localStorage.getItem("token");
            const url = `${backendUrl}/estudiantes/${formik.values.cedula}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(url, options);
            setEstudiante(response.data.data);
            toast.success("Estudiante encontrado");
        } catch (error) {
            toast.error("No se encontró el estudiante");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMateria = async () => {
        setIsLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_URL_BACKEND_API;
            const token = localStorage.getItem("token");
            const url = `${backendUrl}/materias/${formik.values.codigoMateria}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(url, options);
            setMateria(response.data.data);
            toast.success("Materia encontrada");
        } catch (error) {
            toast.error("No se encontró la materia");
        } finally {
            setIsLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            cedula: "",
            codigoMateria: "",
            codigoMatricula: "",
            descripcion: "",
            creditos: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const backendUrl = import.meta.env.VITE_URL_BACKEND_API;
                const token = localStorage.getItem("token");
                const url = `${backendUrl}/matriculas/registrar`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.post(url, values, options);
                toast.success(response.data.msg);
            } catch (error) {
                toast.error(error.response?.data?.msg || "Error al registrar la matrícula");
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">

            <div className="flex justify-start mb-8">
                <button
                    onClick={() => navigate("/dashboard/clients")}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Atrás
                </button>
            </div>

            <ToastContainer />
            <form onSubmit={formik.handleSubmit}>
                <h2 className="text-lg font-bold">1. Ingresa un estudiante</h2>
                <div className="mb-4">
                    <label>Cédula del estudiante</label>
                    <div className="flex">
                        <input
                            type="text"
                            name="cedula"
                            value={formik.values.cedula}
                            onChange={formik.handleChange}
                            className="border p-2 flex-grow"
                        />
                        <button type="button" onClick={fetchEstudiante} className="ml-2 bg-red-500 text-white p-2 rounded">Validar</button>
                    </div>
                    {estudiante && (
                        <div className="p-2 mt-2 bg-gray-200 rounded">Estudiante registrado: {estudiante.nombre} {estudiante.apellido}</div>
                    )}
                </div>
                <h2 className="text-lg font-bold">2. Ingresa una materia</h2>
                <div className="mb-4">
                    <label>Código de materia</label>
                    <div className="flex">
                        <input
                            type="text"
                            name="codigoMateria"
                            value={formik.values.codigoMateria}
                            onChange={formik.handleChange}
                            className="border p-2 flex-grow"
                        />
                        <button type="button" onClick={fetchMateria} className="ml-2 bg-red-500 text-white p-2 rounded">Validar</button>
                    </div>
                    {materia && (
                        <div className="p-2 mt-2 bg-gray-200 rounded">Materia registrada: {materia.nombre}</div>
                    )}
                </div>
                <h2 className="text-lg font-bold">3. Completa los detalles</h2>
                <div className="mb-4">
                    <label>Código único de matrícula</label>
                    <input type="text" name="codigoMatricula" className="border p-2 w-full" onChange={formik.handleChange} />
                </div>
                <div className="mb-4">
                    <label>Descripción</label>
                    <input type="text" name="descripcion" className="border p-2 w-full" onChange={formik.handleChange} />
                </div>
                <div className="mb-4">
                    <label>Créditos</label>
                    <input type="number" name="creditos" className="border p-2 w-full" onChange={formik.handleChange} />
                </div>
                <button type="submit" className="bg-red-500 text-white p-2 rounded w-full">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterClients;
