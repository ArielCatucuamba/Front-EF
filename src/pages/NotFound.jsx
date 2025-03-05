import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirigir a login después de 5 segundos
        const timer = setTimeout(() => {
            navigate("/dashboard/orders");
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#e28a8a] text-white text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-2">¡Página No Encontrada!</h2>
            <p className="text-lg mb-6">La página que buscas no existe o ha sido movida.</p>
            <p className="text-md">Serás redirigido en <span className="font-bold">5 segundos...</span></p>
            <button
                onClick={() => navigate("/dashboard/orders")}
                className="mt-6 px-6 py-3 bg-white text-[#e28a8a] font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all"
            >
                Volver al sistema
            </button>
        </div>
    );
};

export default NotFound;
