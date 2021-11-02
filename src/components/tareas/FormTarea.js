import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareasContext from "../../context/Tareas/tareasContext";

const FormTarea = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyectoSeleccionado } = proyectosContext;

  const tareasContext = useContext(TareasContext);
  const {
    tareaSeleccionadaEdit,
    agregarTarea,
    validarTarea,
    errorTarea,
    obtenerTareas,
    updateTarea,
    limpiarTarea,
  } = tareasContext;

  // UseEffect para editar

  useEffect(() => {
    if (tareaSeleccionadaEdit !== null) {
      setTareaSubmit(tareaSeleccionadaEdit);
    } else {
      setTareaSubmit({
        nombre: "",
      });
    }
  }, [tareaSeleccionadaEdit]);

  const [tareaSubmit, setTareaSubmit] = useState({
    nombre: "",
  });
  const { nombre } = tareaSubmit;

  if (!proyectoSeleccionado) {
    return null;
  }

  const handleChange = (e) => {
    setTareaSubmit({
      ...tareaSubmit,
      [e.target.name]: e.target.value,
    });
  };

  //proyectoSeleccionado viene como array de 1obj
  const [selectedProject] = proyectoSeleccionado;

  const onSubmit = (e) => {
    e.preventDefault();

    // validar
    if (nombre.trim() === "") {
      validarTarea();

      return;
    }

    // Ver si es edit o add tarea

    if (tareaSeleccionadaEdit === null) {
      // agregar nueva tarea al tareasState
      tareaSubmit.proyecto = selectedProject._id;
      agregarTarea(tareaSubmit);
    } else {
      updateTarea(tareaSubmit);

      // Elimina tarea selccionada del state
      limpiarTarea();
    }
    obtenerTareas(selectedProject.id);

    //reiniciar form
    setTareaSubmit({ nombre: "" });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            className="input-text"
            placeholder="Nombre de la tarea"
            name="nombre"
            type="text"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            className="btn btn-primario btn-submit btn-block"
            value={tareaSeleccionadaEdit ? "Editar tarea" : "Agregar Tarea"}
            name="nombre"
            type="submit"
          />
        </div>
      </form>
      {errorTarea ? (
        <p className="mensaje error"> El nombre de la tarea es obligatorio </p>
      ) : null}
    </div>
  );
};

export default FormTarea;
