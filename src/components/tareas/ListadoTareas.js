import React, { Fragment, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareasContext from "../../context/Tareas/tareasContext";
import Tarea from "./Tarea";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTareas = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyectoSeleccionado, borrarProyectoSeleccionado } = proyectosContext;

  const tareasContext = useContext(TareasContext);
  const { tareasProyecto } = tareasContext;

  if (!proyectoSeleccionado) {
    return <h2>Selecciona un proyecto</h2>;
  }

  //proyectoSeleccionado viene como array de 1obj

  const [selectedProject] = proyectoSeleccionado;

  // Llamar las tareas desde el context

  const tareas = tareasProyecto;

  return (
    <Fragment>
      <h2>Proyecto: {selectedProject.nombre}</h2>

      <ul className="listado-tareas">
        {tareas.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareas.map((tarea) => (
              <CSSTransition key={tarea._id} timeout={200} classNames="tarea">
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => borrarProyectoSeleccionado(selectedProject._id)}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
