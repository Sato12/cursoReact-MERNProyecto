import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareasContext from "../../context/Tareas/tareasContext";

const UnidadListadoProyectos = ({ proyecto }) => {
  const proyectosContext = useContext(proyectoContext);
  const { seleccionarProyectoActual } = proyectosContext;

  const tareasContext = useContext(TareasContext);
  const { obtenerTareas } = tareasContext;

  //Función para agregar el pryecto actual (tareas)

  const seleccionarProyecto = (id) => {
    seleccionarProyectoActual(id); //Sólo para proyectos
    obtenerTareas(id);
  };
  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default UnidadListadoProyectos;
