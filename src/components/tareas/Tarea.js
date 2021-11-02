import React, { useContext } from "react";
import TareasContext from "../../context/Tareas/tareasContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Tarea = ({ tarea }) => {
  const proyectosContext = useContext(proyectoContext);
  const { proyectoSeleccionado } = proyectosContext;
  const tareasContext = useContext(TareasContext);
  const { eliminarTarea, obtenerTareas, tareaActual, updateTarea } =
    tareasContext;

  // const [proyectoAtual] = seleccionarProyectoActual;

  const tareaEliminar = (id) => {
    console.log(id);
    eliminarTarea(id, proyectoSeleccionado[0]._id);
    obtenerTareas(proyectoSeleccionado[0]._id);
  };

  const cambiarEstado = () => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    updateTarea(tarea);
  };

  //Selec tarea para edit
  const selecTarea = (tarea) => {
    tareaActual(tarea);
  };

  return (
    <li className="tarea sombra">
      <h2>{tarea.nombre}</h2>
      <div className="tarea">
        <div className="estado">
          {tarea.estado ? (
            <button
              type="button"
              className="completo"
              onClick={() => cambiarEstado(tarea)}
            >
              Completo
            </button>
          ) : (
            <button
              type="button"
              className="incompleto"
              onClick={() => cambiarEstado(tarea)}
            >
              Incompleto
            </button>
          )}
        </div>
        <div className="acciones">
          <button
            className="btn btn-primario"
            type="button"
            onClick={() => selecTarea(tarea)}
          >
            Editar
          </button>
          <button
            className="btn btn-secundario"
            type="button"
            onClick={() => tareaEliminar(tarea._id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </li>
  );
};

export default Tarea;
