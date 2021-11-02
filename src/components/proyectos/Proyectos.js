import React, { useContext, useEffect } from "react";
import SideBar from "../layout/sidebar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
import AuthContext from "../../context/auth/authContext";

const Proyectos = () => {
  // Extraer info de autenticación

  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="contenedor-app">
      <SideBar />
      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tareas"></div>
          <ListadoTareas />
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
