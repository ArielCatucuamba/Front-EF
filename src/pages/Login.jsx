import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Mensaje from '../context/alerts/Mensaje';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';

const Login = () => {
    // Declaraciones
    const { setAuth } = useAuth();
    const frontendUrl = import.meta.env.VITE_URL_FRONTEND;
    const backendUrl = import.meta.env.VITE_URL_BACKEND_API;
    const [mensaje, setMensaje] = useState({});
    const navigate = useNavigate();

    // Esquema de validación con Yup
    const validationSchema = Yup.object({
        email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
        password: Yup.string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .required('La contraseña es obligatoria'),
    });

    // Usar Formik para gestionar el formulario
    const formik = useFormik({
        initialValues: {
            email: '', // Cambié 'username' por 'email'
            password: '',
        },
        validationSchema: validationSchema, // Validación con Yup
        onSubmit: async (values) => {
            const normalizedForm = {
                email: values.email.trim() || '', // Normalizar el email
                password: values.password.trim() || '', // Normalizar la contraseña
            };

            try {
                // Usar la ruta '/login' para la autenticación
                const { data } = await api.post('/login', normalizedForm); // Cambio a la ruta correcta

                // Establecer el token en localStorage
                localStorage.setItem('token', data.token);

                // Establecer el estado de autenticación
                setAuth({ token: data.token });

                // Limpiar el formulario
                formik.resetForm();

                // Navegar al dashboard
                navigate('/dashboard/orders');
            } catch (error) {
                console.log(error);
                setMensaje({
                    respuesta: error.response?.data?.msg || 'Error desconocido',
                    tipo: false,
                });
                setTimeout(() => {
                    setMensaje({});
                }, 5000);
            }
        },
    });

    return (
        <div className="flex flex-col sm:flex-row h-screen">
            {/* Contenedor del formulario */}
            <div className="w-full sm:w-1/2 flex justify-center items-center bg-customWhite p-6 h-full">
                <div className="w-full max-w-md p-6 rounded-lg sm:rounded-none sm:shadow-none">
                    <div className="flex items-center justify-center mb-1">
                        {/* Logo a la izquierda */}
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4078/4078099.png"
                            alt="Main Logo"
                            className="h-10 w-10 sm:h-12 sm:w-12 mr-1"
                        />
                        <h1 className="text-4xl font-semibold uppercase text-[#ff5858]" >
                            Conferencias 
                        </h1>
                    </div>
                    <small className="text-gray-400 block text-center text-sm">
                        Bienvenido a tu plataforma
                    </small>

                    {Object.keys(mensaje).length > 0 && (
                        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )}

                    <form onSubmit={formik.handleSubmit} className="mt-8"> 
                        <div className="mb-5">
                            <label className="block text-base font-sans text-[#201b1e] mb-2">
                                Email
                            </label>
                            <input
                                type="text"
                                placeholder="Ingresa tu email"
                                className="block w-full rounded-full border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-2 px-3 text-gray-500"
                                name="email" // Cambié 'username' a 'email'
                                onChange={formik.handleChange}
                                value={formik.values.email} // Cambié 'username' a 'email'
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 text-sm">{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className="mb-5">
                            <label className="block text-base font-sans text-[#201b1e] mb-2">
                                Clave
                            </label>
                            <input
                                type="password"
                                placeholder="**********"
                                className="block w-full rounded-full border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-2 px-3 text-gray-500"
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-500 text-sm">{formik.errors.password}</div>
                            ) : null}
                        </div>

                        <button className="py-2 w-full bg-gray-500 text-slate-300 border hover:scale-105 duration-300 hover:bg-[#ff5858] hover:text-white rounded-full">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>

            {/* Imagen lateral solo en pantallas grandes */}
            <div className="hidden sm:block sm:w-1/2 bg-[url('/images/atlaslogin.jpg')] bg-no-repeat bg-cover bg-center h-full"></div>
        </div>
    );
};

export default Login;
