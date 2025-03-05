import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const RegisterOrders = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        nombre: Yup.string()
            .required("El nombre es obligatorio")
            .min(2, "El nombre debe tener al menos 2 caracteres")
            .max(20, "El nombre no puede superar los 20 caracteres"),
        apellido: Yup.string()
            .required("El apellido es obligatorio")
            .min(3, "El apellido debe tener al menos 3 caracteres")
            .max(20, "El apellido no puede superar los 20 caracteres"),
        cedula: Yup.string()
            .required("La cédula es obligatoria")
            .length(10, "La cédula debe tener exactamente 10 dígitos")
            .matches(/^[0-9]{10}$/, "La cédula debe ser un número de 10 dígitos"),
        genero: Yup.string()
            .required("El género es obligatorio")
            .max(20, "El género no puede superar los 20 caracteres"),
        fecha_nacimiento: Yup.date()
            .required("La fecha de nacimiento es obligatoria"),
        ciudad: Yup.string()
            .required("La ciudad es obligatoria")
            .max(20, "La ciudad no puede superar los 20 caracteres"),
        direccion: Yup.string()
            .required("La dirección es obligatoria"),
        telefono: Yup.string()
            .required("El teléfono es obligatorio")
            .length(10, "El teléfono debe tener exactamente 10 dígitos")
            .matches(/^[0-9]{10}$/, "El teléfono debe ser un número de 10 dígitos"),
        email: Yup.string()
            .email("El correo debe ser válido")
            .required("El correo es obligatorio"),
        empresa: Yup.string()
            .required("La empresa es obligatoria")
            .max(30, "El nombre de la empresa no puede superar los 30 caracteres"),
    });

    const formik = useFormik({
        initialValues: {
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
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const token = localStorage.getItem("token");
                const backUrl = import.meta.env.VITE_URL_BACKEND_API;
                const url = `${backUrl}/conferencistas/registrar`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.post(url, values, options);
                toast.success(response.data.msg);
                setTimeout(() => {
                    navigate("/dashboard/conferencistas");
                }, 2000);
            } catch (error) {
                toast.error(error.response?.data?.msg || "Error al registrar");
            }
        },
    });

    return (
        <div className="flex">
            <div className="bg-white flex justify-center items-center w-full">
                <div className="md:w-1/2">
                    <div className="flex justify-start mb-8">
                        <button
                            onClick={() => navigate("/dashboard/orders")}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Atrás
                        </button>
                    </div>
                    <ToastContainer />
                    <form onSubmit={formik.handleSubmit}>
                        {Object.keys(formik.initialValues).map((key) => (
                            <div className="mb-3" key={key}>
                                <label htmlFor={key} className="mb-2 block text-sm font-semibold">
                                    {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ") + ":"}
                                </label>
                                <input
                                    type={key === "fecha_nacimiento" ? "date" : "text"}
                                    id={key}
                                    name={key}
                                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                    value={formik.values[key]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                />
                                {formik.touched[key] && formik.errors[key] ? (
                                    <div className="text-red-500 text-sm">{formik.errors[key]}</div>
                                ) : null}
                            </div>
                        ))}

                        <div className="mb-3">
                            <button className="py-2 w-full block text-center bg-[#bb4d4d] text-slate-100 border rounded-xl hover:scale-100 duration-300 hover:bg-[#ff5858] hover:text-white">
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterOrders;
