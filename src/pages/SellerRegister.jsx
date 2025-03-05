import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();

    // Validación de formulario
    const validationSchema = Yup.object({
        nombre: Yup.string()
            .required("El nombre del auditorio es obligatorio")
            .min(2, "El nombre debe tener al menos 2 caracteres")
            .max(50, "El nombre no puede exceder los 50 caracteres"),
        codigo: Yup.string()
            .required("El código del auditorio es obligatorio")
            .max(10, "El código no puede exceder los 10 caracteres"),
        ubicacion: Yup.string()
            .required("La ubicación es obligatoria")
            .min(5, "La ubicación debe tener al menos 5 caracteres"),
        capacidad: Yup.number()
            .required("La capacidad es obligatoria")
            .min(1, "La capacidad debe ser al menos 1")
            .max(500, "La capacidad no puede exceder los 500"),
        descripcion: Yup.string()
            .required("La descripción es obligatoria")
            .min(5, "La descripción debe tener al menos 5 caracteres"),
    });

    // Usar Formik para gestionar el formulario
    const formik = useFormik({
        initialValues: {
            nombre: "",
            codigo: "",
            ubicacion: "",
            capacidad: "",
            descripcion: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const token = localStorage.getItem("token");
                const backUrl = import.meta.env.VITE_URL_BACKEND_API;
                const url = `${backUrl}/auditorios/registrar`;  // URL de la ruta que me diste
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                const formData = { ...values };
                const response = await axios.post(url, formData, options);
                toast.success(response.data.msg);
                setTimeout(() => {
                    navigate("/dashboard/sellers"); // Redirigir a la lista de auditorios
                }, 2000);
            } catch (error) {
                toast.error(error.response?.data?.msg || "Error al registrar el auditorio");
            }
        },
    });

    return (
        <div className="flex">
            <div className="bg-white flex justify-center items-center w-full">
                <div className="md:w-1/2">
                    <div className="flex justify-start mb-8">
                        <button
                            onClick={() => navigate("/dashboard/sellers")}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <i className="fas fa-arrow-left mr-2"></i>
                            Atrás
                        </button>
                    </div>
                    <ToastContainer />
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="mb-2 block text-sm font-semibold">
                                Nombre del Auditorio:
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Auditorio Principal"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                            />
                            {formik.touched.nombre && formik.errors.nombre ? (
                                <div className="text-red-500 text-sm">{formik.errors.nombre}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="codigo" className="mb-2 block text-sm font-semibold">
                                Código del Auditorio:
                            </label>
                            <input
                                type="text"
                                id="codigo"
                                name="codigo"
                                placeholder="AUD001"
                                value={formik.values.codigo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                            />
                            {formik.touched.codigo && formik.errors.codigo ? (
                                <div className="text-red-500 text-sm">{formik.errors.codigo}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="ubicacion" className="mb-2 block text-sm font-semibold">
                                Ubicación del Auditorio:
                            </label>
                            <input
                                type="text"
                                id="ubicacion"
                                name="ubicacion"
                                placeholder="Piso 2, Edificio Central"
                                value={formik.values.ubicacion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                            />
                            {formik.touched.ubicacion && formik.errors.ubicacion ? (
                                <div className="text-red-500 text-sm">{formik.errors.ubicacion}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="capacidad" className="mb-2 block text-sm font-semibold">
                                Capacidad:
                            </label>
                            <input
                                type="number"
                                id="capacidad"
                                name="capacidad"
                                placeholder="100"
                                value={formik.values.capacidad}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                            />
                            {formik.touched.capacidad && formik.errors.capacidad ? (
                                <div className="text-red-500 text-sm">{formik.errors.capacidad}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="descripcion" className="mb-2 block text-sm font-semibold">
                                Descripción:
                            </label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                placeholder="Auditorio con capacidad para 100 personas"
                                value={formik.values.descripcion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                            />
                            {formik.touched.descripcion && formik.errors.descripcion ? (
                                <div className="text-red-500 text-sm">{formik.errors.descripcion}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <button className="py-2 w-full block text-center bg-[#bb4d4d] text-slate-100 border rounded-xl hover:scale-100 duration-300 hover:bg-[#ff5858] hover:text-white">
                                Registrar Auditorio
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
