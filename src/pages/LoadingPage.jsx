import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const LoadingPage = () => {
    const Navigate = useNavigate();
    const backendResourses = import.meta.env.VITE_URL_BACKEND;
    const [loading, setLoading] = useState(true);

    const loadResourses = async () => {
        try {
            const url = `${backendResourses}`;
            const respuesta = await axios.get(url);
            console.log(respuesta);
            Navigate("/login");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
     loadResourses()   
    },[])

    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#ff5858] font-sans text-center">
          <div className="flex flex-col sm:flex-row items-center">
              {/* Logo principal con animación */}
              <img
                  src="https://cdn-icons-png.flaticon.com/512/4078/4078099.png"
                  alt="Logo"
                  className="w-24 h-24 sm:w-32 sm:h-32 animate-bounce"
              />

              {/* Imagen secundaria */}
              <img
                  src="/images/atlasletterW.png"
                  alt="Atlas Letter"
                  className="h-20 sm:h-28 ml-2"
              />
          </div>

          <p className="mt-5 text-lg text-gray-200">Cargando Recursos...</p>

          {/* Footer */}
          <footer className="absolute bottom-5 text-white text-sm">
              &copy; Examen de fin de carrera.
          </footer>
      </div>
  );
      
}

export default LoadingPage